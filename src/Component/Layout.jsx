import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  UserPlus,
  BarChart3,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import Dashboard from"./Dashboard.jsx"
export default function Layout() {
  const navigate = useNavigate();
  const [mobileMenu, setMobileMenu] = useState(false);

  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  const navItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Add Client",
      path: "/add-client",
      icon: UserPlus,
    },
    {
      name: "Customers",
      path: "/customers",
      icon: Users,
    },
    {
      name: "Reports",
      path: "/reports",
      icon: BarChart3,
    },
  ];

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
      isActive
        ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
        : "text-slate-400 hover:bg-slate-800 hover:text-white"
    }`;

  return (
    <div className="min-h-screen bg-[#f6f8fc] flex">

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-72 bg-[#111827] text-white flex-col fixed left-0 top-0 bottom-0">

        {/* Logo */}
        <div className="px-7 py-7 border-b border-slate-800">
          <div className="flex items-center gap-3">

            <div className="w-11 h-11 rounded-xl bg-blue-600 flex items-center justify-center font-bold text-xl">
              C
            </div>

            <div>
              <h1 className="font-bold text-lg">
                ClientFlow
              </h1>

              <p className="text-xs text-slate-400">
                Management System
              </p>
            </div>

          </div>
        </div>

        {/* Navigation */}
        <div className="px-4 py-7 flex-1">

          <p className="text-xs font-semibold uppercase text-slate-500 px-4 mb-4">
            Main Menu
          </p>

          <nav className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={linkClass}
                >
                  <Icon size={20} />
                  <span className="font-medium">
                    {item.name}
                  </span>
                </NavLink>
              );
            })}
          </nav>

        </div>

        {/* Admin */}
        <div className="p-4">

          <div className="bg-slate-800 rounded-xl p-4 mb-4">
            <div className="flex items-center gap-3">

              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center font-bold">
                A
              </div>

              <div>
                <p className="text-sm font-semibold">
                  Administrator
                </p>

                <p className="text-xs text-slate-400">
                  admin
                </p>
              </div>

            </div>
          </div>

          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition"
          >
            <LogOut size={19} />
            Logout
          </button>

        </div>

      </aside>

      {/* Mobile */}
      {mobileMenu && (
        <div className="fixed inset-0 z-50 lg:hidden">

          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileMenu(false)}
          />

          <aside className="relative w-72 h-full bg-[#111827] text-white p-5">

            <button
              onClick={() => setMobileMenu(false)}
              className="absolute right-4 top-4 text-slate-400"
            >
              <X />
            </button>

            <h1 className="text-xl font-bold mb-8">
              ClientFlow
            </h1>

            <nav className="space-y-2">

              {navItems.map((item) => {
                const Icon = item.icon;

                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenu(false)}
                    className={linkClass}
                  >
                    <Icon size={20} />
                    {item.name}
                  </NavLink>
                );
              })}

            </nav>

          </aside>

        </div>
      )}

      {/* Main */}
      <div className="flex-1 lg:ml-72">

        {/* Topbar */}
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-5 sm:px-8">

          <button
            onClick={() => setMobileMenu(true)}
            className="lg:hidden text-slate-700"
          >
            <Menu />
          </button>

          <div className="hidden lg:block">
            <p className="text-sm text-slate-400">
              Welcome back 👋
            </p>

            <h2 className="font-semibold text-slate-800">
              Administrator
            </h2>
          </div>

          <div className="ml-auto flex items-center gap-3">

            <div className="hidden sm:block text-right">
              <p className="text-sm font-semibold">
                Admin
              </p>

              <p className="text-xs text-slate-400">
                Administrator
              </p>
            </div>

            <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
              A
            </div>

          </div>

        </header>

        {/* Page */}
        <main className="p-5 sm:p-8">
          <Outlet />
        </main>

      </div>

    </div>
  );
}