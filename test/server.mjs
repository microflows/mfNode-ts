import Mali from 'mali'
import newNode from '../build/index'

const node = newNode()
const app = new Mali(node.proto)

function main() {
    app.use(node.instance())
    
    app.start('127.0.0.1:50051')
    console.log(
        "start at 127.0.0.1:50051..."
    )
    return app
}

main()

// app.close()
// .then(() => console.log('service closed'))
