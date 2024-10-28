<p align='center'>
    <a href='./CONTRIBUTING.ja.md'>Japanese Version</a>
</p>

## Thank you for your interest in Tech.museum.

Tech.museum is an open-source project-style technical article submission site.
The unique feature of Tech.museum is that articles are submitted and updated via Pull Requests on GitHub. This helps prevent inaccuracies or outdated information in the articles.

## Setup

1. Fork this repository.
   `https://github.com/illionillion/tech-museum`

2. Clone this repository.

```
git clone https://github.com/illionillion/tech-museum
```

3. Open the cloned repository and run `pnpm install` to install the dependencies.

## Technologies Used

- Next.js
- Yamada UI
- Docker

## Commonly Used Commands

- `pnpm install` Installs dependencies.
- `pnpm dev` Starts the development server.
- `pnpm run gen:article` Generates an article template.
- `pnpm run gen:search` Registers articles to be searchable.
- `pnpm run gen:contributor` Appends contributor information to a file.

### Commit Guidelines

When making commits, please follow the commit rules below.

When creating commits, please use one of the following types and follow the convention `type: your commit message`. Also, make sure to write a commit message that accurately reflects the changes.

- `feat / feature`: Introducing completely new code or features
- `fix`: Changes that fix a bug (provide details if possible)
- `refactor`: Changes related to code that are neither `fix` nor `feat / feature`
- `docs`: Changes to existing documentation, posting articles
- `build`: Changes related to the build process, dependency changes, or adding new dependencies
- `test`: Changes related to testing (adding new tests or modifying existing ones)
- `ci`: Changes related to continuous integration settings (e.g., GitHub actions, CI systems)
- `chore`: Changes to the repository that don't fall into any of the above categories

## Creating a Pull Request

1. Complete the "Setup" section, which is the second section of this file.
2. Create a new branch from the `main` branch. Follow the naming convention `[type/scope]`. For example, `docs/git-basic-tutorial`, `feat/add-api-test`. `type` can be a standard commit type such as `docs`, `fix`, `feat`, `build`, etc. `scope` is a short word that represents the work area.
3. Make article submissions or code changes.
4. For article submissions, you don't need to create tests, but for code changes, please create tests.
5. Commit and push your changes.
6. Follow the instructions in the pull request template to create a pull request.
7. Review the changes and make corrections if necessary.

## License

`Tech.museum` is released under the MIT License. For more details, see [LICENSE](./LICENSE).
