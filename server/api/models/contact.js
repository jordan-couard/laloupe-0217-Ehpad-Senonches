import mongoose from 'mongoose';
import contact from './contact.js';
import User from './user.js';

const contactSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  name: {
    type: String,
    required: true
  },
  street: {
    type: String,
    required: true
  },
  zipcode: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  id: {
    type: String,
  }
});

let model = mongoose.model('Contact', contactSchema);

export default class Contact {

  findAllByUser(req, res) {
    console.log('find2');
    model.find({})
      .populate('author')
      .exec((err, contact) => {
        if (err || !contact) {
          res.sendStatus(403);
        } else {
          res.json(contact);
        }
      });
  }

  findById(req, res) {
    console.log('find4');
    console.log('req in back', req.params, req.body, req.query);
    model.findById(req.params.id, (err, contact) => {
      if (err || !contact) {
        res.sendStatus(403);
      } else {
        res.json(contact);
      }
    });
  }
  update(req, res) {
    console.log('route admin');
    console.log('rep update', req.body);
    model.findOneAndUpdate(req.params.id,
      req.body, {
        upsert: true
      },
      function(err, contact) {
        if (err) {
          res.status(500).send(err);
        } else {
          res.json({
            success: true,
            contact: contact
          });
        }
      });
  }
  updateByUser(req, res) {
    console.log('req update user', req.body);
    model.findOneAndUpdate(req.params.id,
      req.body, {
        upsert: true,
        new: true
      },
      function(err, contact) {
        if (err) {
          res.status(500).send(err);
        } else {
          res.json({
            success: true,
            contact: contact
          });
        }
      });
  }
}
