// const simpleGit = require('simple-git')
// const git = simpleGit({
//     baseDir: shell.pwd().toString()
// })
const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})
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
const git = metadata.urls[0] || ""
const commitMessage = name + ": " + version

// 确认仓库地址
rl.question("\x1B[36mIs this your git repo address?(y/n) >>> \x1B[0m" + git, a => {
  if (a !== "y") {
    shell.echo('Sorry, please write the right repo url!')
    shell.exit(1)
  }
  rl.close()
})


// ensure version todo

// switch to release branch
if (
shell.exec("git add . && git commit -m '" + commitMessage + "'").code !== 0) {
  shell.echo('Sorry this script need git!')
  shell.exit(1)
}

if (
    shell.exec('git checkout release').code !== 0
  ) {
      if (shell.exec('git checkout -b release && git remote add release ' + git).code !== 0) {
        shell.exit(1)
      }
  }

shell.mv("build","release")

if (
    shell.exec("git add * && git commit -m '" + commitMessage + "' && git push --set-upstream release release").code !== 0
  ) {
      shell.echo("Push failed!")
      shell.exit(1)
  }

//   upload metadata todo
// fetch post to cloud
console.log("upload...")

shell.mv("release","build")

// back to branch
shell.exec('git checkout ' + currentBranch)

// print urls
shell.echo("Your release has been upload to cloud, your mfNode's cdn address:"+ "\n\t" + metadata.urls.join("\n"))