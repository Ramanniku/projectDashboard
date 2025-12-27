import { Mail, Phone, MapPin, Calendar, User, Globe, MessageSquare, Download, Printer, Share2, Bell, Wifi, Shield, CreditCard, Activity, Check, X, Eye, Trash2, CreditCard as CardIcon, MoreVertical, CheckCircle, XCircle, RefreshCw, WifiOff, Clock, Users, TrendingUp, Heart, Music, Video, ExternalLink, Lock, Facebook, Globe as GlobeIcon, Users as UsersIcon, Star, Target } from "lucide-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import DashboardFooter from "../Utility/Footer";
import Header from "../Utility/Header";
import Navbar from "../Utility/Navbar";
import Table from "../Utility/Table";
import data from "../Store/Data.json";

function ProjectView() {
  const user = useSelector((state) => state.auth.user);
  const isSidebarExpanded = useSelector((state) => state.ui.isSidebarExpanded);
  const [activeTab, setActiveTab] = useState("overview");
  const [connectionFilter, setConnectionFilter] = useState("all");

  // Get customer data from your data.json
  const customerData = data.customer || {};
  const customerBilling = customerData.billing || {};
  
  // Extract data with fallbacks
  const currentPlan = customerBilling.currentPlan || {};
  const plans = customerBilling.plans || [];
  const paymentMethods = customerBilling.paymentMethods || [];
  const billingHistory = customerBilling.billingHistory || [];
  const activity = customerData.activity || [];
  const projects = customerData.projects || [];
  const logsHistory = customerData.ActivtyHistory || [];
  const developmentConnections = customerData.developmentConnections || [];  
  const socialConnections = customerData.socialConnections || []; 
  
  // Navigation items
  const navItems = [
    { id: "profile", label: "Profile" },
    { id: "proposal", label: "Proposal"},
    { id: "tasks", label: "Tasks" },
    { id: "notes", label: "Notes" },
    { id: "comments", label: "Comments" },
  ];

  // Lead data from the provided information
  const leadInfo = {
    name: "Alexandra Dell",
    position: "CEO, Founder at Theme Ocean",
    company: "Theme Ocean",
    email: "alex.dellai@outlook.com",
    phone: "+01 (375) 5896 654",
    website: "https://themeforest.net/user/theme_ocean",
    leadValue: "$255.50 USD",
    address: "47813 Johnathon Parks Suite 559",
    city: "Cartermouth",
    state: "Connecticut",
    country: "United Kingdom",
    status: "active" // Assuming active status
  };

  // General Information data
  const generalInfo = {
    status: "Active",
    customer: "VIP",
    source: "Facebook",
    facebook: "facebook.com/alexandradell",
    defaultLanguage: "System Default",
    privacy: "Private",
    created: "26 MAY, 2023",
    assigned: "Alexandra Detla",
    leadBy: "Green Cute - Website design and development"
  };

  const Info = ({ label, value }) => (
    <div>
      <p className="text-gray-500 text-xs">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  );
  
  const Stat = ({ title, value, icon }) => (
    <div className="bg-gray-50 p-4 rounded-xl flex flex-col gap-2">
      <div className="text-blue-600">{icon}</div>
      <p className="text-sm font-medium">{title}</p>
      <p className="text-lg font-bold">{value}</p>
    </div>
  );
  const ProgressCard = ({ title, value, color }) => {
    const colors = {
      blue: "text-blue-600 bg-blue-50",
      orange: "text-orange-500 bg-orange-50",
      green: "text-green-500 bg-green-50",
      red: "text-red-500 bg-red-50"
    };
  
    return (
      <div className="bg-white p-4 rounded-xl shadow-sm">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${colors[color]}`}>
          <CheckCircle size={18} />
        </div>
        <p className="text-sm font-medium">{title}</p>
        <p className="text-lg font-bold">{value}</p>
      </div>
    );
  };
  
  const LinearProgress = ({ label, percent, color }) => {
    const barColors = {
      orange: "bg-orange-500",
      green: "bg-green-500"
    };
  
    return (
      <div className="bg-white p-4 rounded-xl shadow-sm">
        <div className="flex justify-between text-sm mb-2">
          <span>{label}</span>
          <span>{percent}%</span>
        </div>
        <div className="h-2 bg-gray-200 rounded">
          <div className={`h-2 rounded ${barColors[color]}`} style={{ width: `${percent}%` }} />
        </div>
      </div>
    );
  };
  
  const ChartPlaceholder = () => (
    <div className="bg-white p-4 rounded-xl shadow-sm h-48 flex items-center justify-center text-gray-400">
      Chart Here
    </div>
  );

  
  

  return (
    <div className="flex h-full bg-gray-50 min-h-screen">
      <Navbar />

      <div className="flex-1">
        <Header
          title="Projects"
          subtitle="Projects / View"
          user={user}
        />

        <div
          className="pt-[100px] px-6 pb-6 space-y-6"
          style={{
            paddingLeft: isSidebarExpanded ? "17.5rem" : "6.5rem",
          }}
        >
          {/* Main Content */}
         {/* Tabs */}
<div className="border-b flex gap-6 text-sm font-medium">
  {["overview", "activity", "timesheets", "milestones", "discussions"].map(tab => (
    <button
      key={tab}
      onClick={() => setActiveTab(tab)}
      className={`pb-3 capitalize ${
        activeTab === tab
          ? "border-b-2 border-blue-600 text-blue-600"
          : "text-gray-500 hover:text-blue-600"
      }`}
    >
      {tab}
    </button>
  ))}
</div>

{/* Project Card */}
<div className="bg-white rounded-xl shadow-sm p-6 space-y-6">

  {/* Header */}
  <div className="flex justify-between items-center">
    <div>
      <h2 className="text-xl font-semibold">Duralux || CRM Applications & Admin Dashboard</h2>
      <span className="inline-block mt-1 px-2 py-0.5 text-xs bg-blue-100 text-blue-600 rounded">
        In Progress
      </span>
    </div>

    <div className="flex items-center gap-2">
      <button className="p-2 border rounded-lg"><CheckCircle size={16} /></button>
      <button className="p-2 border rounded-lg"><Calendar size={16} /></button>
      <button className="p-2 border rounded-lg"><TrendingUp size={16} /></button>
      <button className="px-4 py-2 bg-green-500 text-white rounded-lg flex items-center gap-2">
        <Clock size={16} />
        Start Timer
      </button>
    </div>
  </div>

  {/* Progress */}
  <div>
    <div className="flex justify-between text-sm mb-2">
      <span className="text-gray-500">Projects In Progress</span>
      <span className="text-gray-500">16/25 Tasks Completed (78%)</span>
    </div>
    <div className="w-full bg-gray-200 h-2 rounded">
      <div className="bg-blue-600 h-2 rounded" style={{ width: "78%" }} />
    </div>
  </div>

  {/* Info + Stats */}
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Description */}
<div className="lg:col-span-2 text-sm text-gray-600 space-y-3 mt-4">
  <h3 className="font-semibold text-gray-800">Description</h3>
  <p>
    CRM (Customer Relationship Management) applications are software tools that help organizations manage interactions with their customers...
  </p>
  <ul className="list-disc ml-5 space-y-1">
    <li>Contact Management</li>
    <li>Sales Management</li>
    <li>Marketing Automation</li>
    <li>Customer Support</li>
    <li>Analytics and Reporting</li>
  </ul>
</div>


    {/* Project Info */}
{/* Project Info */}
<div className="lg:col-span-2 grid grid-cols-2 gap-6 text-sm">

  <Info label="Project" value="#01 - CRM Applications - G.Cute" />
  <Info label="Billing Type" value="Project Hours" />

  <Info label="Status" value="In Progress" />
  <Info label="Customer" value="Green Cute" />

  <Info label="Start Date" value="2023-02-25" />
  <Info label="End Date" value="2023-03-20" />

  <Info label="Hourly Rate" value="$25.00" />
  <Info label="Logged Hours" value="00:00:00" />

</div>


    {/* Stats */}
    <div className="grid grid-cols-2 gap-4">
      <Stat title="Logged Hours" value="00:00" icon={<Clock />} />
      <Stat title="Billable Hours" value="00:00" icon={<CreditCard />} />
      <Stat title="Billed Hours" value="00:00" icon={<Check />} />
      <Stat title="Unbilled Hours" value="00:00" icon={<X />} />
    </div>

  </div>
</div>


          <DashboardFooter />
        </div>
      </div>
    </div>
  );
}

export default ProjectView;