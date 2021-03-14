import { logics } from "./internel/index"
import proto from "./hello.proto"

class myService {
  constructor(...args) {
    this.name = "hello"
    this.version = "0.0.1"
    this.url = ["https://v.gonorth.top:444/file/index.js"]
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

export default function newService(...args) {
  return new myService(...args)
}

console.log("remote: " , newService().name)
