const { Router } = require("express");
const { celebrate } = require("celebrate");
const {
	signUpValidator,
	updateValidator,
} = require("../middlewares/validators");

const router = Router();
const {
	getUsers,
	getUserById,
	createUser,
	deleteUser,
	updateUser,
} = require("../../services/users");
const { auth, authAdmin } = require("../middlewares/auth");

router
	.route("/")
	.get(auth, authAdmin, getUsers)
	.post(celebrate(signUpValidator), createUser);

router
	.route("/:id")
	.get(auth, authAdmin, getUserById)
	.put(auth, authAdmin, celebrate(updateValidator), updateUser)
	.delete(auth, authAdmin, deleteUser);

module.exports = router;
