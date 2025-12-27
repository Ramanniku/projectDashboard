import { Mail, Phone, MapPin, Calendar, User, Globe, MessageSquare, Download, Printer, Share2, Bell, Wifi, Shield, CreditCard, Activity, Check, X, Eye, Trash2, CreditCard as CardIcon, MoreVertical, CheckCircle, XCircle, RefreshCw, WifiOff, Clock, Users, TrendingUp, Heart, Music, Video, ExternalLink, Lock, Facebook, Globe as GlobeIcon, Users as UsersIcon, Star, Target } from "lucide-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import DashboardFooter from "../Utility/Footer";
import Header from "../Utility/Header";
import Navbar from "../Utility/Navbar";
import Table from "../Utility/Table";
import data from "../Store/Data.json";

function LeadCreate() {
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







    return (
        <div className="flex h-full bg-gray-50 min-h-screen">
            <Navbar />

            <div className="flex-1">
                <Header
                    title="Leads"
                    subtitle="Leads / View"
                    user={user}
                />

                <div
                    className="pt-[100px] px-6 pb-6 space-y-6"
                    style={{
                        paddingLeft: isSidebarExpanded ? "17.5rem" : "6.5rem",
                    }}
                >
                    {/* Main Content */}
                    {/* Main Content */}
                    <div className="space-y-6">

                        {/* Page Header */}
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">Leads</h1>
                                <div className="flex items-center text-gray-500 mt-2 text-sm">
                                    <span>Home</span>
                                    <span className="mx-2">›</span>
                                    <span className="text-gray-800">Create</span>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <button className="px-4 py-2 border rounded-lg text-sm hover:bg-gray-50">
                                    Save as Draft
                                </button>
                                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
                                    Create Lead
                                </button>
                            </div>
                        </div>

                        {/* Lead Status Card */}
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <h2 className="text-lg font-semibold">Lead Status</h2>
                                    <p className="text-sm text-gray-500">
                                        Typically refers to adding a new potential customer or sales prospect
                                    </p>
                                </div>
                                <button className="px-4 py-2 border rounded-lg text-sm hover:bg-gray-50">
                                    Create Invoice
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="text-sm text-gray-600">Status</label>
                                    <select className="w-full mt-1 border rounded-lg p-2">
                                        <option>New</option>
                                        <option>Contacted</option>
                                        <option>Qualified</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="text-sm text-gray-600">Source</label>
                                    <select className="w-full mt-1 border rounded-lg p-2">
                                        <option>Facebook</option>
                                        <option>Google</option>
                                        <option>Referral</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="text-sm text-gray-600">Visibility</label>
                                    <select className="w-full mt-1 border rounded-lg p-2">
                                        <option>Public</option>
                                        <option>Private</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="text-sm text-gray-600">Tags</label>
                                    <input className="w-full mt-1 border rounded-lg p-2" placeholder="Enter tags" />
                                </div>

                                <div>
                                    <label className="text-sm text-gray-600">Assigned</label>
                                    <input className="w-full mt-1 border rounded-lg p-2" placeholder="Assign user" />
                                </div>

                                <div>
                                    <label className="text-sm text-gray-600">Groups</label>
                                    <input className="w-full mt-1 border rounded-lg p-2" placeholder="Enter group" />
                                </div>
                            </div>
                        </div>

                        {/* Lead Info Card */}
                        <div className="bg-white rounded-xl shadow-sm p-6">
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <h2 className="text-lg font-semibold">Lead Info</h2>
                                    <p className="text-sm text-gray-500">General information for your lead</p>
                                </div>
                                <button className="px-4 py-2 border rounded-lg text-sm hover:bg-gray-50">
                                    Edit Lead
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm text-gray-600">Name</label>
                                    <input className="w-full mt-1 border rounded-lg p-2" placeholder="Full Name" />
                                </div>

                                <div>
                                    <label className="text-sm text-gray-600">Email</label>
                                    <input className="w-full mt-1 border rounded-lg p-2" placeholder="Email address" />
                                </div>

                                <div>
                                    <label className="text-sm text-gray-600">Phone</label>
                                    <input className="w-full mt-1 border rounded-lg p-2" placeholder="Phone number" />
                                </div>

                                <div>
                                    <label className="text-sm text-gray-600">Company</label>
                                    <input className="w-full mt-1 border rounded-lg p-2" placeholder="Company name" />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="text-sm text-gray-600">Address</label>
                                    <textarea className="w-full mt-1 border rounded-lg p-2" rows={3} placeholder="Enter address" />
                                </div>

                                {/* Description */}
                                <div className="md:col-span-2">
                                    <label className="text-sm text-gray-600">Description</label>
                                    <textarea
                                        className="w-full mt-1 border rounded-lg p-2"
                                        rows={4}
                                        placeholder="Description"
                                    />
                                </div>

                                {/* Country */}
                                <div>
                                    <label className="text-sm text-gray-600">Country</label>
                                    <select className="w-full mt-1 border rounded-lg p-2">
                                        <option>United States</option>
                                        <option>India</option>
                                        <option>Germany</option>
                                    </select>
                                </div>

                                {/* State */}
                                <div>
                                    <label className="text-sm text-gray-600">State</label>
                                    <select className="w-full mt-1 border rounded-lg p-2">
                                        <option>Select state</option>
                                    </select>
                                </div>

                                {/* City */}
                                <div>
                                    <label className="text-sm text-gray-600">City</label>
                                    <select className="w-full mt-1 border rounded-lg p-2">
                                        <option>Select city</option>
                                    </select>
                                </div>

                                {/* Time Zone */}
                                <div>
                                    <label className="text-sm text-gray-600">Time Zone</label>
                                    <select className="w-full mt-1 border rounded-lg p-2">
                                        <option>(GMT) Western Europe Time</option>
                                        <option>(GMT+5:30) India Standard Time</option>
                                    </select>
                                </div>

                                {/* Languages */}
                                <div className="md:col-span-2">
                                    <label className="text-sm text-gray-600">Languages</label>
                                    <div className="w-full mt-1 border rounded-lg p-2 flex flex-wrap gap-2">
                                        {["English", "Bengali - বাংলা", "German (Austria)"].map((lang) => (
                                            <span
                                                key={lang}
                                                className="bg-gray-100 text-sm px-3 py-1 rounded-full flex items-center gap-2"
                                            >
                                                <span className="w-2 h-2 bg-green-500 rounded-full" />
                                                {lang}
                                                <span className="text-gray-400 cursor-pointer">×</span>
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Currency */}
                                <div>
                                    <label className="text-sm text-gray-600">Currency</label>
                                    <select className="w-full mt-1 border rounded-lg p-2">
                                        <option>USD - US Dollar - $</option>
                                        <option>INR - Indian Rupee - ₹</option>
                                        <option>EUR - Euro - €</option>
                                    </select>
                                </div>

                            </div>
                        </div>

                    </div>


                    <DashboardFooter />
                </div>
            </div>
        </div>
    );
}

export default LeadCreate;