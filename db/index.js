import { Sequelize } from "sequelize"


export const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./db/storage.sqlite",
    logging: false,
})