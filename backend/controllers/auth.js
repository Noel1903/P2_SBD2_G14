const { response } = require('express');

const login = async(req, res = response) => {
    const { username, password } = req.body;
}