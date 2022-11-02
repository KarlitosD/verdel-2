import { DataTypes } from "sequelize";
import { models } from "@next-auth/sequelize-adapter";
import { sequelize } from "db";
import Groups from "./Groups";

const User = sequelize.define("user", {
    ...models.User
})

User.belongsToMany(Groups, { through: "UserGroups" })

export default User