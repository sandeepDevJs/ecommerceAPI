const { Router } = require("express");
const users = require("./routes/users");
const products = require("./routes/products");
const categories = require("./routes/categories");
const subcategories = require("./routes/subcategories");
const auth = require("./routes/auth");
const cart = require("./routes/cart");
const review = require("./routes/reviews");
const me = require("./routes/me");
const order = require("./routes/order");

module.exports = () => {
	const routes = Router();

	routes.use("/auth", auth);
	routes.use("/users", users);
	routes.use("/products", products);
	routes.use("/categories", categories);
	routes.use("/subcategories", subcategories);
	routes.use("/carts", cart);
	routes.use("/reviews", review);
	routes.use("/me", me);
	routes.use("/order", order);

	return routes;
};
