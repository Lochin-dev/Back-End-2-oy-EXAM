const fs = require("fs")


const read = (fileName) => {
    return JSON.parse(fs.readFileSync(`./src/modules/${fileName}`, 'utf-8'))
}


const write = (fileName, data) => {
    return fs.writeFileSync(`./src/modules/${fileName}`, JSON.stringify(data, null, 4))
}

module.exports = {
    read,
    write
}