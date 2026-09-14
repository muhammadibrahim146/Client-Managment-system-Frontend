import { useState } from "react";
import axios from "axios";
import {
  UserPlus,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

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
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/customers",
        {
          ...formData,
          amount: Number(formData.amount),
        }
      );

      console.log("Customer created:", response.data);

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
      console.error("Add Customer Error:", error);

      setError(
        error.response?.data?.message ||
          "Failed to add customer"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-3xl">

        {/* Header */}
        <div className="mb-6 flex items-center gap-3">
          <div className="rounded-lg bg-blue-600 p-3 text-white">
            <UserPlus size={24} />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Add Customer
            </h1>

            <p className="text-sm text-gray-500">
              Add a new customer to the system
            </p>
          </div>
        </div>

        {/* Success Message */}
        {message && (
          <div className="mb-5 flex items-center gap-2 rounded-lg bg-green-100 p-4 text-green-700">
            <CheckCircle2 size={20} />
            <span>{message}</span>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-5 flex items-center gap-2 rounded-lg bg-red-100 p-4 text-red-700">
            <AlertCircle size={20} />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="rounded-xl bg-white p-6 shadow"
        >

          {/* Name */}
          <div className="mb-5">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter customer name"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          {/* Phone */}
          <div className="mb-5">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Phone
            </label>

            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          {/* Email */}
          <div className="mb-5">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          {/* Address */}
          <div className="mb-5">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Address
            </label>

            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter customer address"
              required
              rows="3"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          {/* Amount */}
          <div className="mb-5">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Amount
            </label>

            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="Enter amount"
              min="0"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          {/* Month */}
          <div className="mb-5">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Month
            </label>

            <select
              name="month"
              value={formData.month}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
            >
              <option value="">
                Select Month
              </option>

              <option value="January">January</option>
              <option value="February">February</option>
              <option value="March">March</option>
              <option value="April">April</option>
              <option value="May">May</option>
              <option value="June">June</option>
              <option value="July">July</option>
              <option value="August">August</option>
              <option value="September">September</option>
              <option value="October">October</option>
              <option value="November">November</option>
              <option value="December">December</option>
            </select>
          </div>

          {/* Status */}
          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Payment Status
            </label>

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
            >
              <option value="Unpaid">
                Unpaid
              </option>

              <option value="Paid">
                Paid
              </option>
            </select>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            <UserPlus size={20} />
            Add Customer
          </button>

        </form>
      </div>
    </div>
  );
}