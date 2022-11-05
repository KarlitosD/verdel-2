import { DataTypes } from "sequelize";
import { sequelize } from "db";
import Product from "./Product";

const Section = sequelize.define("sections", {
    id: {
        type: DataTypes.STRING(30),
        primaryKey: true,
        allowNull: false
    },
    name: DataTypes.STRING(50),
    color: DataTypes.STRING(20),
})

Section.hasMany(Product)
Product.belongsTo(Section)
// await sequelize.sync()

export default Section