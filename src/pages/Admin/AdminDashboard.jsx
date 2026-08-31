import React, { useState, useEffect } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from "recharts";
import {
  DollarSign, Calendar, Users, Star, CheckCircle, Clock, XCircle,
  Scissors, Plus, ShieldCheck, Sparkles
} from "lucide-react";
import { getAppointments, updateAppointmentStatus, getServices } from "../../services/appointmentService";
import { formatCurrency } from "../../utils/formatters";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";
import { Modal } from "../../components/ui/Modal";

const REVENUE_DATA = [
  { month: "Jan", revenue: 8400 },
  { month: "Feb", revenue: 9200 },
  { month: "Mar", revenue: 10500 },
  { month: "Apr", revenue: 11800 },
  { month: "May", revenue: 12450 },
  { month: "Jun", revenue: 14200 }
];

const CATEGORY_PIE = [
  { name: "Facials & Skin", value: 35, color: "#d4af37" },
  { name: "Waxing & Threading", value: 30, color: "#b88e2b" },
  { name: "Manicure & Pedicure", value: 20, color: "#10b981" },
  { name: "Hair Care & Styling", value: 15, color: "#6366f1" }
];

export const AdminDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [services, setServices] = useState([]);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const fetchData = async () => {
      const apts = await getAppointments();
      const srvs = await getServices();
      setAppointments(apts);
      setServices(srvs);
    };
    fetchData();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    const updated = await updateAppointmentStatus(id, newStatus);
    setAppointments(updated);
  };

  return (
    <div className="space-y-8 bg-white text-gray-900">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-gray-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <ShieldCheck className="text-amber-700" size={20} />
            <h1 className="text-2xl font-bold font-serif-heading text-gray-900">
              Sugar Salon Executive Portal
            </h1>
          </div>
          <p className="text-xs text-gray-500">Live operational metrics, booking queues, and service menu configuration.</p>
        </div>

        {/* Tab buttons */}
        <div className="flex items-center gap-2 bg-gray-100 p-1.5 rounded-full border border-gray-200">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors cursor-pointer ${
              activeTab === "overview" ? "bg-amber-600 text-white shadow-2xs" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Analytics
          </button>
          <button
            onClick={() => setActiveTab("appointments")}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors cursor-pointer ${
              activeTab === "appointments" ? "bg-amber-600 text-white shadow-2xs" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Bookings ({appointments.length})
          </button>
          <button
            onClick={() => setActiveTab("services")}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors cursor-pointer ${
              activeTab === "services" ? "bg-amber-600 text-white shadow-2xs" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Services ({services.length})
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-2xs">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs text-gray-500 uppercase font-bold">Monthly Revenue</span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-800 border border-amber-200 flex items-center justify-center">
              <DollarSign size={18} />
            </div>
          </div>
          <span className="text-3xl font-extrabold text-gray-900 font-serif-heading">$14,200</span>
          <span className="text-[11px] text-emerald-700 font-bold block mt-1">+14% vs last month</span>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-2xs">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs text-gray-500 uppercase font-bold">Total Appointments</span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-800 border border-amber-200 flex items-center justify-center">
              <Calendar size={18} />
            </div>
          </div>
          <span className="text-3xl font-extrabold text-gray-900 font-serif-heading">{appointments.length + 42}</span>
          <span className="text-[11px] text-gray-500 block mt-1">12 Pending today</span>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-2xs">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs text-gray-500 uppercase font-bold">Satisfaction Score</span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-800 border border-amber-200 flex items-center justify-center">
              <Star size={18} />
            </div>
          </div>
          <span className="text-3xl font-extrabold text-gray-900 font-serif-heading">4.95 / 5.0</span>
          <span className="text-[11px] text-amber-800 font-bold block mt-1">Top 1% Beauty Salon</span>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-2xs">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs text-gray-500 uppercase font-bold">Active Specialists</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center justify-center">
              <Users size={18} />
            </div>
          </div>
          <span className="text-3xl font-extrabold text-gray-900 font-serif-heading">4 Masters</span>
          <span className="text-[11px] text-emerald-700 font-bold block mt-1">Full shift covered</span>
        </div>
      </div>

      {/* Tab Content: Analytics */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Revenue Bar Chart */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-gray-200 shadow-2xs">
            <h3 className="text-lg font-bold font-serif-heading text-gray-900 mb-6">
              Monthly Revenue Performance ($)
            </h3>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={REVENUE_DATA}>
                  <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
                  <YAxis stroke="#64748b" fontSize={12} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#ffffff", borderColor: "#e2e8f0", borderRadius: "12px" }}
                  />
                  <Bar dataKey="revenue" fill="#d4af37" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Category Pie Chart */}
          <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-2xs flex flex-col justify-between">
            <h3 className="text-lg font-bold font-serif-heading text-gray-900 mb-4">
              Service Category Share
            </h3>
            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={CATEGORY_PIE} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                    {CATEGORY_PIE.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2">
              {CATEGORY_PIE.map((cat) => (
                <div key={cat.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
                    <span className="text-gray-700 font-medium">{cat.name}</span>
                  </div>
                  <span className="font-bold text-gray-900">{cat.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab Content: Appointments Queue */}
      {activeTab === "appointments" && (
        <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-2xs">
          <h3 className="text-lg font-bold font-serif-heading text-gray-900 mb-6">
            Scheduled Guest Appointments
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-gray-200 text-gray-500 uppercase tracking-wider font-bold">
                <tr>
                  <th className="py-3 px-4">Booking ID</th>
                  <th className="py-3 px-4">Client Name</th>
                  <th className="py-3 px-4">Service Experience</th>
                  <th className="py-3 px-4">Specialist</th>
                  <th className="py-3 px-4">Date & Time</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-800">
                {appointments.map((apt) => (
                  <tr key={apt.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-amber-900">{apt.id}</td>
                    <td className="py-3.5 px-4 font-bold text-gray-900">{apt.clientName}</td>
                    <td className="py-3.5 px-4 text-gray-700">{apt.serviceTitle}</td>
                    <td className="py-3.5 px-4 text-amber-800 font-semibold">{apt.stylistName}</td>
                    <td className="py-3.5 px-4 text-gray-600">{apt.date} at {apt.timeSlot}</td>
                    <td className="py-3.5 px-4 font-bold text-amber-900">{formatCurrency(apt.price)}</td>
                    <td className="py-3.5 px-4">
                      <Badge
                        variant={
                          apt.status === "Confirmed"
                            ? "gold"
                            : apt.status === "Completed"
                            ? "emerald"
                            : "slate"
                        }
                      >
                        {apt.status}
                      </Badge>
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-2">
                      {apt.status !== "Completed" && (
                        <button
                          onClick={() => handleStatusChange(apt.id, "Completed")}
                          className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 text-[10px] font-bold cursor-pointer"
                        >
                          Mark Complete
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab Content: Services Configuration */}
      {activeTab === "services" && (
        <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-2xs">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold font-serif-heading text-gray-900">
              Active Salon Menu Catalog
            </h3>
            <Button variant="primary" size="sm">
              <Plus size={14} className="mr-1" /> Add New Treatment
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {services.map((srv) => (
              <div key={srv.id} className="p-4 rounded-2xl bg-white border border-gray-200 flex items-center justify-between shadow-2xs">
                <div className="flex items-center gap-3">
                  <img src={srv.image} alt={srv.title} className="w-12 h-12 rounded-xl object-cover border border-gray-200" />
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">{srv.title}</h4>
                    <span className="text-xs text-gray-500">{srv.duration}</span>
                  </div>
                </div>
                <span className="text-sm font-bold text-amber-900">{formatCurrency(srv.price)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
