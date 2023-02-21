var DataTypes = require("sequelize").DataTypes;
var _Account = require("./account");
var _Class = require("./class");
var _Club = require("./club");
var _Comment = require("./comment");
var _Desk = require("./desk");
var _ProductOrder = require("./product-order");
var _Student = require("./student");

function initModels(sequelize) {
  var Account = _Account(sequelize, DataTypes);
  var Class = _Class(sequelize, DataTypes);
  var Club = _Club(sequelize, DataTypes);
  var Comment = _Comment(sequelize, DataTypes);
  var Desk = _Desk(sequelize, DataTypes);
  var ProductOrder = _ProductOrder(sequelize, DataTypes);
  var Student = _Student(sequelize, DataTypes);


  return {
    Account,
    Class,
    Club,
    Comment,
    Desk,
    ProductOrder,
    Student,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
