var express = require("express");
var adminHelper = require("../helper/adminHelper");
var fs = require("fs");
const userHelper = require("../helper/userHelper");
var router = express.Router();

const verifySignedIn = (req, res, next) => {
  if (req.session.signedInAdmin) {
    next();
  } else {
    res.redirect("/admin/signin");
  }
};

/* GET admins listing. */
router.get("/", verifySignedIn, function (req, res, next) {
  let administator = req.session.admin;
  adminHelper.getAllheader().then((header) => {
    res.render("admin/home", {
      layout: "adminlayout",
      admin: true,
      header,
      administator,
    });
  });
});

router.get("/all-products", verifySignedIn, function (req, res) {
  let administator = req.session.admin;
  adminHelper.getAllProducts().then((products) => {
    res.render("admin/all-products", { admin: true, products, administator });
  });
});

///---------------HEADER--------------------------////
router.get("/all-header", verifySignedIn, function (req, res) {
  let administator = req.session.admin;
  adminHelper.getAllheader().then((header) => {
    res.render("admin/header/all-header", {
      layout: "innerlayout",
      admin: true,
      header,
      administator,
    });
  });
});

///---------------ABOUT--------------------------////
router.get("/all-about", verifySignedIn, function (req, res) {
  let administator = req.session.admin;
  adminHelper.getAllabout().then((about) => {
    res.render("admin/about/all-about", {
      layout: "innerlayout",
      admin: true,
      about,
      administator,
    });
  });
});

router.get("/signup", function (req, res) {
  if (req.session.signedInAdmin) {
    res.redirect("/admin");
  } else {
    res.render("admin/signup", {
      admin: true,
      signUpErr: req.session.signUpErr,
    });
  }
});

router.post("/signup", function (req, res) {
  adminHelper.doSignup(req.body).then((response) => {
    console.log(response);
    if (response.status == false) {
      req.session.signUpErr = "Invalid Admin Code";
      res.redirect("/admin/signup");
    } else {
      req.session.signedInAdmin = true;
      req.session.admin = response;
      res.redirect("/admin");
    }
  });
});

router.get("/signin", function (req, res) {
  if (req.session.signedInAdmin) {
    res.redirect("/admin");
  } else {
    res.render("admin/signin", {
      admin: true,
      signInErr: req.session.signInErr,
    });
    req.session.signInErr = null;
  }
});

router.post("/signin", function (req, res) {
  adminHelper.doSignin(req.body).then((response) => {
    if (response.status) {
      req.session.signedInAdmin = true;
      req.session.admin = response.admin;
      res.redirect("/admin");
    } else {
      req.session.signInErr = "Invalid Email/Password";
      res.redirect("/admin/signin");
    }
  });
});

router.get("/signout", function (req, res) {
  req.session.signedInAdmin = false;
  req.session.admin = null;
  res.redirect("/admin");
});

///---------------------------------------------------------------/////

///_-----------HEADER--------------------------//////

router.get("/add-header", verifySignedIn, function (req, res) {
  let administator = req.session.admin;
  res.render("admin/header/add-header", {
    layout: "innerlayout",
    admin: true,
    administator,
  });
});

router.post("/add-header", function (req, res) {
  adminHelper.addheader(req.body, (id) => {
    let image = req.files.Image;
    image.mv("./public/images/header-images/" + id + ".png", (err, done) => {
      if (!err) {
        res.redirect("/admin/add-header");
      } else {
        console.log(err);
      }
    });
  });
});

router.get("/edit-header/:id", verifySignedIn, async function (req, res) {
  let administator = req.session.admin;
  let headerId = req.params.id;
  let header = await adminHelper.getheaderDetails(headerId);
  console.log(header);
  res.render("admin/header/edit-header", {
    layout: "adminlayout",
    admin: true,
    header,
    administator,
  });
});

router.post("/edit-header/:id", verifySignedIn, function (req, res) {
  let headerId = req.params.id;
  adminHelper.updateheader(headerId, req.body).then(() => {
    if (req.files) {
      let image = req.files.Image;
      if (image) {
        image.mv("./public/images/header-images/" + headerId + ".png");
      }
    }
    res.redirect("/admin/all-header");
  });
});

router.get("/delete-header/:id", verifySignedIn, function (req, res) {
  let headerId = req.params.id;
  adminHelper.deleteheader(headerId).then((response) => {
    fs.unlinkSync("./public/images/header-images/" + headerId + ".png");
    res.redirect("/admin/all-header");
  });
});

///_-----------ABOUT--------------------------//////
router.get("/add-about", verifySignedIn, function (req, res) {
  let administator = req.session.admin;
  res.render("admin/about/add-about", {
    layout: "innerlayout",
    admin: true,
    administator,
  });
});

router.post("/add-about", function (req, res) {
  adminHelper.addabout(req.body, (id) => {
    let image = req.files.Image;
    image.mv("./public/images/about-images/" + id + ".png", (err, done) => {
      if (!err) {
        res.redirect("/admin/add-about");
      } else {
        console.log(err);
      }
    });
  });
});

router.get("/edit-about/:id", verifySignedIn, async function (req, res) {
  let administator = req.session.admin;
  let aboutId = req.params.id;
  let about = await adminHelper.getaboutDetails(aboutId);
  console.log(about);
  res.render("admin/about/edit-about", {
    layout: "adminlayout",
    admin: true,
    about,
    administator,
  });
});

router.post("/edit-about/:id", verifySignedIn, function (req, res) {
  let aboutId = req.params.id;
  adminHelper.updateabout(aboutId, req.body).then(() => {
    if (req.files) {
      let image = req.files.Image;
      if (image) {
        image.mv("./public/images/about-images/" + aboutId + ".png");
      }
    }
    res.redirect("/admin/all-about");
  });
});

router.get("/delete-about/:id", verifySignedIn, function (req, res) {
  let aboutId = req.params.id;
  adminHelper.deleteabout(aboutId).then((response) => {
    fs.unlinkSync("./public/images/about-images/" + aboutId + ".png");
    res.redirect("/admin/all-about");
  });
});
////------------------------------------------------///////

router.get("/add-product", verifySignedIn, function (req, res) {
  let administator = req.session.admin;
  res.render("admin/add-product", { admin: true, administator });
});

router.post("/add-product", function (req, res) {
  adminHelper.addProduct(req.body, (id) => {
    let image = req.files.Image;
    image.mv("./public/images/product-images/" + id + ".png", (err, done) => {
      if (!err) {
        res.redirect("/admin/add-product");
      } else {
        console.log(err);
      }
    });
  });
});

router.get("/edit-product/:id", verifySignedIn, async function (req, res) {
  let administator = req.session.admin;
  let productId = req.params.id;
  let product = await adminHelper.getProductDetails(productId);
  console.log(product);
  res.render("admin/edit-product", { admin: true, product, administator });
});

router.post("/edit-product/:id", verifySignedIn, function (req, res) {
  let productId = req.params.id;
  adminHelper.updateProduct(productId, req.body).then(() => {
    if (req.files) {
      let image = req.files.Image;
      if (image) {
        image.mv("./public/images/product-images/" + productId + ".png");
      }
    }
    res.redirect("/admin/all-products");
  });
});

router.get("/delete-product/:id", verifySignedIn, function (req, res) {
  let productId = req.params.id;
  adminHelper.deleteProduct(productId).then((response) => {
    fs.unlinkSync("./public/images/product-images/" + productId + ".png");
    res.redirect("/admin/all-products");
  });
});

router.get("/delete-all-products", verifySignedIn, function (req, res) {
  adminHelper.deleteAllProducts().then(() => {
    res.redirect("/admin/all-products");
  });
});

router.get("/all-users", verifySignedIn, function (req, res) {
  let administator = req.session.admin;
  adminHelper.getAllUsers().then((users) => {
    res.render("admin/all-users", { admin: true, administator, users });
  });
});

router.get("/remove-user/:id", verifySignedIn, function (req, res) {
  let userId = req.params.id;
  adminHelper.removeUser(userId).then(() => {
    res.redirect("/admin/all-users");
  });
});

router.get("/remove-all-users", verifySignedIn, function (req, res) {
  adminHelper.removeAllUsers().then(() => {
    res.redirect("/admin/all-users");
  });
});

router.get("/all-orders", verifySignedIn, async function (req, res) {
  let administator = req.session.admin;
  let orders = await adminHelper.getAllOrders();
  res.render("admin/all-orders", {
    admin: true,
    administator,
    orders,
  });
});

router.get(
  "/view-ordered-products/:id",
  verifySignedIn,
  async function (req, res) {
    let administator = req.session.admin;
    let orderId = req.params.id;
    let products = await userHelper.getOrderProducts(orderId);
    res.render("admin/order-products", {
      admin: true,
      administator,
      products,
    });
  }
);

router.get("/change-status/", verifySignedIn, function (req, res) {
  let status = req.query.status;
  let orderId = req.query.orderId;
  adminHelper.changeStatus(status, orderId).then(() => {
    res.redirect("/admin/all-orders");
  });
});

router.get("/cancel-order/:id", verifySignedIn, function (req, res) {
  let orderId = req.params.id;
  adminHelper.cancelOrder(orderId).then(() => {
    res.redirect("/admin/all-orders");
  });
});

router.get("/cancel-all-orders", verifySignedIn, function (req, res) {
  adminHelper.cancelAllOrders().then(() => {
    res.redirect("/admin/all-orders");
  });
});

router.post("/search", verifySignedIn, function (req, res) {
  let administator = req.session.admin;
  adminHelper.searchProduct(req.body).then((response) => {
    res.render("admin/search-result", { admin: true, administator, response });
  });
});

module.exports = router;
