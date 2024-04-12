const os = require('node:os')

console.log(`El PC lleva encendido: ${os.uptime() / 60 / 60}`)

for(let i in os){
    console.log(`${i}: ${os[`${i}`]()}`)
}
