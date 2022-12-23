const { BASE_URL } = process.env;

const createVerifyEmail = (email, verificationCode) => {
    const verifyEmail = {
        to: email,
        subject: "Verify you email",
        html: `<a target="_blank" href="${BASE_URL}/api/auth/verity/${verificationCode}">Click verity you email</a>`
    }
    return verifyEmail;
}

module.exports = createVerifyEmail;