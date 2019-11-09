class JogoDAO {
    constructor(connection) {
        this.connection = connection()
    }

    async gerarParametros(usuario) {
        await this.connection.open((err, mongoclient) => {
            mongoclient.collection("jogo", (err, collection) => {
                collection.insert({
                    usuario: usuario,
                    moeda: 15,
                    suditos: 10,
                    temor: Math.floor(Math.random() * 1000),
                    sabedoria: Math.floor(Math.random() * 1000),
                    comercio: Math.floor(Math.random() * 1000),
                    magia: Math.floor(Math.random() * 1000)
                })
                mongoclient.close()
            })
        })
    }

    iniciaJogo(usuario) {
        return new Promise((resolve, reject) => {
            this.connection.open((err, mongoclient) => {
                mongoclient.collection("jogo", (err, collection) => {
                    collection.find({
                        usuario: usuario
                    }).toArray((err, result) => {
                        err ? reject(err) : resolve(result[0])
                        mongoclient.close()
                    })
                })
            })
        })
    }

}

module.exports = () => JogoDAO