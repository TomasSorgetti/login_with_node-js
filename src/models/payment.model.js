module.exports = (sequelize, Sequelize) => {
  const Payment = sequelize.define("payments", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    amount: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    paymentType: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [["check", "debit", "transfer", "credit"]],
      },
    },
    addressee: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    paymentDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });

  return Payment;
};
