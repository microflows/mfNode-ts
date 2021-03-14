/** @sayHello {hello} [say hello to world] */
function sayHello(ctx) {
    // logic begin
    ctx.res = { message: "Hello " + ctx.req.name }
    // logic end
}

/** @sayHi {hi} say [hello to world] */
function sayHi(ctx) {
    // logic begin
    ctx.res = { message: "Hi " + ctx.req.name }
    // logic end
}

export default { sayHello, sayHi }