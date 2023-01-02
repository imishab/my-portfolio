var db = require("../config/connection");
var collections = require("../config/collections");
var bcrypt = require("bcrypt");
const objectId = require("mongodb").ObjectID;

module.exports = {
  ///-------------------HEADER-----------------////
  addheader: (header, callback) => {
    console.log(header);
    db.get()
      .collection(collections.HEADER_COLLECTION)
      .insertOne(header)
      .then((data) => {
        console.log(data);
        callback(data.ops[0]._id);
      });
  },

  getAllheader: () => {
    return new Promise(async (resolve, reject) => {
      let header = await db
        .get()
        .collection(collections.HEADER_COLLECTION)
        .find()
        .toArray();
      resolve(header);
    });
  },

  ///-------------------ABOUT-----------------////
  addabout: (about, callback) => {
    console.log(about);
    db.get()
      .collection(collections.ABOUT_COLLECTION)
      .insertOne(about)
      .then((data) => {
        console.log(data);
        callback(data.ops[0]._id);
      });
  },

  getAllabout: () => {
    return new Promise(async (resolve, reject) => {
      let about = await db
        .get()
        .collection(collections.ABOUT_COLLECTION)
        .find()
        .toArray();
      resolve(about);
    });
  },

  doSignup: (adminData) => {
    return new Promise(async (resolve, reject) => {
      if (adminData.Code == "admin123") {
        adminData.Password = await bcrypt.hash(adminData.Password, 10);
        db.get()
          .collection(collections.ADMIN_COLLECTION)
          .insertOne(adminData)
          .then((data) => {
            resolve(data.ops[0]);
          });
      } else {
        resolve({ status: false });
      }
    });
  },

  doSignin: (adminData) => {
    return new Promise(async (resolve, reject) => {
      let response = {};
      let admin = await db
        .get()
        .collection(collections.ADMIN_COLLECTION)
        .findOne({ Email: adminData.Email });
      if (admin) {
        bcrypt.compare(adminData.Password, admin.Password).then((status) => {
          if (status) {
            console.log("Login Success");
            response.admin = admin;
            response.status = true;
            resolve(response);
          } else {
            console.log("Login Failed");
            resolve({ status: false });
          }
        });
      } else {
        console.log("Login Failed");
        resolve({ status: false });
      }
    });
  },

  ///--------------------HEADER----------------/////

  getheaderDetails: (headerId) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collections.HEADER_COLLECTION)
        .findOne({ _id: objectId(headerId) })
        .then((response) => {
          resolve(response);
        });
    });
  },

  deleteheader: (headerId) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collections.HEADER_COLLECTION)
        .removeOne({ _id: objectId(headerId) })
        .then((response) => {
          console.log(response);
          resolve(response);
        });
    });
  },

  updateheader: (headerId, headerDetails) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collections.HEADER_COLLECTION)
        .updateOne(
          { _id: objectId(headerId) },
          {
            $set: {
              Name: headerDetails.Name,
              Sub: headerDetails.Sub,
              Link: headerDetails.Link,
              Color: headerDetails.Color,
              Text: headerDetails.Text,
            },
          }
        )
        .then((response) => {
          resolve();
        });
    });
  },
  ////------------------------------------------------//////

  ///--------------------ABOUT----------------/////

  getaboutDetails: (aboutId) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collections.ABOUT_COLLECTION)
        .findOne({ _id: objectId(aboutId) })
        .then((response) => {
          resolve(response);
        });
    });
  },

  deleteabout: (aboutId) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collections.ABOUT_COLLECTION)
        .removeOne({ _id: objectId(aboutId) })
        .then((response) => {
          console.log(response);
          resolve(response);
        });
    });
  },

  updateabout: (aboutId, aboutDetails) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collections.ABOUT_COLLECTION)
        .updateOne(
          { _id: objectId(aboutId) },
          {
            $set: {
              Name: aboutDetails.Name,
              Des: aboutDetails.Des,
            },
          }
        )
        .then((response) => {
          resolve();
        });
    });
  },
  ////------------------------------------------------//////

  deleteAllProducts: () => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collections.PRODUCTS_COLLECTION)
        .remove({})
        .then(() => {
          resolve();
        });
    });
  },

  getAllUsers: () => {
    return new Promise(async (resolve, reject) => {
      let users = await db
        .get()
        .collection(collections.USERS_COLLECTION)
        .find()
        .toArray();
      resolve(users);
    });
  },

  removeUser: (userId) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collections.USERS_COLLECTION)
        .removeOne({ _id: objectId(userId) })
        .then(() => {
          resolve();
        });
    });
  },

  removeAllUsers: () => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collections.USERS_COLLECTION)
        .remove({})
        .then(() => {
          resolve();
        });
    });
  },

  getAllOrders: () => {
    return new Promise(async (resolve, reject) => {
      let orders = await db
        .get()
        .collection(collections.ORDER_COLLECTION)
        .find()
        .toArray();
      resolve(orders);
    });
  },

  changeStatus: (status, orderId) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collections.ORDER_COLLECTION)
        .updateOne(
          { _id: objectId(orderId) },
          {
            $set: {
              "orderObject.status": status,
            },
          }
        )
        .then(() => {
          resolve();
        });
    });
  },

  cancelOrder: (orderId) => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collections.ORDER_COLLECTION)
        .removeOne({ _id: objectId(orderId) })
        .then(() => {
          resolve();
        });
    });
  },

  cancelAllOrders: () => {
    return new Promise((resolve, reject) => {
      db.get()
        .collection(collections.ORDER_COLLECTION)
        .remove({})
        .then(() => {
          resolve();
        });
    });
  },

  searchProduct: (details) => {
    console.log(details);
    return new Promise(async (resolve, reject) => {
      db.get()
        .collection(collections.PRODUCTS_COLLECTION)
        .createIndex({ Name: "text" })
        .then(async () => {
          let result = await db
            .get()
            .collection(collections.PRODUCTS_COLLECTION)
            .find({
              $text: {
                $search: details.search,
              },
            })
            .toArray();
          resolve(result);
        });
    });
  },
};
