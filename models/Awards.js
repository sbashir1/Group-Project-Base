export default (sequelize, DataTypes) => { //do i need "class Awards" here?
  const awards = sequelize.define(
    'awards',
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