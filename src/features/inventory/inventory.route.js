const inventoryRoute = require('express').Router();
const InventoryController = require('./inventory.controller');

inventoryRoute.post('/', InventoryController.createInventoryForProduct);
inventoryRoute.put('/', InventoryController.updateInventory);
inventoryRoute.get('/:productId', InventoryController.getInventory);
module.exports = inventoryRoute;