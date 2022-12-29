const { User } = require("../../models/user")

const { HttpError, sendEmail, createVerifyEmail } = require('../../helpers')

const resendEmail = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        throw HttpError(404)
    }
    if (user.verify) {
        throw HttpError(400, "Verification has already been passed")
    }


    const verifyEmail = createVerifyEmail(email, user.verificationToken)

    await sendEmail(verifyEmail)

    res.json({
        message: "Verify email sent"
    })

}

module.exports = resendEmail