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
    console.log(context.payload);
    if (!!context.payload.issue) {
      const text = context.payload.issue.body
      const arr = JSON.parse(fileContent)
      const values = arr.map((key) => {
        const regex = new RegExp(`### ${key}\n\n(.*)`)
        const match = text.match(regex)
        return match[1]
    })

      console.log('Issue Body, ', values);
    }
  } catch (error) {
    core.setFailed(error.message);
  }
})();
