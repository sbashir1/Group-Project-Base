export default (sequelize, DataTypes) => {
  const Rest_Award = sequelize.define(
    'Rest_Award',
    {
      Restaurant_ID: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      Award_ID: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      Years_won: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      Star_rating: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      
    },
    { freezeTableName: true, timestamps: false }
  );
  return Rest_Award;
};