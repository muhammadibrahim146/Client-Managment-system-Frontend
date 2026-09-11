import { useState } from "react";
import axios from "axios";
import { UserPlus, CheckCircle2 } from "lucide-react";

export default function AddClient() {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
    month: "",
    amount: "",
    status: "Unpaid",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/api/customers",
        formData
      );

      setMessage("Customer added successfully!");

      setFormData({
        name: "",
        address: "",
        email: "",
        phone: "",
        month: "",
        amount: "",
        status: "Unpaid",
      });

    } catch (error) {
      console.error(error);
      setMessage("Failed to add customer");
    }
  };

  return (
    <div className="max-w-5xl mx-auto">

      {/* Heading */}
      <div className="mb-8">

        <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-4">
          <UserPlus />
        </div>

        <h1 className="text-3xl font-bold text-slate-900">
          Add New Client
        </h1>

        <p className="text-slate-500 mt-2">
          Enter customer information and payment details.
        </p>

      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden"
      >

        <div className="p-6 sm:p-8">

          <h2 className="text-lg font-bold text-slate-900 mb-6">
            Customer Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <Input
              label="Customer Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter customer name"
              required
            />

            <Input
              label="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="03001234567"
              required
            />

            <Input
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="customer@email.com"
            />

            <Input
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Customer address"
              required
            />

            <Input
              label="Sale Amount"
              name="amount"
              type="number"
              value={formData.amount}
              onChange={handleChange}
              placeholder="25000"
              required
            />

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Month
              </label>

              <select
                name="month"
                value={formData.month}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition"
              >
                <option value="">
                  Select month
                </option>

                {[
                  "January",
                  "February",
                  "March",
                  "April",
                  "May",
                  "June",
                  "July",
                  "August",
                  "September",
                  "October",
                  "November",
                  "December",
                ].map((month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Payment Status
              </label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition"
              >
                <option value="Paid">
                  Paid
                </option>

                <option value="Unpaid">
                  Unpaid
                </option>
              </select>
            </div>

          </div>

          {message && (
            <div className="mt-6 flex items-center gap-2 bg-green-50 text-green-700 px-4 py-3 rounded-xl">
              <CheckCircle2 size={20} />
              {message}
            </div>
          )}

        </div>

        <div className="border-t border-slate-100 bg-slate-50 px-6 sm:px-8 py-5 flex justify-end">

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-7 py-3 rounded-xl shadow-lg shadow-blue-600/20 transition"
          >
            Add Customer
          </button>

        </div>

      </form>

    </div>
  );
}

function Input({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  required,
}) {
  return (
    <div>

      <label className="block text-sm font-semibold text-slate-700 mb-2">
        {label}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition"
      />

    </div>
  );
}