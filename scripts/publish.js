// const simpleGit = require('simple-git')
// const git = simpleGit({
//     baseDir: shell.pwd().toString()
// })
const shell = require('shelljs')
const config = require('../config')
const fs = require('fs')
const cloud = config.cloud
const currentBranch = shell.exec("git branch --show-current").toString().replace("\n","")

// get branch
if (
shell.exec("git add . && git commit -m 'autocommit'").code !== 0) {
  shell.echo('Sorry this script need git!')
  shell.exit(1)
}

if (
    shell.exec('git checkout release').code !== 0
  ) {
      if (shell.exec('git checkout -b release').code !== 0) {
        shell.exit(1)
      }
  }

if (!fs.existsSync("build")) {
  shell.echo('You should run build before publish!')
  shell.exit(1)
}

shell.mv("build","release")

//   ensure version todo


// git add && push todo:msg todo:add remote repourl
if (
    shell.exec('git add . && git commit -m "msg" && git push').code !== 0
  ) {
        shell.exit(1)
  }


//   upload metadata todo
JSON.parse(fs.readFileSync("build/node.json"))

shell.mv("release","build")

// back to branch
shell.exec('git checkout ' + currentBranch)

// return print url
console.log(
    shell.pwd().toString()
)