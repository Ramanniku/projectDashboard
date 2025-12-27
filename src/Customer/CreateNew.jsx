import { useState } from "react";
import { useSelector } from "react-redux";
import { Mail, Phone, MapPin, Calendar, User, Globe, MessageSquare, Download, Printer, Share2, Bell, Wifi, Shield, CreditCard, Activity, Check, X, Eye, Trash2, CreditCard as CardIcon, MoreVertical, CheckCircle, XCircle, RefreshCw, WifiOff, Clock, Users, TrendingUp, Heart, Music, Video, ExternalLink, Upload, Lock, Package, Settings, Camera, Save, Edit, ChevronDown, Globe as GlobeIcon } from "lucide-react";
import React from 'react'
import Navbar from "../Utility/Navbar";
import Header from "../Utility/Header";
import DashboardFooter from "../Utility/Footer";
import Table from "../Utility/Table";
import data from "../Store/Data.json";

function CustomerNew() {
    const user = useSelector((state) => state.auth.user);
    const isSidebarExpanded = useSelector((state) => state.ui.isSidebarExpanded);
    
    const [activeTab, setActiveTab] = useState("profile");
    const [avatarPreview, setAvatarPreview] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
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
    
    // Form state
    const [formData, setFormData] = useState({
      name: "Alexandra Della",
      email: "alex.della@outlook.com",
      username: "theme_ocean",
      phone: "+01 (375) 2589 645",
      company: "Theme Ocean",
      password: "",
      confirmPassword: "",
      currentPassword: "",
      billingAddress: "123 Main St, San Francisco, CA 94105",
      shippingAddress: "123 Main St, San Francisco, CA 94105",
      subscription: "Pro Plan",
      avatar: null,
      // Additional Information fields
      dateOfBirth: "",
      country: "United States",
      state: "",
      city: "",
      timeZone: "(GMT) Western Europe Time",
      languages: ["English"],
      currency: "USD - US Dollar - $",
      group: "Personal",
      // Security fields
      twoFactorAuth: false,
      // Billing & Shipping fields
      billingZipCode: "94105",
      billingCountry: "United States",
      billingState: "California",
      billingCity: "San Francisco",
      billingAddress2: "Apt 4B",
      sameAsCustomerState: false,
      shippingZipCode: "94105",
      shippingCountry: "United States",
      shippingState: "California",
      shippingCity: "San Francisco",
      shippingSameAsBilling: true,
      shippingInstructions: "Leave at front door",
      defaultPaymentMethod2: false
    });
  
    const tabs = [
      { id: "profile", label: "Profile", icon: User },
      { id: "password", label: "Password", icon: Lock },
      { id: "billing", label: "Billing & Shipping", icon: CreditCard },
      { id: "subscription", label: "Subscription", icon: Package },
      { id: "notifications", label: "Notifications", icon: Bell },
      { id: "connection", label: "Connection", icon: Wifi }
    ];

    // Additional Information data
    const countries = ["United States", "Canada", "United Kingdom", "Germany", "France", "Australia", "Japan", "India"];
    const timeZones = ["(GMT) Western Europe Time", "(GMT) Greenwich Mean Time", "(EST) Eastern Standard Time", "(PST) Pacific Standard Time", "(CST) Central Standard Time", "(IST) Indian Standard Time"];
    const languages = ["English", "Spanish", "French", "German", "Chinese", "Japanese", "Arabic", "Hindi", "Bengali", "Portuguese", "Russian"];
    const currencies = ["USD - US Dollar - $", "EUR - Euro - €", "GBP - British Pound - £", "JPY - Japanese Yen - ¥", "CAD - Canadian Dollar - C$", "AUD - Australian Dollar - A$"];
    const groups = ["Personal", "Team", "Business", "Enterprise", "Admin"];

    // Table columns for Billing History
    const billingHistoryColumns = [
      { 
        header: "ID", 
        accessor: "id",
        align: "text-left"
      },
      { 
        header: "DATE", 
        accessor: "date",
        align: "text-left"
      },
      { 
        header: "AMOUNT", 
        accessor: "amount",
        align: "text-left"
      },
      { 
        header: "STATUS", 
        accessor: "status",
        align: "text-left",
        render: (row) => (
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
            row.status === 'Completed' 
              ? 'bg-green-100 text-green-800'
              : 'bg-yellow-100 text-yellow-800'
          }`}>
            {row.status}
          </span>
        )
      },
    ];

    // Table columns for Social Connections
    const socialConnectionsColumns = [
      { 
        header: "PLATFORM", 
        accessor: "name",
        align: "text-left",
        render: (row) => (
          <div className="flex items-center">
            {row.icon ? (
              <img 
                src={row.icon} 
                alt={row.name} 
                className="h-8 w-8 rounded mr-3"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextElementSibling.style.display = 'flex';
                }}
              />
            ) : null}
            <div className={`h-8 w-8 rounded mr-3 flex items-center justify-center bg-gray-100 ${
              !row.icon ? '' : 'hidden'
            }`}>
              <span className="font-semibold text-gray-600">
                {row.name.charAt(0)}
              </span>
            </div>
            <div>
              <div className="font-medium text-gray-900">{row.name}</div>
              <div className="text-sm text-gray-500">{row.description}</div>
            </div>
          </div>
        )
      },
      { 
        header: "STATUS", 
        accessor: "status",
        align: "text-left",
        render: (row) => (
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
            row.status === 'connected' 
              ? 'bg-green-100 text-green-800'
              : row.status === 'disconnected'
              ? 'bg-red-100 text-red-800'
              : 'bg-yellow-100 text-yellow-800'
          }`}>
            {row.status === 'connected' 
              ? <Check size={12} className="mr-1" />
              : row.status === 'disconnected'
              ? <X size={12} className="mr-1" />
              : <Clock size={12} className="mr-1" />
            }
            {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
          </span>
        )
      },
      { 
        header: "FOLLOWERS", 
        accessor: "followers",
        align: "text-center",
        render: (row) => (
          <div className="flex items-center justify-center">
            <Users className="h-4 w-4 text-gray-400 mr-2" />
            <span className="font-medium">{row.followers}</span>
          </div>
        )
      },
      { 
        header: "FOLLOWING", 
        accessor: "following",
        align: "text-center",
        render: (row) => (
          <div className="flex items-center justify-center">
            <TrendingUp className="h-4 w-4 text-gray-400 mr-2" />
            <span className="font-medium">{row.following}</span>
          </div>
        )
      },
      { 
        header: "LAST ACTIVITY", 
        accessor: "lastActivity",
        align: "text-center",
        render: (row) => (
          <div className="text-sm">
            {row.lastActivity ? (
              new Date(row.lastActivity).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })
            ) : 'Never'}
          </div>
        )
      }
    ];

    // Table actions for Social Connections
    const socialConnectionsActions = (row) => (
      <div className="flex items-center justify-center space-x-2">
        <button className="text-blue-600 hover:text-blue-800 p-2 hover:bg-blue-50 rounded-lg">
          <ExternalLink size={16} />
        </button>
        <button className="text-gray-600 hover:text-gray-800 p-2 hover:bg-gray-50 rounded-lg">
          <MoreVertical size={16} />
        </button>
      </div>
    );
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    };

    const handleSelectChange = (name, value) => {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    };

    const handleLanguageToggle = (language) => {
      setFormData(prev => {
        const currentLanguages = Array.isArray(prev.languages) ? prev.languages : [];
        if (currentLanguages.includes(language)) {
          return {
            ...prev,
            languages: currentLanguages.filter(lang => lang !== language)
          };
        } else {
          return {
            ...prev,
            languages: [...currentLanguages, language]
          };
        }
      });
    };
  
    const handleAvatarChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        if (file.size > 2 * 1024 * 1024) { // 2MB limit
          alert("File size must be less than 2MB");
          return;
        }
        
        const validTypes = ['image/png', 'image/jpeg', 'image/jpg'];
        if (!validTypes.includes(file.type)) {
          alert("Only PNG, JPEG, JPG files are allowed");
          return;
        }
  
        const reader = new FileReader();
        reader.onloadend = () => {
          setAvatarPreview(reader.result);
          setFormData(prev => ({
            ...prev,
            avatar: file
          }));
        };
        reader.readAsDataURL(file);
      }
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log("Form submitted:", formData);
      setIsEditing(false);
      // Add your form submission logic here
    };
  
    const subscriptionPlans = [
      {
        id: "free",
        name: "Free Plan",
        price: "$0/month",
        features: ["1 User", "1GB Storage", "Basic Support", "Limited Features"],
        popular: false
      },
      {
        id: "pro",
        name: "Pro Plan",
        price: "$29/month",
        features: ["5 Users", "50GB Storage", "Priority Support", "All Features", "Advanced Analytics"],
        popular: true,
        current: true
      },
      {
        id: "enterprise",
        name: "Enterprise Plan",
        price: "$99/month",
        features: ["Unlimited Users", "500GB Storage", "24/7 Support", "Custom Solutions", "API Access", "White Label"],
        popular: false
      }
    ];
  
    const notificationSettings = [
      {
        id: 1,
        title: "Email Notifications",
        description: "Receive notifications via email",
        enabled: true
      },
      {
        id: 2,
        title: "Push Notifications",
        description: "Receive push notifications on your devices",
        enabled: true
      },
      {
        id: 3,
        title: "SMS Notifications",
        description: "Receive notifications via SMS",
        enabled: false
      },
      {
        id: 4,
        title: "Marketing Emails",
        description: "Receive marketing and promotional emails",
        enabled: false
      },
      {
        id: 5,
        title: "Weekly Reports",
        description: "Receive weekly performance reports",
        enabled: true
      }
    ];
  
    return (
      <div className="flex h-full bg-gray-50 min-h-screen">
        <Navbar />
        
        <div className="flex-1">
          <Header
            title="Create New"
            subtitle="Duralux / Meta Memo"
            user={user}
          />
  
          <div
            className="pt-[100px] px-6 pb-6 space-y-6"
            style={{
              paddingLeft: isSidebarExpanded ? "17.5rem" : "6.5rem",
            }}
          >
            {/* Main Content */}
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center text-gray-600 mt-2">
                    <span className="text-gray-400 mr-2">META MEMO</span>
                    <span className="mx-2">›</span>
                    <span>Create New</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  {isEditing ? (
                    <>
                      <button
                        onClick={() => setIsEditing(false)}
                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2"
                      >
                        <X size={18} />
                        Cancel
                      </button>
                      <button
                        onClick={handleSubmit}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                      >
                        <Save size={18} />
                        Save Changes
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                    >
                      <Edit size={18} />
                      Edit Profile
                    </button>
                  )}
                </div>
              </div>
  
              {/* Warning Banner */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <Shield className="h-5 w-5 text-yellow-400" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-yellow-800">Attention Required</h3>
                    <div className="mt-2 text-sm text-yellow-700">
                      <p>The following information is publicly displayed, be careful!</p>
                    </div>
                  </div>
                </div>
              </div>
  
              <div className="lg:grid-cols-3 gap-6">
                {/* Left Column - Tabs & Main Form */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Navigation Tabs */}
                  <div className="bg-white rounded-lg shadow">
                    <div className="border-b border-gray-200">
                      <nav className="flex overflow-x-auto">
                        {tabs.map((tab) => (
                          <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center px-6 py-4 text-sm font-medium border-b-2 whitespace-nowrap ${
                              activeTab === tab.id
                                ? "border-blue-600 text-blue-600"
                                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                            }`}
                          >
                            {tab.icon && <tab.icon size={16} className="mr-2" />}
                            {tab.label}
                          </button>
                        ))}
                      </nav>
                    </div>
                    
                    {/* Tab Content */}
                    <div className="p-6">
                      {/* Profile Tab */}
                      {activeTab === "profile" && (
                        <div className="space-y-8">
                          {/* Avatar Upload Section */}
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Upload your profile</h3>
                            <div className="flex items-start space-x-6">
                              <div className="flex-shrink-0">
                                <div className="relative">
                                  <div className="h-40 w-40 rounded-lg bg-gray-100 border-2 border-gray-300 border-dashed flex items-center justify-center overflow-hidden">
                                    {avatarPreview ? (
                                      <img 
                                        src={avatarPreview} 
                                        alt="Avatar preview" 
                                        className="h-full w-full object-cover"
                                      />
                                    ) : (
                                      <User className="h-16 w-16 text-gray-400" />
                                    )}
                                  </div>
                                  {isEditing && (
                                    <label className="absolute bottom-2 right-2 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700">
                                      <Camera size={16} />
                                      <input
                                        type="file"
                                        className="hidden"
                                        accept=".png,.jpg,.jpeg"
                                        onChange={handleAvatarChange}
                                      />
                                    </label>
                                  )}
                                </div>
                              </div>
                              
                              <div className="flex-1">
                                <div className="space-y-4">
                                  <div className="p-4 bg-blue-50 rounded-lg">
                                    <h4 className="font-medium text-blue-900 mb-2">Avatar Requirements:</h4>
                                    <ul className="text-sm text-blue-800 space-y-1">
                                      <li className="flex items-center">
                                        <Check size={14} className="mr-2" />
                                        Avatar size: 150×150 pixels
                                      </li>
                                      <li className="flex items-center">
                                        <Check size={14} className="mr-2" />
                                        Max upload size: 2MB
                                      </li>
                                      <li className="flex items-center">
                                        <Check size={14} className="mr-2" />
                                        Allowed file types: PNG, JPEG, JPG
                                      </li>
                                    </ul>
                                  </div>
                                  
                                  {isEditing && (
                                    <div>
                                      <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Upload new avatar
                                      </label>
                                      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                                        <div className="space-y-1 text-center">
                                          <Upload className="mx-auto h-12 w-12 text-gray-400" />
                                          <div className="flex text-sm text-gray-600">
                                            <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
                                              <span>Upload a file</span>
                                              <input
                                                type="file"
                                                className="sr-only"
                                                accept=".png,.jpg,.jpeg"
                                                onChange={handleAvatarChange}
                                              />
                                            </label>
                                            <p className="pl-1">or drag and drop</p>
                                          </div>
                                          <p className="text-xs text-gray-500">PNG, JPG, JPEG up to 2MB</p>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
  
                          {/* Personal Information Form */}
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
                            <form className="space-y-6">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Name
                                  </label>
                                  <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
                                  />
                                </div>
                                
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Email
                                  </label>
                                  <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
                                  />
                                </div>
                                
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Username
                                  </label>
                                  <input
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
                                  />
                                  <p className="mt-1 text-sm text-gray-500">
                                    Profile URL: https://themeforest.net/user/{formData.username}
                                  </p>
                                </div>
                                
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Phone
                                  </label>
                                  <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
                                  />
                                </div>
                                
                                <div className="md:col-span-2">
                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Company
                                  </label>
                                  <input
                                    type="text"
                                    name="company"
                                    value={formData.company}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
                                  />
                                </div>
                                <div className="md:col-span-2">
                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Designation
                                  </label>
                                  <input
                                    type="text"
                                    name="Designation"
                                    value={formData.company}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
                                  />
                                </div>
                                <div className="md:col-span-2">
                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Website
                                  </label>
                                  <input
                                    type="text"
                                    name="Website"
                                    value={formData.company}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
                                  />
                                </div>
                                <div className="md:col-span-2">
                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                    VAT
                                  </label>
                                  <input
                                    type="text"
                                    name="VAT"
                                    value={formData.company}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
                                  />
                                </div>
                                <div className="md:col-span-2">
                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Address
                                  </label>
                                  <input
                                    type="text"
                                    name="Address"
                                    value={formData.company}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
                                  />
                                </div>
                              </div>
                            </form>
                          </div>

                          {/* Additional Information Section */}
                          <div className="border-t border-gray-200 pt-8">
                            <h3 className="text-lg font-semibold text-gray-900 mb-6">
                              Additional Information
                            </h3>
                            <p className="text-gray-600 mb-6">
                              Communication details in case we want to connect with you.
                            </p>
                            
                            <form className="space-y-6">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Date of Birth */}
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Date of Birth
                                  </label>
                                  <div className="relative">
                                    <input
                                      type="date"
                                      name="dateOfBirth"
                                      value={formData.dateOfBirth}
                                      onChange={handleInputChange}
                                      disabled={!isEditing}
                                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
                                    />
                                    <Calendar className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" />
                                  </div>
                                  <p className="mt-1 text-sm text-gray-500">Pick date of birth</p>
                                </div>

                                {/* Country */}
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Country
                                  </label>
                                  <div className="relative">
                                    <select
                                      name="country"
                                      value={formData.country}
                                      onChange={handleInputChange}
                                      disabled={!isEditing}
                                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-500 appearance-none"
                                    >
                                      {countries.map((country) => (
                                        <option key={country} value={country}>
                                          {country}
                                        </option>
                                      ))}
                                    </select>
                                    <ChevronDown className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" />
                                  </div>
                                </div>

                                {/* State */}
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                    State
                                  </label>
                                  <input
                                    type="text"
                                    name="state"
                                    value={formData.state}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                    placeholder="Enter state"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
                                  />
                                </div>

                                {/* City */}
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                    City
                                  </label>
                                  <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                    placeholder="Enter city"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
                                  />
                                </div>

                                {/* Time Zone */}
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Time Zone
                                  </label>
                                  <div className="relative">
                                    <select
                                      name="timeZone"
                                      value={formData.timeZone}
                                      onChange={handleInputChange}
                                      disabled={!isEditing}
                                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-500 appearance-none"
                                    >
                                      {timeZones.map((zone) => (
                                        <option key={zone} value={zone}>
                                          {zone}
                                        </option>
                                      ))}
                                    </select>
                                    <GlobeIcon className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" />
                                  </div>
                                </div>

                                {/* Currency */}
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Currency
                                  </label>
                                  <div className="relative">
                                    <select
                                      name="currency"
                                      value={formData.currency}
                                      onChange={handleInputChange}
                                      disabled={!isEditing}
                                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-500 appearance-none"
                                    >
                                      {currencies.map((currency) => (
                                        <option key={currency} value={currency}>
                                          {currency}
                                        </option>
                                      ))}
                                    </select>
                                    <ChevronDown className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" />
                                  </div>
                                </div>

                                {/* Group */}
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Group
                                  </label>
                                  <div className="relative">
                                    <select
                                      name="group"
                                      value={formData.group}
                                      onChange={handleInputChange}
                                      disabled={!isEditing}
                                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-500 appearance-none"
                                    >
                                      {groups.map((group) => (
                                        <option key={group} value={group}>
                                          {group}
                                        </option>
                                      ))}
                                    </select>
                                    <Users className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" />
                                  </div>
                                </div>
                              </div>

                              {/* Languages Selection */}
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-3">
                                  Languages
                                </label>
                                <div className="space-y-3">
                                  {isEditing ? (
                                    <div className="flex flex-wrap gap-2">
                                      {languages.map((language) => {
                                        const isSelected = formData.languages.includes(language);
                                        return (
                                          <button
                                            key={language}
                                            type="button"
                                            onClick={() => handleLanguageToggle(language)}
                                            className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${
                                              isSelected
                                                ? 'bg-blue-100 text-blue-700 border-blue-300'
                                                : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
                                            }`}
                                          >
                                            {language}
                                            {isSelected && <Check size={12} className="inline ml-1" />}
                                          </button>
                                        );
                                      })}
                                    </div>
                                  ) : (
                                    <div className="flex flex-wrap gap-2">
                                      {formData.languages.map((language) => (
                                        <span
                                          key={language}
                                          className="px-3 py-1.5 text-sm bg-blue-100 text-blue-700 rounded-lg border border-blue-300"
                                        >
                                          {language}
                                        </span>
                                      ))}
                                    </div>
                                  )}
                                </div>
                                <p className="mt-2 text-sm text-gray-500">
                                  Select languages you speak
                                </p>
                              </div>
                            </form>
                          </div>
                        </div>
                      )}
                      
                      {/* Password Tab */}
                      {activeTab === "password" && (
                        <div className="space-y-8">
                          {/* Password Change Section */}
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Password Information</h3>
                            <div className="mb-6">
                              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                <div className="flex items-center">
                                  <Shield className="h-5 w-5 text-blue-400 mr-3 flex-shrink-0" />
                                  <div>
                                    <p className="text-sm font-medium text-blue-800">
                                      You can only change your password twice within 24 hours!
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <form className="space-y-6">
                              {/* Current Password */}
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Current Password
                                </label>
                                <div className="relative">
                                  <input
                                    type="password"
                                    name="currentPassword"
                                    value={formData.currentPassword}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-10"
                                    placeholder="Enter your current password"
                                  />
                                  <Lock className="absolute right-3 top-3.5 h-5 w-5 text-gray-400 pointer-events-none" />
                                </div>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* New Password */}
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Password:
                                  </label>
                                  <div className="relative">
                                    <input
                                      type="password"
                                      name="password"
                                      value={formData.password}
                                      onChange={handleInputChange}
                                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-10"
                                      placeholder="Enter new password"
                                    />
                                    <Lock className="absolute right-3 top-3.5 h-5 w-5 text-gray-400 pointer-events-none" />
                                  </div>
                                </div>
                                
                                {/* Confirm Password */}
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Password Confirm:
                                  </label>
                                  <div className="relative">
                                    <input
                                      type="password"
                                      name="confirmPassword"
                                      value={formData.confirmPassword}
                                      onChange={handleInputChange}
                                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-10"
                                      placeholder="Confirm new password"
                                    />
                                    <Lock className="absolute right-3 top-3.5 h-5 w-5 text-gray-400 pointer-events-none" />
                                  </div>
                                </div>
                              </div>

                              {/* Password Requirements */}
                              <div>
                                <h4 className="text-sm font-medium text-gray-700 mb-3">Password Requirements:</h4>
                                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                                  <ul className="space-y-2 text-sm text-gray-600">
                                    <li className="flex items-start">
                                      <Check size={16} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                      <span>At least one lowercase character</span>
                                    </li>
                                    <li className="flex items-start">
                                      <Check size={16} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                      <span>Minimum 8 characters long - the more, the better</span>
                                    </li>
                                    <li className="flex items-start">
                                      <Check size={16} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                      <span>At least one number, symbol, or whitespace character</span>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                              
                              <div className="pt-2">
                                <button
                                  type="button"
                                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
                                >
                                  Update Password
                                </button>
                              </div>
                            </form>
                          </div>

                          {/* Security Preferences Section */}
                          <div className="border-t border-gray-200 pt-8">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Security preferences:</h3>
                            <div className="mb-6">
                              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                                <p className="text-sm text-gray-600">
                                  Keep your account more secure with following preferences.
                                </p>
                              </div>
                            </div>

                            {/* 2-Step Authentication */}
                            <div className="space-y-6">
                              <div className="flex items-start justify-between p-4 border border-gray-200 rounded-lg">
                                <div className="flex-1">
                                  <div className="flex items-start">
                                    <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center mr-4 flex-shrink-0">
                                      <Shield className="h-5 w-5 text-blue-600" />
                                    </div>
                                    <div>
                                      <h4 className="font-medium text-gray-900 mb-1">Enable 2-step authentication</h4>
                                      <p className="text-sm text-gray-500">
                                        Protects you against password theft by requesting an authentication code via SMS on every login.
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                
                                <div className="ml-4">
                                  <button
                                    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                                      formData.twoFactorAuth ? 'bg-blue-600' : 'bg-gray-200'
                                    }`}
                                    onClick={() => setFormData(prev => ({
                                      ...prev,
                                      twoFactorAuth: !prev.twoFactorAuth
                                    }))}
                                  >
                                    <span
                                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                                        formData.twoFactorAuth ? 'translate-x-5' : 'translate-x-0'
                                      }`}
                                    />
                                  </button>
                                </div>
                              </div>

                              {/* Additional Security Options */}
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Security Email */}
                                <div className="p-4 border border-gray-200 rounded-lg">
                                  <div className="flex items-center mb-3">
                                    <Mail className="h-5 w-5 text-gray-400 mr-2" />
                                    <h4 className="font-medium text-gray-900">Security Email</h4>
                                  </div>
                                  <p className="text-sm text-gray-500 mb-3">
                                    Receive security alerts and recovery instructions
                                  </p>
                                  <input
                                    type="email"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                    placeholder="security@example.com"
                                    defaultValue={formData.email}
                                  />
                                </div>

                                {/* Recovery Phone */}
                                <div className="p-4 border border-gray-200 rounded-lg">
                                  <div className="flex items-center mb-3">
                                    <Phone className="h-5 w-5 text-gray-400 mr-2" />
                                    <h4 className="font-medium text-gray-900">Recovery Phone</h4>
                                  </div>
                                  <p className="text-sm text-gray-500 mb-3">
                                    Used for account recovery and 2FA
                                  </p>
                                  <input
                                    type="tel"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                                    placeholder="+1 (234) 567-8900"
                                    defaultValue={formData.phone}
                                  />
                                </div>
                              </div>

                              {/* Recent Security Activity */}
                              <div className="mt-8">
                                <h4 className="text-md font-medium text-gray-900 mb-4">Recent Security Activity</h4>
                                <div className="space-y-3">
                                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <div className="flex items-center">
                                      <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                                      <div>
                                        <div className="text-sm font-medium text-gray-900">Password changed</div>
                                        <div className="text-xs text-gray-500">Today, 10:30 AM • Browser: Chrome</div>
                                      </div>
                                    </div>
                                    <button className="text-sm text-blue-600 hover:text-blue-800">
                                      Review
                                    </button>
                                  </div>

                                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <div className="flex items-center">
                                      <Globe className="h-5 w-5 text-blue-500 mr-3" />
                                      <div>
                                        <div className="text-sm font-medium text-gray-900">New device login</div>
                                        <div className="text-xs text-gray-500">Yesterday, 2:15 PM • iPhone 13</div>
                                      </div>
                                    </div>
                                    <button className="text-sm text-blue-600 hover:text-blue-800">
                                      Review
                                    </button>
                                  </div>

                                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <div className="flex items-center">
                                      <Bell className="h-5 w-5 text-yellow-500 mr-3" />
                                      <div>
                                        <div className="text-sm font-medium text-gray-900">Security alert</div>
                                        <div className="text-xs text-gray-500">3 days ago • Unusual login attempt</div>
                                      </div>
                                    </div>
                                    <button className="text-sm text-blue-600 hover:text-blue-800">
                                      Review
                                    </button>
                                  </div>
                                </div>
                              </div>

                              {/* Security Actions */}
                              <div className="mt-6 pt-6 border-t border-gray-200">
                                <div className="flex flex-wrap gap-3">
                                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm font-medium">
                                    View All Activity
                                  </button>
                                  <button className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 text-sm font-medium">
                                    Sign Out All Devices
                                  </button>
                                  <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm font-medium">
                                    Deactivate Account
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {/* Billing & Shipping Tab */}
                      {activeTab === "billing" && (
                        <div className="space-y-8">
                          {/* Billing Address Section */}
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Billing Address</h3>
                            <div className="mb-6">
                              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                                <p className="text-sm text-gray-600">
                                  A billing address is the address associated with a payment method.
                                </p>
                              </div>
                            </div>

                            <form className="space-y-6">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Address Line 1 */}
                                <div className="md:col-span-2">
                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Address
                                  </label>
                                  <input
                                    type="text"
                                    name="billingAddress"
                                    value={formData.billingAddress}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
                                    placeholder="Enter your billing address"
                                  />
                                  <p className="mt-1 text-xs text-gray-500">Address</p>
                                </div>

                                {/* Zip Code */}
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Zip Code
                                  </label>
                                  <input
                                    type="text"
                                    name="billingZipCode"
                                    value={formData.billingZipCode || ""}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
                                    placeholder="e.g., 94105"
                                  />
                                  <p className="mt-1 text-xs text-gray-500">Zip Code</p>
                                </div>

                                {/* Country */}
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Country
                                  </label>
                                  <div className="relative">
                                    <select
                                      name="billingCountry"
                                      value={formData.billingCountry || "United States"}
                                      onChange={handleInputChange}
                                      disabled={!isEditing}
                                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-500 appearance-none"
                                    >
                                      {countries.map((country) => (
                                        <option key={country} value={country}>
                                          {country}
                                        </option>
                                      ))}
                                    </select>
                                    <ChevronDown className="absolute right-3 top-3.5 h-5 w-5 text-gray-400 pointer-events-none" />
                                  </div>
                                  <p className="mt-1 text-xs text-gray-500">United States</p>
                                </div>

                                {/* State */}
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                    State
                                  </label>
                                  <input
                                    type="text"
                                    name="billingState"
                                    value={formData.billingState || ""}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
                                    placeholder="Enter state"
                                  />
                                  <div className="mt-2 flex items-center">
                                    <input
                                      type="checkbox"
                                      id="sameAsCustomerState"
                                      className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                                      checked={formData.sameAsCustomerState || false}
                                      onChange={(e) => setFormData(prev => ({
                                        ...prev,
                                        sameAsCustomerState: e.target.checked,
                                        billingState: e.target.checked ? "California" : prev.billingState
                                      }))}
                                      disabled={!isEditing}
                                    />
                                    <label htmlFor="sameAsCustomerState" className="ml-2 text-sm text-gray-700">
                                      SAME AS CUSTOMER INFO
                                    </label>
                                  </div>
                                </div>

                                {/* City */}
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                    City
                                  </label>
                                  <input
                                    type="text"
                                    name="billingCity"
                                    value={formData.billingCity || ""}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
                                    placeholder="Enter city"
                                  />
                                  <p className="mt-1 text-xs text-gray-500">City</p>
                                </div>

                                {/* Address Line 2 */}
                                <div className="md:col-span-2">
                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Address Line 2 (Optional)
                                  </label>
                                  <input
                                    type="text"
                                    name="billingAddress2"
                                    value={formData.billingAddress2 || ""}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
                                    placeholder="Apartment, suite, unit, building, floor, etc."
                                  />
                                </div>
                              </div>

                              {/* Same as Billing Address Checkbox */}
                              <div className="pt-4">
                                <div className="flex items-center">
                                  <input
                                    type="checkbox"
                                    id="sameAsShipping"
                                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                                    checked={formData.shippingSameAsBilling || false}
                                    onChange={(e) => {
                                      const isChecked = e.target.checked;
                                      setFormData(prev => ({
                                        ...prev,
                                        shippingSameAsBilling: isChecked,
                                        shippingAddress: isChecked ? prev.billingAddress : prev.shippingAddress,
                                        shippingZipCode: isChecked ? prev.billingZipCode : prev.shippingZipCode,
                                        shippingCountry: isChecked ? prev.billingCountry : prev.shippingCountry,
                                        shippingState: isChecked ? prev.billingState : prev.shippingState,
                                        shippingCity: isChecked ? prev.billingCity : prev.shippingCity
                                      }));
                                    }}
                                    disabled={!isEditing}
                                  />
                                  <label htmlFor="sameAsShipping" className="ml-2 text-sm font-medium text-gray-700">
                                    Same as shipping address
                                  </label>
                                </div>
                              </div>
                            </form>
                          </div>

                          {/* Shipping Address Section */}
                          <div className="border-t border-gray-200 pt-8">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Shipping Address</h3>
                            
                            <form className="space-y-6">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Address Line 1 */}
                                <div className="md:col-span-2">
                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Address
                                  </label>
                                  <textarea
                                    name="shippingAddress"
                                    value={formData.shippingSameAsBilling ? formData.billingAddress : formData.shippingAddress}
                                    onChange={handleInputChange}
                                    disabled={!isEditing || formData.shippingSameAsBilling}
                                    rows="3"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
                                    placeholder="Enter your shipping address"
                                  />
                                </div>

                                {/* Zip Code */}
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Zip Code
                                  </label>
                                  <input
                                    type="text"
                                    name="shippingZipCode"
                                    value={formData.shippingSameAsBilling ? formData.billingZipCode : formData.shippingZipCode || ""}
                                    onChange={handleInputChange}
                                    disabled={!isEditing || formData.shippingSameAsBilling}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
                                    placeholder="e.g., 94105"
                                  />
                                </div>

                                {/* Country */}
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Country
                                  </label>
                                  <div className="relative">
                                    <select
                                      name="shippingCountry"
                                      value={formData.shippingSameAsBilling ? formData.billingCountry : formData.shippingCountry || "United States"}
                                      onChange={handleInputChange}
                                      disabled={!isEditing || formData.shippingSameAsBilling}
                                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-500 appearance-none"
                                    >
                                      {countries.map((country) => (
                                        <option key={country} value={country}>
                                          {country}
                                        </option>
                                      ))}
                                    </select>
                                    <ChevronDown className="absolute right-3 top-3.5 h-5 w-5 text-gray-400 pointer-events-none" />
                                  </div>
                                </div>

                                {/* State */}
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                    State
                                  </label>
                                  <input
                                    type="text"
                                    name="shippingState"
                                    value={formData.shippingSameAsBilling ? formData.billingState : formData.shippingState || ""}
                                    onChange={handleInputChange}
                                    disabled={!isEditing || formData.shippingSameAsBilling}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
                                    placeholder="Enter state"
                                  />
                                </div>

                                {/* City */}
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">
                                    City
                                  </label>
                                  <input
                                    type="text"
                                    name="shippingCity"
                                    value={formData.shippingSameAsBilling ? formData.billingCity : formData.shippingCity || ""}
                                    onChange={handleInputChange}
                                    disabled={!isEditing || formData.shippingSameAsBilling}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
                                    placeholder="Enter city"
                                  />
                                </div>
                              </div>

                              {/* Shipping Instructions */}
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Shipping Instructions (Optional)
                                </label>
                                <textarea
                                  name="shippingInstructions"
                                  value={formData.shippingInstructions || ""}
                                  onChange={handleInputChange}
                                  disabled={!isEditing}
                                  rows="3"
                                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
                                  placeholder="Special instructions for delivery"
                                />
                              </div>
                            </form>
                          </div>

                          {/* Payment Methods Section */}
                          <div className="border-t border-gray-200 pt-8">
                            <div className="flex items-center justify-between mb-6">
                              <h3 className="text-lg font-semibold text-gray-900">Payment Methods</h3>
                              <button 
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
                                disabled={!isEditing}
                              >
                                Add Payment Method
                              </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              {/* Credit Card 1 */}
                              <div className="border border-gray-200 rounded-lg p-6">
                                <div className="flex items-center justify-between mb-4">
                                  <div className="flex items-center">
                                    <CreditCard className="h-6 w-6 text-gray-400 mr-3" />
                                    <div>
                                      <div className="font-medium text-gray-900">Visa •••• 3456</div>
                                      <div className="text-sm text-gray-500">Primary Payment Method</div>
                                    </div>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
                                      Default
                                    </span>
                                    {isEditing && (
                                      <>
                                        <button className="text-gray-400 hover:text-gray-600 p-1">
                                          <Eye size={16} />
                                        </button>
                                        <button className="text-gray-400 hover:text-gray-600 p-1">
                                          <Trash2 size={16} />
                                        </button>
                                      </>
                                    )}
                                  </div>
                                </div>
                                <div className="space-y-2 text-sm">
                                  <div className="flex justify-between">
                                    <span className="text-gray-500">Card Holder:</span>
                                    <span className="font-medium">Alexandra Della</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-500">Expires:</span>
                                    <span className="font-medium">12/25</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-500">Country:</span>
                                    <span className="font-medium">United States</span>
                                  </div>
                                </div>
                              </div>

                              {/* Credit Card 2 */}
                              <div className="border border-gray-200 rounded-lg p-6">
                                <div className="flex items-center justify-between mb-4">
                                  <div className="flex items-center">
                                    <CreditCard className="h-6 w-6 text-gray-400 mr-3" />
                                    <div>
                                      <div className="font-medium text-gray-900">MasterCard •••• 7890</div>
                                      <div className="text-sm text-gray-500">Secondary Payment Method</div>
                                    </div>
                                  </div>
                                  {isEditing && (
                                    <div className="flex items-center space-x-2">
                                      <button className="text-gray-400 hover:text-gray-600 p-1">
                                        <Eye size={16} />
                                      </button>
                                      <button className="text-gray-400 hover:text-gray-600 p-1">
                                        <Trash2 size={16} />
                                      </button>
                                    </div>
                                  )}
                                </div>
                                <div className="space-y-2 text-sm">
                                  <div className="flex justify-between">
                                    <span className="text-gray-500">Card Holder:</span>
                                    <span className="font-medium">Alexandra Della</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-500">Expires:</span>
                                    <span className="font-medium">08/24</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-500">Country:</span>
                                    <span className="font-medium">United States</span>
                                  </div>
                                </div>
                                {isEditing && !formData.defaultPaymentMethod2 && (
                                  <div className="mt-4 pt-4 border-t border-gray-200">
                                    <button className="w-full py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 text-sm">
                                      Set as Default
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Billing History */}
                            <div className="mt-8">
                              <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-semibold text-gray-900">Billing History</h3>
                                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium">
                                  View All Invoices
                                </button>
                              </div>

                              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                                <table className="min-w-full divide-y divide-gray-200">
                                  <thead className="bg-gray-50">
                                    <tr>
                                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Date
                                      </th>
                                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Description
                                      </th>
                                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Amount
                                      </th>
                                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                      </th>
                                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody className="bg-white divide-y divide-gray-200">
                                    <tr>
                                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        Jan 15, 2024
                                      </td>
                                      <td className="px-6 py-4 text-sm text-gray-900">
                                        Monthly Subscription - Pro Plan
                                      </td>
                                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        $29.00
                                      </td>
                                      <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                                          Paid
                                        </span>
                                      </td>
                                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <button className="text-blue-600 hover:text-blue-900">Download</button>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        Dec 15, 2023
                                      </td>
                                      <td className="px-6 py-4 text-sm text-gray-900">
                                        Monthly Subscription - Pro Plan
                                      </td>
                                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        $29.00
                                      </td>
                                      <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                                          Paid
                                        </span>
                                      </td>
                                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <button className="text-blue-600 hover:text-blue-900">Download</button>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        Nov 15, 2023
                                      </td>
                                      <td className="px-6 py-4 text-sm text-gray-900">
                                        Monthly Subscription - Pro Plan
                                      </td>
                                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        $29.00
                                      </td>
                                      <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                                          Paid
                                        </span>
                                      </td>
                                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <button className="text-blue-600 hover:text-blue-900">Download</button>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {/* Subscription Tab */}
                      {activeTab === "subscription" && (
                        <div className="space-y-8">
                          {/* Current Plan Card */}
                          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6 mb-8">
                            <div className="flex items-center justify-between mb-4">
                              <div>
                                <div className="text-sm font-medium text-blue-600 mb-1">
                                  {currentPlan.daysRemaining || "4"} DAYS REMAINING
                                </div>
                                <h3 className="text-xl font-bold text-gray-900">
                                  Your current plan is {currentPlan.name}
                                </h3>
                              </div>
                              <div className="text-right">
                                <div className="text-2xl font-bold text-gray-900">{currentPlan.price}</div>
                                <div className="text-sm text-gray-600">{currentPlan.billingCycle}</div>
                              </div>
                            </div>
                            
                            <div className="text-gray-600 mb-6">
                              Next payment on {currentPlan.nextPayment || "12/10/2023"} for {currentPlan.nextPaymentAmount || "$62.48"}
                            </div>
                            
                            <div className="flex gap-3">
                              <button className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50">
                                Cancel Plan
                              </button>
                              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                                UPDATE PLAN
                              </button>
                            </div>
                          </div>
                          
                          {/* Available Plans */}
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            {plans.length > 0 ? plans.map((plan) => (
                              <div 
                                key={plan.id}
                                className={`border rounded-lg p-6 ${plan.isCurrent ? 'border-blue-500 ring-1 ring-blue-500' : 'border-gray-200'}`}
                              >
                                {plan.popular && (
                                  <div className="inline-flex px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full mb-4">
                                    POPULAR
                                  </div>
                                )}
                                
                                <h3 className="text-lg font-bold text-gray-900 mb-2">{plan.name}</h3>
                                <p className="text-gray-600 text-sm mb-4">{plan.description}</p>
                                
                                <p className="text-gray-700 mb-6 text-sm">{plan.details}</p>
                                
                                <div className="text-2xl font-bold text-gray-900 mb-6">{plan.price}</div>
                                
                                <ul className="space-y-2 mb-6">
                                  {plan.features && plan.features.map((feature, index) => (
                                    <li key={index} className="flex items-center text-sm text-gray-600">
                                      <Check size={16} className="text-green-500 mr-2" />
                                      {feature}
                                    </li>
                                  ))}
                                </ul>
                                
                                <button 
                                  className={`w-full py-2 rounded-lg font-medium ${
                                    plan.isCurrent
                                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                                      : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                                  }`}
                                >
                                  {plan.isCurrent ? 'Current Plan' : 'Choose Plan'}
                                </button>
                              </div>
                            )) : (
                              // Fallback plans if not in data.json
                              <>
                                <div className="border border-gray-200 rounded-lg p-6">
                                  <h3 className="text-lg font-bold text-gray-900 mb-2">BASIC</h3>
                                  <p className="text-gray-600 text-sm mb-4">Starter plan for individuals.</p>
                                  <p className="text-gray-700 mb-6 text-sm">Lorem, ipsum dolor sit amet consectetur adipisicing elit....</p>
                                  <div className="text-2xl font-bold text-gray-900 mb-6">$12.99 / Month</div>
                                  <button className="w-full py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                                    Choose Plan
                                  </button>
                                </div>
                                
                                <div className="border border-blue-500 ring-1 ring-blue-500 rounded-lg p-6">
                                  <div className="inline-flex px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full mb-4">
                                    POPULAR
                                  </div>
                                  <h3 className="text-lg font-bold text-gray-900 mb-2">TEAM</h3>
                                  <p className="text-gray-600 text-sm mb-4">Collaborate up to 10 people.</p>
                                  <p className="text-gray-700 mb-6 text-sm">Lorem, ipsum dolor sit amet consectetur adipisicing elit....</p>
                                  <div className="text-2xl font-bold text-gray-900 mb-6">$29.99 / Month</div>
                                  <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                                    Current Plan
                                  </button>
                                </div>
                                
                                <div className="border border-gray-200 rounded-lg p-6">
                                  <h3 className="text-lg font-bold text-gray-900 mb-2">ENTERPRISE</h3>
                                  <p className="text-gray-600 text-sm mb-4">For bigger businesses.</p>
                                  <p className="text-gray-700 mb-6 text-sm">Lorem, ipsum dolor sit amet consectetur adipisicing elit....</p>
                                  <div className="text-2xl font-bold text-gray-900 mb-6">$49.99 / Month</div>
                                  <button className="w-full py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                                    Choose Plan
                                  </button>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      )}
                      
                      {/* Notifications Tab */}
                      {activeTab === "notifications" && (
                        <div className="space-y-6">
                          {/* Notifications Table */}
                          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                            <table className="min-w-full divide-y divide-gray-200">
                              <thead className="bg-gray-50">
                                <tr>
                                  <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    DESCRIPTION
                                  </th>
                                  <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    ACTIONS
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="bg-white divide-y divide-gray-200">
                                {/* Row 1 */}
                                <tr>
                                  <td className="px-6 py-4">
                                    <div>
                                      <div className="font-medium text-gray-900">Successful payments</div>
                                      <div className="text-sm text-gray-500">Receive a notification for every successful payment.</div>
                                    </div>
                                  </td>
                                  <td className="px-6 py-4">
                                    <select className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                                      <option>Search...</option>
                                      <option>SMS</option>
                                      <option>Push</option>
                                      <option>Email</option>
                                    </select>
                                  </td>
                                </tr>
                                
                                {/* Row 2 */}
                                <tr>
                                  <td className="px-6 py-4">
                                    <div>
                                      <div className="font-medium text-gray-900">Customer payment dispute</div>
                                      <div className="text-sm text-gray-500">Receive a notification if a payment is disputed by a customer and for dispute purposes.</div>
                                    </div>
                                  </td>
                                  <td className="px-6 py-4">
                                    <select className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                                      <option>Search...</option>
                                      <option>SMS</option>
                                      <option>Push</option>
                                      <option>Email</option>
                                    </select>
                                  </td>
                                </tr>
                                
                                {/* Row 3 */}
                                <tr>
                                  <td className="px-6 py-4">
                                    <div>
                                      <div className="font-medium text-gray-900">Refund alerts</div>
                                      <div className="text-sm text-gray-500">Receive a notification if a payment is stated as risk by the Finance Department.</div>
                                    </div>
                                  </td>
                                  <td className="px-6 py-4">
                                    <select className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                                      <option>Search...</option>
                                      <option>SMS</option>
                                      <option>Push</option>
                                      <option>Email</option>
                                    </select>
                                  </td>
                                </tr>
                                
                                {/* Row 4 */}
                                <tr>
                                  <td className="px-6 py-4">
                                    <div>
                                      <div className="font-medium text-gray-900">Successful payments</div>
                                      <div className="text-sm text-gray-500">Receive a notification for every successful payment.</div>
                                    </div>
                                  </td>
                                  <td className="px-6 py-4">
                                    <select className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                                      <option>Search...</option>
                                      <option>SMS</option>
                                      <option>Push</option>
                                      <option>Email</option>
                                    </select>
                                  </td>
                                </tr>
                                
                                {/* Row 5 */}
                                <tr>
                                  <td className="px-6 py-4">
                                    <div>
                                      <div className="font-medium text-gray-900">Invoice payments</div>
                                      <div className="text-sm text-gray-500">Receive a notification if a customer sends an incorrect amount to pay their invoice.</div>
                                    </div>
                                  </td>
                                  <td className="px-6 py-4">
                                    <select className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                                      <option>Email</option>
                                      <option>SMS</option>
                                      <option>Push</option>
                                    </select>
                                  </td>
                                </tr>
                                
                                {/* Row 6 */}
                                <tr>
                                  <td className="px-6 py-4">
                                    <div>
                                      <div className="font-medium text-gray-900">Rating reminders</div>
                                      <div className="text-sm text-gray-500">Send an email reminding me to rate an item a week after purchase</div>
                                    </div>
                                  </td>
                                  <td className="px-6 py-4">
                                    <select className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                                      <option>Search...</option>
                                      <option>SMS</option>
                                      <option>Push</option>
                                      <option>Email</option>
                                    </select>
                                  </td>
                                </tr>
                                
                                {/* Row 7 - SMS Section */}
                                <tr>
                                  <td className="px-6 py-4">
                                    <div>
                                      <div className="font-medium text-gray-900">SMS</div>
                                      <div className="text-sm text-gray-500"></div>
                                    </div>
                                  </td>
                                  <td className="px-6 py-4">
                                    <select className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                                      <option>Search...</option>
                                      <option>SMS</option>
                                      <option>Push</option>
                                      <option>Email</option>
                                    </select>
                                  </td>
                                </tr>
                                
                                {/* Settings Section */}
                                <tr>
                                  <td className="px-6 py-4">
                                    <div>
                                      <div className="font-medium text-gray-900">Settings</div>
                                      <div className="text-sm text-gray-500"></div>
                                    </div>
                                  </td>
                                  <td className="px-6 py-4">
                                    <select className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                                      <option>Search...</option>
                                      <option>SMS</option>
                                      <option>Push</option>
                                      <option>Email</option>
                                    </select>
                                  </td>
                                </tr>
                                
                                {/* Item update notifications */}
                                <tr>
                                  <td className="px-6 py-4">
                                    <div>
                                      <div className="font-medium text-gray-900">Item update notifications</div>
                                      <div className="text-sm text-gray-500"></div>
                                    </div>
                                  </td>
                                  <td className="px-6 py-4">
                                    <select className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                                      <option>SMS + Push + Email</option>
                                      <option>SMS</option>
                                      <option>Push</option>
                                      <option>Email</option>
                                    </select>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}
                      
                      {/* Connection Tab */}
                      {activeTab === "connection" && (
                        <div className="space-y-8">
                          {/* Development Connections Section */}
                          <div className="space-y-6">
                            <div className="flex items-center justify-between">
                              <div>
                                <h2 className="text-lg font-semibold text-gray-900">Development Connections</h2>
                                <p className="text-sm text-gray-600 mt-1">Manage your development tools and services</p>
                              </div>
                              
                              <div className="flex items-center space-x-2">
                                <div className="flex bg-gray-100 rounded-lg p-1">
                                  {["all", "connected", "disconnected", "pending"].map((filter) => (
                                    <button
                                      key={filter}
                                      onClick={() => setConnectionFilter(filter)}
                                      className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                                        connectionFilter === filter
                                          ? "bg-white text-gray-900 shadow-sm"
                                          : "text-gray-600 hover:text-gray-900"
                                      }`}
                                    >
                                      {filter.charAt(0).toUpperCase() + filter.slice(1)}
                                    </button>
                                  ))}
                                </div>
                                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium">
                                  Add Connection
                                </button>
                              </div>
                            </div>

                            {/* Filter connections */}
                            {(() => {
                              const filteredConnections = developmentConnections.filter(conn => {
                                if (connectionFilter === "all") return true;
                                return conn.status === connectionFilter;
                              });

                              return (
                                <>
                                  {/* Connections Grid */}
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {filteredConnections.length > 0 ? (
                                      filteredConnections.map((connection) => (
                                        <div
                                          key={connection.id}
                                          className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                                        >
                                          <div className="flex items-start justify-between mb-4">
                                            <div className="flex items-center">
                                              {connection.icon ? (
                                                <img
                                                  src={connection.icon}
                                                  alt={connection.name}
                                                  className="h-10 w-10 rounded-lg mr-3"
                                                  onError={(e) => {
                                                    e.target.style.display = 'none';
                                                    e.target.nextElementSibling.style.display = 'flex';
                                                  }}
                                                />
                                              ) : null}
                                              <div className={`h-10 w-10 rounded-lg mr-3 flex items-center justify-center bg-gray-100 ${
                                                !connection.icon ? '' : 'hidden'
                                              }`}>
                                                <span className="font-semibold text-gray-600">
                                                  {connection.name.charAt(0)}
                                                </span>
                                              </div>
                                              <div>
                                                <h3 className="font-semibold text-gray-900">{connection.name}</h3>
                                                <p className="text-sm text-gray-500">{connection.description}</p>
                                              </div>
                                            </div>
                                            
                                            <div className="flex items-center space-x-2">
                                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                connection.status === 'connected' 
                                                  ? 'bg-green-100 text-green-800'
                                                  : connection.status === 'disconnected'
                                                  ? 'bg-red-100 text-red-800'
                                                  : 'bg-yellow-100 text-yellow-800'
                                              }`}>
                                                {connection.status === 'connected' 
                                                  ? <Check className="h-4 w-4 text-green-500 mr-1" />
                                                  : connection.status === 'disconnected'
                                                  ? <X className="h-4 w-4 text-red-500 mr-1" />
                                                  : <Clock className="h-4 w-4 text-yellow-500 mr-1" />
                                                }
                                                <span className="ml-1">
                                                  {connection.status.charAt(0).toUpperCase() + connection.status.slice(1)}
                                                </span>
                                              </span>
                                              <button className="text-gray-400 hover:text-gray-600 p-1">
                                                <MoreVertical className="h-5 w-5" />
                                              </button>
                                            </div>
                                          </div>

                                          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                            {connection.details}
                                          </p>

                                          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                            <div className="text-sm text-gray-500">
                                              {connection.lastSynced ? (
                                                <>
                                                  Last synced:{" "}
                                                  <span className="text-gray-700">
                                                    {new Date(connection.lastSynced).toLocaleDateString()}
                                                  </span>
                                                </>
                                              ) : (
                                                "Not synced yet"
                                              )}
                                            </div>
                                            
                                            <div className="flex items-center space-x-2">
                                              {connection.status === "connected" ? (
                                                <>
                                                  <button className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center">
                                                    <RefreshCw className="h-3.5 w-3.5 mr-1.5" />
                                                    Sync Now
                                                  </button>
                                                  <button className="px-3 py-1.5 text-sm border border-red-300 text-red-600 rounded-lg hover:bg-red-50">
                                                    Disconnect
                                                  </button>
                                                </>
                                              ) : connection.status === "disconnected" ? (
                                                <button className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                                                  Reconnect
                                                </button>
                                              ) : (
                                                <button className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
                                                  Configure
                                                </button>
                                              )}
                                            </div>
                                          </div>
                                        </div>
                                      ))
                                    ) : (
                                      <div className="col-span-2 text-center py-12 bg-white border border-gray-200 rounded-lg">
                                        <WifiOff className="h-12 w-12 text-gray-400 mx-auto" />
                                        <h3 className="mt-4 text-lg font-medium text-gray-900">No connections found</h3>
                                        <p className="mt-2 text-gray-600">No development connections match the current filter.</p>
                                      </div>
                                    )}
                                  </div>

                                  {/* Development Statistics */}
                                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Development Connection Statistics</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                      <div className="bg-gray-50 rounded-lg p-4">
                                        <div className="text-2xl font-bold text-gray-900">
                                          {developmentConnections.filter(c => c.status === "connected").length}
                                        </div>
                                        <div className="text-sm text-gray-600 mt-1">Connected</div>
                                      </div>
                                      <div className="bg-gray-50 rounded-lg p-4">
                                        <div className="text-2xl font-bold text-gray-900">
                                          {developmentConnections.filter(c => c.status === "disconnected").length}
                                        </div>
                                        <div className="text-sm text-gray-600 mt-1">Disconnected</div>
                                      </div>
                                      <div className="bg-gray-50 rounded-lg p-4">
                                        <div className="text-2xl font-bold text-gray-900">
                                          {developmentConnections.filter(c => c.status === "pending").length}
                                        </div>
                                        <div className="text-sm text-gray-600 mt-1">Pending</div>
                                      </div>
                                      <div className="bg-gray-50 rounded-lg p-4">
                                        <div className="text-2xl font-bold text-gray-900">
                                          {developmentConnections.length}
                                        </div>
                                        <div className="text-sm text-gray-600 mt-1">Total Services</div>
                                      </div>
                                    </div>
                                  </div>
                                </>
                              );
                            })()}
                          </div>

                          {/* Social Connections Section */}
                          <div className="bg-white rounded-lg shadow">
                            <div className="p-6 border-b border-gray-200">
                              <div className="flex items-center justify-between">
                                <div>
                                  <h2 className="text-lg font-semibold text-gray-900">Social Connections</h2>
                                  <p className="text-sm text-gray-600 mt-1">Connect and manage your social media platforms</p>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium flex items-center">
                                    <ExternalLink className="h-4 w-4 mr-2" />
                                    Connect New
                                  </button>
                                </div>
                              </div>
                            </div>

                            {/* Social Connections Table */}
                            <div className="p-6">
                              {socialConnections.length > 0 ? (
                                <Table
                                  data={socialConnections}
                                  columns={socialConnectionsColumns}
                                  actions={socialConnectionsActions}
                                  checkSelect={false}
                                  onDelete={(row) => console.log('Delete:', row)}
                                />
                              ) : (
                                <div className="text-center py-12 bg-white border border-gray-200 rounded-lg">
                                  <Users className="h-12 w-12 text-gray-400 mx-auto" />
                                  <h3 className="mt-4 text-lg font-medium text-gray-900">No social connections</h3>
                                  <p className="mt-2 text-gray-600">Connect your social media accounts to get started.</p>
                                </div>
                              )}
                            </div>

                            {/* Social Statistics */}
                            <div className="bg-gray-50 border-t border-gray-200 p-6">
                              <h3 className="text-lg font-semibold text-gray-900 mb-4">Social Connection Statistics</h3>
                              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                                {socialConnections.map((social) => (
                                  <div key={social.id} className="bg-white rounded-lg p-4 border border-gray-200">
                                    <div className="flex items-center mb-3">
                                      {social.icon ? (
                                        <img
                                          src={social.icon}
                                          alt={social.name}
                                          className="h-8 w-8 rounded mr-3"
                                          onError={(e) => {
                                            e.target.style.display = 'none';
                                            e.target.nextElementSibling.style.display = 'flex';
                                          }}
                                        />
                                      ) : null}
                                      <div className={`h-8 w-8 rounded mr-3 flex items-center justify-center bg-gray-100 ${
                                        !social.icon ? '' : 'hidden'
                                      }`}>
                                        <span className="font-semibold text-gray-600 text-sm">
                                          {social.name.charAt(0)}
                                        </span>
                                      </div>
                                      <div className="font-medium text-gray-900">{social.name}</div>
                                    </div>
                                    <div className="space-y-2">
                                      <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">Followers:</span>
                                        <span className="font-medium">{social.followers}</span>
                                      </div>
                                      <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">Following:</span>
                                        <span className="font-medium">{social.following}</span>
                                      </div>
                                      <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">Posts:</span>
                                        <span className="font-medium">{social.posts}</span>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
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
  
  export default CustomerNew;