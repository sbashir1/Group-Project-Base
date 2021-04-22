export default (sequelize, DataTypes) => { //do i need "class Awards" here?
  const award = sequelize.define(
    'awards',
    {
      Awards_ID: { //model attribute
        type: DataxTypes.INTEGER, //data type
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
  return award; //returns model
};

//primaryKey: true
//autoincrement: true