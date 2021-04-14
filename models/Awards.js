const { DataTypes } = require("sequelize");
export default (sequelize, DataTypes) => { //do i need "class Awards" here?
  const Awards = sequelize.define(
    'Awards',
    {
      Awards_ID: { //model attribute
        type: DataTypes.INTEGER, //data type
        allowNull: false
      },
      Award_name: { //model attribute
        type: DataTypes.STRING, //data type
        allowNull: false
      }
    },
    { freezeTableName: true, timestamps: false } //no autopluralization
  );
  return Awards; //returns model
};

//primaryKey: true
//autoincrement: true