import { logics } from "./internel/index"

// todo: remove pl dependence
// const proto = require("@grpc/proto-loader").loadSync("hello.proto")
const proto = {"helloworld.Greeter":{"SayHello":{"path":"/helloworld.Greeter/SayHello","requestStream":false,"responseStream":false,"originalName":"sayHello","requestType":{"format":"Protocol Buffer 3 DescriptorProto","type":{"field":[{"name":"name","extendee":"","number":1,"label":"LABEL_OPTIONAL","type":"TYPE_STRING","typeName":"","defaultValue":"","options":null,"oneofIndex":0,"jsonName":""}],"nestedType":[],"enumType":[],"extensionRange":[],"extension":[],"oneofDecl":[],"reservedRange":[],"reservedName":[],"name":"HelloRequest","options":null},"fileDescriptorProtos":[{"type":"Buffer","data":[10,16,104,101,108,108,111,119,111,114,108,100,46,112,114,111,116,111,18,10,104,101,108,108,111,119,111,114,108,100,34,28,10,12,72,101,108,108,111,82,101,113,117,101,115,116,18,12,10,4,110,97,109,101,24,1,32,1,40,9,34,29,10,10,72,101,108,108,111,82,101,112,108,121,18,15,10,7,109,101,115,115,97,103,101,24,1,32,1,40,9,50,71,10,7,71,114,101,101,116,101,114,18,60,10,8,83,97,121,72,101,108,108,111,18,24,46,104,101,108,108,111,119,111,114,108,100,46,72,101,108,108,111,82,101,113,117,101,115,116,26,22,46,104,101,108,108,111,119,111,114,108,100,46,72,101,108,108,111,82,101,112,108,121,98,6,112,114,111,116,111,51]}]},"responseType":{"format":"Protocol Buffer 3 DescriptorProto","type":{"field":[{"name":"message","extendee":"","number":1,"label":"LABEL_OPTIONAL","type":"TYPE_STRING","typeName":"","defaultValue":"","options":null,"oneofIndex":0,"jsonName":""}],"nestedType":[],"enumType":[],"extensionRange":[],"extension":[],"oneofDecl":[],"reservedRange":[],"reservedName":[],"name":"HelloReply","options":null},"fileDescriptorProtos":[{"type":"Buffer","data":[10,16,104,101,108,108,111,119,111,114,108,100,46,112,114,111,116,111,18,10,104,101,108,108,111,119,111,114,108,100,34,28,10,12,72,101,108,108,111,82,101,113,117,101,115,116,18,12,10,4,110,97,109,101,24,1,32,1,40,9,34,29,10,10,72,101,108,108,111,82,101,112,108,121,18,15,10,7,109,101,115,115,97,103,101,24,1,32,1,40,9,50,71,10,7,71,114,101,101,116,101,114,18,60,10,8,83,97,121,72,101,108,108,111,18,24,46,104,101,108,108,111,119,111,114,108,100,46,72,101,108,108,111,82,101,113,117,101,115,116,26,22,46,104,101,108,108,111,119,111,114,108,100,46,72,101,108,108,111,82,101,112,108,121,98,6,112,114,111,116,111,51]}]}}},"helloworld.HelloRequest":{"format":"Protocol Buffer 3 DescriptorProto","type":{"field":[{"name":"name","extendee":"","number":1,"label":"LABEL_OPTIONAL","type":"TYPE_STRING","typeName":"","defaultValue":"","options":null,"oneofIndex":0,"jsonName":""}],"nestedType":[],"enumType":[],"extensionRange":[],"extension":[],"oneofDecl":[],"reservedRange":[],"reservedName":[],"name":"HelloRequest","options":null},"fileDescriptorProtos":[{"type":"Buffer","data":[10,16,104,101,108,108,111,119,111,114,108,100,46,112,114,111,116,111,18,10,104,101,108,108,111,119,111,114,108,100,34,28,10,12,72,101,108,108,111,82,101,113,117,101,115,116,18,12,10,4,110,97,109,101,24,1,32,1,40,9,34,29,10,10,72,101,108,108,111,82,101,112,108,121,18,15,10,7,109,101,115,115,97,103,101,24,1,32,1,40,9,50,71,10,7,71,114,101,101,116,101,114,18,60,10,8,83,97,121,72,101,108,108,111,18,24,46,104,101,108,108,111,119,111,114,108,100,46,72,101,108,108,111,82,101,113,117,101,115,116,26,22,46,104,101,108,108,111,119,111,114,108,100,46,72,101,108,108,111,82,101,112,108,121,98,6,112,114,111,116,111,51]}]},"helloworld.HelloReply":{"format":"Protocol Buffer 3 DescriptorProto","type":{"field":[{"name":"message","extendee":"","number":1,"label":"LABEL_OPTIONAL","type":"TYPE_STRING","typeName":"","defaultValue":"","options":null,"oneofIndex":0,"jsonName":""}],"nestedType":[],"enumType":[],"extensionRange":[],"extension":[],"oneofDecl":[],"reservedRange":[],"reservedName":[],"name":"HelloReply","options":null},"fileDescriptorProtos":[{"type":"Buffer","data":[10,16,104,101,108,108,111,119,111,114,108,100,46,112,114,111,116,111,18,10,104,101,108,108,111,119,111,114,108,100,34,28,10,12,72,101,108,108,111,82,101,113,117,101,115,116,18,12,10,4,110,97,109,101,24,1,32,1,40,9,34,29,10,10,72,101,108,108,111,82,101,112,108,121,18,15,10,7,109,101,115,115,97,103,101,24,1,32,1,40,9,50,71,10,7,71,114,101,101,116,101,114,18,60,10,8,83,97,121,72,101,108,108,111,18,24,46,104,101,108,108,111,119,111,114,108,100,46,72,101,108,108,111,82,101,113,117,101,115,116,26,22,46,104,101,108,108,111,119,111,114,108,100,46,72,101,108,108,111,82,101,112,108,121,98,6,112,114,111,116,111,51]}]}}
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
    return logics 
  }
}

function newNode(...param) {
  return new myNode(...param)
}

console.log("remote: " , newNode().name)
export default newNode
