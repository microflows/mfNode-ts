import mfNode from './types/index'

class myService implements mfNode {
  constructor(...args: any[]) {
    this.email = "gonorth@qq.com"
    this.name = "foxx-mf"
    this.version = "0.0.1"
    this.urls = ["https://github.com/microflows/foxx-mf"]
    this.author = ""
    this.description = ""
    this.icon = ""
    this.categories = ["demo"]
    this.resources = {
      "git":"https://github.com/microflows/foxx-mf"
    }
    this.proto = {}
    // handler your arguments here
    if (args) console.log(args)
  }
  name: string
  version: string
  author: string
  email: string
  description: string
  icon: string
  categories: string[]
  resources: object
  urls: string[];
  proto: object;

  init() {}
  instance() {}
}

export default function newService(...args:any) {
  return new myService(...args)
}

console.log("remote: " , newService().name)
