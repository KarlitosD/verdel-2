import { DataTypes } from "sequelize";
import { sequelize } from "db";
import Products from "./Products";

const Sections = sequelize.define("sections", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: DataTypes.STRING(50),
    color: DataTypes.STRING(20),
})

Sections.hasMany(Products)

// await sequelize.sync()

export default Sections