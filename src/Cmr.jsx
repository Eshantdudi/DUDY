// CMR.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import QuotationBuilder from "./QuotationBuilder";

const API_BASE = "http://localhost:5000/api";

const CMR = () => {
  const [customers, setCustomers] = useState([]);
  const [form, setForm] = useState({
    name: "",
    city: "",
    contact: "",
    gst: "",
    notes: "",
    quotes: "",
    follow_up_date: ""
  });

  // Selected customer for showing quotation
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  // Store per-customer diameter input (id -> diameter string)
  const [selectedDiameters, setSelectedDiameters] = useState({});

  // Payment UI state
  const [paymentOpenFor, setPaymentOpenFor] = useState(null);
  const [paymentForm, setPaymentForm] = useState({ amount: "", note: "", date: "" });
  const [ledgerData, setLedgerData] = useState({});
  const [paymentsList, setPaymentsList] = useState({});

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = () => {
    axios
      .get(`${API_BASE}/customers`)
      .then((res) => setCustomers(res.data))
      .catch((err) => console.error(err));
  };

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${API_BASE}/customers`, form)
      .then((res) => {
        setCustomers((prev) => [res.data, ...prev]);
        setForm({
          name: "",
          city: "",
          contact: "",
          gst: "",
          notes: "",
          quotes: "",
          follow_up_date: ""
        });
      })
      .catch((err) => console.error(err));
  };

  const handleDelete = (id) => {
    if (!window.confirm("Delete this customer?")) return;
    axios
      .delete(`${API_BASE}/customers/${id}`)
      .then(() => {
        setCustomers((prev) => prev.filter((c) => c.id !== id));
        // cleanup diameter & selection if needed
        setSelectedDiameters((prev) => {
          const copy = { ...prev };
          delete copy[id];
          return copy;
        });
        if (selectedCustomer?.id === id) setSelectedCustomer(null);
      })
      .catch((err) => console.error(err));
  };

  const handlePDF = (id) => {
    window.open(`${API_BASE}/customers/${id}/quotation`, "_blank");
  };

  const handleWhatsApp = (c) => {
    const url = `https://wa.me/?text=${encodeURIComponent(
      `Hello ${c.name || ""}\nQuote: ${c.quotes || "0"}\nNotes: ${c.notes || ""}`
    )}`;
    window.open(url, "_blank");
  };

  const openPayment = (customer) => {
    setPaymentOpenFor(customer.id);
    setPaymentForm({
      amount: "",
      note: "",
      date: new Date().toISOString().slice(0, 10)
    });

    axios
      .get(`${API_BASE}/customers/${customer.id}/payments`)
      .then((r) =>
        setPaymentsList((prev) => ({ ...prev, [customer.id]: r.data }))
      )
      .catch((err) => console.error(err));

    axios
      .get(`${API_BASE}/customers/${customer.id}/ledger`)
      .then((r) =>
        setLedgerData((prev) => ({ ...prev, [customer.id]: r.data }))
      )
      .catch((err) => console.error(err));
  };

  const closePayment = () => {
    setPaymentOpenFor(null);
    setPaymentForm({ amount: "", note: "", date: "" });
  };

  const submitPayment = (customerId) => {
    const amt = Number(paymentForm.amount);
    if (isNaN(amt) || amt <= 0) {
      alert("Enter valid amount");
      return;
    }

    axios
      .post(`${API_BASE}/customers/${customerId}/payments`, {
        amount: amt,
        type: "payment",
        note: paymentForm.note,
        date: paymentForm.date
      })
      .then(() =>
        Promise.all([
          axios.get(`${API_BASE}/customers/${customerId}/payments`),
          axios.get(`${API_BASE}/customers/${customerId}/ledger`)
        ])
      )
      .then(([pRes, lRes]) => {
        setPaymentsList((prev) => ({ ...prev, [customerId]: pRes.data }));
        setLedgerData((prev) => ({ ...prev, [customerId]: lRes.data }));
        setPaymentForm({ amount: "", note: "", date: "" });
      })
      .catch((err) => {
        console.error("Payment error", err);
        alert("Failed to add payment");
      });
  };

  const exportCSV = () => {
    window.open(`${API_BASE}/customers/export`, "_blank");
  };

  const formatDate = (isoDate) => {
    if (!isoDate) return "-";
    const d = new Date(isoDate);
    if (isNaN(d)) return isoDate;
    return d.toLocaleDateString();
  };

  // When user clicks Show Quotation: validate diameter for this customer and set selectedCustomer
  const handleShowQuotation = (c) => {
    const diaRaw = selectedDiameters[c.id];
    if (!diaRaw) {
      alert("Please enter required diameter for this customer.");
      return;
    }
    const diaNum = Number(diaRaw);
    if (isNaN(diaNum) || diaNum <= 0) {
      alert("Enter a valid numeric diameter (e.g., 80 or 200).");
      return;
    }
    // set selected customer (QuotationBuilder will receive diameter prop)
    setSelectedCustomer({ ...c });
  };

  return (
    <div className="cmr-container">
     

      {/* Form Section */}
      <form className="cmr-form" onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required />
        <input name="city" value={form.city} onChange={handleChange} placeholder="City" />
        <input name="contact" value={form.contact} onChange={handleChange} placeholder="Contact" />
        <input name="gst" value={form.gst} onChange={handleChange} placeholder="GST" />
        <input name="notes" value={form.notes} onChange={handleChange} placeholder="Notes" />
        <input name="quotes" value={form.quotes} onChange={handleChange} placeholder="Quotes (numeric)" />
        <label style={{ display: "block", width: "100%" }}>
          Follow-up date:
          <input type="date" name="follow_up_date" value={form.follow_up_date} onChange={handleChange} style={{ marginLeft: 8 }} />
        </label>
        <div style={{ display: "flex", gap: 8, width: "100%" }}>
          <button type="submit" style={{ flex: 1 }}>Add Customer</button>
          <button type="button" onClick={exportCSV} style={{ flex: 1, background: "#2d8f2d" }}>Export CSV</button>
        </div>
      </form>

      {/* Customer List */}
      <ul className="cmr-list">
        {customers.map((c) => (
          <li key={c.id}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "flex-start" }}>
              <div style={{ flex: 1 }}>
                <strong>{c.name}</strong> {c.city ? `(${c.city})` : null}<br />
                📞 {c.contact || "-"} | GST: {c.gst || "-"}<br />
                📝 {c.notes || "-"} | 💰 {c.quotes || "0"}<br />
                📅 Follow-up: <em>{formatDate(c.follow_up_date)}</em>

                {/* Quotation: show only when selected AND pass diameter */}
                {selectedCustomer?.id === c.id && (
                  <div className="quotation-section" style={{ marginTop: 10 }}>
                    <h3>Quotation for {selectedCustomer.name} — Dia: {selectedDiameters[c.id]}</h3>
                    {/* Pass diameter prop to QuotationBuilder */}
                    <QuotationBuilder
  customerId={selectedCustomer.id}
  customerName={selectedCustomer.name} diameter={Number(selectedDiameters[c.id])} />
                  </div>
                )}
              </div>

              {/* Right column: actions + diameter input */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8, minWidth: 180 }}>
                <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                  <input
                    placeholder="Dia (mm)"
                    value={selectedDiameters[c.id] || ""}
                    onChange={(e) => setSelectedDiameters(prev => ({ ...prev, [c.id]: e.target.value }))}
                    style={{ width: 90 }}
                  />
                  <button onClick={() => handleShowQuotation(c)} className="btn small">Show Quotation</button>
                </div>

                <button onClick={() => handlePDF(c.id)} className="btn small">Generate PDF</button>
                <button onClick={() => handleWhatsApp(c)} className="btn small">WhatsApp</button>
                <button onClick={() => openPayment(c)} className="btn small">Payment / Ledger</button>
                <button onClick={() => handleDelete(c.id)} className="btn small danger">Delete</button>
              </div>
            </div>

            {/* Payment / Ledger inline panel */}
            {paymentOpenFor === c.id && (
              <div style={{ marginTop: 12, padding: 12, background: "#fff", borderRadius: 6, border: "1px solid #eee" }}>
                <h4 style={{ marginTop: 0 }}>Payments for {c.name}</h4>

                {/* Ledger summary */}
                <div style={{ display: "flex", gap: 12, marginBottom: 8 }}>
                  <div><strong>Quoted:</strong> {ledgerData[c.id] ? ledgerData[c.id].quoted : (Number(c.quotes || 0).toFixed(2))}</div>
                  <div><strong>Paid:</strong> {ledgerData[c.id] ? ledgerData[c.id].totalPaid : "-"}</div>
                  <div><strong>Outstanding:</strong> {ledgerData[c.id] ? ledgerData[c.id].outstanding : "-"}</div>
                </div>

                <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                  <input placeholder="Amount" value={paymentForm.amount} onChange={e => setPaymentForm(prev => ({ ...prev, amount: e.target.value }))} />
                  <input placeholder="Note" value={paymentForm.note} onChange={e => setPaymentForm(prev => ({ ...prev, note: e.target.value }))} />
                  <input type="date" value={paymentForm.date} onChange={e => setPaymentForm(prev => ({ ...prev, date: e.target.value }))} />
                  <button onClick={() => submitPayment(c.id)} className="btn">Add</button>
                  <button onClick={closePayment} className="btn danger">Close</button>
                </div>

                {/* Payments list */}
                <div>
                  <strong>History:</strong>
                  <ul style={{ marginTop: 8 }}>
                    {(paymentsList[c.id] || []).map((p) => (
                      <li key={p.id} style={{ marginBottom: 6 }}>
                        {new Date(p.date).toLocaleString()} — {p.amount.toFixed(2)} — {p.note || "-"}
                      </li>
                    ))}
                    {(!paymentsList[c.id] || paymentsList[c.id].length === 0) && <li>No payments yet</li>}
                  </ul>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CMR;
