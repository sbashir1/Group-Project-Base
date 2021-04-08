export default (sequelize, DataTypes) => {
  const Food = sequelize.define(
    'Food',
    {
      food_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      food_type: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    { freezeTableName: true, timestamps: false }
  );
  return Food;
};