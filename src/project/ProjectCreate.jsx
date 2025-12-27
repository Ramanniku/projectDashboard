import {
    Users, Shield, Eye, Check
  } from "lucide-react";
  import React, { useState } from "react";
  import { useSelector } from "react-redux";
  import DashboardFooter from "../Utility/Footer";
  import Header from "../Utility/Header";
  import Navbar from "../Utility/Navbar";

  
  
  function ProjectCreate() {
    const user = useSelector((state) => state.auth.user);
    const isSidebarExpanded = useSelector((state) => state.ui.isSidebarExpanded);
  
    const [activeTab, setActiveTab] = useState("type");
    const [projectType, setProjectType] = useState(null);
    const [projectManage, setProjectManage] = useState(null);
  
    const [projectDetails, setProjectDetails] = useState({
      name: "",
      description: "",
      rate: "",
      client: "",
      billingType: "project_hours",
      status: "in_progress",
      tags: "",
      releaseDate: "",
    });
    const [settings, setSettings] = useState({
      notification: "all",
      visibleTabs: {
        tasks: true,
        timesheets: true,
        milestones: true,
        files: true,
        discussions: true,
        gantt: true,
        tickets: true,
        contracts: true,
        proposals: true,
        estimates: true,
        invoices: true,
        subscriptions: true,
        expenses: true,
        notes: true,
        activity: true,
      },
    });

    const [projectControl, setProjectControl] = useState({
      viewTasks: true,
      createTasks: true,
      editTasks: true,
      commentTasks: true,
      viewAttachments: true,
      viewChecklist: true,
      uploadAttachments: true,
      viewLoggedTime: true,
      uploadFiles: true,
      openDiscussions: true,
      viewMilestones: true,
      viewTimesheets: true,
      viewActivity: true,
      viewMembers: true,
      hideAdminTasks: true,
    });
    const toggleControl = (key) => {
      setProjectControl((prev) => ({ ...prev, [key]: !prev[key] }));
    };
        
    const toggleTab = (key) => {
      setSettings((prev) => ({
        ...prev,
        visibleTabs: {
          ...prev.visibleTabs,
          [key]: !prev.visibleTabs[key],
        },
      }));
    };
        
  
    const updateDetails = (key, value) => {
      setProjectDetails((prev) => ({ ...prev, [key]: value }));
    };
  
    const steps = ["type", "details", "settings", "budget", "assigned", "target", "attachment", "Completed"];
  
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Navbar />
  
        <div className="flex-1">
          <Header title="Projects" subtitle="Projects / Create" user={user} />
  
          <div
            className="pt-[100px] px-6 pb-6 space-y-6"
            style={{ paddingLeft: isSidebarExpanded ? "17.5rem" : "6.5rem" }}
          >
            <div className="text-sm text-gray-500">Projects / Home / Create</div>
  
            {/* Step Tabs */}
            <div className="bg-white rounded-xl shadow-sm">
              <div className="border-b grid grid-cols-7 text-sm font-medium text-gray-600">
                {steps.map((step) => {
                  const disabled = step === "details" && (!projectType || !projectManage);
                  return (
                    <div
                      key={step}
                      onClick={() => !disabled && setActiveTab(step)}
                      className={`text-center py-4 capitalize ${
                        activeTab === step
                          ? "border-b-2 border-blue-600 text-blue-600"
                          : disabled
                          ? "text-gray-400 cursor-not-allowed"
                          : "hover:text-blue-600 cursor-pointer"
                      }`}
                    >
                      {step}
                    </div>
                  );
                })}
              </div>
  
              {/* TYPE */}
              {activeTab === "type" && (
                <div className="p-10 space-y-10">
  
                  <div>
                    <h3 className="text-lg font-semibold">Project type</h3>
                    <div className="grid gap-4 max-w-xl mt-4">
                      {["personal", "team"].map((type) => (
                        <div
                          key={type}
                          onClick={() => setProjectType(type)}
                          className={`cursor-pointer rounded-xl p-4 flex justify-between items-center border-2 ${
                            projectType === type
                              ? "border-green-400 bg-green-50"
                              : "border-gray-200"
                          }`}
                        >
                          <div className="flex gap-3 items-center">
                            <Users className={projectType === type ? "text-green-500" : "text-gray-400"} />
                            <p className="font-medium capitalize">{type} Project</p>
                          </div>
                          {projectType === type && <Check className="text-green-500" />}
                        </div>
                      ))}
                    </div>
                  </div>
  
                  <div>
                    <h3 className="text-lg font-semibold">Project manage</h3>
                    <div className="grid gap-4 max-w-xl mt-4">
                      {[
                        { id: "everyone", label: "Everyone", icon: Eye },
                        { id: "admin", label: "Admins Only", icon: Shield },
                        { id: "specific", label: "Specific Users", icon: Users },
                      ].map(({ id, label, icon: Icon }) => (
                        <div
                          key={id}
                          onClick={() => setProjectManage(id)}
                          className={`cursor-pointer rounded-xl p-4 flex justify-between items-center border-2 ${
                            projectManage === id
                              ? "border-green-400 bg-green-50"
                              : "border-gray-200"
                          }`}
                        >
                          <div className="flex gap-3 items-center">
                            <Icon className={projectManage === id ? "text-green-500" : "text-gray-400"} />
                            <p className="font-medium">{label}</p>
                          </div>
                          {projectManage === id && <Check className="text-green-500" />}
                        </div>
                      ))}
                    </div>
                  </div>
  
                  <button
                    disabled={!projectType || !projectManage}
                    onClick={() => setActiveTab("details")}
                    className={`px-4 py-2 rounded ${
                      !projectType || !projectManage
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                  >
                    Next
                  </button>
                </div>
              )}
  
              {/* DETAILS */}
              {activeTab === "details" && (
  <div className="p-10 flex justify-center">
    <div className="bg-white rounded-xl shadow-sm p-8 w-full max-w-xl space-y-6">

      <h2 className="text-2xl font-semibold text-center">Project Details</h2>

      {/* Project Name */}
      <div>
        <label className="text-sm text-gray-500">Project Name</label>
        <input
          className="w-full mt-1 p-2 border rounded-lg"
          placeholder="Website Development"
          onChange={(e) => updateDetails("name", e.target.value)}
        />
      </div>

      {/* Description */}
      <div>
        <label className="text-sm text-gray-500">Description</label>

        {/* Toolbar */}
        <div className="flex flex-wrap gap-2 mb-2 border rounded-lg p-2 bg-gray-50">
          <button onClick={() => document.execCommand("bold")} className="px-2 font-bold">B</button>
          <button onClick={() => document.execCommand("italic")} className="px-2 italic">I</button>
          <button onClick={() => document.execCommand("underline")} className="px-2 underline">U</button>

          <select onChange={(e) => document.execCommand("fontName", false, e.target.value)}>
            <option value="Arial">Arial</option>
            <option value="Times New Roman">Times</option>
            <option value="Courier New">Courier</option>
          </select>

          <select onChange={(e) => document.execCommand("fontSize", false, e.target.value)}>
            <option value="3">Normal</option>
            <option value="4">Large</option>
            <option value="5">XL</option>
          </select>

          <button onClick={() => document.execCommand("justifyLeft")}>⬅</button>
          <button onClick={() => document.execCommand("justifyCenter")}>↔</button>
          <button onClick={() => document.execCommand("justifyRight")}>➡</button>
        </div>

        {/* Editable Area */}
        <div
          contentEditable
          className="w-full min-h-[120px] border rounded-lg p-2 focus:outline-none"
          onInput={(e) => updateDetails("description", e.currentTarget.innerHTML)}
        />
      </div>

      {/* Rate */}
      <div>
        <label className="text-sm text-gray-500">Rate per hour</label>
        <input type="number" className="w-full mt-1 p-2 border rounded-lg" />
      </div>

      {/* Client */}
      <div>
        <label className="text-sm text-gray-500">Project Client</label>
        <input className="w-full mt-1 p-2 border rounded-lg" />
      </div>

      {/* Billing Type */}
      <div>
        <label className="text-sm text-gray-500">Billing Type</label>
        <select className="w-full mt-1 p-2 border rounded-lg">
          <option>Fixed Rate</option>
          <option>Task Hours</option>
          <option>Project Hours</option>
        </select>
      </div>

      {/* Status */}
      <div>
        <label className="text-sm text-gray-500">Project Status</label>
        <select className="w-full mt-1 p-2 border rounded-lg">
          <option>In Progress</option>
          <option>Not Started</option>
          <option>Hold</option>
          <option>Declined</option>
          <option>Active</option>
          <option>Done</option>
        </select>
      </div>

      {/* Tags */}
      <div>
        <label className="text-sm text-gray-500">Project Tags</label>
        <input className="w-full mt-1 p-2 border rounded-lg" placeholder="primary" />
      </div>

      {/* Release Date */}
      <div>
        <label className="text-sm text-gray-500">Release Date</label>
        <input type="date" className="w-full mt-1 p-2 border rounded-lg" />
      </div>

      {/* Nav Buttons */}
      <div className="flex justify-between pt-4">
        <button onClick={() => setActiveTab("type")} className="border px-4 py-2 rounded-lg">
          Previous
        </button>
        <button className="bg-blue-600 text-white px-5 py-2 rounded-lg">
          Save Project
        </button>
      </div>

    </div>
  </div>
)}

{activeTab === "settings" && (
  <div className="p-10 flex justify-center">
    <div className="bg-white rounded-xl shadow-sm p-10 w-full max-w-3xl space-y-12">

      {/* Header */}
      <div className="text-center space-y-1">
        <h2 className="text-2xl font-semibold">Project settings</h2>
        <p className="text-gray-500 text-sm">Settings for your project features here.</p>
      </div>

      {/* Notifications */}
      <div className="space-y-2 max-w-md mx-auto">
        <label className="text-sm font-medium text-gray-700">
          Send contacts notifications
        </label>
        <select
          value={settings.notification}
          onChange={(e) => setSettings({ ...settings, notification: e.target.value })}
          className="w-full border rounded-lg px-4 py-2"
        >
          <option value="all">All contact with notification</option>
          <option value="important">Only important</option>
          <option value="none">None</option>
        </select>
      </div>

      {/* Visible Tabs */}
      <div className="space-y-6">
        <div className="text-center space-y-1">
          <h3 className="text-lg font-semibold">Visible tabs</h3>
          <p className="text-gray-500 text-sm">Visible tabs for your project.</p>
        </div>

        <div className="grid grid-cols-3 gap-x-12 gap-y-6 justify-items-start max-w-2xl mx-auto">
          {Object.entries(settings.visibleTabs).map(([key, value]) => (
            <label key={key} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={value}
                onChange={() => toggleTab(key)}
                className="w-4 h-4 accent-blue-600"
              />
              <span className="capitalize">{key.replace(/_/g, " ")}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Project Control */}
<div className="space-y-6">
  <div className="text-center space-y-1">
    <h3 className="text-lg font-semibold">Project control</h3>
    <p className="text-gray-500 text-sm">Project control for your project.</p>
  </div>

  <div className="space-y-4 max-w-xl mx-auto">
    {[
      ["viewTasks", "Allow customer to view tasks"],
      ["createTasks", "Allow customer to create tasks"],
      ["editTasks", "Allow customer to edit tasks"],
      ["commentTasks", "Allow customer to comment on project tasks"],
      ["viewAttachments", "Allow customer to view task attachments"],
      ["viewChecklist", "Allow customer to view task checklist items"],
      ["uploadAttachments", "Allow customer to upload attachments on tasks"],
      ["viewLoggedTime", "Allow customer to view task total logged time"],
      ["uploadFiles", "Allow customer to upload files"],
      ["openDiscussions", "Allow customer to open discussions"],
      ["viewMilestones", "Allow customer to view milestones"],
      ["viewTimesheets", "Allow customer to view timesheets"],
      ["viewActivity", "Allow customer to view activity log"],
      ["viewMembers", "Allow customer to view team members"],
      ["hideAdminTasks", "Hide project tasks on main tasks table (admin area)"],
    ].map(([key, label]) => (
      <label key={key} className="flex items-center gap-3 text-sm cursor-pointer">
        <input
          type="checkbox"
          checked={projectControl[key]}
          onChange={() => toggleControl(key)}
          className="w-4 h-4 accent-blue-600"
        />
        {label}
      </label>
    ))}
  </div>
</div>


      {/* Navigation */}
      <div className="flex justify-between pt-6 max-w-md mx-auto">
        <button
          onClick={() => setActiveTab("details")}
          className="px-4 py-2 border rounded-lg hover:bg-gray-50"
        >
          Previous
        </button>

        <button
          onClick={() => setActiveTab("budget")}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Next
        </button>
      </div>

    </div>
  </div>
)}


{activeTab === "budget" && (
  <div className="p-10 flex justify-center">
    <div className="bg-white rounded-xl shadow-sm p-10 w-full max-w-3xl space-y-10">

      <div className="text-center space-y-1">
        <h2 className="text-2xl font-semibold">Project budgets</h2>
        <p className="text-gray-500 text-sm">
          If you need more info, please check help center
        </p>
      </div>

      <div className="grid gap-6 max-w-md mx-auto">
        {[
          { id: 1, label: "Budget tier 1", range: "$100 - $999" },
          { id: 2, label: "Budget tier 2", range: "$1,000 - $4,999" },
          { id: 3, label: "Budget tier 3", range: "$4,999 - $9,999" },
          { id: 4, label: "Budget tier 4", range: "$10,000+" },
        ].map((tier) => (
          <div
            key={tier.id}
            className="border-2 border-dashed rounded-xl p-5 cursor-pointer hover:border-blue-600 hover:bg-blue-50 transition"
          >
            <p className="text-sm text-gray-500">{tier.label}</p>
            <p className="text-lg font-semibold">{tier.range}</p>
          </div>
        ))}
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-6 max-w-md mx-auto">
        <button
          onClick={() => setActiveTab("settings")}
          className="px-4 py-2 border rounded-lg hover:bg-gray-50"
        >
          Previous
        </button>

        <button
          onClick={() => setActiveTab("assigned")}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Next
        </button>
      </div>

    </div>
  </div>
)}
{activeTab === "assigned" && (
  <div className="p-10 flex justify-center">
    <div className="bg-white rounded-xl shadow-sm p-10 w-full max-w-4xl space-y-10">

      <div className="text-center space-y-1">
        <h2 className="text-2xl font-semibold">Project Assigned</h2>
        <p className="text-gray-500 text-sm">
          If you need more info, please check help center
        </p>
      </div>

      {/* Invite */}
      <div className="space-y-2 max-w-lg mx-auto">
        <label className="text-sm font-medium text-gray-700">
          Invite Teammates
        </label>
        <input
          placeholder="Add project members by name or email..."
          className="w-full border rounded-lg px-4 py-2"
        />
      </div>

      <hr />

      {/* Team Members */}
      <div className="space-y-6 max-w-2xl mx-auto">
        <h3 className="text-lg font-semibold">Team Members</h3>

        {[
          { name: "Archie Cantones", email: "archie.tones@gmail.com", role: "Admin", color: "blue" },
          { name: "Holmes Cherryman", email: "holms.chan@gmail.com", role: "Guest", color: "teal" },
          { name: "Malanie Hanvey", email: "lanie.neven@gmail.com", role: "Editor", color: "red" },
          { name: "Kenneth Hune", email: "neth.une@gmail.com", role: "Owner", color: "orange" },
          { name: "Valentine Maton", email: "alenine.aton@gmail.com", role: "Customer", color: "green" },
          { name: "Bryan Waters", email: "neth.une@gmail.com", role: "Admin", color: "blue" },
        ].map((user, i) => (
          <div key={i} className="flex items-center justify-between border-b pb-4">
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-full bg-${user.color}-500 text-white flex items-center justify-center font-semibold`}>
                {user.name[0]}
              </div>
              <div>
                <p className="font-medium">{user.name}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
            </div>

            <select className="border rounded-lg px-3 py-1 text-sm">
              {["Admin", "Guest", "Editor", "Owner", "Customer"].map((r) => (
                <option key={r} selected={r === user.role}>
                  {r}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-6 max-w-md mx-auto">
        <button
          onClick={() => setActiveTab("budget")}
          className="px-4 py-2 border rounded-lg hover:bg-gray-50"
        >
          Previous
        </button>

        <button
          onClick={() => setActiveTab("target")}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Next
        </button>
      </div>

    </div>
  </div>
)}

{activeTab === "target" && (
  <div className="p-10 flex justify-center">
    <div className="bg-white rounded-xl shadow-sm p-10 w-full max-w-3xl space-y-10">

      {/* Header */}
      <div className="text-center space-y-1">
        <h2 className="text-2xl font-semibold">Project target</h2>
        <p className="text-gray-500 text-sm">
          If you need more info, please check help center
        </p>
      </div>

      {/* Target Title */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Target title</label>
        <input
          placeholder="First target title..."
          className="w-full border rounded-lg px-4 py-2"
        />
      </div>

      {/* Target Description */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">
          Target Description <span className="text-red-500">*</span>
        </label>

        {/* Toolbar */}
        <div className="flex flex-wrap gap-2 mb-2 border rounded-lg p-2 bg-gray-50 text-sm">
          <button onClick={() => document.execCommand("bold")} className="font-bold px-2">B</button>
          <button onClick={() => document.execCommand("italic")} className="italic px-2">I</button>
          <button onClick={() => document.execCommand("underline")} className="underline px-2">U</button>
          <button onClick={() => document.execCommand("insertUnorderedList")}>• List</button>
          <button onClick={() => document.execCommand("justifyLeft")}>Left</button>
          <button onClick={() => document.execCommand("justifyCenter")}>Center</button>
          <button onClick={() => document.execCommand("justifyRight")}>Right</button>
        </div>

        <div
          contentEditable
          className="min-h-[140px] w-full border rounded-lg p-3 focus:outline-none"
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit...
        </div>
      </div>

      {/* Release Date */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">
          Release Date <span className="text-red-500">*</span>
        </label>
        <input type="date" className="w-full border rounded-lg px-4 py-2" />
      </div>

      {/* Assigned */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">
          Target assigned <span className="text-red-500">*</span>
        </label>
        <div className="flex gap-2 border rounded-lg px-3 py-2 flex-wrap">
          <span className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full text-sm">
            <img
              src="https://i.pravatar.cc/20"
              className="w-5 h-5 rounded-full"
            />
            archie.tones@gmail.com
            <button className="text-gray-500 hover:text-red-500">×</button>
          </span>
        </div>
      </div>

      {/* Tags */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">
          Project tags <span className="text-red-500">*</span>
        </label>
        <div className="flex gap-2 border rounded-lg px-3 py-2 flex-wrap">
          {[
            { label: "VIP", color: "green" },
            { label: "Team", color: "blue" },
            { label: "Personal", color: "orange" },
          ].map((tag) => (
            <span
              key={tag.label}
              className={`flex items-center gap-2 bg-${tag.color}-100 text-${tag.color}-700 px-3 py-1 rounded-full text-sm`}
            >
              <span className={`w-2 h-2 bg-${tag.color}-500 rounded-full`} />
              {tag.label}
              <button className="ml-1">×</button>
            </span>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-6">
        <button
          onClick={() => setActiveTab("assigned")}
          className="px-4 py-2 border rounded-lg hover:bg-gray-50"
        >
          Previous
        </button>

        <button
          onClick={() => setActiveTab("attachment")}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Next
        </button>
      </div>

    </div>
  </div>
)}
{activeTab === "attachment" && (
  <div className="p-10 flex justify-center">
    <div className="bg-white rounded-xl shadow-sm p-10 w-full max-w-4xl space-y-10">

      {/* Header */}
      <div className="text-center space-y-1">
        <h2 className="text-2xl font-semibold">Attachement files</h2>
        <p className="text-gray-500 text-sm">
          If you need more info, please check help center
        </p>
      </div>

      {/* Upload Box */}
      <div className="border-2 border-dashed rounded-xl p-10 text-center bg-gray-50 cursor-pointer hover:bg-gray-100">
        <p className="text-blue-600 font-medium">Upload Document</p>
        <input type="file" className="hidden" />
      </div>

      {/* File Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

        {[
          { type: "ZIP", color: "green" },
          { type: "PNG", color: "purple" },
          { type: "PDF", color: "red" },
          { type: "PSD", color: "blue" },
        ].map((file, idx) => (
          <div
            key={idx}
            className="bg-white border rounded-xl shadow-sm p-6 text-center relative"
          >
            <button className="absolute top-3 right-3 text-gray-400 hover:text-gray-600">
              ⋮
            </button>

            <div
              className={`mx-auto mb-4 w-14 h-14 rounded-xl flex items-center justify-center bg-${file.color}-100`}
            >
              <span className={`font-bold text-${file.color}-600`}>
                {file.type}
              </span>
            </div>

            <p className="font-medium text-sm">UI/UX Design Templates</p>
            <p className="text-xs text-gray-500 mt-1">
              PROJECT / DASHBOARD / WEBAPPS
            </p>
          </div>
        ))}

      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-6">
        <button
          onClick={() => setActiveTab("target")}
          className="px-4 py-2 border rounded-lg hover:bg-gray-50"
        >
          Previous
        </button>

        <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
          Complete
        </button>
      </div>

    </div>
  </div>
)}

{activeTab === "Completed" && (
  <div className="p-10 flex justify-center">
    <div className="bg-white rounded-xl shadow-sm p-12 w-full max-w-3xl text-center space-y-8">

      {/* Illustration */}
      <div className="flex justify-center">
      <img
  src="https://cdn.jsdelivr.net/gh/undraw/illustrations/png/completed.png"
  alt="Project Created"
  className="w-64 h-auto mx-auto"
/>


      </div>

      {/* Title */}
      <h2 className="text-2xl font-semibold text-gray-800">Project Created!</h2>

      {/* Subtitle */}
      <p className="text-gray-500 text-sm max-w-md mx-auto">
        If you need more info, please check how to create project
      </p>

      {/* Actions */}
      <div className="flex justify-center gap-4 pt-4">
        <button
          onClick={() => setActiveTab("type")}
          className="px-5 py-2 border rounded-lg hover:bg-gray-50"
        >
          Create New Project
        </button>

        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Preview Project
        </button>
      </div>

    </div>
  </div>
)}


            </div>
  
            <DashboardFooter />
          </div>
        </div>
      </div>
    );
  }
  
  export default ProjectCreate;
  