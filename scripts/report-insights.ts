import { writeFileSync } from "fs"
import { Octokit } from "@octokit/rest"
import { config } from "dotenv"

// .envファイルの環境変数を読み込み
config()

const GITHUB_TOKEN = process.env.GITHUB_TOKEN

if (!GITHUB_TOKEN) {
  throw new Error("GitHub token is missing")
}

const REPO_OWNER = "illionillion"
const REPO_NAME = "tech-museum"
const TOP_N_CONTRIBUTORS = 5
const OUTPUT_FILE_PATH = "i18n/contributors.json"

const octokit = new Octokit({
  auth: GITHUB_TOKEN,
})

const getContributorsData = async () => {
  try {
    const commits = await octokit.repos.listCommits({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      path: "contents/",
      per_page: 100,
    })

    const contributors: Record<string, any> = {}

    for (const commit of commits.data) {
      const author = commit.author
      if (author) {
        const { id, login, avatar_url, html_url } = author
        if (!contributors[login]) {
          contributors[login] = {
            id,
            login,
            avatar_url,
            html_url,
            commitCount: 0,
          }

          const userData = await octokit.users.getByUsername({
            username: login,
          })
          contributors[login].bio = userData.data.bio || ""
        }

        contributors[login].commitCount += 1
      }
    }

    // 全contributors
    const allContributors = Object.values(contributors)

    // 上位貢献者を取得
    const topContributors = allContributors
      .sort((a, b) => b.commitCount - a.commitCount)
      .slice(0, TOP_N_CONTRIBUTORS)

    // JSONファイルに書き込む
    const outputData = {
      date: new Date().toISOString(),
      contributors: allContributors,
      top_contributors: topContributors,
    }

    writeFileSync(OUTPUT_FILE_PATH, JSON.stringify(outputData, null, 2))

    console.log(`Contributor data has been written to ${OUTPUT_FILE_PATH}`)
  } catch (error) {
    console.error("Error fetching commits: ", error)
  }
}

getContributorsData()
