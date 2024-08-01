// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

import dotenv from "dotenv";
dotenv.config();

// import "dotenv/config";
// require("dotenv").config(); 


export default  {
  client: "mysql2",
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
};




