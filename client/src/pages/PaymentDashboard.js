import React, { useState, useEffect } from "react";
import {
  Bell,
  Clock,
  DollarSign,
  FileText,
  Inbox,
  AlertCircle,
  ChevronDown,
  Search,
  Filter,
  Calendar,
  PieChart,
  BarChart2,
  User,
  Send,
} from "lucide-react";
import FinancialDashboard from "./Tax";

const PaymentDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [invoices, setInvoices] = useState([]);
  const [clients, setClients] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [showReminderModal, setShowReminderModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [customMessage, setCustomMessage] = useState("");

  // Mock data initialization
  useEffect(() => {
    // Sample invoice data
    const sampleInvoices = [
      {
        id: "INV-2025-001",
        client: "Acme Corp",
        amount: 1250.0,
        status: "paid",
        dueDate: "2025-02-28",
        datePaid: "2025-02-25",
        lateRisk: "low",
      },
      {
        id: "INV-2025-002",
        client: "Globex Inc",
        amount: 3450.75,
        status: "pending",
        dueDate: "2025-03-15",
        datePaid: null,
        lateRisk: "high",
      },
      {
        id: "INV-2025-003",
        client: "Stark Industries",
        amount: 7890.5,
        status: "overdue",
        dueDate: "2025-03-01",
        datePaid: null,
        lateRisk: "medium",
      },
      {
        id: "INV-2025-004",
        client: "Wayne Enterprises",
        amount: 2340.25,
        status: "pending",
        dueDate: "2025-03-20",
        datePaid: null,
        lateRisk: "low",
      },
      {
        id: "INV-2025-005",
        client: "LexCorp",
        amount: 5670.0,
        status: "overdue",
        dueDate: "2025-02-15",
        datePaid: null,
        lateRisk: "high",
      },
    ];

    // Sample client data
    const sampleClients = [
      {
        id: 1,
        name: "Acme Corp",
        email: "billing@acmecorp.com",
        paymentHistory: "excellent",
        lateRisk: "low",
      },
      {
        id: 2,
        name: "Globex Inc",
        email: "accounts@globex.com",
        paymentHistory: "poor",
        lateRisk: "high",
      },
      {
        id: 3,
        name: "Stark Industries",
        email: "finance@stark.com",
        paymentHistory: "average",
        lateRisk: "medium",
      },
      {
        id: 4,
        name: "Wayne Enterprises",
        email: "payments@wayne.com",
        paymentHistory: "good",
        lateRisk: "low",
      },
      {
        id: 5,
        name: "LexCorp",
        email: "invoices@lexcorp.com",
        paymentHistory: "poor",
        lateRisk: "high",
      },
    ];

    // Sample notifications
    const sampleNotifications = [
      {
        id: 1,
        type: "reminder_sent",
        message: "Payment reminder sent to Globex Inc",
        timestamp: "2025-03-07T09:35:00",
      },
      {
        id: 2,
        type: "payment_received",
        message: "Payment received from Acme Corp",
        timestamp: "2025-03-06T14:22:00",
      },
      {
        id: 3,
        type: "late_payment_risk",
        message: "LexCorp flagged as high risk for late payment",
        timestamp: "2025-03-05T11:15:00",
      },
      {
        id: 4,
        type: "invoice_generated",
        message: "New invoice generated for Wayne Enterprises",
        timestamp: "2025-03-04T16:48:00",
      },
    ];

    setInvoices(sampleInvoices);
    setClients(sampleClients);
    setNotifications(sampleNotifications);
  }, []);

  const handleSendReminder = () => {
    if (!selectedClient) return;

    // In a real app, this would send the reminder through an API
    const newNotification = {
      id: notifications.length + 1,
      type: "reminder_sent",
      message: `AI-personalized payment reminder sent to ${selectedClient.name}`,
      timestamp: new Date().toISOString(),
    };

    setNotifications([newNotification, ...notifications]);
    setShowReminderModal(false);
    setCustomMessage("");
    setSelectedClient(null);
  };

  const openReminderModal = (client) => {
    setSelectedClient(client);
    // AI would generate a personalized message based on client payment history
    const aiSuggestedMessage =
      client.lateRisk === "high"
        ? `Dear ${client.name}, we noticed your recent invoice is now overdue. We value your business and would appreciate your prompt attention to this matter.`
        : `Dear ${client.name}, this is a friendly reminder that your invoice will be due soon. Thank you for your continued business.`;

    setCustomMessage(aiSuggestedMessage);
    setShowReminderModal(true);
  };

  const getLateRiskStyle = (risk) => {
    switch (risk) {
      case "high":
        return "bg-red-100 text-red-700";
      case "medium":
        return "bg-yellow-100 text-yellow-700";
      case "low":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-700";
      case "pending":
        return "bg-purple-100 text-purple-700";
      case "overdue":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // Dashboard widgets
  const renderDashboard = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-lg shadow-md col-span-1 md:col-span-2 lg:col-span-3">
        <h2 className="text-lg font-semibold mb-4">Payment Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <FileText className="text-purple-600" size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Invoices</p>
                <p className="text-xl font-bold">{invoices.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-full mr-4">
                <DollarSign className="text-green-600" size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Paid Amount</p>
                <p className="text-xl font-bold">
                  $
                  {invoices
                    .filter((inv) => inv.status === "paid")
                    .reduce((sum, inv) => sum + inv.amount, 0)
                    .toFixed(2)}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-red-50 p-4 rounded-lg">
            <div className="flex items-center">
              <div className="bg-red-100 p-3 rounded-full mr-4">
                <AlertCircle className="text-red-600" size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Overdue</p>
                <p className="text-xl font-bold">
                  $
                  {invoices
                    .filter((inv) => inv.status === "overdue")
                    .reduce((sum, inv) => sum + inv.amount, 0)
                    .toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md col-span-1 md:col-span-2">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Recent Invoices</h2>
          <button
            className="text-sm text-blue-600 hover:underline"
            onClick={() => setActiveTab("invoices")}
          >
            View All
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-500 text-sm border-b">
                <th className="pb-2">Invoice</th>
                <th className="pb-2">Client</th>
                <th className="pb-2">Amount</th>
                <th className="pb-2">Status</th>
                <th className="pb-2">Late Risk</th>
              </tr>
            </thead>
            <tbody>
              {invoices.slice(0, 3).map((invoice) => (
                <tr key={invoice.id} className="border-b">
                  <td className="py-3">{invoice.id}</td>
                  <td className="py-3">{invoice.client}</td>
                  <td className="py-3">${invoice.amount.toFixed(2)}</td>
                  <td className="py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${getStatusStyle(
                        invoice.status
                      )}`}
                    >
                      {invoice.status.charAt(0).toUpperCase() +
                        invoice.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${getLateRiskStyle(
                        invoice.lateRisk
                      )}`}
                    >
                      {invoice.lateRisk.charAt(0).toUpperCase() +
                        invoice.lateRisk.slice(1)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Late Payment Risks</h2>
          <button
            className="text-sm text-purple-600 hover:underline"
            onClick={() => setActiveTab("clients")}
          >
            View All
          </button>
        </div>
        <div className="space-y-4">
          {clients
            .filter((client) => client.lateRisk === "high")
            .map((client) => (
              <div
                key={client.id}
                className="flex items-center justify-between p-3 bg-red-50 rounded-lg"
              >
                <div>
                  <p className="font-medium">{client.name}</p>
                  <p className="text-sm text-gray-500">
                    Payment History: {client.paymentHistory}
                  </p>
                </div>
                <button
                  className="bg-purple-600 text-white px-3 py-1 rounded-md text-sm hover:bg-purple-700"
                  onClick={() => openReminderModal(client)}
                >
                  Send Reminder
                </button>
              </div>
            ))}
          {clients.filter((client) => client.lateRisk === "high").length ===
            0 && (
            <p className="text-sm text-gray-500 italic">
              No high-risk clients at the moment.
            </p>
          )}
        </div>
      </div>
    </div>
  );

  // Invoices tab
  const renderInvoices = () => (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <FinancialDashboard />
      {/* <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Invoice Management</h2>
        <button className="bg-purple-600 text-white px-4 py-2 rounded-md flex items-center">
          <FileText size={16} className="mr-2" />
          Generate Invoice
        </button>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
        <div className="flex items-center w-full md:w-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search invoices..."
              className="pl-10 pr-4 py-2 border rounded-md w-full md:w-64"
            />
            <Search size={16} className="absolute left-3 top-3 text-gray-400" />
          </div>
        </div>
        <div className="flex space-x-2 w-full md:w-auto">
          <button className="border px-3 py-2 rounded-md flex items-center">
            <Filter size={16} className="mr-2" />
            Status
            <ChevronDown size={16} className="ml-2" />
          </button>
          <button className="border px-3 py-2 rounded-md flex items-center">
            <Calendar size={16} className="mr-2" />
            Date Range
            <ChevronDown size={16} className="ml-2" />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-gray-500 text-sm border-b">
              <th className="pb-3">Invoice ID</th>
              <th className="pb-3">Client</th>
              <th className="pb-3">Due Date</th>
              <th className="pb-3">Amount</th>
              <th className="pb-3">Status</th>
              <th className="pb-3">Late Risk</th>
              <th className="pb-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <tr key={invoice.id} className="border-b">
                <td className="py-4">{invoice.id}</td>
                <td className="py-4">{invoice.client}</td>
                <td className="py-4">{invoice.dueDate}</td>
                <td className="py-4">${invoice.amount.toFixed(2)}</td>
                <td className="py-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${getStatusStyle(
                      invoice.status
                    )}`}
                  >
                    {invoice.status.charAt(0).toUpperCase() +
                      invoice.status.slice(1)}
                  </span>
                </td>
                <td className="py-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${getLateRiskStyle(
                      invoice.lateRisk
                    )}`}
                  >
                    {invoice.lateRisk.charAt(0).toUpperCase() +
                      invoice.lateRisk.slice(1)}
                  </span>
                </td>
                <td className="py-4">
                  <div className="flex space-x-2">
                    <button className="text-purple-600 hover:text-purple-800">
                      <FileText size={16} />
                    </button>
                    {invoice.status !== "paid" && (
                      <button
                        className="text-green-600 hover:text-green-800"
                        onClick={() =>
                          openReminderModal(
                            clients.find((c) => c.name === invoice.client)
                          )
                        }
                      >
                        <Send size={16} />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> */}
    </div>
  );

  // Clients tab
  const renderClients = () => (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Client Payment Management</h2>
        <button className="bg-purple-600 text-white px-4 py-2 rounded-md flex items-center">
          <User size={16} className="mr-2" />
          Add Client
        </button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search clients..."
            className="pl-10 pr-4 py-2 border rounded-md w-full md:w-64"
          />
          <Search size={16} className="absolute left-3 top-3 text-gray-400" />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-gray-500 text-sm border-b">
              <th className="pb-3">Client</th>
              <th className="pb-3">Email</th>
              <th className="pb-3">Payment History</th>
              <th className="pb-3">Late Payment Risk</th>
              <th className="pb-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client.id} className="border-b">
                <td className="py-4">{client.name}</td>
                <td className="py-4">{client.email}</td>
                <td className="py-4 capitalize">{client.paymentHistory}</td>
                <td className="py-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${getLateRiskStyle(
                      client.lateRisk
                    )}`}
                  >
                    {client.lateRisk.charAt(0).toUpperCase() +
                      client.lateRisk.slice(1)}
                  </span>
                </td>
                <td className="py-4">
                  <button
                    className="bg-purple-600 text-white px-3 py-1 rounded-md text-sm hover:bg-purple-700"
                    onClick={() => openReminderModal(client)}
                  >
                    Send Reminder
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // Render modal for AI-powered payment reminders
  const renderReminderModal = () =>
    showReminderModal && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">
              AI-Powered Payment Reminder
            </h2>
            <button
              className="text-gray-400 hover:text-gray-600"
              onClick={() => setShowReminderModal(false)}
            >
              ✕
            </button>
          </div>

          {selectedClient && (
            <div className="mb-4">
              <div className="bg-purple-50 p-4 rounded-lg mb-4">
                <div className="flex items-start">
                  <div className="bg-purple-100 p-2 rounded-full mr-3">
                    <User className="text-purple-600" size={20} />
                  </div>
                  <div>
                    <p className="font-medium">{selectedClient.name}</p>
                    <p className="text-sm text-gray-600">
                      {selectedClient.email}
                    </p>
                    <div className="mt-2 flex items-center">
                      <span className="text-sm text-gray-500 mr-3">
                        Late Payment Risk:
                      </span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${getLateRiskStyle(
                          selectedClient.lateRisk
                        )}`}
                      >
                        {selectedClient.lateRisk.charAt(0).toUpperCase() +
                          selectedClient.lateRisk.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  AI-Suggested Reminder Message:
                </label>
                <textarea
                  className="w-full border rounded-md p-3 h-32"
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                ></textarea>
                <p className="text-sm text-gray-500 mt-2">
                  This message has been personalized based on the client's
                  payment history and risk profile.
                </p>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  className="border px-4 py-2 rounded-md"
                  onClick={() => setShowReminderModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-purple-600 text-white px-4 py-2 rounded-md flex items-center"
                  onClick={handleSendReminder}
                >
                  <Send size={16} className="mr-2" />
                  Send Reminder
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <DollarSign size={28} className="text-purple-600" />
              <h1 className="ml-2 text-xl font-bold">AI Invoicing</h1>
            </div>
            <div className="flex items-center">
              <button className="relative p-2">
                <Bell size={20} />
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
              </button>
              <div className="ml-4 flex items-center">
                <div className="h-8 w-8 rounded-full bg-purple-600 flex items-center justify-center text-white">
                  A
                </div>
                <span className="ml-2 font-medium">Admin</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-64 shrink-0">
            <div className="bg-white rounded-lg shadow-md p-4">
              <nav>
                <ul className="space-y-1">
                  <li>
                    <button
                      className={`w-full flex items-center p-3 rounded-md ${
                        activeTab === "dashboard"
                          ? "bg-purple-50 text-purple-600"
                          : "hover:bg-gray-50"
                      }`}
                      onClick={() => setActiveTab("dashboard")}
                    >
                      <PieChart size={18} className="mr-3" />
                      Dashboard
                    </button>
                  </li>
                  <li>
                    <button
                      className={`w-full flex items-center p-3 rounded-md ${
                        activeTab === "invoices"
                          ? "bg-purple-50 text-purple-600"
                          : "hover:bg-gray-50"
                      }`}
                      onClick={() => setActiveTab("invoices")}
                    >
                      <FileText size={18} className="mr-3" />
                      Invoices
                    </button>
                  </li>
                  <li>
                    <button
                      className={`w-full flex items-center p-3 rounded-md ${
                        activeTab === "clients"
                          ? "bg-purple-50 text-purple-600"
                          : "hover:bg-gray-50"
                      }`}
                      onClick={() => setActiveTab("clients")}
                    >
                      <User size={18} className="mr-3" />
                      Clients
                    </button>
                  </li>
                  {/* <li>
                    <button
                      className={`w-full flex items-center p-3 rounded-md ${
                        activeTab === "analytics"
                          ? "bg-purple-50 text-purple-600"
                          : "hover:bg-gray-50"
                      }`}
                      onClick={() => setActiveTab("analytics")}
                    >
                      <BarChart2 size={18} className="mr-3" />
                      Analytics
                    </button>
                  </li> */}
                </ul>
              </nav>

              <div className="mt-6 pt-6 border-t">
                <h3 className="font-medium mb-3">Recent Notifications</h3>
                <div className="space-y-3">
                  {notifications.slice(0, 3).map((notification) => (
                    <div
                      key={notification.id}
                      className="text-sm border-l-2 border-purple-500 pl-3 py-1"
                    >
                      <p className="text-gray-800">{notification.message}</p>
                      <p className="text-gray-500 text-xs mt-1">
                        {new Date(notification.timestamp).toLocaleTimeString(
                          [],
                          { hour: "2-digit", minute: "2-digit" }
                        )}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1">
            {activeTab === "dashboard" && renderDashboard()}
            {activeTab === "invoices" && renderInvoices()}
            {activeTab === "clients" && renderClients()}
            {/* {activeTab === "analytics" && (
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">
                  Payment Analytics
                </h2>
                <p className="text-gray-500">
                  Analytics dashboard is under development.
                </p>
              </div>
            )} */}
          </div>
        </div>
      </div>

      {/* AI-powered payment reminder modal */}
      {renderReminderModal()}
    </div>
  );
};

export default PaymentDashboard;
