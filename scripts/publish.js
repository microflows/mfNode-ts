// const simpleGit = require('simple-git')
const shell = require('shelljs')
// const git = simpleGit({
//     baseDir: shell.pwd().toString()
// })
const domain = "microflow.cloud"


// get branch
if (
    shell.exec('git checkout release').code !== 0
  ) {
      if (shell.exec('git checkout -b release').code !== 0) {
        shell.echo('Sorry this script need git!')
        shell.exit(1)
      }
  }

  shell.mv("build","release")

//   ensure version

// git add && push todo:msg
if (
    shell.exec('git add . && git commit -m "msg" && git push').code !== 0
  ) {
        shell.exit(1)
  }

//   mv back

//   upload metadata

// back to branch

// return print url
console.log(
    shell.pwd().toString()
)