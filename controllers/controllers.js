import initKnex from "knex";
import configuration from "../knexfile.js";
import {
  readInventory,
  readWarehouses,
  readEditInventory,
} from "../utils/helpers.js";
const knex = initKnex(configuration);
const fetchWarehouses = async (_req, res) => {
  const warehouseList1 = await readWarehouses();
  try {
    res.status(200).json(warehouseList1);
  } catch (err) {
    res.status(400).send(`Error retrieving Warehouses: ${err}`);
  }
};

const fetchIndividualWarehouse = async (req, res) => {
  const warehouseList3 = await readWarehouses();
  const selectedWarehouse = warehouseList3.find((warehouse) => {
    return warehouse.id == req.params.id;
  });

  if (!selectedWarehouse) {
    return res
      .status(404)
      .json({ message: "Warehouse with this ID not found" });
  }

  res.status(200).json(selectedWarehouse);
};

const editWarehouse = async (req, res) => {
  const warehouseList2 = await readWarehouses();
  const selectedWarehouse = warehouseList2.find((warehouse) => {
    return warehouse.id == req.params.ID;
  });
  if (!selectedWarehouse) {
    return res
      .status(404)
      .json({ message: "Warehouse with this ID not found" });
  }
  const data = await knex("warehouses")
    .where("warehouses.id", "=", req.params.ID)
    .update(req.body);
  res.status(200).json(req.body);
};

const deleteWarehouse = async (req, res) => {
  const { passedID } = req.params;
  try {
    const result = await knex("warehouses").where("id", passedID).del();
    await knex("inventories").where("warehouse_id", passedID).del();
    if (result) {
      res
        .status(200)
        .json({ message: "The deletion of the warehouse item was successful" });
    } else {
      res.status(404).json({ message: "warehouse was not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Delete action failed" });
  }
};

const fetchInventory = async (req, res) => {
  try {
    const inventoryList = await readInventory();
    res.status(200).json(inventoryList);
  } catch (error) {
    res.status(500).json({ message: "Inventory data not found" });
  }
};

const fetchIndividualInventory = async (req, res) => {
  const inventoryList = await readInventory();//
  const selectedInventory = inventoryList.find((inventory) => {
    return inventory.id == req.params.id;
  });

  if (!selectedInventory) {
    return res
      .status(404)
      .json({ message: "Warehouse with this ID not found" });
  }

  res.status(200).json(selectedInventory);
};

const editInventory = async (req, res) => {
  console.log(req.body);
  const warehouseIdCheck = await knex("warehouses")
    .where({
      id: req.body.warehouse_id,
    })
    .first();

  const inventoryEditList = await readEditInventory();
  const selectedInventory = inventoryEditList.find((inventory) => {
    return inventory.id == req.params.id;
  });
  if (!selectedInventory) {
    return res
      .json({ message: "Inventory with this ID not found" });
  } else if (
    !req.body.item_name ||
    !req.body.description ||
    !req.body.category ||
    !req.body.status ||
    !req.body.quantity
  ) {
    res.status(400).json({
      message: "Please enter data in all fields",
    });
  } else if (!warehouseIdCheck) {
    res.status(400).json({
      message: "Warehouse id does not exist",
    });
  } else {
    const data = await knex("inventories")
      .where("inventories.id", "=", req.params.id)
      .update(req.body);
    res.status(200).json(data);
  }
};
const deleteInventory = async (req, res) => {
  const { passedID } = req.params;
  try {
    const result = await knex("inventories").where("id", passedID).del();
    if (result) {
      res
        .status(200)
        .json({ message: "The deletion of the inventory item was successful" });
    } else {
      res.status(404).json({ message: "item was not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Delete action failed" });
  }
};
const addNewInventory = async (req, res) => {
  const warehouseList6 = await readWarehouses();
  try {
    if (
      !req.body.warehouse_id ||
      !req.body.item_name ||
      !req.body.description ||
      !req.body.category ||
      req.body.quantity == undefined ||
      Number(req.body.quantity) == NaN
    ) {
      res.status(400).json({ message: "missing input values" });
    } else if (
      !warehouseList6.find((warehouse) => warehouse.id === req.body.warehouse_id)
    ) {
      res.status(400).json({
        message: "warehouse_id value does not exist in the warehouses table",
      });
    } else {
      const newWarehouse = await knex("inventories").insert(req.body);
      res.status(201).json(newWarehouse);
    }
  } catch (error) {
    console.log(error);
  }
};

export {
  fetchWarehouses,
  fetchIndividualWarehouse,
  fetchInventory,
  deleteInventory,
  fetchIndividualInventory,
  editWarehouse,
  editInventory,
  addNewInventory,
  deleteWarehouse,
};
