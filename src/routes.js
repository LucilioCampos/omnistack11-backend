const routes = require('express').Router();
const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController')


routes.post('/sessions', SessionController.create)

routes.post("/ongs", OngController.create)
routes.get('/ongs', OngController.index)

routes.post('/incidents', IncidentController.create);
routes.get('/incidents', IncidentController.index);
routes.delete('/incidents/:id', IncidentController.destroy);

routes.get('/profile', ProfileController.index)

module.exports = routes