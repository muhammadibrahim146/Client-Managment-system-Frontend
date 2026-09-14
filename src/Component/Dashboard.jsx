import { useEffect, useState } from "react";
import axios from "axios";

import {
  Users,
  CheckCircle2,
  Clock3,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react";

export default function Dashboard() {
  const [summary, setSummary] = useState({
    totalCustomers: 0,
    paidCustomers: 0,
    unpaidCustomers: 0,
    totalAmount: 0,
    paidAmount: 0,
    unpaidAmount: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================
  // GET DASHBOARD SUMMARY
  // =========================

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get(
           "https://client-managment-system-backend-otp.vercel.app/api/customers",
        );

        console.log("Dashboard Summary:", response.data);

        setSummary(response.data.summary);
      } catch (error) {
        console.error("Dashboard API Error:", error);

        setError(
          error.response?.data?.message ||
            "Failed to load dashboard data"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  // =========================
  // STATS
  // =========================

  const stats = [
    {
      title: "Total Customers",
      value: loading ? "..." : summary.totalCustomers,
      icon: Users,
      description: "All registered customers",
    },
    {
      title: "Paid Customers",
      value: loading ? "..." : summary.paidCustomers,
      icon: CheckCircle2,
      description: "Payment completed",
    },
    {
      title: "Unpaid Customers",
      value: loading ? "..." : summary.unpaidCustomers,
      icon: Clock3,
      description: "Payment pending",
    },
    {
      title: "Monthly Sales",
      value: loading
        ? "..."
        : `Rs. ${Number(summary.paidAmount).toLocaleString()}`,
      icon: TrendingUp,
      description: "Current month sales",
    },
  ];

  return (
    <div className="space-y-8">

      {/* =========================
          HEADING
      ========================== */}

      <div>
        <p className="text-sm text-blue-600 font-semibold mb-2">
          OVERVIEW
        </p>

        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">
          Dashboard
        </h1>

        <p className="text-slate-500 mt-2">
          Manage your customers and track monthly payments.
        </p>
      </div>

      {/* =========================
          ERROR MESSAGE
      ========================== */}

      {error && (
        <div className="rounded-xl bg-red-50 border border-red-200 px-5 py-4 text-red-600">
          {error}
        </div>
      )}

      {/* =========================
          STATS
      ========================== */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >

              <div className="flex items-start justify-between">

                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Icon size={24} />
                </div>

                <ArrowUpRight
                  size={20}
                  className="text-slate-300"
                />

              </div>

              <p className="text-slate-500 text-sm mt-5">
                {stat.title}
              </p>

              <h2 className="text-2xl font-bold text-slate-900 mt-1">
                {stat.value}
              </h2>

              <p className="text-xs text-slate-400 mt-2">
                {stat.description}
              </p>

            </div>
          );
        })}

      </div>

      {/* =========================
          ADDITIONAL PAYMENT INFO
      ========================== */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        {/* Total Amount */}

        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <p className="text-sm text-slate-500">
            Total Customer Amount
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-2">
            {loading
              ? "..."
              : `Rs. ${Number(
                  summary.totalAmount
                ).toLocaleString()}`}
          </h2>

          <p className="text-sm text-slate-400 mt-2">
            Total amount from all customers
          </p>
        </div>

        {/* Unpaid Amount */}

        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <p className="text-sm text-slate-500">
            Unpaid Amount
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-2">
            {loading
              ? "..."
              : `Rs. ${Number(
                  summary.unpaidAmount
                ).toLocaleString()}`}
          </h2>

          <p className="text-sm text-slate-400 mt-2">
            Amount still pending
          </p>
        </div>

      </div>

      {/* =========================
          WELCOME CARD
      ========================== */}

      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8">

        <div className="relative z-10 max-w-xl">

          <p className="text-blue-100 text-sm font-semibold">
            CLIENT MANAGEMENT
          </p>

          <h2 className="text-2xl sm:text-3xl font-bold mt-2">
            Keep your customer records organized.
          </h2>

          <p className="text-blue-100 mt-3 leading-relaxed">
            Add customers, track payments, filter monthly
            records and monitor your sales from one place.
          </p>

        </div>

        <div className="absolute -right-16 -bottom-20 w-64 h-64 bg-white/10 rounded-full" />

        <div className="absolute right-20 -top-20 w-48 h-48 bg-white/10 rounded-full" />

      </div>

      {/* =========================
          QUICK ACTIONS
      ========================== */}

      <div>

        <h2 className="text-xl font-bold text-slate-900 mb-4">
          Quick Actions
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          <a
            href="/add-client"
            className="bg-white border border-slate-200 rounded-2xl p-6 hover:border-blue-300 hover:shadow-md transition"
          >

            <div className="flex items-center justify-between">

              <div>

                <h3 className="font-semibold text-lg">
                  Add New Client
                </h3>

                <p className="text-slate-500 text-sm mt-1">
                  Create a new customer record.
                </p>

              </div>

              <ArrowUpRight className="text-blue-600" />

            </div>

          </a>

          <a
            href="/customers"
            className="bg-white border border-slate-200 rounded-2xl p-6 hover:border-blue-300 hover:shadow-md transition"
          >

            <div className="flex items-center justify-between">

              <div>

                <h3 className="font-semibold text-lg">
                  View Customers
                </h3>

                <p className="text-slate-500 text-sm mt-1">
                  Search and manage customer records.
                </p>

              </div>

              <ArrowUpRight className="text-blue-600" />

            </div>

          </a>

        </div>

      </div>

    </div>
  );
}