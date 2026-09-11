import { useEffect, useState } from "react";
import axios from "axios";
import {
  Search,
  Pencil,
  Trash2,
  Users,
  IndianRupee,
  CheckCircle,
  Clock,
  X,
  RefreshCw,
} from "lucide-react";

const API_URL = "http://localhost:5000/api/customers";

const months = [
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
];

const Customers = () => {
  // =========================
  // CUSTOMERS
  // =========================
  const [customers, setCustomers] = useState([]);

  // =========================
  // FILTERS
  // =========================
  const [selectedMonth, setSelectedMonth] = useState("");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  // =========================
  // SUMMARY
  // =========================
  const [summary, setSummary] = useState({
    totalCustomers: 0,
    totalAmount: 0,
    paidAmount: 0,
    unpaidAmount: 0,
    paidCustomers: 0,
    unpaidCustomers: 0,
  });

  // =========================
  // STATES
  // =========================
  const [loading, setLoading] = useState(false);
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [error, setError] = useState("");

  // =========================
  // EDIT MODAL
  // =========================
  const [editingCustomer, setEditingCustomer] = useState(null);

  // =========================
  // FETCH CUSTOMERS
  // =========================
  const fetchCustomers = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(API_URL, {
        params: {
          search: search || undefined,
          month: selectedMonth || undefined,
          status: status || undefined,
        },
      });

      setCustomers(response.data.customers || []);
    } catch (error) {
      console.error("Fetch Customers Error:", error);

      setError(
        error.response?.data?.message ||
          "Failed to fetch customers"
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // FETCH SUMMARY
  // =========================
  const fetchSummary = async () => {
    try {
      setSummaryLoading(true);

      const response = await axios.get(`${API_URL}/summary`, {
        params: {
          month: selectedMonth || undefined,
          status: status || undefined,
        },
      });

      setSummary(
        response.data.summary || {
          totalCustomers: 0,
          totalAmount: 0,
          paidAmount: 0,
          unpaidAmount: 0,
          paidCustomers: 0,
          unpaidCustomers: 0,
        }
      );
    } catch (error) {
      console.error("Summary Error:", error);
    } finally {
      setSummaryLoading(false);
    }
  };

  // =========================
  // LOAD DATA
  // =========================
  useEffect(() => {
    fetchCustomers();
    fetchSummary();
  }, [selectedMonth, status]);

  // =========================
  // SEARCH
  // =========================
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchCustomers();
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  // =========================
  // DELETE CUSTOMER
  // =========================
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this customer?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`${API_URL}/${id}`);

      // Refresh both table and summary
      await fetchCustomers();
      await fetchSummary();
    } catch (error) {
      console.error("Delete Error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to delete customer"
      );
    }
  };

  // =========================
  // UPDATE CUSTOMER
  // =========================
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `${API_URL}/${editingCustomer._id}`,
        editingCustomer
      );

      setEditingCustomer(null);

      await fetchCustomers();
      await fetchSummary();
    } catch (error) {
      console.error("Update Error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to update customer"
      );
    }
  };

  // =========================
  // CLEAR FILTERS
  // =========================
  const clearFilters = () => {
    setSelectedMonth("");
    setSearch("");
    setStatus("");
  };

  // =========================
  // FORMAT MONEY
  // =========================
  const formatMoney = (amount) => {
    return new Intl.NumberFormat("en-PK", {
      style: "currency",
      currency: "PKR",
      maximumFractionDigits: 0,
    }).format(amount || 0);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6 lg:p-8">

      {/* ======================================
          HEADER
      ====================================== */}
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <div>
          <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">
            Customers
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage your customers, payments and monthly sales
          </p>
        </div>

        <button
          onClick={() => {
            fetchCustomers();
            fetchSummary();
          }}
          className="flex w-fit items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-100"
        >
          <RefreshCw size={17} />
          Refresh
        </button>
      </div>

      {/* ======================================
          SUMMARY CARDS
      ====================================== */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

        {/* Total Customers */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm font-medium text-slate-500">
                Total Customers
              </p>

              <h2 className="mt-2 text-2xl font-bold text-slate-900">
                {summaryLoading ? "..." : summary.totalCustomers}
              </h2>
            </div>

            <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
              <Users size={22} />
            </div>
          </div>
        </div>

        {/* Total Amount */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm font-medium text-slate-500">
                Total Amount
              </p>

              <h2 className="mt-2 text-xl font-bold text-slate-900">
                {summaryLoading
                  ? "..."
                  : formatMoney(summary.totalAmount)}
              </h2>
            </div>

            <div className="rounded-xl bg-purple-50 p-3 text-purple-600">
              <IndianRupee size={22} />
            </div>
          </div>
        </div>

        {/* Paid */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm font-medium text-slate-500">
                Paid Amount
              </p>

              <h2 className="mt-2 text-xl font-bold text-green-600">
                {summaryLoading
                  ? "..."
                  : formatMoney(summary.paidAmount)}
              </h2>

              <p className="mt-1 text-xs text-slate-400">
                {summary.paidCustomers} paid customers
              </p>
            </div>

            <div className="rounded-xl bg-green-50 p-3 text-green-600">
              <CheckCircle size={22} />
            </div>
          </div>
        </div>

        {/* Unpaid */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm font-medium text-slate-500">
                Unpaid Amount
              </p>

              <h2 className="mt-2 text-xl font-bold text-red-600">
                {summaryLoading
                  ? "..."
                  : formatMoney(summary.unpaidAmount)}
              </h2>

              <p className="mt-1 text-xs text-slate-400">
                {summary.unpaidCustomers} unpaid customers
              </p>
            </div>

            <div className="rounded-xl bg-red-50 p-3 text-red-600">
              <Clock size={22} />
            </div>
          </div>
        </div>

      </div>

      {/* ======================================
          MONTH FILTER
      ====================================== */}
      <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

        <div className="mb-4 flex items-center justify-between">

          <div>
            <h3 className="font-semibold text-slate-900">
              Monthly Sales
            </h3>

            <p className="text-sm text-slate-500">
              Select a month to view its customers
            </p>
          </div>

          {selectedMonth && (
            <button
              onClick={() => setSelectedMonth("")}
              className="text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              All Months
            </button>
          )}

        </div>

        <div className="flex gap-2 overflow-x-auto pb-2">

          {months.map((month) => (
            <button
              key={month}
              onClick={() => setSelectedMonth(month)}
              className={`whitespace-nowrap rounded-xl px-4 py-2.5 text-sm font-medium transition ${
                selectedMonth === month
                  ? "bg-slate-900 text-white shadow"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {month}
            </button>
          ))}

        </div>
      </div>

      {/* ======================================
          SEARCH + STATUS
      ====================================== */}
      <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

          {/* Search */}
          <div className="relative w-full lg:max-w-md">

            <Search
              size={19}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search customer by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
            />

          </div>

          {/* Status */}
          <div className="flex flex-wrap gap-2">

            <button
              onClick={() => setStatus("")}
              className={`rounded-xl px-4 py-2.5 text-sm font-medium transition ${
                status === ""
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              All
            </button>

            <button
              onClick={() => setStatus("Paid")}
              className={`rounded-xl px-4 py-2.5 text-sm font-medium transition ${
                status === "Paid"
                  ? "bg-green-600 text-white"
                  : "bg-green-50 text-green-700 hover:bg-green-100"
              }`}
            >
              Paid
            </button>

            <button
              onClick={() => setStatus("Unpaid")}
              className={`rounded-xl px-4 py-2.5 text-sm font-medium transition ${
                status === "Unpaid"
                  ? "bg-red-600 text-white"
                  : "bg-red-50 text-red-700 hover:bg-red-100"
              }`}
            >
              Unpaid
            </button>

            {(selectedMonth || search || status) && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1 rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-200"
              >
                <X size={16} />
                Clear
              </button>
            )}

          </div>

        </div>
      </div>

      {/* ======================================
          ERROR
      ====================================== */}
      {error && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* ======================================
          CUSTOMER TABLE
      ====================================== */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        <div className="border-b border-slate-200 px-5 py-4">

          <div className="flex items-center justify-between">

            <div>
              <h3 className="font-semibold text-slate-900">
                Customer List
              </h3>

              <p className="text-sm text-slate-500">
                {selectedMonth
                  ? `${selectedMonth} customers`
                  : "All customers"}
              </p>
            </div>

            <span className="rounded-lg bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-600">
              {customers.length} records
            </span>

          </div>

        </div>

        {loading ? (

          <div className="flex min-h-[300px] items-center justify-center">
            <div className="flex items-center gap-3 text-slate-500">
              <RefreshCw className="animate-spin" size={20} />
              Loading customers...
            </div>
          </div>

        ) : customers.length === 0 ? (

          <div className="flex min-h-[300px] flex-col items-center justify-center px-5 text-center">

            <div className="mb-4 rounded-full bg-slate-100 p-4">
              <Users size={28} className="text-slate-400" />
            </div>

            <h3 className="font-semibold text-slate-900">
              No customers found
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Try changing your filters or add a new customer.
            </p>

          </div>

        ) : (

          <div className="overflow-x-auto">

            <table className="w-full min-w-[850px]">

              <thead className="bg-slate-50">

                <tr className="border-b border-slate-200">

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Customer
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Contact
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Month
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Amount
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Status
                  </th>

                  <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody className="divide-y divide-slate-100">

                {customers.map((customer) => (

                  <tr
                    key={customer._id}
                    className="transition hover:bg-slate-50"
                  >

                    {/* Customer */}
                    <td className="px-5 py-4">

                      <div>
                        <p className="font-semibold text-slate-900">
                          {customer.name}
                        </p>

                        <p className="mt-1 max-w-[220px] truncate text-xs text-slate-500">
                          {customer.address || "No address"}
                        </p>
                      </div>

                    </td>

                    {/* Contact */}
                    <td className="px-5 py-4">

                      <p className="text-sm text-slate-700">
                        {customer.phone || "-"}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        {customer.email || "-"}
                      </p>

                    </td>

                    {/* Month */}
                    <td className="px-5 py-4">

                      <span className="rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700">
                        {customer.month}
                      </span>

                    </td>

                    {/* Amount */}
                    <td className="px-5 py-4">

                      <p className="font-semibold text-slate-900">
                        {formatMoney(customer.amount)}
                      </p>

                    </td>

                    {/* Status */}
                    <td className="px-5 py-4">

                      {customer.status === "Paid" ? (

                        <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700">
                          <CheckCircle size={14} />
                          Paid
                        </span>

                      ) : (

                        <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700">
                          <Clock size={14} />
                          Unpaid
                        </span>

                      )}

                    </td>

                    {/* Actions */}
                    <td className="px-5 py-4">

                      <div className="flex justify-end gap-2">

                        <button
                          onClick={() =>
                            setEditingCustomer({ ...customer })
                          }
                          className="rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                          title="Edit"
                        >
                          <Pencil size={17} />
                        </button>

                        <button
                          onClick={() =>
                            handleDelete(customer._id)
                          }
                          className="rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                          title="Delete"
                        >
                          <Trash2 size={17} />
                        </button>

                      </div>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>

      {/* ======================================
          EDIT MODAL
      ====================================== */}
      {editingCustomer && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">

            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">

              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Edit Customer
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Update customer information
                </p>
              </div>

              <button
                onClick={() => setEditingCustomer(null)}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={20} />
              </button>

            </div>

            {/* Form */}
            <form
              onSubmit={handleUpdate}
              className="space-y-5 p-6"
            >

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                {/* Name */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Name
                  </label>

                  <input
                    type="text"
                    value={editingCustomer.name || ""}
                    onChange={(e) =>
                      setEditingCustomer({
                        ...editingCustomer,
                        name: e.target.value,
                      })
                    }
                    required
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Phone
                  </label>

                  <input
                    type="text"
                    value={editingCustomer.phone || ""}
                    onChange={(e) =>
                      setEditingCustomer({
                        ...editingCustomer,
                        phone: e.target.value,
                      })
                    }
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Email
                  </label>

                  <input
                    type="email"
                    value={editingCustomer.email || ""}
                    onChange={(e) =>
                      setEditingCustomer({
                        ...editingCustomer,
                        email: e.target.value,
                      })
                    }
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* Month */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Month
                  </label>

                  <select
                    value={editingCustomer.month || ""}
                    onChange={(e) =>
                      setEditingCustomer({
                        ...editingCustomer,
                        month: e.target.value,
                      })
                    }
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  >
                    {months.map((month) => (
                      <option key={month} value={month}>
                        {month}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Amount */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Amount
                  </label>

                  <input
                    type="number"
                    min="0"
                    value={editingCustomer.amount || ""}
                    onChange={(e) =>
                      setEditingCustomer({
                        ...editingCustomer,
                        amount: Number(e.target.value),
                      })
                    }
                    required
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* Status */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Status
                  </label>

                  <select
                    value={editingCustomer.status || ""}
                    onChange={(e) =>
                      setEditingCustomer({
                        ...editingCustomer,
                        status: e.target.value,
                      })
                    }
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  >
                    <option value="Paid">Paid</option>
                    <option value="Unpaid">Unpaid</option>
                  </select>
                </div>

              </div>

              {/* Address */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Address
                </label>

                <textarea
                  rows="3"
                  value={editingCustomer.address || ""}
                  onChange={(e) =>
                    setEditingCustomer({
                      ...editingCustomer,
                      address: e.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 border-t border-slate-200 pt-5">

                <button
                  type="button"
                  onClick={() => setEditingCustomer(null)}
                  className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-slate-800"
                >
                  Update Customer
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
};

export default Customers;