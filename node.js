const pl = require("@grpc/proto-loader");

const proto = pl.fromJSON({
  nested: {
    helloworld: {
      nested: {
        Greeter: {
          methods: {
            SayHello: {
              requestType: "HelloRequest",
              responseType: "HelloReply",
            },
          },
        },
        HelloRequest: { fields: { name: { type: "string", id: 1 } } },
        HelloReply: { fields: { message: { type: "string", id: 1 } } },
      },
    },
  },
});

class myNode {
  name = "hello";
  version = "0.0.1";
  url = "";
  author = "";
  description = "";
  icon = "";
  categories = ["demo"];
  resources = {};
  proto = proto;

  constructor(...param) {
    // handler your arguments here
    if (arguments[0]) console.log(arguments);
  }

  instance() {
    return { sayHello };
  }
}

function sayHello(ctx) {
  // logic begin
  ctx.res = { message: "Hello " + ctx.req.name };
  // logic end
}

function newNode(...param) {
  return new myNode(...param);
}

module.exports = newNode;
