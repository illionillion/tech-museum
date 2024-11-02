import { readFile, writeFile } from "fs/promises"
import * as p from "@clack/prompts"
import c from "chalk"
import { program } from "commander"
import { glob } from "glob"
import matter from "gray-matter"
import toc from "markdown-toc"
import { prettier } from "./utils"

type Content = {
  title: string
  type: "page" | "fragment"
  description?: string
  slug: string
  keyword?: string[]
  hierarchy: {
    lv1: string
    lv2?: string
    lv3?: string
    lv4?: string
  }
}

const getPaths: p.RequiredRunner = () => async (_, s) => {
  s.start("Getting the Tech.museum article paths")

  const articlePaths = await glob("contents/**/*.md")

  s.stop("Got the Tech.museum article paths")

  return articlePaths
}

const formatTitle = (value: string) => value.replace(/`/g, "")

const getSlug = (path: string) =>
  path
    .replace(/\\/g, "/")
    .replace(/^contents\//, "")
    .replace(".md", "")

const generateSearchContent: p.RequiredRunner =
  (paths: string[]) => async (p, s) => {
    s.start(`Generating table of contents and writing files`)

    let wroteList: string[] = []

    const contents = (
      await Promise.all(
        paths.map(async (path) => {
          const file = await readFile(path, "utf8")

          const { data, content } = matter(file)

          if (!Object.keys(data).length) return []

          let { title } = data
          const { description, keyword } = data

          const slug = `/${getSlug(path)}`

          title = formatTitle(title)

          const contents: Content[] = [
            {
              title,
              type: "page",
              description,
              slug,
              hierarchy: { lv1: title },
              keyword,
            },
          ]

          const tableOfContents = toc(content).json

          tableOfContents.forEach((item, index) => {
            const prevTableOfContents = tableOfContents.slice(0, index)
            const fragment = "#" + item.slug

            item.content = formatTitle(item.content)

            const content: Content = {
              title: item.content,
              type: "fragment",
              slug: slug + fragment,
              keyword,
              hierarchy: { lv1: title },
            }

            if (item.lvl <= 2) {
              content.hierarchy.lv2 = item.content
            }

            if (item.lvl === 3) {
              const lv2Item = prevTableOfContents.findLast(
                ({ lvl }) => lvl < item.lvl,
              )

              if (!lv2Item) {
                content.hierarchy.lv2 = item.content
              } else {
                content.hierarchy.lv2 = formatTitle(lv2Item.content)
                content.hierarchy.lv3 = item.content
              }
            }

            if (item.lvl === 4) {
              const lv3Item = prevTableOfContents.findLast(
                ({ lvl }) => lvl < item.lvl,
              )
              const lv2Item = prevTableOfContents.findLast(
                ({ lvl }) => lv3Item && lvl < lv3Item.lvl,
              )

              if (!lv3Item) {
                content.hierarchy.lv2 = item.content
              } else if (!lv2Item) {
                content.hierarchy.lv2 = formatTitle(lv3Item.content)
                content.hierarchy.lv3 = item.content
              } else {
                content.hierarchy.lv2 = formatTitle(lv2Item.content)
                content.hierarchy.lv3 = formatTitle(lv3Item.content)
                content.hierarchy.lv4 = item.content
              }
            }

            contents.push(content)
          })

          return contents
        }),
      )
    ).flat()

    const data = await prettier(JSON.stringify(contents), {
      parser: "json",
    })

    const outPath = `i18n/content.json`

    await writeFile(outPath, data)

    wroteList = [...wroteList, outPath]

    s.stop(`Wrote files`)

    const message = wroteList
      .map((item) => `- ${item}`)
      .join("\n")
      .trim()

    p.note(message, "Generated search contents")
  }

program.action(async () => {
  p.intro(c.magenta(`Generating Tech.museum document search content`))

  const s = p.spinner()

  try {
    const start = process.hrtime.bigint()

    const paths = await getPaths()(p, s)
    await generateSearchContent(paths)(p, s)

    const end = process.hrtime.bigint()
    const duration = (Number(end - start) / 1e9).toFixed(2)

    p.outro(c.green(`Done in ${duration}s\n`))
  } catch (e) {
    s.stop(`An error occurred`, 500)

    p.cancel(c.red(e instanceof Error ? e.message : "Message is missing"))
  }
})

program.parse()
