import { sequelize } from "db";

import Products from "./Products";
import Sections from "./Sections";
import Groups from "./Groups";
import User from "./Users";

sequelize.sync()

const models = { Products, Sections, Groups, User }

export default models