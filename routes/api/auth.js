const express = require("express");

const ctrl = require("../../controllers/auth");

const { ctrlWrapper } = require("../../helpers");

// ValidateBody перевырка тыло запиту
const { validateBody, authenticate } = require("../../middlewares");
const upload = require("../../middlewares/upload");

const { schemas } = require("../../models/user");

const router = express.Router();

router.patch(
    "/",
    authenticate,
    validateBody(schemas.subscriptionSchema),
    ctrlWrapper(ctrl.updateSubscription)
);

router.get("/verify/:verificationToken", ctrlWrapper(ctrl.verify));

router.post("/verify", validateBody(schemas.emailSchema), ctrlWrapper(ctrl.resendEmail))

router.post(
    "/register",
    validateBody(schemas.registerSchema),
    ctrlWrapper(ctrl.register)
);

router.post(
    "/login",
    validateBody(schemas.loginSchema),
    ctrlWrapper(ctrl.login)
);

router.get("/current", authenticate, ctrlWrapper(ctrl.getCurrent));

router.get("/logout", authenticate, ctrlWrapper(ctrl.logout));

router.patch("/avatars", authenticate, upload.single("avatarURL"), ctrl.updateAvatar);

module.exports = router;
