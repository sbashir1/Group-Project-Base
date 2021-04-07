export default (sequelize, DataTypes) => {
  const restChef = sequelize.define(
    'restaurant_chef',
    {
      chef_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      restaurant_id: {
        type: DataTypes.INTEGER,
        allowNull: true
      }
    },
    { freezeTableName: true, timestamps: false }
  );
  return restChef;
};