export default (sequelize, DataTypes) => {
  const restChef = sequelize.define(
    'restaurant_chef',
    {
      restaurant_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        primaryKey: true
      },
      chef_id: {
        type: DataTypes.INTEGER
      }
    },
    { freezeTableName: true, timestamps: false }
  );
  return restChef;
};
