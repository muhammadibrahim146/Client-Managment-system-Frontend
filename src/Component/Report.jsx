import { useEffect, useState } from "react";
import axios from "axios";

import {
  Users,
  CheckCircle,
  Clock,
  DollarSign,
  Download,
  FileText,
  RefreshCw,
} from "lucide-react";

const Reports = () => {
  // ========================================
  // API URL
  // ========================================

  const API_URL = import.meta.env.VITE_API_URL;
  const BILLING_API = `${API_URL}/api/billing`;

  // ========================================
  // CURRENT DATE
  // ========================================

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonthIndex = currentDate.getMonth();

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
  // STATE
  // ========================================

  const [selectedYear, setSelectedYear] = useState(currentYear);

  const [currentSummary, setCurrentSummary] = useState({
    totalCustomers: 0,
    totalAmount: 0,
    paidAmount: 0,
    unpaidAmount: 0,
    paidCustomers: 0,
    unpaidCustomers: 0,
  });

  const [monthlyReports, setMonthlyReports] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ========================================
  // FETCH MONTHLY REPORTS
  // ========================================

  const fetchReports = async () => {
    try {
      setLoading(true);
      setError("");

      // ----------------------------------------
      // Get summary for every month
      // ----------------------------------------

      const requests = months.map((month) =>
        axios.get(`${BILLING_API}/summary`, {
          params: {
            month,
            year: selectedYear,
          },
        })
      );

      const responses = await Promise.all(requests);

      const reports = responses.map((response, index) => {
        const summary = response.data.summary || {};

        return {
          month: months[index],

          customers: Number(
            summary.totalCustomers || 0
          ),

          paid: Number(
            summary.paidCustomers || 0
          ),

          unpaid: Number(
            summary.unpaidCustomers || 0
          ),

          amount: Number(
            summary.totalAmount || 0
          ),

          paidAmount: Number(
            summary.paidAmount || 0
          ),

          unpaidAmount: Number(
            summary.unpaidAmount || 0
          ),
        };
      });

      setMonthlyReports(reports);

      // ----------------------------------------
      // Current month summary
      // ----------------------------------------

      const currentMonthSummary =
        reports[currentMonthIndex];

      setCurrentSummary({
        totalCustomers:
          currentMonthSummary?.customers || 0,

        totalAmount:
          currentMonthSummary?.amount || 0,

        paidAmount:
          currentMonthSummary?.paidAmount || 0,

        unpaidAmount:
          currentMonthSummary?.unpaidAmount || 0,

        paidCustomers:
          currentMonthSummary?.paid || 0,

        unpaidCustomers:
          currentMonthSummary?.unpaid || 0,
      });

    } catch (error) {
      console.error(
        "Reports API Error:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Failed to load reports"
      );
    } finally {
      setLoading(false);
    }
  };

  // ========================================
  // LOAD REPORTS
  // ========================================

  useEffect(() => {
    fetchReports();
  }, [selectedYear]);

  // ========================================
  // FORMAT MONEY
  // ========================================

  const formatMoney = (amount) => {
    return `Rs. ${Number(
      amount || 0
    ).toLocaleString("en-PK")}`;
  };

  // ========================================
  // SUMMARY CARDS
  // ========================================

  const cards = [
    {
      title: "Total Customers",
      value: loading
        ? "..."
        : currentSummary.totalCustomers,
      icon: Users,
    },

    {
      title: "Paid Customers",
      value: loading
        ? "..."
        : currentSummary.paidCustomers,
      icon: CheckCircle,
    },

    {
      title: "Unpaid Customers",
      value: loading
        ? "..."
        : currentSummary.unpaidCustomers,
      icon: Clock,
    },

    {
      title: "Total Amount",
      value: loading
        ? "..."
        : formatMoney(
            currentSummary.totalAmount
          ),
      icon: DollarSign,
    },
  ];

  // ========================================
  // LOADING
  // ========================================

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="flex h-64 items-center justify-center">
          <div className="flex items-center gap-3 text-gray-500">
            <RefreshCw
              size={20}
              className="animate-spin"
            />

            <p>Loading reports...</p>
          </div>
        </div>
      </div>
    );
  }

  // ========================================
  // UI
  // ========================================

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      {/* ========================================
          HEADER
      ======================================== */}

      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Reports
          </h1>

          <p className="mt-1 text-gray-500">
            View customer and payment reports
          </p>
        </div>

        {/* Year + Export */}

        <div className="flex flex-wrap gap-3">

          {/* YEAR */}

          <select
            value={selectedYear}
            onChange={(e) =>
              setSelectedYear(
                Number(e.target.value)
              )
            }
            className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 outline-none focus:border-blue-500"
          >
            <option value={currentYear}>
              {currentYear}
            </option>

            <option value={currentYear - 1}>
              {currentYear - 1}
            </option>

            <option value={currentYear - 2}>
              {currentYear - 2}
            </option>
          </select>

          {/* REFRESH */}

          <button
            type="button"
            onClick={fetchReports}
            className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-gray-700 transition hover:bg-gray-100"
          >
            <RefreshCw size={18} />
            Refresh
          </button>

          {/* EXPORT EXCEL */}

          <button
            type="button"
            className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-white transition hover:bg-green-700"
          >
            <Download size={18} />
            Export Excel
          </button>

          {/* EXPORT PDF */}

          <button
            type="button"
            className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-white transition hover:bg-red-700"
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
        <div className="mb-6 rounded-lg border border-red-200 bg-red-100 p-4 text-red-700">
          {error}
        </div>
      )}

      {/* ========================================
          CURRENT MONTH INFO
      ======================================== */}

      <div className="mb-6 rounded-xl border border-gray-100 bg-white p-5 shadow-sm">

        <p className="text-sm text-gray-500">
          Current Month
        </p>

        <h2 className="mt-1 text-xl font-bold text-gray-800">
          {months[currentMonthIndex]}{" "}
          {selectedYear}
        </h2>

      </div>

      {/* ========================================
          SUMMARY CARDS
      ======================================== */}

      <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

        {cards.map((card, index) => {
          const Icon = card.icon;

          return (
            <div
              key={index}
              className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm"
            >

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-sm text-gray-500">
                    {card.title}
                  </p>

                  <h2 className="mt-2 text-2xl font-bold text-gray-800">
                    {card.value}
                  </h2>

                </div>

                <div className="rounded-lg bg-gray-100 p-3">

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

      <div className="mb-8 rounded-xl border border-gray-100 bg-white p-6 shadow-sm">

        <h2 className="mb-5 text-lg font-semibold text-gray-800">
          Payment Summary -{" "}
          {months[currentMonthIndex]}{" "}
          {selectedYear}
        </h2>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">

          {/* TOTAL */}

          <div className="rounded-lg border p-4">

            <p className="text-sm text-gray-500">
              Total Amount
            </p>

            <h3 className="mt-2 text-xl font-bold text-gray-800">
              {formatMoney(
                currentSummary.totalAmount
              )}
            </h3>

          </div>

          {/* PAID */}

          <div className="rounded-lg border p-4">

            <p className="text-sm text-gray-500">
              Paid Amount
            </p>

            <h3 className="mt-2 text-xl font-bold text-green-600">
              {formatMoney(
                currentSummary.paidAmount
              )}
            </h3>

          </div>

          {/* UNPAID */}

          <div className="rounded-lg border p-4">

            <p className="text-sm text-gray-500">
              Pending Amount
            </p>

            <h3 className="mt-2 text-xl font-bold text-red-600">
              {formatMoney(
                currentSummary.unpaidAmount
              )}
            </h3>

          </div>

        </div>
      </div>

      {/* ========================================
          MONTHLY REPORT
      ======================================== */}

      <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">

        <div className="mb-5">

          <h2 className="text-lg font-semibold text-gray-800">
            Monthly Customer Report
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Customer and payment statistics for{" "}
            {selectedYear}
          </p>

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

                <th className="px-4 py-3 text-sm font-semibold text-gray-600">
                  Paid Amount
                </th>

                <th className="px-4 py-3 text-sm font-semibold text-gray-600">
                  Pending Amount
                </th>

              </tr>

            </thead>

            <tbody>

              {monthlyReports.map((report) => (

                <tr
                  key={report.month}
                  className="border-b transition hover:bg-gray-50"
                >

                  {/* MONTH */}

                  <td className="px-4 py-4 font-medium text-gray-800">
                    {report.month}
                  </td>

                  {/* CUSTOMERS */}

                  <td className="px-4 py-4 text-gray-600">
                    {report.customers}
                  </td>

                  {/* PAID */}

                  <td className="px-4 py-4">

                    <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                      {report.paid}
                    </span>

                  </td>

                  {/* UNPAID */}

                  <td className="px-4 py-4">

                    <span className="rounded-full bg-red-100 px-3 py-1 text-sm text-red-700">
                      {report.unpaid}
                    </span>

                  </td>

                  {/* TOTAL */}

                  <td className="px-4 py-4 font-medium text-gray-800">
                    {formatMoney(
                      report.amount
                    )}
                  </td>

                  {/* PAID AMOUNT */}

                  <td className="px-4 py-4 font-medium text-green-600">
                    {formatMoney(
                      report.paidAmount
                    )}
                  </td>

                  {/* PENDING AMOUNT */}

                  <td className="px-4 py-4 font-medium text-red-600">
                    {formatMoney(
                      report.unpaidAmount
                    )}
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