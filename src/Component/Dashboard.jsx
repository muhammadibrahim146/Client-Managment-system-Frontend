import {
  Users,
  CheckCircle2,
  Clock3,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react";

export default function Dashboard() {
  const stats = [
    {
      title: "Total Customers",
      value: "0",
      icon: Users,
      description: "All registered customers",
    },
    {
      title: "Paid Customers",
      value: "0",
      icon: CheckCircle2,
      description: "Payment completed",
    },
    {
      title: "Unpaid Customers",
      value: "0",
      icon: Clock3,
      description: "Payment pending",
    },
    {
      title: "Monthly Sales",
      value: "Rs. 0",
      icon: TrendingUp,
      description: "Current month sales",
    },
  ];

  return (
    <div className="space-y-8">

      {/* Heading */}
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

      {/* Stats */}
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

      {/* Welcome Card */}
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

      {/* Quick Actions */}
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