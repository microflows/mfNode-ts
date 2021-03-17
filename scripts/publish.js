const readlineSync = require('readline-sync')
const shell = require('shelljs')
const fs = require('fs')

// ensure git is installed
shell.echo('\x1B[36mGit Version:\x1B[0m')
if (shell.exec('git --version').code !== 0) {
  shell.echo('Sorry this script need git!')
  shell.exit(1)
}
shell.echo()

// get current branch
shell.echo('\x1B[36mCurrent branch:\x1B[0m')
const currentBranch = shell
  .exec('git branch --show-current')
  .toString()
  .replace('\n', '')
if (currentBranch === "release") {
  shell.echo('You should not dev in release branch! Please switch to your master/main branch!')
  shell.exit(1)
}
shell.echo()

// ensure builded
if (!fs.existsSync('build')) {
  shell.echo('You should run build before publish!')
  shell.exit(1)
}

// read metadata
const metadata = JSON.parse(fs.readFileSync('build/node.json'))
const name = metadata.name
const version = metadata.version
const git = metadata.urls[0] || ''
const commitMessage = name + ': ' + version

// read config
const config = require('../config')
const cloud = config.cloud

const currentVersion = '0.0.0'

// ensure the right repo url todo:with array
if (
  readlineSync.question(
    '\x1B[36mIs this your git repo address?(y/n)\x1B[0m ↓↓↓\n' +
      git
        .replace('cdn.jsdelivr.net/gh', 'github.com')
        .replace('@release/release/index.js', '') +
      '\n'
  ) !== 'y'
) {
  shell.echo('Sorry, please write the right repo url!')
  shell.exit(1)
}
shell.echo()

// ensure version todo
shell.echo('\x1B[36mEnsure the version right:\x1B[0m')
shell.echo(currentVersion, version)
// version >
shell.echo()

// commit to current branch
shell.echo('\x1B[36mCommit to current branch:\x1B[0m')
shell.exec("git add . && git commit -m '" + commitMessage + "'")
shell.echo()

// Switch to release branch
shell.echo('\x1B[36mSwitch to release branch:\x1B[0m')
shell.exec('git config advice.addIgnoredFile false')
if (shell.exec('git checkout release').code !== 0) {
  if (
    shell.exec('git checkout -b release && git remote add release ' + git)
      .code !== 0
  ) {
    shell.exit(1)
  }
}
shell.echo()

// ---
shell.mv('build', 'release')

// Merge master to release branch
shell.echo('\x1B[36mMerge master to release branch:\x1B[0m')
if (
  shell.exec(
    "git merge master && git push --set-upstream release release"
  ).code !== 0
) {
  shell.exec('git checkout ' + currentBranch)
  shell.echo('Push failed!')
  shell.exit(1)
}
shell.echo()

// upload metadata todo
shell.echo('\x1B[36mUpload metadata:\x1B[0m')
console.log('upload...')
shell.echo()

shell.mv('release', 'build')
// ---

// back to branch
shell.echo('\x1B[36mBack to master branch:\x1B[0m')
shell.exec('git checkout ' + currentBranch)
shell.echo()

// print urls
shell.echo(
  "\x1B[36mYour release has been upload to cloud, your mfNode's cdn address:\x1B[0m" +
    '\n\t' +
    metadata.urls.join('\n')
)
shell.echo()