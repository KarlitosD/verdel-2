import { DataTypes } from "sequelize";
import { sequelize } from "db";

const Product = sequelize.define("products", {
    id: {
        type: DataTypes.STRING(30),
        primaryKey: true,
        allowNull: false
    },
    name: DataTypes.STRING(300),
    description: DataTypes.STRING(200),
    bought: DataTypes.BOOLEAN
})

// await sequelize.sync()

export default Product