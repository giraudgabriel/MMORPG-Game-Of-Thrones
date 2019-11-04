module.exports.cadastro = (application, req, res) => {
    res.render('cadastro', {
        validacao: [],
        dados: {}
    })
}

module.exports.cadastrar = (application, req, res) => {

    let dados = req.body

    req.assert('nome', 'Nome não pode estar vazio').notEmpty()
    req.assert('usuario', 'Usuário não pode estar vazio').notEmpty()
    req.assert('senha', 'Senha não pode estar vazio').notEmpty()
    req.assert('casa', 'Casa não pode estar vazio').notEmpty()

    let erros = req.validationErrors()

    if (erros) {
        res.render('cadastro', {
            validacao: erros,
            dados : dados
        })
        return
    }
    res.send('Podemos cadastrar')
}