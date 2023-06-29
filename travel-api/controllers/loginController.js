const User = require('../models').User
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const { secret } = require('../config/configsecret');

const login = (req, res) => {
  return User
    .findOne({
      where: {
        email: req.body.email
      }
    }).then(user => {
      if (!user) {
        return res.status(404).send({
          auth: false,
          email: req.body.email,
          message: "Error",
          errors: "email Not Found."
        });
      }

      let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
      if (!passwordIsValid) {
        return res.status(401).send({
          auth: false,
          id: req.body.email,
          message: "Error",
          errors: "Invalid Password!"
        });
      }

      const jwtToken = jwt.sign({id: user.id}, secret, {expiresIn: 86400});

      let token = `Bearer ${jwtToken}`;

      res.status(200).send({
        auth: true,
        id: req.body.email,
        message: "success",
        token: token,
        errors: null
      });
    }).catch(err => {
      res.status(500).send({
        auth: false,
        id: req.body.email,
        message: "Error",
        errors: err.message
      });
    });
}

module.exports = login