const Booking = require('../models').Booking
const Bus = require('../models').Bus
const jwt = require('jsonwebtoken')
const { secret } = require('../config/configsecret')

const verifyToken = (req, res, next) => {
    let tokenHeader = req.headers['x-access-token'];

    if (tokenHeader.split(' ')[0] !== 'Bearer') {
        return res.status(500).send({
            auth: false,
            message: "Error",
            errors: "Incorrect token format"
        });
    }

    let token = tokenHeader.split(' ')[1];
    if (!token) {
        return res.status(403).send({
            auth: false,
            message: "Error",
            errors: "No token provided"
        });
    }

    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            return res.status(500).send({
                auth: false,
                message: "Error",
                errors: err
            });
        }

        req.userId = decoded.id;
        next();
    });
}

const busExist = (req, res, next) => {
    Bus.findOne({
        where: {
            id: req.body.busId
        }
    })
    .then(user => {
        if (!user) {
            res.status(400).send({
                auth: false,
                message: "Error",
                errors: "maaf bus tidak tersedia"
            });
            return;
        }
        next()
    });
}

const booking = (req, res) => {
  return Booking
    .create({
      id_user: req.userId,
      id_bus: req.body.busId,
      status_pembayaran: req.body.pembayaran,
    })
    .then((data) => {
      const booking = {
        status_response: 'Created',
        status: data,
        errors: null
      }
      return res.status(201).send(booking);
    })
    .catch((error) => {
      res.status(400).send({
        status_response: 'Bad Request',
        errors: error
      });
    });
}

module.exports = { verifyToken, busExist, booking}