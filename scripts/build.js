const shell = require('shelljs')
const ncc = require('@vercel/ncc')
const fs = require('fs')
const protobuf = require('protobufjs')
const crypto = require('crypto')
const config = require('../config')
const { Date } = require('core-js')

const tag = config.tag
const language = config.language
const pwd = shell.pwd()

// read metadata
function addCommentToMetaData() {
  const re = /\/\*\* @(.*?) !\*\//g
  const fn = /@(.*?) /
  const rn = /{(.*?)}/
  const ds = /\[(.*?)\]/
  const protoFileName = shell
    .ls(pwd + '/src')
    .filter((name) => name.indexOf('.proto') !== -1)[0]

  const findServiceName = (obj) => {
    for (const key in obj) {
      if (Object.hasOwnProperty.call(obj, key)) {
        const element = obj[key]
        if (Object.keys(element)[0] === 'methods') return key
      }
    }
  }

  const createFileHash256Sync = (filename) => {
    const buffer = fs.readFileSync(filename)
    const fsHash = crypto.createHash('sha256')
    fsHash.update(buffer)
    return fsHash.digest('hex')
  }

  // read bundle.js
  const data = fs.readFileSync('dist/bundle.js').toString()
  // read protofile and parse it to json
  const protoJSON = new Object(
    protobuf.loadSync(pwd + '/src/' + protoFileName).toJSON()
  )
  // find methods and inject comment data in it
  // todo: test namespace
  // todo: test mutiline comment
  const serviceAndMessageListObj =
    protoJSON['nested'][Object.keys(protoJSON['nested'])[0]]['nested']
  const serviceName = findServiceName(serviceAndMessageListObj)
  data.match(re).forEach((comment) => {
    const functionName = comment.match(fn)[1]
    const readableName = comment.match(rn)[1]
    const description = comment.match(ds)[1]

    serviceAndMessageListObj[serviceName]['methods'][
      functionName
    ].readableName = readableName
    serviceAndMessageListObj[serviceName]['methods'][
      functionName
    ].description = description
  })

  // read metadata
  const loadModuleLocal = () => {
    const module = { exports }
    const func = new Function('module', 'exports', data)
    func(module, exports)
    return module.exports
  }

  const newServiceMetaObj = loadModuleLocal()
  const serviceMetaObj = newServiceMetaObj()

  // inject protodata
  serviceMetaObj.proto = protoJSON
  // replace url to jsdelivr cdn
  serviceMetaObj.urls.forEach((url, index) => {
    if (
      url.indexOf('github.com') !== -1 ||
      url.indexOf('raw.githubusercontent.com') !== -1
    ) {
      var nurl = url
        .replace('github.com', 'cdn.jsdelivr.net/gh')
        .replace('raw.githubusercontent.com', 'cdn.jsdelivr.net/gh')
      if (nurl.endsWith('/')) {
        nurl =
          nurl.slice(0, -1) + '@' + serviceMetaObj.version + '/release/index.js'
      } else {
        nurl = nurl + '@' + serviceMetaObj.version + '/release/index.js'
      }
      serviceMetaObj.urls[index] = nurl
    }
  })
  // add file hash
  serviceMetaObj.hash = createFileHash256Sync(pwd + '/build/index.js')

  // add node tag
  serviceMetaObj.tag = tag
  serviceMetaObj.buildtime = Date.now()
  serviceMetaObj.language = language
  
  return serviceMetaObj
}

function main() {
  try {
    // rollup build
    shell.echo('\x1B[36mRollup build\x1B[0m')
    if (
      shell.exec('rollup -c --environment NODE_ENV:production && rollup -c')
        .code !== 0
    ) {
      shell.echo('Rollup faild!')
      shell.exit(1)
    }
    shell.echo()
    shell.echo('\x1B[36mNCC build\x1B[0m')
    // ncc build
    ncc(pwd + '/dist/bundle.min.js', { minify: true }).then(
      ({ code, map, assets }) => {
        if (!fs.existsSync(pwd + '/build')) shell.mkdir(pwd + '/build')

        fs.writeFileSync('build/index.js', code)
        // write metadata
        fs.writeFileSync(
          pwd + '/build/index.json',
          JSON.stringify(addCommentToMetaData())
        )
        shell.echo(
          "\n\x1B[32mSuccess! Use 'yarn release' to release your new " +
            tag +
            '! \x1B[0m'
        )
      }
    )
  } catch (error) {
    shell.echo('\n\x1B[31m[Error]Failed!\x1B[0m')
    throw error
  }
}

main()
