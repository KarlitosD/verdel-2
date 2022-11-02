import { DataTypes } from "sequelize";
import { sequelize } from "db";

const Products = sequelize.define("products", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: DataTypes.STRING(100),
    description: DataTypes.STRING(200)
})

// await sequelize.sync()

export default Products