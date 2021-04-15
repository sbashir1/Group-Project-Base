export default (sequelize, DataTypes) => {
  const restaurant_award = sequelize.define(
    'restaurant_award',
    {
      restaurant_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      award_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      years_won: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      star_rating: {
        type: DataTypes.DOUBLE,
        allowNull: false
      },
      
    },
    { freezeTableName: true, timestamps: false }
  );
  return restaurant_award;
};