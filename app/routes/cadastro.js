module.exports = function (application) {
	application.get('/cadastro', (req, res) => application.app.controllers.cadastro(application, req, res))
}