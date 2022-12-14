const { User } = require("../../models/user");

const path = require("path");

const fs = require("fs/promises");

const Jimp = require('jimp');


const updateAvatar = async (req, res, next) => {
    const { _id } = req.user;
    const avatarDir = path.join(__dirname, "../../", "public", "avatars");

    try {
        const { path: tempDir, originalname } = req.file;
        const [extention] = originalname.split(".").reverse();
        const newAvatar = `${_id}.${extention}`;
        const uploadDir = path.join(avatarDir, newAvatar);

        const imgResize = await Jimp.read(tempDir)
        await imgResize.resize(250, 250).writeAsync(uploadDir)
        await fs.unlink(req.file.path);
        const avatarURL = path.join("avatars", newAvatar);

        const result = await User.findByIdAndUpdate(req.user._id, { avatarURL }, { new: true });
        res.json(
            { avatarURL: result.avatarURL }
        )
    } catch (error) {
        await fs.unlink(req.file.path);
        next(error);
    }
};

module.exports = updateAvatar;
