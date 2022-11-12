const core = require('@actions/core');
const github = require('@actions/github');

(async () => {
  try {
    const githubToken = core.getInput('github-token', { required: true });
    const filePath = core.getInput('file-path');
    const fileContent = core.getInput('file-content');
    const lable = core.getInput('lable');

    // add a comment to the issue or pull request
    // @TODO: with a markdown sheild / badge
    const client = github.getOctokit(githubToken);
    const context = github.context;

    if (context.payload.action !== 'opened') {
      console.log('No issue / pull request was opened, skipping');
      return;
    }

    if (!!context.payload.issue && context.payload.issue.labels.includes(lable)) {
      // await client.issues.createComment({
      //   owner: context.issue.owner,
      //   repo: context.issue.repo,
      //   issue_number: context.issue.number,
      //   body: issueMessage + footerTags
      // });
      console.log('Issue Body, ', context.payload.issue.body);
    }
  } catch (error) {
    core.setFailed(error.message);
  }
})();
