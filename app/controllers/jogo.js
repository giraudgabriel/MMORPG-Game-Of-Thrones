module.exports.jogo = async (application, req, res) => {
    if (req.session.autorizado !== true) {
        res.render("index", {
            dados: {},
            validacao: [{
                msg: 'É necessário estar logado!'
            }],
            jogo: {}
        })
        return
    }

    const JogoDAO = new application.app.models.JogoDAO(application.config.dbConnection)

    res.render("jogo", {
        img_casa: req.session.casa,
        jogo: await JogoDAO.iniciaJogo(req.session.usuario),
        comando_invalido: req.query.comando_invalido == 'S' ? 'S' : 'N'
    })

}

module.exports.sair = (application, req, res) => {
    req.session.destroy((err) => {
        res.render("index", {
            dados: {},
            validacao: []
        })
    })
}


module.exports.suditos = (application, req, res) => {
    if (req.session.autorizado !== true) {
        res.render("index", {
            dados: {},
            validacao: [{
                msg: 'É necessário estar logado!'
            }],
            jogo: {}
        })
        return
    }
    res.render("aldeoes")
}

module.exports.pergaminhos = (application, req, res) => {
    if (req.session.autorizado !== true) {
        res.render("index", {
            dados: {},
            validacao: [{
                msg: 'É necessário estar logado!'
            }],
            jogo: {}
        })
        return
    }
    res.render("pergaminhos")
}

module.exports.ordernar_acao_sudito = (application, req, res) => {
    if (req.session.autorizado !== true) {
        res.render("index", {
            dados: {},
            validacao: [{
                msg: 'É necessário estar logado!'
            }],
            jogo: {}
        })
        return
    }
    
    let dados = req.body

    req.assert('acao', 'Ação deve ser informada').notEmpty()
    req.assert('quantidade', 'Quantidade deve ser informada').notEmpty()


    let erros = req.validationErrors()

    if (erros) {
        res.redirect('jogo?comando_invalido=S')
        return
    }

    console.log(dados)

    res.send('Tudo ok')
}