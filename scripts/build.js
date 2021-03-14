const shell = require('shelljs')
const ncc = require('@vercel/ncc')
const fs = require('fs')
const protobuf = require('protobufjs')

// get params
const outPutFileName = 'index'
const protoFileName = 'hello.proto'
const re = /\/\*\* @(.*?) \*\//g
const fn = /@(.*?) /
const rn = /{(.*?)}/
const ds = /\[(.*?)\]/
const pwd = shell.pwd()

// rollup build
// if (
//   shell.exec('rollup -c --environment NODE_ENV:production && rollup -c')
//     .code !== 0
// ) {
//   shell.echo('Rollup faild!')
//   shell.exit(1)
// }

function search(object, functionName, readableName, descriptions) {
  for (var key in object) {
    if (key == functionName) {
      object[key]['readableName'] = readableName
      object[key]['descriptions'] = descriptions
      return object
    } else {
      console.log(key )
      if (typeof(object) == 'object') {

        return search(object[key], functionName, readableName, descriptions)
      } else {
        return object
      }
      
    }
  } 
}

// parse rpc descriptions and dump metadata
// read bundle.js
const data = fs.readFileSync('dist/bundle.js').toString()
var protoJSON = new Object(
  protobuf.loadSync(pwd + '/src/' + protoFileName).toJSON()
)

data.match(re).forEach((annotation) => {
  const functionName = annotation.match(fn)[1]
  const readableName = annotation.match(rn)[1]
  const descriptions = annotation.match(ds)[1]
  // console.log(functionName,readableName,descriptions)
  console.log(

    search(protoJSON, functionName, readableName, descriptions)
  )
})

console.log(JSON.stringify(protoJSON) )
// get metadata

// putin

// ncc build
// try {
//   ncc(pwd + '/dist/bundle.min.js', { minify: true }).then(
//     ({ code, map, assets }) => {
//       if (!fs.existsSync(pwd + '/build')) shell.mkdir(pwd + '/build')

//       fs.writeFileSync('build/' + outPutFileName + '.js', code)
//       shell.echo(
//         "\nSuccess! Use 'npm run publish' to release your new micro service! "
//       )
//     }
//   )
// } catch (error) {
//   shell.echo('\nFailed!')
//   throw error
// }
