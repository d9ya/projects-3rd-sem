const PackingItem = require("../models/packingModel");

// Get packing items
const getPackingList = async (req, res) => {
  try {
    console.log("Logged in User ID:", req.user.id);
    const items = await PackingItem.findAll({
      where: { user_id: req.user.id },   
      order: [["id", "ASC"]],
    });
    res.json(items);
  } catch (err) {
    console.error("Sequelize error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Add new item
const addItem = async (req, res) => {
  try {
    const { item_name } = req.body;      
    const newItem = await PackingItem.create({
      item_name,
      user_id: req.user.id,
    });
    res.status(201).json(newItem);
  } catch (err) {
    console.error("Sequelize error:", err);
    res.status(500).json({ message: "Server error" });
  }
};



const updateItem = async (req, res) => {
  try {
    const { itemId } = req.params;
    const { isChecked } = req.body;

    const item = await PackingItem.findOne({
      where: { 
        id: itemId, 
        user_id: req.user.id  
      },
    });
    
    if (!item) return res.status(404).json({ message: "Item not found" });

    item.is_checked = isChecked; 
    await item.save();

    res.json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


const deleteItems = async (req, res) => {
  try {
    const { itemIds } = req.body; 
    await PackingItem.destroy({
      where: { 
        id: itemIds, 
        user_id: req.user.id 
      },
    });
    res.json({ message: "Items deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};




// Save notes for the user
const saveNotes = async (req, res) => {
  try {
    const { notes } = req.body;

    
    await PackingItem.update(
      { notes },
      { where: { user_id: req.user.id } }
    );

    res.json({ message: "Packing list saved!" });
  } catch (err) {
    console.error("Sequelize error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getPackingList, addItem, updateItem, deleteItems, saveNotes };
