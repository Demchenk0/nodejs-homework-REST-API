const { Contact } = require("../../models/contacts")

const { HttpError } = require("../../helpers")

const removeById = async (req, res, next) => {
    const { id } = req.params;
    const result = await Contact.findByIdAndDelete(id)
    if (!result) {
        throw HttpError(404);
    }
    res.json({
        message: "Contact deleted"
    })
}

module.exports = removeById;