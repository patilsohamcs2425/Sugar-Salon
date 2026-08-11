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
  { name: "Sugar Waxing", value: 45, color: "#e83870" },
  { name: "HydraFacials", value: 25, color: "#d4af37" },
  { name: "Hair Styling", value: 20, color: "#a855f7" },
  { name: "Gel Nails", value: 10, color: "#10b981" }
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
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <ShieldCheck className="text-purple-400" size={20} />
            <h1 className="text-2xl font-bold font-serif-heading text-slate-100">
              Sugar Salon Executive Portal
            </h1>
          </div>
          <p className="text-xs text-slate-400">Live operational metrics, booking queues, and service menu configuration.</p>
        </div>

        {/* Tab buttons */}
        <div className="flex items-center gap-2 bg-slate-900 p-1.5 rounded-full border border-slate-800">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors ${
              activeTab === "overview" ? "bg-purple-500 text-white" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Analytics
          </button>
          <button
            onClick={() => setActiveTab("appointments")}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors ${
              activeTab === "appointments" ? "bg-purple-500 text-white" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Bookings ({appointments.length})
          </button>
          <button
            onClick={() => setActiveTab("services")}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-colors ${
              activeTab === "services" ? "bg-purple-500 text-white" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Services ({services.length})
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-card rounded-3xl p-6 border border-pink-500/20">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs text-slate-400 uppercase font-semibold">Monthly Revenue</span>
            <div className="w-9 h-9 rounded-xl bg-pink-500/20 text-pink-400 flex items-center justify-center">
              <DollarSign size={18} />
            </div>
          </div>
          <span className="text-3xl font-extrabold text-slate-100 font-serif-heading">$14,200</span>
          <span className="text-[11px] text-emerald-400 font-bold block mt-1">+14% vs last month</span>
        </div>

        <div className="glass-card rounded-3xl p-6 border border-amber-500/20">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs text-slate-400 uppercase font-semibold">Total Appointments</span>
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center">
              <Calendar size={18} />
            </div>
          </div>
          <span className="text-3xl font-extrabold text-slate-100 font-serif-heading">{appointments.length + 42}</span>
          <span className="text-[11px] text-slate-400 block mt-1">12 Pending today</span>
        </div>

        <div className="glass-card rounded-3xl p-6 border border-purple-500/20">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs text-slate-400 uppercase font-semibold">Satisfaction Score</span>
            <div className="w-9 h-9 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center">
              <Star size={18} />
            </div>
          </div>
          <span className="text-3xl font-extrabold text-slate-100 font-serif-heading">4.95 / 5.0</span>
          <span className="text-[11px] text-purple-300 font-bold block mt-1">Top 1% Beauty Salon</span>
        </div>

        <div className="glass-card rounded-3xl p-6 border border-emerald-500/20">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs text-slate-400 uppercase font-semibold">Active Specialists</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center">
              <Users size={18} />
            </div>
          </div>
          <span className="text-3xl font-extrabold text-slate-100 font-serif-heading">4 Masters</span>
          <span className="text-[11px] text-emerald-400 font-bold block mt-1">Full shift covered</span>
        </div>
      </div>

      {/* Tab Content: Analytics */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Revenue Bar Chart */}
          <div className="lg:col-span-2 glass-panel rounded-3xl p-6 border border-slate-800">
            <h3 className="text-lg font-bold font-serif-heading text-slate-100 mb-6">
              Monthly Revenue Performance ($)
            </h3>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={REVENUE_DATA}>
                  <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
                  <YAxis stroke="#64748b" fontSize={12} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155", borderRadius: "12px" }}
                  />
                  <Bar dataKey="revenue" fill="#e83870" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Category Pie Chart */}
          <div className="glass-panel rounded-3xl p-6 border border-slate-800 flex flex-col justify-between">
            <h3 className="text-lg font-bold font-serif-heading text-slate-100 mb-4">
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
                    <span className="text-slate-300 font-medium">{cat.name}</span>
                  </div>
                  <span className="font-bold text-slate-100">{cat.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab Content: Appointments Queue */}
      {activeTab === "appointments" && (
        <div className="glass-panel rounded-3xl p-6 border border-slate-800">
          <h3 className="text-lg font-bold font-serif-heading text-slate-100 mb-6">
            Scheduled Guest Appointments
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-800 text-slate-400 uppercase tracking-wider">
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
              <tbody className="divide-y divide-slate-800/60 text-slate-200">
                {appointments.map((apt) => (
                  <tr key={apt.id} className="hover:bg-slate-900/50 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-amber-300">{apt.id}</td>
                    <td className="py-3.5 px-4 font-bold text-slate-100">{apt.clientName}</td>
                    <td className="py-3.5 px-4 text-slate-300">{apt.serviceTitle}</td>
                    <td className="py-3.5 px-4 text-pink-400">{apt.stylistName}</td>
                    <td className="py-3.5 px-4 text-slate-400">{apt.date} at {apt.timeSlot}</td>
                    <td className="py-3.5 px-4 font-bold text-pink-400">{formatCurrency(apt.price)}</td>
                    <td className="py-3.5 px-4">
                      <Badge
                        variant={
                          apt.status === "Confirmed"
                            ? "pink"
                            : apt.status === "Completed"
                            ? "emerald"
                            : "purple"
                        }
                      >
                        {apt.status}
                      </Badge>
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-2">
                      {apt.status !== "Completed" && (
                        <button
                          onClick={() => handleStatusChange(apt.id, "Completed")}
                          className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/30 text-[10px] font-semibold"
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
        <div className="glass-panel rounded-3xl p-6 border border-slate-800">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold font-serif-heading text-slate-100">
              Active Salon Menu Catalog
            </h3>
            <Button variant="primary" size="sm">
              <Plus size={14} className="mr-1" /> Add New Treatment
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {services.map((srv) => (
              <div key={srv.id} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={srv.image} alt={srv.title} className="w-12 h-12 rounded-xl object-cover" />
                  <div>
                    <h4 className="text-sm font-bold text-slate-100">{srv.title}</h4>
                    <span className="text-xs text-slate-400">{srv.duration}</span>
                  </div>
                </div>
                <span className="text-sm font-bold text-pink-400">{formatCurrency(srv.price)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
