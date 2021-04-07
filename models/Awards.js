export default (sequelize, DataTypes) => {
  const Awards = sequelize.define(
    'Awards',
    {
      award_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      award_name: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    { freezeTableName: true, timestamps: false }
  );
  return Awards;
};
