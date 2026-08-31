import React, { useState, useEffect } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from "recharts";
import {
  DollarSign, Calendar, Users, Star, CheckCircle, Clock, XCircle,
  Scissors, Plus, ShieldCheck, Sparkles, Search, RefreshCw, Phone, Mail
} from "lucide-react";
import { getAppointments, updateAppointmentStatus, getServices } from "../../services/appointmentService";
import { formatCurrency } from "../../utils/formatters";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";
import toast from "react-hot-toast";

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
  const [activeTab, setActiveTab] = useState("appointments");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const apts = await getAppointments();
      const srvs = await getServices();
      setAppointments(apts);
      setServices(srvs);
    } catch (err) {
      console.error("Failed to load admin data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    const updated = await updateAppointmentStatus(id, newStatus);
    setAppointments(updated);
    toast.success(`Booking ${id} marked as ${newStatus}`);
  };

  const filteredAppointments = appointments.filter((apt) => {
    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase();
    const refId = (apt.referenceId || apt.id || "").toLowerCase();
    const name = (apt.clientName || "").toLowerCase();
    const phone = (apt.clientPhone || "").toLowerCase();
    const email = (apt.clientEmail || "").toLowerCase();
    const service = (apt.serviceTitle || "").toLowerCase();
    return refId.includes(term) || name.includes(term) || phone.includes(term) || email.includes(term) || service.includes(term);
  });

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
          <p className="text-xs text-gray-500">Live operational metrics, real customer verification, and Firestore appointment queue.</p>
        </div>

        {/* Tab buttons & Refresh */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={fetchData}
            className="p-2 rounded-full border border-gray-200 hover:bg-gray-100 text-gray-700 cursor-pointer shadow-2xs"
            title="Refresh bookings from Firestore"
          >
            <RefreshCw size={16} className={isLoading ? "animate-spin text-amber-700" : ""} />
          </button>

          <div className="flex items-center gap-1.5 bg-gray-100 p-1.5 rounded-full border border-gray-200">
            <button
              onClick={() => setActiveTab("appointments")}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                activeTab === "appointments" ? "bg-amber-600 text-white shadow-2xs" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Bookings ({appointments.length})
            </button>
            <button
              onClick={() => setActiveTab("overview")}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                activeTab === "overview" ? "bg-amber-600 text-white shadow-2xs" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Analytics
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
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-2xs">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs text-gray-500 uppercase font-bold">Total Appointments</span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-800 border border-amber-200 flex items-center justify-center">
              <Calendar size={18} />
            </div>
          </div>
          <span className="text-3xl font-extrabold text-gray-900 font-serif-heading">{appointments.length}</span>
          <span className="text-[11px] text-emerald-700 font-bold block mt-1">Live Backend Records</span>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-2xs">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs text-gray-500 uppercase font-bold">Monthly Revenue</span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-800 border border-amber-200 flex items-center justify-center">
              <DollarSign size={18} />
            </div>
          </div>
          <span className="text-3xl font-extrabold text-gray-900 font-serif-heading">₹1,42,000</span>
          <span className="text-[11px] text-emerald-700 font-bold block mt-1">+14% vs last month</span>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-2xs">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs text-gray-500 uppercase font-bold">Satisfaction Score</span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-800 border border-amber-200 flex items-center justify-center">
              <Star size={18} />
            </div>
          </div>
          <span className="text-3xl font-extrabold text-gray-900 font-serif-heading">4.9 / 5.0</span>
          <span className="text-[11px] text-amber-800 font-bold block mt-1">Verified Google Location</span>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-2xs">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs text-gray-500 uppercase font-bold">Salon Timings</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center justify-center">
              <Clock size={18} />
            </div>
          </div>
          <span className="text-xl font-extrabold text-gray-900 font-serif-heading">11 AM – 9 PM</span>
          <span className="text-[11px] text-emerald-700 font-bold block mt-1">Open 7 Days a Week</span>
        </div>
      </div>

      {/* Tab Content: Appointments Queue with Search / Customer Verification */}
      {activeTab === "appointments" && (
        <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-2xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold font-serif-heading text-gray-900">
                Customer Appointments & Reference Verification
              </h3>
              <p className="text-xs text-gray-500">Lookup customer bookings by Reference ID, Name, or Phone number.</p>
            </div>

            {/* Search Bar */}
            <div className="relative min-w-[280px]">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search Reference ID (SUGAR-REF-...) or Name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-300 rounded-xl text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:border-amber-500 shadow-2xs font-medium"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-gray-200 text-gray-500 uppercase tracking-wider font-bold bg-gray-50/50">
                <tr>
                  <th className="py-3 px-4">Reference ID</th>
                  <th className="py-3 px-4">Customer Details</th>
                  <th className="py-3 px-4">Service Experience</th>
                  <th className="py-3 px-4">Date & Slot</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4">Verification</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-800">
                {filteredAppointments.length > 0 ? (
                  filteredAppointments.map((apt) => (
                    <tr key={apt.id} className="hover:bg-amber-50/20 transition-colors">
                      <td className="py-3.5 px-4">
                        <span className="font-mono font-extrabold text-amber-900 bg-amber-50 px-2 py-1 rounded-lg border border-amber-200 block whitespace-nowrap">
                          {apt.referenceId || apt.id}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-gray-900">{apt.clientName}</div>
                        <div className="text-[11px] text-gray-600 flex items-center gap-1 mt-0.5">
                          <Phone size={10} className="text-amber-700" /> {apt.clientPhone || "No phone provided"}
                        </div>
                        {apt.clientEmail && (
                          <div className="text-[11px] text-gray-400 flex items-center gap-1">
                            <Mail size={10} /> {apt.clientEmail}
                          </div>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-gray-700">
                        <div className="font-medium text-gray-900">{apt.serviceTitle}</div>
                        {apt.addons && apt.addons.length > 0 && (
                          <div className="text-[10px] text-amber-800 font-semibold">
                            +{apt.addons.join(", ")}
                          </div>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-gray-600 whitespace-nowrap">
                        <div className="font-bold text-gray-900">{apt.date}</div>
                        <div className="text-[11px] text-amber-900 font-semibold">{apt.timeSlot}</div>
                      </td>
                      <td className="py-3.5 px-4 font-extrabold text-amber-900 whitespace-nowrap">
                        {formatCurrency(apt.price)}
                      </td>
                      <td className="py-3.5 px-4">
                        {apt.isGoogleUser ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200 whitespace-nowrap">
                            <Sparkles size={10} /> Google User
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-gray-100 text-gray-700 border border-gray-200 whitespace-nowrap">
                            Guest Booking
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-right space-x-2 whitespace-nowrap">
                        {apt.status !== "Completed" ? (
                          <button
                            onClick={() => handleStatusChange(apt.id, "Completed")}
                            className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-300 hover:bg-emerald-100 text-[10px] font-bold cursor-pointer transition-colors shadow-2xs"
                          >
                            Mark Complete
                          </button>
                        ) : (
                          <Badge variant="emerald">Completed</Badge>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="text-center py-8 text-gray-500">
                      No appointments matching "{searchTerm}".
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab Content: Analytics */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-gray-200 shadow-2xs">
            <h3 className="text-lg font-bold font-serif-heading text-gray-900 mb-6">
              Monthly Revenue Performance (INR)
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
