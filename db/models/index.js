import { sequelize } from "db";

import Product from "./Product";
import Section from "./Section";
import List from "./List";
import User from "./User";

sequelize.sync()

const models = { Product, Section, List, User }

export default models