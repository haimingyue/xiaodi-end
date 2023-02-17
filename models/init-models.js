var DataTypes = require("sequelize").DataTypes;
var _Account = require("./account");
var _Club = require("./club");

function initModels(sequelize) {
  var Account = _Account(sequelize, DataTypes);
  var Club = _Club(sequelize, DataTypes);


  return {
    Account,
    Club,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
