import { readFile, writeFile } from "node:fs/promises"
import * as p from "@clack/prompts"
import { Octokit } from "@octokit/rest"
import type { ArticleMetadata } from "article"
import c from "chalk"
import { config } from "dotenv"

import { glob } from "glob"
import matter from "gray-matter"
import { recursiveOctokit } from "./utils"
import { formatIsoDate } from "@/utils/fomat/iso-date"

type Commit = Awaited<
  ReturnType<typeof octokit.repos.listCommits>
>["data"][number]
type Author = Commit["author"]

const COMMON_PARAMS = { owner: "illionillion", repo: "tech-museum" }

config()

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN })

const getMetadataPaths: p.RequiredRunner = () => async (_, s) => {
  s.start("Getting the Tech.museum metadata paths")

  const metadataPaths = await glob("contents/**/*.md")

  s.stop("Got the Tech.museum metadata paths")

  return metadataPaths
}

const getSlug = (path: string) =>
  path
    .replace(/\\/g, "/")
    .replace(/^contents\//, "")
    .replace(".md", "")

const updateMetadata = async (
  path: string,
  _authors: Author[],
  latestDate: string,
) => {
  const file = await readFile(path, "utf-8")
  const { data, content } = matter(file)

  const metadata = data as ArticleMetadata
  const authors = _authors.map((author) => {
    const { id, login, avatar_url, html_url } = author ?? {}
    return {
      id,
      login,
      avatar_url,
      html_url,
    }
  }) as ArticleMetadata["contributors"]

  metadata.contributors = authors
  metadata.slug = getSlug(path)
  metadata.latest_date = formatIsoDate(latestDate) // Add latest date to metadata

  const updatedContent = matter.stringify(content, metadata)

  await writeFile(path, updatedContent)
}

const getCommits = async (path: string) => {
  const commits: Commit[] = []
  let page = 1
  let count = 0
  const perPage = 100

  const listForRepo = async () => {
    const { data } = await octokit.repos.listCommits({
      ...COMMON_PARAMS,
      sha: "main",
      path,
      per_page: perPage,
      page,
    })

    commits.push(...data)
    count = data.length

    if (count === perPage) {
      page++
      await recursiveOctokit(listForRepo)
    }
  }

  await recursiveOctokit(listForRepo)

  // Sort commits by date and get the latest one
  const latestCommit = commits.sort(
    (a, b) =>
      new Date(b.commit.committer?.date || "").getTime() -
      new Date(a.commit.committer?.date || "").getTime(),
  )[0]

  const latestDate = latestCommit?.commit.committer?.date ?? ""

  return { commits, latestDate }
}

const getAuthors: p.RequiredRunner<
  [string[]],
  Promise<Record<string, Author[]>>
> = (paths) => async (_, s) => {
  s.start("Getting the Tech.museum contributors")

  const authorMap: Record<string, Author[]> = {}

  await Promise.all(
    paths.map(async (path) => {
      const { commits } = await getCommits(path.replace(/\\/g, "/"))

      const commitMap: Record<string, { count: number; author: Author }> = {}

      for (const { author } of commits) {
        if (author?.type !== "User") return

        if (Object.prototype.hasOwnProperty.call(commitMap, author.id)) {
          commitMap[author.id] = {
            count: commitMap[author.id].count + 1,
            author,
          }
        } else {
          commitMap[author.id] = { count: 1, author }
        }
      }

      authorMap[path] = Object.values(commitMap)
        .sort((a, b) => b.count - a.count)
        .map(({ author }) => author)
    }),
  )

  s.stop("Got the Tech.museum contributors")

  return authorMap
}

const main = async () => {
  p.intro(c.magenta("Generating Tech.museum contributors"))

  const s = p.spinner()

  try {
    const start = process.hrtime.bigint()

    const metadataPaths = await getMetadataPaths()(p, s)
    const authorMap = await getAuthors(metadataPaths)(p, s)

    s.start("Writing the metadata")

    await Promise.all(
      Object.entries(authorMap).map(async ([path, authors]) => {
        const { latestDate } = await getCommits(path.replace(/\\/g, "/")) // Get latest date
        await updateMetadata(path, authors, latestDate) // Pass latest date
      }),
    )

    s.stop("Wrote the metadata")

    const end = process.hrtime.bigint()
    const duration = (Number(end - start) / 1e9).toFixed(2)

    p.outro(c.green(`Done in ${duration}s\n`))
  } catch (e) {
    if (e instanceof Error) console.log(e.message)
  }
}

main()
