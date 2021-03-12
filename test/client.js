const grpc = require('@grpc/grpc-js')
const pl = require('@grpc/proto-loader')

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


const service = grpc.loadPackageDefinition(proto)["helloworld"]["Greeter"]
const client = new service('127.0.0.1:50051', grpc.credentials.createInsecure())

const sayhello = client["SayHello"]

sayhello({ name: 'World' },(a,b)=>{console.log(a,b)})

