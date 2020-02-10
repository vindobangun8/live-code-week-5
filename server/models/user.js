'use strict';
module.exports = (sequelize, DataTypes) => {
  const {Model} = sequelize.Sequelize 
  class User extends Model{}
  User.init({
    name: {type:DataTypes.STRING,
      allowNull : false,
      validate:{
        notNull:{
          msg:"input name"
        },
        notEmpty:{
          msg:"input name"
        }
      }
    },
    email: {type:DataTypes.STRING,
      allowNull : false,
      validate:{
        notNull:{
          msg:"input email"
        },
        notEmpty:{
          msg:"input emai."
        }
      }
    },
    password: {type:DataTypes.STRING,
      allowNull : false,
      validate:{
        notNull:{
          msg:"input email"
        },
        notEmpty:{
          msg:"input email"
        }
      }
    }
  },{sequelize})
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};