const routes = require("next-routes");

module.exports = routes()
  .add("add-car")
  .add("car", "/car/:id")
  .add("checkout")
  .add("complete-register")
  .add("profile_username", "/@:username", "profile")
  .add("profile_id", "/user/:id", "profile")
  .add("requests","/requests/:id")
  .add("request with id", "request", "/request/:id")
  .add("search-results")
  .add("set-car-timing");
