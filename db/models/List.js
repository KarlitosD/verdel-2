import { DataTypes } from "sequelize";
import { sequelize } from "db";
import Section from "./Section";

const List = sequelize.define("lists", {
    id: {
        type: DataTypes.STRING(30),
        primaryKey: true,
        allowNull: false
    },
    name: DataTypes.STRING(),
})

List.hasMany(Section)
Section.belongsTo(List)
// await sequelize.sync()

export default List