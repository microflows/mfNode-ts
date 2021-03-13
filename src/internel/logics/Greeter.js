function sayHello(ctx) {
    // logic begin
    ctx.res = { message: "Hello " + ctx.req.name }
    // logic end
}

function sayHi(ctx) {
    // logic begin
    ctx.res = { message: "Hi " + ctx.req.name }
    // logic end
}

export default { sayHello, sayHi }