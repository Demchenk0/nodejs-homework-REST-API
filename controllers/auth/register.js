const bcrypt = require('bcryptjs')

const { User } = require('../../models/user')

const { HttpError } = require('../../helpers')

const register = async (req, res) => {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });
    console.log("Mu TYT");
    // if (user) {
    //     return res.status(409).json({
    //         message: "Email in use"
    //     })
    // }
    if (user) {
        throw HttpError(409, "Email in use")
    }

    const handPassword = await bcrypt.hash(password, 10)

    const newUser = await User.create({ name, email, password: handPassword });
    res.status(201).json({
        name: newUser.name,
        email: newUser.email,
    })
}

module.exports = register;