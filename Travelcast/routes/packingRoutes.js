// routes/packingRoutes.js
const express = require("express");
const router = express.Router();
const {
  getPackingList,
  addItem,
  updateItem,
  deleteItems,
  saveNotes
} = require("../controllers/packingController");
 
const authMiddleware = require("../middleware/authMiddleware"); // <-- import middleware
 
router.get("/", authMiddleware, getPackingList);
router.post("/", authMiddleware, addItem);
router.put("/:itemId", authMiddleware, updateItem);
router.delete("/", authMiddleware, deleteItems);
router.post("/saveNotes", authMiddleware, saveNotes);
 
module.exports = router;