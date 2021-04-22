export default (sequelize, DataTypes) => {
  const restMonus = sequelize.define(
    'restaurantMonuments',
    {
      restaurant_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      monument_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      distance_apart: {
        type: DataTypes.STRING,
        allowNull: false
      },
    },
    { freezeTableName: true, timestamps: false }
  );
  return restMonus;
};