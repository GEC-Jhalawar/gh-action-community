const core = require('@actions/core');
const github = require('@actions/github');

(async () => {
  try {
    const githubToken = core.getInput('github-token', { required: true });
    const filePath = core.getInput('file-path');
    const fileContent = core.getInput('file-content');

    // add a comment to the issue or pull request
    // @TODO: with a markdown sheild / badge
    const client = github.getOctokit(githubToken);
    const context = github.context;

    // if (context.payload.action !== 'opened') {
    //   console.log('No issue / pull request was opened, skipping');
    //   return;
    // }
    if (!!context.payload.issue) {
      const text = context.payload.issue.body
      const arr = JSON.parse(fileContent)
      const values = arr.map((key) => {
        const regex = new RegExp(`### ${key}\n\n(.*)`)
        const match = text.match(regex)
        return match[1]
    })
      // edit client files at the given path
      const { data: { content } } = await client.repos.getContent({
        owner: context.repo.owner,
        repo: context.repo.repo,
        path: filePath,
      });
      const decodedContent = Buffer.from(content, 'base64').toString();
      // const encodedContent = Buffer.from(updatedContent3).toString('base64');
      console.log('Issue Body, ', values, 'decodedContent', decodedContent);
    }
  } catch (error) {
    core.setFailed(error.message);
  }
})();
