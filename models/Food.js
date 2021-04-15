export default (sequelize, DataTypes) => {
  const Food = sequelize.define(
    'food',
    {
      food_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        unique: true
      },
      food_type: {
        type: DataTypes.STRING,
        allowNull: true
      }
    },
    { freezeTableName: true, timestamps: false }
  );
  return Food;
};

