const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('videogame', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion:{
      type: DataTypes.STRING,
      allowNull:false
    },
    platforms:{
      type: DataTypes.STRING,
      allowNull:false
    },
    background_image: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue:"",
    },
    released:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    rating:{
      type: DataTypes.FLOAT,
      allowNull:false
    },
    iscreated: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  }, {
    timestamps: false, 
  });
};
