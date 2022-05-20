exports.bufferTojson = data => JSON.parse(Buffer.from(data).toString())
exports.jsonTobuffer = data => JSON.stringify(Buffer.from(data).toString())
// exports.createAction = ({ type, data=null}) => JSON.stringify({ type, data }) 
exports.blocksActions = (type,data) => ({ type, data })

exports.createAction = (type,data) =>JSON.stringify({ type, data })
exports.stringToJson = (data) => {
    try {
        return JSON.parse(Buffer.from(data).toString())
    } catch(e) {
        return null
    }
}