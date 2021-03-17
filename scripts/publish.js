// const simpleGit = require('simple-git')
// const git = simpleGit({
//     baseDir: shell.pwd().toString()
// })
const shell = require('shelljs')
const config = require('../config')
const fs = require('fs')
const cloud = config.cloud
const currentBranch = shell.exec("git branch --show-current").toString().replace("\n","")

if (!fs.existsSync("build")) {
  shell.echo('You should run build before publish!')
  shell.exit(1)
}
const metadata = JSON.parse(fs.readFileSync("build/node.json"))

const name = metadata.name
const version = metadata.version
const commitMessage = name + ": " + version

// get branch
if (
shell.exec("git add . && git commit -m '" + commitMessage + "'").code !== 0) {
  shell.echo('Sorry this script need git!')
  shell.exit(1)
}

if (
    shell.exec('git checkout release').code !== 0
  ) {
      if (shell.exec('git checkout -b release origin/release').code !== 0) {
        shell.exit(1)
      }
  }


shell.mv("build","release")

//   ensure version todo


if (
    shell.exec("git add . && git commit -m '" + commitMessage + "' && git push origin release").code !== 0
  ) {
      
        shell.exit(1)
  }

//   upload metadata todo
// fetch post to cloud
console.log("upload...")

shell.mv("release","build")

// back to branch
shell.exec('git checkout ' + currentBranch)

shell.echo("Your release has been upload to cloud, your mfNode's cdn address:"+ "\n" + metadata.urls.join("\n"))