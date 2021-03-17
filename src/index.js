import { logics } from "./internel/index"
import proto from "./hello.proto"

class myService {
  constructor(...args) {
    this.name = "hello"
    this.version = "0.0.1"
    this.urls = ["https://github.com/microflows/mfNode"]
    this.author = ""
    this.email = ""
    this.description = ""
    this.icon = ""
    this.categories = ["demo"]
    this.resources = {
      "git":"https://github.com/microflows/mfNode"
    }
    this.proto = proto
    // handler your arguments here
    if (arguments[0]) console.log(arguments)
  }

  init() {}
  instance() {
    return logics 
  }
}

export default function newService(...args) {
  return new myService(...args)
}

console.log("remote: " , newService().name)
