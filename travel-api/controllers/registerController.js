const User = require('../models').User
const bcrypt = require('bcryptjs')

const checkDuplicateEmail = (req, res, next) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    })
    .then(user => {
        if (user) {
            res.status(400).send({
                auth: false,
                message: "Error",
                errors: "Email is already taken!"
            });
            return;
        }
        next()
    });
}
const register = (req, res) => {
    return User.create({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    })
    .then(data => {
        res.send({
            status: 'succes',
            message: 'berhasil signup',
            data: data
        })
    })
    .catch(err => {
        res.status(500).send({
            auth: false,
            nama: req.body.name,
            message: "Error",
            errors: err
        });
    })
}

module.exports = { checkDuplicateEmail, register}

