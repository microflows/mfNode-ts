// const readlineSync = require('readline-sync')
const shell = require('shelljs')
const fs = require('fs')
const iniparser = require('iniparser')
const compareVersions = require('compare-versions')

// ensure git is installed
shell.echo('\x1B[36mGit Version:\x1B[0m')
if (shell.exec('git --version').code !== 0) {
  shell.echo('\x1B[31m[Error] Sorry this script need git!\x1B[0m')
  shell.exit(1)
}
shell.echo()

// get current branch
shell.echo('\x1B[36mCurrent branch:\x1B[0m')
const currentBranch = shell
  .exec('git branch --show-current')
  .toString()
  .replace('\n', '')
shell.echo()

// ensure builded
if (!fs.existsSync('build')) {
  shell.echo('\x1B[33mAuto run build...\x1B[0m')
  shell.exec('npm run build')
  shell.echo('\x1B[33m\nStart to release...\n\x1B[0m')
}

// read metadata
const metadata = JSON.parse(fs.readFileSync('build/node.json'))
const name = metadata.name
const version = metadata.version

// git info
if (!fs.existsSync('.git/config')) {
  shell.echo('\x1B[31m[Error] Not a valid git repo!\x1B[0m')
  shell.exit(1)
}
const git = iniparser.parseSync('.git/config')['remote "origin"']['url']
if (git.indexOf('http') !== -1)
  shell.echo(
    '\x1B[33m[Warning] Your are using http git repo url, we recommand ssh!\nTrun to: https://docs.github.com/en/github/authenticating-to-github/connecting-to-github-with-ssh \n\x1B[0m'
  )
const commitMessage = name + ': ' + version
const releaseBranchName = ['publish']

// read config
const config = require('../config')
const cloud = config.cloud

const currentVersion = '0.0.0'

function gitPush(branchs) {
  // ensure the right repo url
  // if (
  //   readlineSync.question(
  //     '\x1B[36mIs this your git repo address?(y/n)\x1B[0m ↓↓↓\n' + git + '\t\n'
  //   ) !== 'y'
  // ) {
  //   shell.echo(
  //     '\x1B[31m[Error] Sorry, please write the right repo url in src/index !\x1B[0m'
  //   )
  //   shell.exit(1)
  // }
  // shell.echo()

  // ensure version
  if (compareVersions(version, currentVersion) !== 1) {
    shell.echo(
      '\x1B[31m[Error] The publish version must > the existing version!\x1B[0m'
    )
    shell.exit(1)
  }

  // ---
  shell.mv('build', 'release')

  // commit to current branch
  shell.echo('\x1B[36mCommit to current branch:\x1B[0m')
  shell.exec("git add . && git commit -m '" + commitMessage + "'")
  shell.echo()

  // push to current branch
  shell.echo('\x1B[36mPush to current branch:\x1B[0m')
  if (shell.exec('git push').code !== 0) {
    shell.echo(
      '\x1B[31m[Error] Not a valid git repo url! You should fork this repo first!\x1B[0m'
    )
    shell.exit(1)
  }
  shell.echo()

  branchs.forEach((branch) => {
    if (currentBranch === branch) {
      shell.echo(
        '\x1B[31m[Error] You should not dev in '+branch+' branch! Please switch to your default branch!\x1B[0m'
      )
      shell.exit(1)
    }
    shell.echo('\x1B[34m>>> Push to ' + branch + ' branch <<<\n\x1B[0m')
    // Switch to target branch
    shell.echo('\x1B[36mSwitch to ' + branch + ' branch:\x1B[0m')
    shell.exec('git config advice.addIgnoredFile false')
    if (
      shell.exec(
        'git switch -c ' +
          branch +
          ' && git remote add ' +
          branch +
          ' ' +
          git +
          ' && git tag v' +
          version
      ).code !== 0
    ) {
      if (shell.exec('git checkout ' + branch).code !== 0) {
        shell.exit(1)
      }
    }
    shell.echo()

    // Merge master to target branch
    shell.echo('\x1B[36mMerge master to ' + branch + ' branch:\x1B[0m')
    if (
      shell.exec(
        'git merge master && git push --set-upstream ' +
          branch + ' ' + branch +
          ' --tags'
      ).code !== 0
    ) {
      shell.exec('git checkout ' + currentBranch)
      shell.mv('release', 'build')
      shell.echo('Push failed!')
      shell.exit(1)
    }
    shell.echo()

    // back to branch
    shell.echo('\x1B[36mBack to ' + currentBranch + ' branch:\x1B[0m')
    shell.exec('git checkout ' + currentBranch)
    shell.echo()
    shell.echo(
      '\x1B[32m>>> Push to ' + branch + ' branch success! <<<\n\x1B[0m'
    )
  })

  shell.mv('release', 'build')
  // ---

  // Clean the dir
  shell.echo('\x1B[36mClean the dir:\x1B[0m')
  shell.exec(
    "git rm -r release && git commit -m '" + commitMessage + "' && git push"
  )
  shell.echo()
}

gitPush(releaseBranchName)

// upload metadata todo
shell.echo('\x1B[36mUpload metadata:\x1B[0m')
console.log('upload...')
shell.echo()

shell.echo(
  "\x1B[32mYour release has been upload to cloud, your mfNode's cdn address:\x1B[0m" +
    '\n\t' +
    metadata.urls.join('\n') +
    '\n'
)

shell.echo(
  '\x1B[32mAnd this is a rolling update address, use it with caution:\x1B[0m' +
    '\n\t' +
    metadata.urls
      .map((url) => url.replace('@' + version, '@'+releaseBranchName[0]))
      .join('\n') +
    '\n'
)
