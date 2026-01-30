import React, { useState, useEffect } from "react";
import {
  getPackingApi,
  addPackingItemApi,
  updatePackingItemApi,
  deletePackingItemsApi,
  savePackingNotesApi,
} from "../services/api";
 
const Packing = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [notes, setNotes] = useState("");
 
  useEffect(() => {
    fetchPackingItems();
  }, []);
 
  const fetchPackingItems = async () => {
    try {
      const res = await getPackingApi();
      setItems(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };
 
  const addItem = async () => {
    if (!newItem.trim()) return;
    try {
      const res = await addPackingItemApi({ item_name: newItem });
      setItems([...items, res.data]);
      setNewItem("");
    } catch (err) {
      console.error("Add error:", err);
    }
  };
 
  const toggleSelect = async (item) => {
    try {
      await updatePackingItemApi(item.id, {
        isChecked: !item.is_checked,
      });
      setItems((prev) =>
        prev.map((i) =>
          i.id === item.id
            ? { ...i, is_checked: !i.is_checked }
            : i
        )
      );
    } catch (err) {
      console.error("Update error:", err);
    }
  };
 
  const deleteItems = async () => {
    const idsToDelete = items
      .filter((item) => item.is_checked)
      .map((item) => item.id);
 
    if (idsToDelete.length === 0) {
      alert("Select items to delete");
      return;
    }
 
    try {
      await deletePackingItemsApi(idsToDelete);
      setItems(items.filter((item) => !idsToDelete.includes(item.id)));
    } catch (err) {
      console.error("Delete error:", err);
    }
  };
 
  const saveList = async () => {
    try {
      await savePackingNotesApi({ notes });
      alert("✔ Packing list saved successfully!");
    } catch (err) {
      console.error(err);
      alert("⚠ Failed to save packing list");
    }
  };
 
  return (
   
    <div className="min-h-screen bg-blue-200 font-['Poppins'] flex flex-col items-center justify-start py-10">
 
      {/* Page Container */}
      <div className="max-w-5xl w-full mx-auto rounded-3xl overflow-hidden bg-white/70 backdrop-blur-xl border border-white/30 shadow-2xl">
 
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 px-12 py-12 text-center text-white">
          <h1 className="text-4xl font-extrabold drop-shadow-md">
            Craft Your Packing List
          </h1>
        </div>
 
        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-10">
 
          {/* Must-Haves */}
          <div className="bg-white rounded-2xl p-6 shadow-md border border-slate-200 flex flex-col">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-lg font-bold text-slate-700">
                🎒 Must-Haves
              </h2>
              <button
                onClick={deleteItems}
                title="Delete selected"
                className="p-2 rounded-lg bg-red-50 hover:bg-red-200 transition"
              >
                🗑️
              </button>
            </div>
 
            <ul className="space-y-3 max-h-80 overflow-y-auto">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center gap-4 p-3 bg-slate-50 rounded-xl border border-transparent hover:border-slate-300 hover:translate-x-1 transition"
                >
                  <input
                    type="checkbox"
                    checked={item.is_checked}
                    onChange={() => toggleSelect(item)}
                    className="w-4 h-4 cursor-pointer"
                  />
                  <span
                    className={`${
                      item.is_checked
                        ? "line-through text-slate-400"
                        : "text-slate-700"
                    }`}
                  >
                    {item.item_name}
                  </span>
                </li>
              ))}
            </ul>
          </div>
 
          {/* Notes */}
          <div className="bg-white rounded-2xl p-6 shadow-md border border-slate-200 flex flex-col">
            <h2 className="text-lg font-bold text-slate-700 mb-5">
              📝 Trip Notes
            </h2>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Write down flight details, weather reminders, or hotel addresses..."
              className="flex-1 resize-none rounded-xl border-2 border-slate-200 p-4 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition"
            />
          </div>
        </div>
 
        {/* Add Item */}
        <div className="flex gap-4 px-10 pb-6">
          <input
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="What else do you need to pack?"
            className="flex-1 rounded-xl border-2 border-slate-200 px-5 py-4 text-base outline-none focus:border-slate-700 focus:shadow-md transition"
          />
          <button
            onClick={addItem}
            className="px-8 rounded-xl bg-slate-700 hover:bg-slate-900 text-white font-semibold transition hover:-translate-y-0.5"
          >
            Add Item
          </button>
        </div>
 
        {/* Save Button */}
        <button
          onClick={saveList}
          className="mx-10 mb-10 py-4 w-[calc(100%-5rem)] rounded-2xl bg-gradient-to-r from-slate-700 to-blue-500 text-white text-lg font-bold shadow-lg hover:shadow-xl hover:-translate-y-1 transition"
        >
          ✔ Save This Packing List
        </button>
      </div>
    </div>
  );
};
 
export default Packing;