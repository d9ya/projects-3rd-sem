import React, { useState } from "react";
 
const Packing = () => {
  const [items, setItems] = useState([
    "Essential Medications",
    "Wallet",
    "Phone Charger",
  ]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [notes, setNotes] = useState("");
 
  const addItem = () => {
    if (newItem.trim()) {
      setItems([...items, newItem]);
      setNewItem("");
    }
  };
 
  const toggleSelect = (item) => {
    setSelectedItems((prev) =>
      prev.includes(item)
        ? prev.filter((i) => i !== item)
        : [...prev, item]
    );
  };
 
  const deleteItems = () => {
    if (selectedItems.length === 0) {
      alert("Select items to delete");
      return;
    }
    setItems(items.filter((item) => !selectedItems.includes(item)));
    setSelectedItems([]);
  };
 
  const saveList = () => {
    if (!notes.trim()) {
      alert("⚠ Notes section is empty");
    } else {
      alert("✔ Packing list saved");
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
          text-shadow:
            0 4px 10px rgba(0, 0, 0, 0.35),
            0 0 18px rgba(47, 128, 237, 0.45);
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

        .notes h2 {
          margin-bottom: 18px;
        }

        .notes textarea {
          flex: 1;
          border-radius: 14px;
          padding: 16px;
          border: 1px solid #cfd9e3;
          font-size: 15px;
          resize: none;
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
          border: 1px solid #cfd9e3;
          font-size: 15px;
        }

        .add button {
          padding: 14px 26px;
          border-radius: 14px;
          border: none;
          background: #143d6b;
          color: white;
          font-size: 15px;
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
          font-size: 17px;
          font-weight: 600;
          cursor: pointer;
        }

        @media (max-width: 850px) {
          .content {
            grid-template-columns: 1fr;
          }
          .title {
            font-size: 38px;
          }
        }
      `}</style>

      {/* GLOBAL LOGO */}
      <div className="global-logo">
        <img src="travelcastlogo.png" alt="Logo" />
      </div>

      <div className="page">
        <div className="header">
          <h1 className="title">Craft Your Packing List</h1>
          <div>
            ✈️ Trip to Mustang<br />
            Oct 26 – Nov 2
          </div>
        </div>

        <div className="content">
          <div className="must-haves">
            <div className="must-header">
              <h2>🎒 My Must-Haves</h2>
              <span className="delete-btn" onClick={deleteItems}>🗑</span>
            </div>

            <ul>
              {items.map((item, i) => (
                <li key={i}>
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item)}
                    onChange={() => toggleSelect(item)}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="notes">
            <h2>📝 Notes</h2>
            <textarea
              placeholder="Write notes..."
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
