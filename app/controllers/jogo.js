module.exports.jogo = async (application, req, res) => {
    if (req.session.autorizado !== true) {
        res.render("index", {
            dados: {},
            validacao: [{
                msg: 'É necessário estar logado!'
            }],
            jogo:{}
        })
        return
    }

    const connection = application.config.dbConnection
    const JogoDAO = new application.app.models.JogoDAO(connection)

    var jogo = await JogoDAO.iniciaJogo(req.session.usuario)
    
    res.render("jogo", {
        img_casa: req.session.casa,
        jogo: jogo
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


module.exports.suditos = (application, req,res) =>{
    res.render("aldeoes")
}

module.exports.pergaminhos = (application, req,res) =>{
    res.render("pergaminhos")
}