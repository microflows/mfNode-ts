export default interface mfNode {
    proto: object
    name: string
    version: string
    urls: string[]
    author: string
    email: string
    description: string
    icon: string
    categories: string[]
    resources: object
    init(): void
    instance(): any
}
