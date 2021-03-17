/** @SayHello {hello} [say hello to world] */
function sayHello(ctx:any) {
    // logic begin
    ctx.res = { message: "Hello " + ctx.req.name }
    // logic end
}

/** @SayHi {hi} say [hello to world] */
function sayHi(ctx:any) {
    // logic begin
    ctx.res = { message: "Hi " + ctx.req.name }
    // logic end
}

export default { sayHello, sayHi }