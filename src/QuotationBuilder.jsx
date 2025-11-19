import React, { useState, useEffect } from "react";
import axios from "axios";
import "./QuotationBuilder.css";




const QuotationBuilder = ({ customerId, customerName }) => {
  const [items, setItems] = useState([
    { diameter: "", quantity: 1, unitRate: 0, total: 0 },
  ]);

  // add new row
  const addRow = () => {
    setItems([...items, { diameter: "", quantity: 1, unitRate: 0, total: 0 }]);
  };

  // remove row
  const removeRow = (index) => {
    const updated = [...items];
    updated.splice(index, 1);
    setItems(updated);
  };

  // update any field
  const handleChange = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = value;

    // auto rate suggestion (optional)
    if (field === "diameter") {
      const d = Number(value);
      let rate = 0;
      if (d <= 80) rate = 120;
      else if (d <= 100) rate = 150;
      else if (d <= 150) rate = 200;
      else if (d <= 200) rate = 250;
      else if (d <= 300) rate = 350;
      else if (d <= 400) rate = 450;
      else if (d <= 600) rate = 600;
      else if (d <= 800) rate = 800;
      else if (d <= 1000) rate = 1000;
      else rate = 1200;
      updated[index].unitRate = rate;
    }

    // recalc total
    updated[index].total =
      Number(updated[index].quantity) * Number(updated[index].unitRate);
    setItems(updated);
  };

  const grandTotal = items.reduce((acc, i) => acc + Number(i.total || 0), 0);

  const handleWhatsApp = () => {
    const msgLines = items
      .map(
        (i) =>
          `Dia: ${i.diameter}mm | Qty: ${i.quantity} | Rate: ₹${i.unitRate} | Total: ₹${i.total}`
      )
      .join("%0A");
    const msg = `Hello ${customerName},%0AHere is your quotation:%0A%0A${msgLines}%0A%0AGrand Total: ₹${grandTotal}`;
    const waUrl = `https://wa.me/?text=${msg}`;
    window.open(waUrl, "_blank");
  };

  return (
    <div style={{ marginTop: 12, padding: 12, background: "#f9f9f9", borderRadius: 8 }}>
      <h4>Quotation Builder (Multi-Dia)</h4>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginBottom: 10,
        }}
      >
        <thead>
          <tr style={{ background: "#eee" }}>
            <th>Dia (mm)</th>
            <th>Qty</th>
            <th>Unit Rate (₹)</th>
            <th>Total (₹)</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {items.map((row, idx) => (
            <tr key={idx}>
              <td>
                <input
                  type="number"
                  value={row.diameter}
                  onChange={(e) =>
                    handleChange(idx, "diameter", e.target.value)
                  }
                  style={{ width: "90%" }}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={row.quantity}
                  onChange={(e) =>
                    handleChange(idx, "quantity", e.target.value)
                  }
                  style={{ width: "80px" }}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={row.unitRate}
                  onChange={(e) =>
                    handleChange(idx, "unitRate", e.target.value)
                  }
                  style={{ width: "100px" }}
                />
              </td>
              <td>₹{row.total.toFixed(2)}</td>
              <td>
                <button onClick={() => removeRow(idx)}>❌</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={addRow} style={{ marginRight: 8 }}>
        ➕ Add Row
      </button>
      <strong>Grand Total: ₹{grandTotal.toFixed(2)}</strong>

      <div style={{ marginTop: 10 }}>
        <button
          onClick={handleWhatsApp}
          style={{
            background: "#25d366",
            color: "white",
            border: "none",
            padding: "8px 14px",
            borderRadius: 4,
            cursor: "pointer",
          }}
        >
          Send on WhatsApp
        </button>
      </div>
    </div>
  );
};

export default QuotationBuilder;
