import { logics } from "./internel/index"
import proto from "./hello.proto"

class myNode {
  constructor(...args) {
    this.name = "hello"
    this.version = "0.0.1"
    this.url = ""
    this.author = ""
    this.description = ""
    this.icon = ""
    this.categories = ["demo"]
    this.resources = {}
    this.proto = proto
    // handler your arguments here
    if (arguments[0]) console.log(arguments)
  }

  instance() {
    return logics 
  }
}

export default function newNode(...args) {
  return new myNode(...args)
}

console.log("remote: " , newNode().name)
