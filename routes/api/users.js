const express = require("express");

const UserController = require("../../controllers/usersController.js");
const validate = require("../../middlewares/validatitionMiddleware.js");
const authMiddleware = require("../../middlewares/authMiddleware.js");
const schema = require("../../models/user.js");
const upload = require("../../middlewares/uploadMiddleware.js");

const router = express.Router();

router.post("/register", validate(schema.userSchema), UserController.register);
router.get("/verify/:verificationToken", UserController.verifyEmail);
router.post(
  "/verify",
  validate(schema.verifyEmailSchema),
  UserController.resendVerifyEmail
);
router.post("/login", validate(schema.userSchema), UserController.login);
router.post("/logout", authMiddleware, UserController.logout);
router.get("/current", authMiddleware, UserController.getCurrent);
router.patch(
  "/avatars",
  authMiddleware,
  upload.single("avatar"),
  UserController.updateAvatar
);

module.exports = router;
