import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import knex from "knex";
import warehouses from "./routes/warehouses.js";
import inventory from "./routes/inventory.js";
import ApiRouter from "./routes/api.js";
const app = express();
app.use(express.json());
dotenv.config();

const port = process.env.PORT || 8080;
app.use(cors(/*{ origin: process.env.FRONT_END }*/));

app.get('/', (req, res) => {
  res.send(`<h1>Welcome to my instock backend</h1>`);
});

app.use("/warehouses", warehouses);
app.use("/inventory", inventory);
app.use("/api", ApiRouter);
app.listen(port, () => {
  console.log(`App is running on port: ${port}`);
});
