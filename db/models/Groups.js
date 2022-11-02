import { DataTypes } from "sequelize";
import { sequelize } from "db";
import Sections from "./Sections";

const Groups = sequelize.define("groups", {
    id: {
        type: DataTypes.STRING(30),
        primaryKey: true,
        allowNull: false
    },
    name: DataTypes.STRING(),
})

Groups.hasMany(Sections)
// await sequelize.sync()

export default Groups