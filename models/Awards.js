export default (sequelize, DataTypes) => { 
  const awards = sequelize.define(
    'Awards',
    {
      Awards_ID: { //model attribute
        type: DataTypes.INTEGER, //data type
        allowNull: false,
        primaryKey: true
      },
      Award_name: { //model attribute
        type: DataTypes.STRING, //data type
        allowNull: true
      }
    },
    { freezeTableName: true, timestamps: false } //no autopluralization
  );
  return awards; //returns model
};

//primaryKey: true
//autoincrement: true