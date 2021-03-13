export interface mfNode {
    proto: object
    name: string
    version: string
    url: string
    author: string
    description: string
    icon: string
    categories: Array<string>
    resources: object
    instance(): any
}

// export type rpcinstance = {
//     service?: any
//     name?: any
//     fns?: any
// }
