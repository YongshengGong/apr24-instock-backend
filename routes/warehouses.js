import express from "express";
import initKnex from "knex";
import configuration from "../knexfile.js";
import {
  fetchWarehouses,
  fetchIndividualWarehouse,
  editWarehouse,
  deleteWarehouse
} from "../controllers/controllers.js";
const knex = initKnex(configuration);
const router = express.Router();

router.get("/", fetchWarehouses);
router.get("/:id", fetchIndividualWarehouse);
router.put("/:ID", editWarehouse);
router.delete("/:passedID",deleteWarehouse);
router.post("/addNewWarehouse", async (req, res) => {
  console.log(req.body);
  try {
    if (!req.body.contact_email.includes("@")) {
      res
        .status(400)
        .json({ message: "Please enter a valid email including @" });
    } else if (!/^\d+$/.test(req.body.contact_phone)) {
      res
        .status(400)
        .json({
          message: "Please enter a valid phone number with numbers only",
        });
    } else {
      const newWarehouse = await knex("warehouses").insert(req.body);
      res.status(201).json(newWarehouse);
    }
  } catch (error) {
    res.status(400).send(`Error adding new warehouses: ${error}`);
  }
});

export default router;
