const routes = require("next-routes");

module.exports = routes()
  .add("add-car")
  .add("car", "/car/:id/:carname")
  .add("checkout")
  .add("complete-register")
  .add("profile_username", "/@:username", "profile")
  .add("profile_id", "/user/:id", "profile")
  .add("requests")
  .add("request", "/request/:id")
  .add("search-results")
  .add("set-car-timing")
  .add("about-us")
  .add("our-policies")
  .add("insurance-policies")
  .add("guide-picture")
  .add("guide-renter")
  .add("guide-for-rent")
  .add("otoli")
  .add("rent-dynamic", "/rent/:name")
  .add("rent", "/rent")
  .add("site-map", "/site-map")
  .add("join-us", "/join-us")
  .add("join-us1", "/join-us1");
