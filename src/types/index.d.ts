export default interface mfNode {
    proto: object
    name: string
    version: string
    urls: string
    author: string
    description: string
    icon: string
    categories: Array<string>
    resources: object
    instance(): any
}
