import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

const readWarehouses = async (_req, res) => {
  try {
    const data = await knex
      .from("warehouses")
      .select(
        "warehouses.id",
        "warehouses.warehouse_name",
        "warehouses.address",
        "warehouses.city",
        "warehouses.country",
        "warehouses.country",
        "warehouses.contact_name",
        "warehouses.contact_position",
        "warehouses.contact_phone",
        "warehouses.contact_email"
      );
    return data;
  } catch (error) {
    console.log("Error reading from file ", error);
  }
};

const readInventory = async (req, res) => {
  try {
    const inventoryList = await knex
      .from("inventories")
      .join("warehouses", "inventories.warehouse_id", "=", "warehouses.id")
      .select(
        "warehouse_id",
        "inventories.id",
        "warehouses.warehouse_name as warehouse_name",
        "inventories.item_name",
        "inventories.description",
        "inventories.category",
        "inventories.status",
        "inventories.quantity"
      );
    return inventoryList;
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch invenory data" });
    console.error(error);
  }
};

const readEditInventory = async (req, res) => {
  try {
    const inventoryList = await knex
      .from("inventories")
      .select(
        "inventories.id",
        "inventories.warehouse_id",
        "inventories.item_name",
        "inventories.description",
        "inventories.category",
        "inventories.status",
        "inventories.quantity"
      );

    return inventoryList;
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch invenory data" });
    console.error(error);
  }
};

export { readWarehouses, readInventory, readEditInventory };
