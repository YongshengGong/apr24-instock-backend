import express from "express";
import {
  fetchInventory,
  fetchIndividualInventory,
  editInventory,
  deleteInventory,
  addNewInventory
} from "../controllers/controllers.js";

const invRouter = express.Router();

invRouter.get("/", fetchInventory);
invRouter.delete("/:passedID", deleteInventory);
invRouter.get("/:id", fetchIndividualInventory);
invRouter.put("/:id", editInventory);
invRouter.post("/",addNewInventory)
export default invRouter;
