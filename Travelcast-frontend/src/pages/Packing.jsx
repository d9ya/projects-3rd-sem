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
      const res = await addPackingItemApi({
        item_name: newItem,
      });
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
    alert("✔ Packing list saved");
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
          font-family: "Segoe UI", sans-serif;
          background: url("/packing list bg.jpeg");
          background-size: cover;
          background-position: center;
        }

        .global-logo {
          position: fixed;
          top: 20px;
          left: 20px;
          z-index: 9999;
        }

        .global-logo img {
          height: 130px;
          width: 130px;
        }

        .page {
          max-width: 1050px;
          margin: 50px auto;
          border-radius: 24px;
          overflow: hidden;
          background: rgba(255, 255, 255, 0.39);
          backdrop-filter: blur(18px);
          box-shadow: 0 30px 70px rgba(0,0,0,0.25);
        }

        .header {
          background: linear-gradient(135deg, #0b1f3a, #143d6b);
          padding: 45px 50px;
          color: white;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .title {
          font-size: 48px;
          font-weight: 900;
          letter-spacing: 1.2px;
        }

        .content {
          padding: 35px;
          display: grid;
          grid-template-columns: 1fr 2.2fr;
          gap: 30px;
        }

        .must-haves {
          background: white;
          border-radius: 18px;
          padding: 30px;
        }

        .must-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 22px;
        }

        .delete-btn {
          cursor: pointer;
          font-size: 22px;
        }

        .must-haves ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .must-haves li {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 18px;
          font-size: 15px;
        }

        .notes {
          background: white;
          border-radius: 18px;
          padding: 25px;
          display: flex;
          flex-direction: column;
          height: 460px;
        }

        .notes textarea {
          flex: 1;
          border-radius: 14px;
          padding: 16px;
          border: 1px solid #cfd9e3;
        }

        .add {
          padding: 0 35px 30px;
          display: flex;
          gap: 12px;
        }

        .add input {
          flex: 1;
          padding: 14px;
          border-radius: 14px;
        }

        .add button {
          padding: 14px 26px;
          border-radius: 14px;
          background: #143d6b;
          color: white;
          border: none;
          cursor: pointer;
        }

        .save {
          margin: 0 35px 35px;
          padding: 16px;
          width: calc(100% - 70px);
          border-radius: 18px;
          background: linear-gradient(135deg, #143d6b, #2f80ed);
          color: white;
          border: none;
          cursor: pointer;
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
          <div className="must-haves">
            <div className="must-header">
              <h2>🎒 My Must-Haves</h2>
              <span className="delete-btn" onClick={deleteItems}>🗑</span>
            </div>

            <ul>
              {items.map((item) => (
                <li key={item.id}>
                  <input
                    type="checkbox"
                    checked={item.is_checked}
                    onChange={() => toggleSelect(item)}
                  />
                  {item.item_name}
                </li>
              ))}
            </ul>
          </div>

          <div className="notes">
            <h2>📝 Notes</h2>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </div>

        <div className="add">
          <input
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="Add new item..."
          />
          <button onClick={addItem}>Add</button>
        </div>

        <button className="save" onClick={saveList}>
          ✔ Save Packing List
        </button>
      </div>
    </>
  );
};

export default Packing;
