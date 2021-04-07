export default (database, DataTypes) => {
  const rest = database.define(
    'restaurant',
    {
      restaurant_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      food_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      restaurant_name: {
        type: DataTypes.STRING
      },
      restaurant_street: {
        type: DataTypes.STRING
      },
      restaurant_zip: {
        type: DataTypes.INTEGER
      },
      restaurant_town: {
        type: DataTypes.STRING
      },
      restaurant_phone: {
        type: DataTypes.STRING
      },
      restaurant_email: {
        type: DataTypes.STRING
      }
    },
    { freezeTableName: true, timestamps: false }
  );
  return rest;
};
