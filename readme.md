 # mfNode

Template of MicroFlow's node, easily build a microservice rpc node like normal.

## Getting Start

MfNodes developing must follow MF development specification, but it's very easy.

You only need to implement  the interface below in your index.js.

```typescript
export interface mfNode {
    proto: object				## rpc proto object
    name: string				## your node name
    version: string				## node version
    url: string					## node code url
    author: string				## your name
    description: string			## code description
    icon: string				## code icon url (svg/png)
    categories: Array<string>	## categories
    resources: object			## resources like github page or project website
    instance(): any				## return rpc functions
}
```

This repo is a simple example, your can see minimal mfNode code in `src/index.js` (line 35)

## Cmd lines

### develop

`yarn dev`

### build

`yarn build`

It will pack all your code to one file to `build/index.js`. So we can upload it as a Node or plugin!🥳

### publish

`yarn publish`

It will upload your node code to Cloud.

## License

MIT