// import React, { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { logout } from "../redux/authSlice";
// import * as bootstrap from "bootstrap";

// export default function InvoiceForm() {
//   const { token } = useSelector((state) => state.auth);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!token) {
//       navigate("/");
//     }
//   }, [token, navigate]);

//   if (!token) return null;

//   const handleLogout = () => {
//     dispatch(logout());
//     navigate("/");
//   };

//   const [form, setForm] = useState({
//     companyName: "3MXYZ",
//     companyAddress: "3MXYZ, CFVGB, KARNATAKA, KARNATAKA, 560023",
//     companyGST: "29XXXXXXXXX",
//     customerName: "HDFC",
//     customerAddress: "234, Karnataka",
//     customerState: "DELHI",
//     customerStateCode: "07",
//     customerGST: "29XXXXXXXXZS",
//     consigneeName: "leg name15",
//     consigneeAddress: "amr tech park",
//     consigneeState: "KARNATAKA",
//     consigneeStateCode: "29",
//     consigneeGST: "29XXXXXXXXZW",
//     invoiceNo: "234694KF48",
//     invoiceDate: "2020-07-02",
//     placeOfSupply: "Karnataka",
//   });

//   const [items, setItems] = useState([
//     { description: "item15", hsn: "9401", qty: 1, rate: 6400 },
//   ]);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleItemChange = (index, e) => {
//     const updated = [...items];
//     updated[index][e.target.name] = e.target.value;
//     setItems(updated);
//   };

//   const addItem = () => {
//     setItems([...items, { description: "", hsn: "", qty: 1, rate: 0 }]);
//   };

//   const removeItem = (index) => {
//     const updated = items.filter((_, i) => i !== index);
//     setItems(updated);
//   };

//   const handlePrint = () => {
//   const modalEl = document.getElementById("invoicePreview");
//   const modalInstance = bootstrap.Modal.getInstance(modalEl);

//   // Prevent duplicate triggers by disabling the print button temporarily
//   const printBtn = modalEl.querySelector(".btn-success");
//   printBtn.disabled = true;

//   // Hide the modal first
//   modalInstance.hide();

//   // Wait until modal is fully hidden before printing
//   modalEl.addEventListener(
//     "hidden.bs.modal",
//     () => {
//       const printContents = document.getElementById("invoice-print-area").innerHTML;
//       const printWindow = window.open("", "", "width=900,height=700");

//       printWindow.document.write(`
//         <html>
//           <head>
//             <title>Invoice</title>
//             <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
//             <style>
//               body { padding: 20px; font-size: 14px; }
//               table { width: 100%; border-collapse: collapse; }
//               th, td { border: 1px solid #ccc; padding: 6px; text-align: center; }
//               h3 { margin-bottom: 20px; }
//             </style>
//           </head>
//           <body>
//             ${printContents}
//           </body>
//         </html>
//       `);

//       printWindow.document.close();

//       // ✅ Ensure print runs only once
//       printWindow.focus();
//       printWindow.print();
//       printWindow.onafterprint = () => printWindow.close();

//       // Re-enable the print button
//       printBtn.disabled = false;
//     },
//     { once: true } // ensures this event fires only once
//   );
// };


//   const totalBeforeTax = items.reduce(
//     (sum, item) => sum + item.qty * item.rate,
//     0
//   );
//   const cgst = totalBeforeTax * 0.06;
//   const sgst = totalBeforeTax * 0.06;
//   const grandTotal = totalBeforeTax + cgst + sgst;

//   return (
//     <div className="container my-5">
//       <div className="text-end mb-3">
//         <button className="btn btn-outline-danger" onClick={handleLogout}>
//           Logout
//         </button>
//       </div>
//       <div className="card shadow p-4">
//         <h2 className="text-center mb-4">Invoice Generator</h2>

//         {/* === FORM === */}
//         <div className="row g-3">
//           <h5>Company Details</h5>
//           <div className="col-md-6">
//             <label className="form-label">Company Name</label>
//             <input
//               name="companyName"
//               value={form.companyName}
//               onChange={handleChange}
//               className="form-control"
//             />
//           </div>
//           <div className="col-md-6">
//             <label className="form-label">Company GSTIN</label>
//             <input
//               name="companyGST"
//               value={form.companyGST}
//               onChange={handleChange}
//               className="form-control"
//             />
//           </div>
//           <div className="col-12">
//             <label className="form-label">Company Address</label>
//             <textarea
//               name="companyAddress"
//               value={form.companyAddress}
//               onChange={handleChange}
//               className="form-control"
//             />
//           </div>

//           <h5 className="mt-4">Customer (Bill To)</h5>
//           <div className="col-md-6">
//             <label className="form-label">Customer Name</label>
//             <input
//               name="customerName"
//               value={form.customerName}
//               onChange={handleChange}
//               className="form-control"
//             />
//           </div>
//           <div className="col-md-6">
//             <label className="form-label">Customer GSTIN</label>
//             <input
//               name="customerGST"
//               value={form.customerGST}
//               onChange={handleChange}
//               className="form-control"
//             />
//           </div>
//           <div className="col-12">
//             <label className="form-label">Customer Address</label>
//             <textarea
//               name="customerAddress"
//               value={form.customerAddress}
//               onChange={handleChange}
//               className="form-control"
//             />
//           </div>
//           <div className="col-md-6">
//             <label className="form-label">State Name</label>
//             <input
//               name="customerState"
//               value={form.customerState}
//               onChange={handleChange}
//               className="form-control"
//             />
//           </div>
//           <div className="col-md-6">
//             <label className="form-label">State Code</label>
//             <input
//               name="customerStateCode"
//               value={form.customerStateCode}
//               onChange={handleChange}
//               className="form-control"
//             />
//           </div>

//           <h5 className="mt-4">Consignee (Ship To)</h5>
//           <div className="col-md-6">
//             <label className="form-label">Consignee Name</label>
//             <input
//               name="consigneeName"
//               value={form.consigneeName}
//               onChange={handleChange}
//               className="form-control"
//             />
//           </div>
//           <div className="col-md-6">
//             <label className="form-label">Consignee GSTIN</label>
//             <input
//               name="consigneeGST"
//               value={form.consigneeGST}
//               onChange={handleChange}
//               className="form-control"
//             />
//           </div>
//           <div className="col-12">
//             <label className="form-label">Consignee Address</label>
//             <textarea
//               name="consigneeAddress"
//               value={form.consigneeAddress}
//               onChange={handleChange}
//               className="form-control"
//             />
//           </div>
//           <div className="col-md-6">
//             <label className="form-label">State Name</label>
//             <input
//               name="consigneeState"
//               value={form.consigneeState}
//               onChange={handleChange}
//               className="form-control"
//             />
//           </div>
//           <div className="col-md-6">
//             <label className="form-label">State Code</label>
//             <input
//               name="consigneeStateCode"
//               value={form.consigneeStateCode}
//               onChange={handleChange}
//               className="form-control"
//             />
//           </div>

//           <h5 className="mt-4">Invoice Details</h5>
//           <div className="col-md-4">
//             <label className="form-label">Invoice No</label>
//             <input
//               name="invoiceNo"
//               value={form.invoiceNo}
//               onChange={handleChange}
//               className="form-control"
//             />
//           </div>
//           <div className="col-md-4">
//             <label className="form-label">Invoice Date</label>
//             <input
//               type="date"
//               name="invoiceDate"
//               value={form.invoiceDate}
//               onChange={handleChange}
//               className="form-control"
//             />
//           </div>
//           <div className="col-md-4">
//             <label className="form-label">Place of Supply</label>
//             <input
//               name="placeOfSupply"
//               value={form.placeOfSupply}
//               onChange={handleChange}
//               className="form-control"
//             />
//           </div>

//           {/* === MULTIPLE ITEMS === */}
//           <h5 className="mt-4 d-flex align-items-center justify-content-between">
//             <span>Item Details</span>
//             <button type="button" className="btn btn-sm btn-success" onClick={addItem}>
//               + Add Item
//             </button>
//           </h5>

//           {items.map((item, i) => (
//             <div key={i} className="row g-2 align-items-end mb-2 border-bottom pb-2">
//               <div className="col-md-4">
//                 <label className="form-label">Description</label>
//                 <input
//                   name="description"
//                   value={item.description}
//                   onChange={(e) => handleItemChange(i, e)}
//                   className="form-control"
//                 />
//               </div>
//               <div className="col-md-2">
//                 <label className="form-label">HSN</label>
//                 <input
//                   name="hsn"
//                   value={item.hsn}
//                   onChange={(e) => handleItemChange(i, e)}
//                   className="form-control"
//                 />
//               </div>
//               <div className="col-md-2">
//                 <label className="form-label">Qty</label>
//                 <input
//                   type="number"
//                   name="qty"
//                   value={item.qty}
//                   onChange={(e) => handleItemChange(i, e)}
//                   className="form-control"
//                 />
//               </div>
//               <div className="col-md-2">
//                 <label className="form-label">Rate</label>
//                 <input
//                   type="number"
//                   name="rate"
//                   value={item.rate}
//                   onChange={(e) => handleItemChange(i, e)}
//                   className="form-control"
//                 />
//               </div>
//               <div className="col-md-2 text-end">
//                 {i > 0 && (
//                   <button
//                     type="button"
//                     className="btn btn-outline-danger"
//                     onClick={() => removeItem(i)}
//                   >
//                     &times;
//                   </button>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="text-center mt-4">
//           <button
//             className="btn btn-primary"
//             data-bs-toggle="modal"
//             data-bs-target="#invoicePreview"
//           >
//             Save & Preview
//           </button>
//         </div>
//       </div>

//       {/* === MODAL PREVIEW === */}
//       <div className="modal fade" id="invoicePreview" tabIndex="-1">
//         <div className="modal-dialog modal-xl modal-dialog-scrollable">
//           <div className="modal-content p-4">
//             <div className="modal-header">
//               <h5 className="modal-title">Invoice Preview</h5>
//               <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
//             </div>
//             <div className="modal-body" id="invoice-print-area">
//               <div className="text-center mb-3">
//                 <h3 className="fw-bold">TAX INVOICE</h3>
//                 <p className="m-0">{form.companyName}</p>
//                 <p className="m-0">{form.companyAddress}</p>
//                 <p className="m-0">GSTIN: {form.companyGST}</p>
//               </div>

//               <table className="table table-bordered small">
//                 <tbody>
//                   <tr>
//                     <td><strong>Invoice No:</strong> {form.invoiceNo}</td>
//                     <td><strong>Date:</strong> {form.invoiceDate}</td>
//                     <td><strong>Place of Supply:</strong> {form.placeOfSupply}</td>
//                   </tr>
//                 </tbody>
//               </table>

//               <div className="row">
//                 <div className="col-md-6 border p-2">
//                   <h6>Details of Customer (Bill To)</h6>
//                   <p>{form.customerName}</p>
//                   <p>{form.customerAddress}</p>
//                   <p>{form.customerState} - {form.customerStateCode}</p>
//                   <p>GSTIN: {form.customerGST}</p>
//                 </div>
//                 <div className="col-md-6 border p-2">
//                   <h6>Details of Consignee (Ship To)</h6>
//                   <p>{form.consigneeName}</p>
//                   <p>{form.consigneeAddress}</p>
//                   <p>{form.consigneeState} - {form.consigneeStateCode}</p>
//                   <p>GSTIN: {form.consigneeGST}</p>
//                 </div>
//               </div>

//               <table className="table table-bordered text-center small mt-3">
//                 <thead className="table-light">
//                   <tr>
//                     <th>#</th>
//                     <th>Description</th>
//                     <th>HSN</th>
//                     <th>Qty</th>
//                     <th>Rate</th>
//                     <th>Taxable Value</th>
//                     <th>CGST 6%</th>
//                     <th>SGST 6%</th>
//                     <th>Total</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {items.map((item, i) => {
//                     const taxable = item.qty * item.rate;
//                     const cgstAmt = taxable * 0.06;
//                     const sgstAmt = taxable * 0.06;
//                     const total = taxable + cgstAmt + sgstAmt;
//                     return (
//                       <tr key={i}>
//                         <td>{i + 1}</td>
//                         <td>{item.description}</td>
//                         <td>{item.hsn}</td>
//                         <td>{item.qty}</td>
//                         <td>{item.rate}</td>
//                         <td>{taxable.toFixed(2)}</td>
//                         <td>{cgstAmt.toFixed(2)}</td>
//                         <td>{sgstAmt.toFixed(2)}</td>
//                         <td>{total.toFixed(2)}</td>
//                       </tr>
//                     );
//                   })}
//                 </tbody>
//               </table>

//               <p className="text-end fw-bold">
//                 Grand Total: ₹{grandTotal.toFixed(2)}
//               </p>
//             </div>

//             <div className="modal-footer">
//               <button className="btn btn-success" onClick={handlePrint}>
//                 Print
//               </button>
//               <button className="btn btn-secondary" data-bs-dismiss="modal">
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// import React, { useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { logout } from "../redux/authSlice";

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/authSlice";
import * as bootstrap from "bootstrap";

export default function InvoicePage() {

  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);

  if (!token) return null;

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };


  const emptyItem = {
    srNo: 1,
    productName: "",
    hsnSac: "",
    qty: 1,
    unit: "",
    rate: 0,
    taxableValue: 0,
    cgstRate: 0,
    cgstAmount: 0,
    sgstRate: 0,
    sgstAmount: 0,
    itemTotal: 0
  };

  const [invoice, setInvoice] = useState({
    companyName: "",
    companyGstin: "",
    companyAddress: "",
    billToName: "",
    billToGstin: "",
    billToAddress: "",
    billToStateName: "",
    billToStateCode: "",
    shipToName: "",
    shipToGstin: "",
    shipToAddress: "",
    shipToStateName: "",
    shipToStateCode: "",
    invoiceNo: "",
    invoiceDate: "",
    placeOfSupply: "",
    vehicleNo: "",
    transportMode: "",
    items: [emptyItem]
  });

  const handleChange = (e) => {
    setInvoice({ ...invoice, [e.target.name]: e.target.value });
  };

  const handleItemChange = (index, field, value) => {
    const items = [...invoice.items];
    items[index][field] = value;

    const qty = Number(items[index].qty || 0);
    const rate = Number(items[index].rate || 0);
    const cgstRate = Number(items[index].cgstRate || 0);
    const sgstRate = Number(items[index].sgstRate || 0);

    const taxable = qty * rate;
    const cgstAmt = (taxable * cgstRate) / 100;
    const sgstAmt = (taxable * sgstRate) / 100;

    items[index].taxableValue = taxable;
    items[index].cgstAmount = cgstAmt;
    items[index].sgstAmount = sgstAmt;
    items[index].itemTotal = taxable + cgstAmt + sgstAmt;

    setInvoice({ ...invoice, items });
  };

  const handlePrint = async () => {
  const payload = {
    ...invoice,
    totalQty: totals.qty,
    totalTaxableValue: totals.taxable,
    totalCgstValue: totals.cgst,
    totalSgstValue: totals.sgst,
    totalBeforeTax: totals.taxable,
    totalTax: totals.cgst + totals.sgst,
    finalInvoiceAmount: finalAmount
  };

  try {
    const res = await fetch("https://localhost:7017/api/Invoice", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (!res.ok) throw new Error("Save failed");

    // once saved successfully → trigger print
    window.print();
  } catch (err) {
    alert("Invoice save failed. Print cancelled.");
  }
};



  const addItem = () => {
    setInvoice({
      ...invoice,
      items: [
        ...invoice.items,
        { ...emptyItem, srNo: invoice.items.length + 1 }
      ]
    });
  };

  const removeItem = (index) => {
    const items = invoice.items.filter((_, i) => i !== index);
    setInvoice({ ...invoice, items });
  };

  const totals = invoice.items.reduce(
    (t, i) => {
      t.taxable += i.taxableValue || 0;
      t.cgst += i.cgstAmount || 0;
      t.sgst += i.sgstAmount || 0;
      t.qty += Number(i.qty || 0);
      return t;
    },
    { taxable: 0, cgst: 0, sgst: 0, qty: 0 }
  );

  const finalAmount = totals.taxable + totals.cgst + totals.sgst;

  return (
    <div className="container-fluid p-4">
      {/* Top bar */}
      <div className="d-flex justify-content-between align-items-center mb-3">
  <h4>GST Invoice</h4>
  <div>
    <button className="btn btn-primary me-2" onClick={handlePrint}>
      🖨 Print
    </button>
     <button className="btn btn-outline-danger" onClick={handleLogout}>
           Logout
         </button>
  </div>
</div>


      {/* Invoice Header */}
      <div className="row g-3">
        {[
          ["companyName", "Company Name"],
          ["companyGstin", "Company GSTIN"],
          ["companyAddress", "Company Address"],
          ["billToName", "Bill To Name"],
          ["billToGstin", "Bill To GSTIN"],
          ["billToAddress", "Bill To Address"],
          ["shipToName", "Ship To Name"],
          ["shipToGstin", "Ship To GSTIN"],
          ["shipToAddress", "Ship To Address"],
          ["invoiceNo", "Invoice No"],
          ["invoiceDate", "Invoice Date"],
          ["placeOfSupply", "Place Of Supply"],
          ["vehicleNo", "Vehicle No"],
          ["transportMode", "Transport Mode"]
        ].map(([key, label]) => (
          <div className="col-md-4" key={key}>
            <label className="form-label">{label}</label>
            <input
              className="form-control"
              name={key}
              value={invoice[key]}
              onChange={handleChange}
            />
          </div>
        ))}
      </div>

      {/* Items Table */}
      <h5 className="mt-4">Items</h5>
      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Product</th>
            <th>HSN</th>
            <th>Qty</th>
            <th>Unit</th>
            <th>Rate</th>
            <th>CGST %</th>
            <th>SGST %</th>
            <th>Total</th>
            <th>❌</th>
          </tr>
        </thead>
        <tbody>
          {invoice.items.map((item, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>
                <input className="form-control" onChange={(e) => handleItemChange(i, "productName", e.target.value)} />
              </td>
              <td>
                <input className="form-control" onChange={(e) => handleItemChange(i, "hsnSac", e.target.value)} />
              </td>
              <td>
                <input type="number" className="form-control" value={item.qty} onChange={(e) => handleItemChange(i, "qty", e.target.value)} />
              </td>
              <td>
                <input className="form-control" onChange={(e) => handleItemChange(i, "unit", e.target.value)} />
              </td>
              <td>
                <input type="number" className="form-control" value={item.rate} onChange={(e) => handleItemChange(i, "rate", e.target.value)} />
              </td>
              <td>
                <input type="number" className="form-control" onChange={(e) => handleItemChange(i, "cgstRate", e.target.value)} />
              </td>
              <td>
                <input type="number" className="form-control" onChange={(e) => handleItemChange(i, "sgstRate", e.target.value)} />
              </td>
              <td>₹ {item.itemTotal.toFixed(2)}</td>
              <td>
                <button className="btn btn-sm btn-danger" onClick={() => removeItem(i)}>X</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className="btn btn-primary" onClick={addItem}>
        + Add Item
      </button>

      {/* Totals */}
      <div className="mt-4 text-end">
        <p>Total Qty: {totals.qty}</p>
        <p>Taxable: ₹ {totals.taxable.toFixed(2)}</p>
        <p>CGST: ₹ {totals.cgst.toFixed(2)}</p>
        <p>SGST: ₹ {totals.sgst.toFixed(2)}</p>
        <h4>Final Amount: ₹ {finalAmount.toFixed(2)}</h4>
      </div>
    </div>
  );
}
