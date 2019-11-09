module.exports.index = (application, req, res) => {
    res.render('index', {
        validacao: [],
        dados: {}
    })
}

module.exports.autenticar = (application, req, res) => {

    let dados = req.body

    req.assert('usuario', 'Usuário não pode estar vazio').notEmpty()
    req.assert('senha', 'Senha não pode estar vazio').notEmpty()

    let erros = req.validationErrors()

    if (erros) {
        res.render('index', {
            validacao: erros,
            dados: dados
        })
        return
    }
    const UsuariosDAO = new application.app.models.UsuariosDAO(application.config.dbConnection)
    
    UsuariosDAO.autenticar(dados,req, res)
}