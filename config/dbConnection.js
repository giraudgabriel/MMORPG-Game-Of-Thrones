const mongo = require('mongodb')

const connMongoDB = () => {
    const db = new mongo.Db(
        'got',
        new mongo.Server(
            'localhost', // endereço do servidor bd
            27017, // porta de conexão
            {}
        ), {}
    )
    return db
}

module.exports = () => {
    return connMongoDB
}