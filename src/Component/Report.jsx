import { useEffect, useState } from "react";
import axios from "axios";

import {
  Users,
  CheckCircle,
  Clock,
  DollarSign,
  Download,
  FileText,
} from "lucide-react";

const Reports = () => {
  // ========================================
  // STATE
  // ========================================

  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ========================================
  // MONTHS
  // ========================================

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

  // ========================================
  // GET CUSTOMERS FROM API
  // ========================================

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get(
           "https://client-managment-system-backend-otp.vercel.app/api/customers",
        );

        console.log("Customers for Reports:", response.data);

        setCustomers(response.data.customers || []);
      } catch (error) {
        console.error("Reports API Error:", error);

        setError(
          error.response?.data?.message ||
            "Failed to load reports"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  // ========================================
  // TOTAL CUSTOMERS
  // ========================================

  const totalCustomers = customers.length;

  // ========================================
  // PAID CUSTOMERS
  // ========================================

  const totalPaid = customers.filter(
    (customer) => customer.status === "Paid"
  ).length;

  // ========================================
  // UNPAID CUSTOMERS
  // ========================================

  const totalUnpaid = customers.filter(
    (customer) => customer.status === "Unpaid"
  ).length;

  // ========================================
  // TOTAL AMOUNT
  // ========================================

  const totalAmount = customers.reduce(
    (total, customer) =>
      total + Number(customer.amount || 0),
    0
  );

  // ========================================
  // PAID AMOUNT
  // ========================================

  const paidAmount = customers
    .filter((customer) => customer.status === "Paid")
    .reduce(
      (total, customer) =>
        total + Number(customer.amount || 0),
      0
    );

  // ========================================
  // PENDING / UNPAID AMOUNT
  // ========================================

  const pendingAmount = customers
    .filter((customer) => customer.status === "Unpaid")
    .reduce(
      (total, customer) =>
        total + Number(customer.amount || 0),
      0
    );

  // ========================================
  // MONTHLY REPORT
  // ========================================

  const monthlyReports = months.map((month) => {
    const monthCustomers = customers.filter(
      (customer) => customer.month === month
    );

    const paidCustomers = monthCustomers.filter(
      (customer) => customer.status === "Paid"
    );

    const unpaidCustomers = monthCustomers.filter(
      (customer) => customer.status === "Unpaid"
    );

    const amount = monthCustomers.reduce(
      (total, customer) =>
        total + Number(customer.amount || 0),
      0
    );

    return {
      month,
      customers: monthCustomers.length,
      paid: paidCustomers.length,
      unpaid: unpaidCustomers.length,
      amount,
    };
  });

  // ========================================
  // SUMMARY CARDS
  // ========================================

  const cards = [
    {
      title: "Total Customers",
      value: loading ? "..." : totalCustomers,
      icon: Users,
    },
    {
      title: "Paid Customers",
      value: loading ? "..." : totalPaid,
      icon: CheckCircle,
    },
    {
      title: "Unpaid Customers",
      value: loading ? "..." : totalUnpaid,
      icon: Clock,
    },
    {
      title: "Total Amount",
      value: loading
        ? "..."
        : `Rs. ${totalAmount.toLocaleString()}`,
      icon: DollarSign,
    },
  ];

  // ========================================
  // LOADING
  // ========================================

  if (loading) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500">
            Loading reports...
          </p>
        </div>
      </div>
    );
  }

  // ========================================
  // UI
  // ========================================

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      {/* ========================================
          HEADER
      ======================================== */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Reports
          </h1>

          <p className="text-gray-500 mt-1">
            View customer and payment reports
          </p>
        </div>

        {/* Export Buttons */}

        <div className="flex gap-3">

          <button
            type="button"
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            <Download size={18} />
            Export Excel
          </button>

          <button
            type="button"
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            <FileText size={18} />
            Export PDF
          </button>

        </div>
      </div>

      {/* ========================================
          ERROR
      ======================================== */}

      {error && (
        <div className="mb-6 rounded-lg bg-red-100 border border-red-200 p-4 text-red-700">
          {error}
        </div>
      )}

      {/* ========================================
          SUMMARY CARDS
      ======================================== */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">

        {cards.map((card, index) => {
          const Icon = card.icon;

          return (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-5"
            >

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-sm text-gray-500">
                    {card.title}
                  </p>

                  <h2 className="text-2xl font-bold text-gray-800 mt-2">
                    {card.value}
                  </h2>

                </div>

                <div className="p-3 bg-gray-100 rounded-lg">
                  <Icon
                    size={24}
                    className="text-gray-700"
                  />
                </div>

              </div>

            </div>
          );
        })}

      </div>

      {/* ========================================
          PAYMENT SUMMARY
      ======================================== */}

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">

        <h2 className="text-lg font-semibold text-gray-800 mb-5">
          Payment Summary
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

          {/* Total */}

          <div className="border rounded-lg p-4">

            <p className="text-sm text-gray-500">
              Total Amount
            </p>

            <h3 className="text-xl font-bold text-gray-800 mt-2">
              Rs. {totalAmount.toLocaleString()}
            </h3>

          </div>

          {/* Paid */}

          <div className="border rounded-lg p-4">

            <p className="text-sm text-gray-500">
              Paid Amount
            </p>

            <h3 className="text-xl font-bold text-green-600 mt-2">
              Rs. {paidAmount.toLocaleString()}
            </h3>

          </div>

          {/* Pending */}

          <div className="border rounded-lg p-4">

            <p className="text-sm text-gray-500">
              Pending Amount
            </p>

            <h3 className="text-xl font-bold text-red-600 mt-2">
              Rs. {pendingAmount.toLocaleString()}
            </h3>

          </div>

        </div>
      </div>

      {/* ========================================
          MONTHLY REPORT
      ======================================== */}

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">

        <div className="flex items-center justify-between mb-5">

          <div>

            <h2 className="text-lg font-semibold text-gray-800">
              Monthly Customer Report
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Customer and payment statistics by month
            </p>

          </div>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full text-left">

            <thead>

              <tr className="border-b bg-gray-50">

                <th className="px-4 py-3 text-sm font-semibold text-gray-600">
                  Month
                </th>

                <th className="px-4 py-3 text-sm font-semibold text-gray-600">
                  Customers
                </th>

                <th className="px-4 py-3 text-sm font-semibold text-gray-600">
                  Paid
                </th>

                <th className="px-4 py-3 text-sm font-semibold text-gray-600">
                  Unpaid
                </th>

                <th className="px-4 py-3 text-sm font-semibold text-gray-600">
                  Total Amount
                </th>

              </tr>

            </thead>

            <tbody>

              {monthlyReports.map((report) => (

                <tr
                  key={report.month}
                  className="border-b hover:bg-gray-50 transition"
                >

                  {/* Month */}

                  <td className="px-4 py-4 font-medium text-gray-800">
                    {report.month}
                  </td>

                  {/* Customers */}

                  <td className="px-4 py-4 text-gray-600">
                    {report.customers}
                  </td>

                  {/* Paid */}

                  <td className="px-4 py-4">

                    <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-700">
                      {report.paid}
                    </span>

                  </td>

                  {/* Unpaid */}

                  <td className="px-4 py-4">

                    <span className="px-3 py-1 rounded-full text-sm bg-red-100 text-red-700">
                      {report.unpaid}
                    </span>

                  </td>

                  {/* Amount */}

                  <td className="px-4 py-4 font-medium text-gray-800">
                    Rs. {report.amount.toLocaleString()}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>
      </div>

    </div>
  );
};

export default Reports;
