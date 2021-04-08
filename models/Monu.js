export default (sequelize, DataTypes) => {
  const Monus = sequelize.define(
    'Monuments',
    {
      Monument_ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      Monument_address: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Monument_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      Monument_zip: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    { freezeTableName: true, timestamps: false }
  );
  return Monus;
};