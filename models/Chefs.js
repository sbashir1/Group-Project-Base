export default (sequelize, DataTypes) => {
  const Chefs = sequelize.define(
    'Chefs',
    {
      Chef_ID: {
        type: DataTypes.INTEGER,
        primaryKey: true
      },
      Chef_fn: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Chef_ln: {
        type: DataTypes.STRING,
        allowNull: true,
      }
    },
    { freezeTableName: true, timestamps: false }
  );
  return Chefs;
};