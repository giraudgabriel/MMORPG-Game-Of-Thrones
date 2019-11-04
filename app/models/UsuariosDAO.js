class UsuariosDAO {
    constructor(connection) {
        this.connection = connection()
    }
    inserirUsuario(usuario) {
        this.connection.open((err, mongoclient) => {
            mongoclient.collection("usuarios", (err, collection) => {
                collection.insert(usuario)
                mongoclient.close()
            })
        })
    }
}

module.exports = () => {
    return UsuariosDAO
}