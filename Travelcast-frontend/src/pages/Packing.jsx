import React, { useState, useEffect } from "react";
import {
  getPackingApi,
  addPackingItemApi,
  updatePackingItemApi,
  deletePackingItemsApi,
  savePackingNotesApi
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
      await updatePackingItemApi(item.id, { isChecked: !item.is_checked });
      setItems((prev) =>
        prev.map((i) =>
          i.id === item.id ? { ...i, is_checked: !i.is_checked } : i
        )
      );
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  const deleteItems = async () => {
    const idsToDelete = items.filter((item) => item.is_checked).map((item) => item.id);
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
    <>
      <style>{`
        body {
          margin: 0;
          font-family: 'Poppins', 'Segoe UI', sans-serif;
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          min-height: 100vh;
        }

        .global-logo {
          position: fixed;
          top: 20px;
          left: 20px;
          z-index: 9999;
          transition: transform 0.3s ease;
        }
        .global-logo:hover { transform: scale(1.05); }
        .global-logo img { height: 100px; width: 100px; filter: drop-shadow(0 4px 10px rgba(0,0,0,0.1)); }

        .page {
          max-width: 1000px;
          margin: 60px auto;
          border-radius: 30px;
          overflow: hidden;
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
        }

        .header {
          background: linear-gradient(90deg, #0f2027, #203a43, #2c5364);
          padding: 50px;
          color: white;
          text-align: center;
        }

        .title {
          font-size: 40px;
          font-weight: 800;
          margin: 0;
          text-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }

        .content {
          padding: 40px;
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: 30px;
        }

        /* --- THE BOXED CONTAINERS --- */
        .card-container {
          background: white;
          border-radius: 20px;
          padding: 25px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.05);
          border: 1px solid #edf2f7;
          display: flex;
          flex-direction: column;
        }

        .section-title {
          font-size: 20px;
          font-weight: 700;
          color: #2d3748;
          margin-bottom: 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .must-haves-list {
          list-style: none;
          padding: 0;
          margin: 0;
          max-height: 350px;
          overflow-y: auto;
        }

        .must-haves-list li {
          display: flex;
          align-items: center;
          padding: 12px;
          margin-bottom: 10px;
          background: #f8fafc;
          border-radius: 12px;
          transition: all 0.2s ease;
          border: 1px solid transparent;
        }

        .must-haves-list li:hover {
          border-color: #cbd5e0;
          transform: translateX(5px);
        }

        .must-haves-list input[type="checkbox"] {
          margin-right: 15px;
          width: 18px;
          height: 18px;
          cursor: pointer;
        }

        .delete-btn {
          cursor: pointer;
          background: #fff5f5;
          padding: 8px;
          border-radius: 10px;
          transition: background 0.2s;
        }
        .delete-btn:hover { background: #fed7d7; }

        .notes-area {
          width: 100%;
          flex: 1;
          border-radius: 15px;
          padding: 15px;
          border: 1.5px solid #e2e8f0;
          resize: none;
          font-family: inherit;
          font-size: 15px;
          outline: none;
          transition: border-color 0.3s;
        }
        .notes-area:focus { border-color: #4a90e2; box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.1); }

        /* --- IMPROVED INPUT FIELD --- */
        .add-section {
          padding: 0 40px 20px;
          display: flex;
          gap: 15px;
        }

        .add-input {
          flex: 1;
          padding: 16px 20px;
          border-radius: 15px;
          border: 2px solid #e2e8f0;
          font-size: 16px;
          outline: none;
          transition: all 0.3s ease;
          background: white;
        }

        .add-input:focus {
          border-color: #2c5364;
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
        }

        .add-button {
          padding: 0 30px;
          border-radius: 15px;
          background: #2c5364;
          color: white;
          font-weight: 600;
          border: none;
          cursor: pointer;
          transition: transform 0.2s, background 0.2s;
        }
        .add-button:hover { background: #143d6b; transform: translateY(-2px); }

        .save-button {
          margin: 10px 40px 40px;
          padding: 18px;
          width: calc(100% - 80px);
          border-radius: 18px;
          background: linear-gradient(90deg, #2c5364, #4a90e2);
          color: white;
          font-size: 18px;
          font-weight: 700;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 10px 20px rgba(74, 144, 226, 0.2);
        }
        .save-button:hover {
          box-shadow: 0 15px 30px rgba(74, 144, 226, 0.3);
          transform: translateY(-3px);
          filter: brightness(1.1);
        }
      `}</style>

      <div className="global-logo">
        <img src="travelcastlogo.png" alt="Logo" />
      </div>

      <div className="page">
        <div className="header">
          <h1 className="title">Craft Your Packing List</h1>
        </div>

        <div className="content">
          
          <div className="card-container">
            <div className="section-title">
              <span>🎒 Must-Haves</span>
              <span className="delete-btn" onClick={deleteItems} title="Delete selected">🗑️</span>
            </div>
            <ul className="must-haves-list">
              {items.map((item) => (
                <li key={item.id}>
                  <input
                    type="checkbox"
                    checked={item.is_checked}
                    onChange={() => toggleSelect(item)}
                  />
                  <span style={{ textDecoration: item.is_checked ? 'line-through' : 'none', color: item.is_checked ? '#a0aec0' : '#2d3748' }}>
                    {item.item_name}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          
          <div className="card-container">
            <div className="section-title">
              <span>📝 Trip Notes</span>
            </div>
            <textarea
              className="notes-area"
              placeholder="Write down flight details, weather reminders, or hotel addresses..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </div>

        <div className="add-section">
          <input
            className="add-input"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="What else do you need to pack?"
          />
          <button className="add-button" onClick={addItem}>Add Item</button>
        </div>

        <button className="save-button" onClick={saveList}>
          ✔ Save This Packing List
        </button>
      </div>
    </>
  );
};

export default Packing;