class UsuariosDAO {
    constructor(connection) {
        this.connection = connection()
    }
    async inserirUsuario(usuario) {
        await this.connection.open((err, mongoclient) => {
            mongoclient.collection("usuarios", (err, collection) => {
                collection.insert(usuario)
                mongoclient.close()
            })
        })
    }
    async autenticar(usuario, req, res) {
        await this.connection.open((err, mongoclient) => {
            mongoclient.collection("usuarios", (err, collection) => {
                collection.find(usuario).toArray((err, result) => {
                    req.session.autorizado = false
                    if (result[0] != undefined) {
                        req.session.autorizado = true
                        req.session.usuario = result[0].usuario
                        req.session.casa = result[0].casa
                    }
                    if (req.session.autorizado)
                        res.redirect("jogo")
                    else
                        res.render("index", {
                            validacao: [{
                                msg: 'Usuário ou senha incorretos!'
                            }],
                            dados: usuario
                        })
                })
                mongoclient.close()
            })
        })
    }
}

module.exports = () => {
    return UsuariosDAO
}