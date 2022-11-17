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
    // if (context.payload.action !== 'closed') {
    //   console.log('No issue / pull request was opened, skipping');
    //   return;
    // }
    if (!!context.payload.issue) {
      const text = context.payload.issue.body
      const arr = JSON.parse(fileContent)
      var batch;
      const values = arr.map((key) => {
        const regex = new RegExp(`### ${key}\n\n(.*)`)
        const match = text.match(regex)
        if (key === 'Passing Year') {
          let year = match[1]
          let year2 = year-4
          let res = "Batch " + year2 + "-" + year
          batch = res
        }
        return match[1]
    })
      // edit client files at the given path
      const { data: { content } } = await client.repos.getContent({
        owner: context.repo.owner,
        repo: context.repo.repo,
        path: filePath,
      });
      const { data: { sha } } = await client.repos.getContent({
        owner: context.repo.owner,
        repo: context.repo.repo,
        path: filePath,
      });
      const decodedContent = Buffer.from(content, 'base64').toString();
      let file = JSON.parse(decodedContent);
      if (file[batch] === undefined) {
        file[batch] = []
      }
      file[batch].push({
        "Name": values[0],
        "Roll": values[1],
        "Email": values[2],
        "Github username": values[3]
      })
      let finalFile = JSON.stringify(file)
      const updatedContent = Buffer.from(finalFile).toString('base64');   
      await client.repos.createOrUpdateFileContents({
        owner: context.repo.owner,
        repo: context.repo.repo,
        path: filePath,
        message: 'Update file',
        content: updatedContent,
        sha: sha,
      });
    }
  } catch (error) {
    core.setFailed(error.message);
  }
})();
