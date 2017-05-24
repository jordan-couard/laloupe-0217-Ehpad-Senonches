import express from 'express';
import Evenement from '../models/evenement.js';
import Auth from '../middlewares/authorization.js';

let router = express.Router();

module.exports = (app) => {

  app.get('/token_status', Auth.hasAuthorization, (req, res, next) => {
      res.sendStatus(200);
  });

    var evenement = new Evenement();

    router.get('/:id', Auth.hasAuthorization, evenement.findById);

    router.get('/', Auth.hasAuthorization, evenement.findAll);

    router.post('/admin/', Auth.isAdministrator, evenement.create);
    router.post('/', Auth.hasAuthorization, evenement.createByUser);

    router.put('/admin/:id', Auth.isAdministrator, evenement.update);
    router.put('/:id', Auth.hasAuthorization, evenement.updateByUser);

    router.delete('/:id', Auth.isAdministrator, evenement.delete);

    app.use('/evenements', router);
};
