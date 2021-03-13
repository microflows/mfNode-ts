const pl = require("@grpc/proto-loader")

const proto = pl.loadSync("hello.proto")
class myNode {
  constructor(...param) {
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
    return { sayHello }
  }
}

function sayHello(ctx) {
  // logic begin
  ctx.res = { message: "Hello " + ctx.req.name }
  // logic end
}

function newNode(...param) {
  return new myNode(...param)
}

console.log(newNode().name)
export default newNode
