export default (sequelize, DataTypes) => {
  const restChef = sequelize.define(
    'restaurant_chef',
    {
      restaurant_id: {
        type: DataTypes.INTEGER,
      },
      chef_id: {
        type: DataTypes.INTEGER,
      }
    },
    { freezeTableName: true, timestamps: false }
  );
  return restChef;
};