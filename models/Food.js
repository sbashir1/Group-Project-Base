export default (sequelize, DataTypes) => {
  const Chefs = sequelize.define(
    'Chefs',
    {
      Chef_ID: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      Chef_fn: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Chef_ln: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    { freezeTableName: true, timestamps: false }
  );
  return Chefs;
};