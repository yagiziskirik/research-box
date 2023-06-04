# Welcome to research-box contributing guide <!-- omit in toc -->

Thank you for investing your time in contributing to my project! Any contribution you make will be reflected on [research-box](https://github.com/yagiziskirik/research-box) page :sparkles:.

In this guide you will get an overview of the contribution workflow from opening an issue, creating a PR, reviewing, and merging the PR.

## New contributor guide

To get an overview of the project, read the [README](README.md) file. Here are some resources to help you get started with open source contributions:

    - [Finding ways to contribute to open source on GitHub](https://docs.github.com/en/get-started/exploring-projects-on-github/finding-ways-to-contribute-to-open-source-on-github)

- [Set up Git](https://docs.github.com/en/get-started/quickstart/set-up-git)
- [GitHub flow](https://docs.github.com/en/get-started/quickstart/github-flow)
- [Collaborating with pull requests](https://docs.github.com/en/github/collaborating-with-pull-requests)

## Getting started

This project is created with [Next.js](https://nextjs.org). Please try to follow their documentation and standards when making new changes.

I used TypeScript, Prisma and CockroachDB for this project. You won't have access to the `.env` variables when you make changes. If you need to have any variables for testing purposes, please let me know.

If there are any prebuilt components that you can use which is in the project, please use them first. If you need to create any extra styles, please state the changes in the PR. For the sake of simplicity and consistenct though, please use prebuilt components whenever possible.

For the PRs, please make sure all the imports are sorted and there are no TypeScript errors exist. Mark all the necessary checkmarks before sending the PR. After all the workflows are completed, I will review the changes and merge the request. If there I am not returning to the PRs, you can contact me or send a message on PR.

### Issues

#### Create a new issue

If you spot a problem with the docs, [search if an issue already exists](https://docs.github.com/en/github/searching-for-information-on-github/searching-on-github/searching-issues-and-pull-requests#search-by-the-title-body-or-comments). If a related issue doesn't exist, you can open a new issue using a relevant [issue form](https://github.com/yagiziskirik/research-box/issues/new/choose).

#### Solve an issue

Scan through our [existing issues](https://github.com/yagiziskirik/research-box/issues?q=is%3Aissue) to find one that interests you. You can narrow down the search using `labels` as filters. Also don't forget to check out closed issues.

### Make Changes

#### Make changes in a codespace

For more information about using a codespace for working on GitHub documentation, see "[Working in a codespace](https://github.com/github/docs/blob/main/contributing/codespace.md)."

You can change the functionality of the program by editing any of the files in the codespace. If change any functionality though, please add the changes you have done according to the [Git Commit Messages](#git-commit-messages) section.

#### Add new language or edit translation

Please make sure that the translations are accurate.

### Commit your update

Commit the changes once you are happy with them. You can follow this simple two steps:

    #### Self-Review

Once your changes are ready, don't forget to self-review to speed up the review process:zap:.

You should always review your own PR first.

For content changes, make sure that you:

    - [ ] Confirm that the changes meet the user experience and goals outlined in the content design plan (if there is one).

- [ ] Compare your pull request's source changes to staging to confirm that the output matches the source and that everything is rendering as expected. This helps spot issues like typos, content that doesn't follow the style guide, or content that isn't rendering due to versioning problems. Remember that lists and tables can be tricky.
- [ ] Review the content for technical accuracy.
- [ ] Copy-edit the changes for grammar, spelling.
- [ ] Check new or updated versioning statements to confirm that versioning is correct.
- [ ] If there are any failing checks in your PR, troubleshoot them until they're all passing.

#### Git Commit Messages

- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters or less
- Reference issues and pull requests liberally after the first line
- Consider starting the commit message with an applicable emoji:
  - :art: `:art:` when improving the format/structure of the code
  - :racehorse: `:racehorse:` when improving performance
  - :tr: `:(flag of the language):` when adding or changing translations
  - :memo: `:memo:` when writing docs
  - :penguin: `:penguin:` when fixing something on Linux
  - :apple: `:apple:` when fixing something on macOS
  - :checkered_flag: `:checkered_flag:` when fixing something on Windows
  - :bug: `:bug:` when fixing a bug
  - :fire: `:fire:` when removing code or files
  - :sparkles: `:sparkles:` when adding new files
  - :wrench: `:wrench:` when updating files
  - :lock: `:lock:` when dealing with security
  - :arrow_up: `:arrow_up:` when upgrading dependencies
  - :arrow_down: `:arrow_down:` when downgrading dependencies
  - :tada: `:tada:` when including new update files

### Pull Request

When you're finished with the changes, create a pull request, also known as a PR.

- Fill the "Ready for review" template so that we can review your PR. This template helps reviewers understand your changes as well as the purpose of your pull request.
- Don't forget to [link PR to issue](https://docs.github.com/en/issues/tracking-your-work-with-issues/linking-a-pull-request-to-an-issue) if you are solving one.
- Enable the checkbox to [allow maintainer edits](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/allowing-changes-to-a-pull-request-branch-created-from-a-fork) so the branch can be updated for a merge.
  Once you submit your PR, a Docs team member will review your proposal. We may ask questions or request for additional information.
- We may ask for changes to be made before a PR can be merged, either using [suggested changes](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/incorporating-feedback-in-your-pull-request) or pull request comments. You can apply suggested changes directly through the UI. You can make any other changes in your fork, then commit them to your branch.
- As you update your PR and apply changes, mark each conversation as [resolved](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/commenting-on-a-pull-request#resolving-conversations).
- If you run into any merge issues, checkout this [git tutorial](https://lab.github.com/githubtraining/managing-merge-conflicts) to help you resolve merge conflicts and other issues.

### Your PR is merged!

Congratulations :tada::tada: Thanks for your contribution! :sparkles:.

Once your PR is merged, your contributions will be publicly visible on the [research-box](https://github.com/yagiziskirik/research-box) page.

Now that you are part of the research-box community, welcome to the team :cocktail:.
