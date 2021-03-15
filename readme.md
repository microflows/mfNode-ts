 # MfNode

Template of MicroFlow's service node, easily build a microservice rpc node as usual.

## Getting Start
### MF dev specification

MfNodes developing must follow MF development specification, but it's very easy.

You only need to implement  the interface below in your entry file.

```
interface mfNode {
    proto: object                 ## rpc proto object
    name: string                  ## your node name
    version: string               ## version
    urls: string                  ## release bundle url list or github repo url
    author: string                ## your name
    email: string                 ## your email (will be public)
    description: string           ## code description
    icon: string                  ## code icon url (png)
    categories: Array<string>     ## categories for human
    resources: object             ## resources like github page or project website
    instance(): any               ## return rpc functions
}
# More about `instance()` return, see details in: https://mali.js.org/api/#mali-%E2%87%90-emitter
```

This repo is both of a template and minimal mfNode example >> have a glance at the code in `src` ( lines < 35 )

### Src dir tree

```
src
├── hello.proto                   ## Grpc protobuf
├── index.js                      ## Entry
└── internel                      ## Logics, middlewares and your own code all here
    ├── index.js                  ## 
    └── logics                    ## 
        └── Greeter.js            ## Service-file, one service-file can have many rpc-Functions
```

## Cmds

### develop

`yarn dev`

### build

`yarn build`

It will compile all your code to one file to `build/index.js`. So we can upload it as a service plugin!🥳

### publish

`yarn publish`

It will upload your node code to Cloud.

## Todo

**recent**

- [ ] mf-cli : gen code from internel dir and proto file, auto build-publish

- [x] rollup-plugin-gproto: a rollup plugin that can load proto file in compile time

**plan**

- [ ] docs about how to create a mfNode

- [ ] MF dev specification, interface between mf units

## License

MIT
