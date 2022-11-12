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
      // await client.issues.createComment({
      //   owner: context.issue.owner,
      //   repo: context.issue.repo,
      //   issue_number: context.issue.number,
      //   body: issueMessage + footerTags
      // });
      console.log('Issue was opened file details', fileContent, filePath);

      console.log('Issue Body, ', context.payload.issue.body);
    }
  } catch (error) {
    core.setFailed(error.message);
  }
})();
