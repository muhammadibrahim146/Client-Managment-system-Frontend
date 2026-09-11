
import React from "react";
import {
  Users,
  CheckCircle,
  Clock,
  DollarSign,
  Download,
  FileText,
} from "lucide-react";

const Reports = () => {
  // Temporary data
  // Baad mein ye data backend API se aayega
  const monthlyReports = [
    {
      month: "January",
      customers: 25,
      paid: 20,
      unpaid: 5,
      amount: 80000,
    },
    {
      month: "February",
      customers: 30,
      paid: 24,
      unpaid: 6,
      amount: 95000,
    },
    {
      month: "March",
      customers: 28,
      paid: 21,
      unpaid: 7,
      amount: 90000,
    },
    {
      month: "April",
      customers: 32,
      paid: 26,
      unpaid: 6,
      amount: 110000,
    },
  ];

  const totalCustomers = monthlyReports.reduce(
    (total, item) => total + item.customers,
    0
  );

  const totalPaid = monthlyReports.reduce(
    (total, item) => total + item.paid,
    0
  );

  const totalUnpaid = monthlyReports.reduce(
    (total, item) => total + item.unpaid,
    0
  );

  const totalAmount = monthlyReports.reduce(
    (total, item) => total + item.amount,
    0
  );

  const paidAmount = 380000;
  const pendingAmount = totalAmount - paidAmount;

  const cards = [
    {
      title: "Total Customers",
      value: totalCustomers,
      icon: Users,
    },
    {
      title: "Paid Customers",
      value: totalPaid,
      icon: CheckCircle,
    },
    {
      title: "Unpaid Customers",
      value: totalUnpaid,
      icon: Clock,
    },
    {
      title: "Total Amount",
      value: `Rs. ${totalAmount.toLocaleString()}`,
      icon: DollarSign,
    },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      {/* Header */}
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
          <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
            <Download size={18} />
            Export Excel
          </button>

          <button className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
            <FileText size={18} />
            Export PDF
          </button>
        </div>
      </div>

      {/* Summary Cards */}
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
                  <Icon size={24} className="text-gray-700" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Payment Summary */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-5">
          Payment Summary
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

          <div className="border rounded-lg p-4">
            <p className="text-sm text-gray-500">
              Total Amount
            </p>

            <h3 className="text-xl font-bold text-gray-800 mt-2">
              Rs. {totalAmount.toLocaleString()}
            </h3>
          </div>

          <div className="border rounded-lg p-4">
            <p className="text-sm text-gray-500">
              Paid Amount
            </p>

            <h3 className="text-xl font-bold text-green-600 mt-2">
              Rs. {paidAmount.toLocaleString()}
            </h3>
          </div>

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

      {/* Monthly Reports */}
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

              {monthlyReports.map((report, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-4 font-medium text-gray-800">
                    {report.month}
                  </td>

                  <td className="px-4 py-4 text-gray-600">
                    {report.customers}
                  </td>

                  <td className="px-4 py-4">
                    <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-700">
                      {report.paid}
                    </span>
                  </td>

                  <td className="px-4 py-4">
                    <span className="px-3 py-1 rounded-full text-sm bg-red-100 text-red-700">
                      {report.unpaid}
                    </span>
                  </td>

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
