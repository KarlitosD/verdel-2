// import { DataTypes } from "sequelize";
import { models } from "@next-auth/sequelize-adapter";
import { sequelize } from "db";
import List from "./List";

const User = sequelize.define("user", {
    ...models.User
})

List.belongsTo(User, { as: "creator" })

User.belongsToMany(List, { through: "user_lists" })
List.belongsToMany(User, { through: "user_lists" })

export default User