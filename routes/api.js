import express from "express";
import { readInventory } from "../utils/helpers.js";
const ApiRouter = express.Router();

ApiRouter.route("/warehouses/:warehouseId/inventories")
    .get(async (req, res) => {

        try {
            if (!req.params.warehouseId) {
                res.status(404).json({ message: "warehouse ID is not found!" })
            }
            else {
                const inventoryList = await readInventory();
                let filteredInventoryList = inventoryList.filter(
                    inventory =>
                        inventory.warehouse_id.toString() === req.params.warehouseId
                ).map(inventory => {
                    return {
                        id: inventory.id,
                        item_name: inventory.item_name,
                        category: inventory.category,
                        status: inventory.status,
                        quantity: inventory.quantity
                    }
                }
                )
                res.status(200).json(filteredInventoryList)
            }
        }
        catch (error) {
            console.log(error)
        }
    })

export default ApiRouter;