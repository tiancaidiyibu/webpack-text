module.exports = function (source,sourceMap,ast) {
    const result = source.replace('Ikki','你好')
    console.log(source,result)
    return result
}
