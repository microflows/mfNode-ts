<div align="center">
<img src="https://user-images.githubusercontent.com/53158137/111246054-94f44f00-8640-11eb-9459-3829679c03ca.png"/>
<h1>MfNode</h1>
<p>
Easily build any remote module/script or UI component as usual
</p>
<a href="https://github.com/microflows/mfNode/blob/master/LICENSE.txt"><img src="https://img.shields.io/github/license/microflows/mfNode?color=379c9c&style=flat-square"/></a>
<a href="https://discord.com/invite/wGSABhbCzN"><img src="https://img.shields.io/discord/813599680713457665?label=chat&logo=discord&color=379c9c&style=flat-square"/></a>
</div>

## Getting Start

### Steps

- [ ] [Use this template](https://github.com/microflows/mfNode.ts/generate)
- [ ] Git clone your repo to local
- [ ] Use `yarn && yarn dev` to start development
- [ ] Use `yarn release` to publish
- [ ] View the release in your cloud account

### What is a remote module?

Remote module means you can dynamically load and run it from a remote URL for the Browser or Node.js. 

So you can update project-code or hotload plugins without redeploying.

More Details in [nodeVM](https://github.com/microflows/nodeVM) ( MF's official runtime of remote module )

### MF dev specification

MfNodes developing must follow MF development specification, but it's very easy.

You only need to implement  the interface below in your entry file.

```
interface mfNode {
    email: string                 ## your email to identify who you are
    name: string                  ## your node name
    version: string               ## version
    urls: string                  ## release bundle url list or github repo url
    author: string                ## your name
    description: string           ## code description
    icon: string                  ## code icon url (png)
    categories: Array<string>     ## categories for human
    resources: object             ## resources like github page or project website
    proto: object                 ## rpc proto object
    init(): void                  ## will be executed at the first startup
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

hotreload code dev, code compile to `dist/bundle.js`

### build

`yarn build`

It will compile all your code to one file to `build/index.js`. So we can upload it as a service plugin!🥳

### release

`yarn release`

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
