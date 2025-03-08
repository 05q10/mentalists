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

const FinancialDashboard = () => {
  const [invoices, setInvoices] = useState([]);
  const [clients, setClients] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [showReminderModal, setShowReminderModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [customMessage, setCustomMessage] = useState("");

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

  // State for expenses
  const [expenses, setExpenses] = useState([
    {
      id: 1,
      description: "Office Supplies",
      amount: 450.0,
      date: "2025-02-10",
      category: "Office",
    },
    {
      id: 2,
      description: "Software Subscription",
      amount: 199.99,
      date: "2025-02-15",
      category: "Software",
    },
  ]);

  // State for new expense form
  const [newExpense, setNewExpense] = useState({
    description: "",
    amount: "",
    date: "",
    category: "Office",
  });

  // State for active tab
  const [activeTab, setActiveTab] = useState("income");

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

  // Fixed tax rates
  const taxRates = {
    bracket1: { rate: 10, threshold: 10000 },
    bracket2: { rate: 22, threshold: 50000 },
    bracket3: { rate: 30, threshold: Infinity },
  };

  // Calculate totals
  const totalInvoiced = sampleInvoices.reduce(
    (sum, invoice) => sum + invoice.amount,
    0
  );
  const totalPaid = sampleInvoices
    .filter((invoice) => invoice.status === "paid")
    .reduce((sum, invoice) => sum + invoice.amount, 0);
  const totalPending = sampleInvoices
    .filter((invoice) => invoice.status === "pending")
    .reduce((sum, invoice) => sum + invoice.amount, 0);
  const totalOverdue = sampleInvoices
    .filter((invoice) => invoice.status === "overdue")
    .reduce((sum, invoice) => sum + invoice.amount, 0);
  const totalOutstanding = totalPending + totalOverdue;
  const totalExpenses = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );
  const netIncome = totalPaid - totalExpenses;
  const potentialNetIncome = netIncome + totalOutstanding;

  // Calculate tax payable
  const calculateTax = (income) => {
    if (income <= 0) return 0;

    let tax = 0;
    const { bracket1, bracket2, bracket3 } = taxRates;

    if (income <= bracket1.threshold) {
      tax = income * (bracket1.rate / 100);
    } else if (income <= bracket2.threshold) {
      tax =
        bracket1.threshold * (bracket1.rate / 100) +
        (income - bracket1.threshold) * (bracket2.rate / 100);
    } else {
      tax =
        bracket1.threshold * (bracket1.rate / 100) +
        (bracket2.threshold - bracket1.threshold) * (bracket2.rate / 100) +
        (income - bracket2.threshold) * (bracket3.rate / 100);
    }

    return tax;
  };

  const taxPayable = calculateTax(netIncome);

  // Handle adding new expense
  const handleAddExpense = () => {
    if (!newExpense.description || !newExpense.amount || !newExpense.date) {
      alert("Please fill all fields");
      return;
    }

    const expenseAmount = parseFloat(newExpense.amount);
    if (isNaN(expenseAmount) || expenseAmount <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    const newExpenseObject = {
      id: expenses.length > 0 ? Math.max(...expenses.map((e) => e.id)) + 1 : 1,
      description: newExpense.description,
      amount: expenseAmount,
      date: newExpense.date,
      category: newExpense.category,
    };

    setExpenses([...expenses, newExpenseObject]);
    setNewExpense({
      description: "",
      amount: "",
      date: "",
      category: "Office",
    });
  };

  const handleDeleteExpense = (id) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const currentTaxPayable = calculateTax(netIncome);
  const potentialTaxPayable = calculateTax(potentialNetIncome);
  const additionalTaxOnOutstanding = potentialTaxPayable - currentTaxPayable;

  return (
    <div className=" min-h-screen p-3">
      <div className="max-w-6xl mx-auto">
        {/* <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Financial Dashboard
        </h1> */}

        {/* Navigation Tabs */}
        <div className="flex mb-6 border-b border-gray-200">
          <button
            className={`py-2 px-4 font-medium ${
              activeTab === "income"
                ? "text-purple-600 border-b-2 border-purple-500"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("income")}
          >
            Income Summary
          </button>
          <button
            className={`py-2 px-4 font-medium ${
              activeTab === "expenses"
                ? "text-purple-600 border-b-2 border-purple-500"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("expenses")}
          >
            Expense Tracking
          </button>
          <button
            className={`py-2 px-4 font-medium ${
              activeTab === "tax"
                ? "text-purple-600 border-b-2 border-purple-500"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("tax")}
          >
            Tax Calculator
          </button>
        </div>

        {/* Income Summary Section */}
        {activeTab === "income" && (
          //   <div>
          //     <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          //       <div className="bg-white p-4 rounded-lg shadow">
          //         <h3 className="text-sm font-medium text-gray-500">
          //           Total Invoiced
          //         </h3>
          //         <p className="text-2xl font-bold text-gray-800">
          //           {formatCurrency(totalInvoiced)}
          //         </p>
          //       </div>
          //       <div className="bg-white p-4 rounded-lg shadow">
          //         <h3 className="text-sm font-medium text-gray-500">Paid</h3>
          //         <p className="text-2xl font-bold text-green-600">
          //           {formatCurrency(totalPaid)}
          //         </p>
          //       </div>
          //       <div className="bg-white p-4 rounded-lg shadow">
          //         <h3 className="text-sm font-medium text-gray-500">Pending</h3>
          //         <p className="text-2xl font-bold text-yellow-600">
          //           {formatCurrency(totalPending)}
          //         </p>
          //       </div>
          //       <div className="bg-white p-4 rounded-lg shadow">
          //         <h3 className="text-sm font-medium text-gray-500">Overdue</h3>
          //         <p className="text-2xl font-bold text-red-600">
          //           {formatCurrency(totalOverdue)}
          //         </p>
          //       </div>
          //     </div>

          //     <div className="bg-white rounded-lg shadow mb-6">
          //       <div className="p-4 border-b border-gray-200">
          //         <h2 className="text-lg font-medium text-gray-800">
          //           Invoice Details
          //         </h2>
          //       </div>
          //       <div className="overflow-x-auto">
          //         <table className="min-w-full divide-y divide-gray-200">
          //           <thead className="bg-gray-50">
          //             <tr>
          //               <th
          //                 scope="col"
          //                 className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          //               >
          //                 Invoice #
          //               </th>
          //               <th
          //                 scope="col"
          //                 className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          //               >
          //                 Client
          //               </th>
          //               <th
          //                 scope="col"
          //                 className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          //               >
          //                 Amount
          //               </th>
          //               <th
          //                 scope="col"
          //                 className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          //               >
          //                 Status
          //               </th>
          //               <th
          //                 scope="col"
          //                 className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          //               >
          //                 Due Date
          //               </th>
          //             </tr>
          //           </thead>
          //           <tbody className="bg-white divide-y divide-gray-200">
          //             {sampleInvoices.map((invoice) => (
          //               <tr key={invoice.id}>
          //                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
          //                   {invoice.id}
          //                 </td>
          //                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          //                   {invoice.client}
          //                 </td>
          //                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          //                   {formatCurrency(invoice.amount)}
          //                 </td>
          //                 <td className="px-6 py-4 whitespace-nowrap">
          //                   <span
          //                     className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
          //                     ${
          //                       invoice.status === "paid"
          //                         ? "bg-green-100 text-green-800"
          //                         : invoice.status === "pending"
          //                         ? "bg-yellow-100 text-yellow-800"
          //                         : "bg-red-100 text-red-800"
          //                     }`}
          //                   >
          //                     {invoice.status}
          //                   </span>
          //                 </td>
          //                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          //                   {invoice.dueDate}
          //                 </td>
          //               </tr>
          //             ))}
          //           </tbody>
          //         </table>
          //       </div>
          //     </div>
          //   </div>
          <div>
            <div className="flex justify-between items-center mb-6">
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
                  <Search
                    size={16}
                    className="absolute left-3 top-3 text-gray-400"
                  />
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
            </div>
          </div>
        )}

        {/* Expense Tracking Section */}
        {activeTab === "expenses" && (
          <div>
            <div className="bg-white rounded-lg shadow mb-6">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-800">
                  Add New Expense
                </h2>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded"
                      value={newExpense.description}
                      onChange={(e) =>
                        setNewExpense({
                          ...newExpense,
                          description: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Amount
                    </label>
                    <input
                      type="number"
                      className="w-full p-2 border border-gray-300 rounded"
                      value={newExpense.amount}
                      onChange={(e) =>
                        setNewExpense({ ...newExpense, amount: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date
                    </label>
                    <input
                      type="date"
                      className="w-full p-2 border border-gray-300 rounded"
                      value={newExpense.date}
                      onChange={(e) =>
                        setNewExpense({ ...newExpense, date: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category
                    </label>
                    <select
                      className="w-full p-2 border border-gray-300 rounded"
                      value={newExpense.category}
                      onChange={(e) =>
                        setNewExpense({
                          ...newExpense,
                          category: e.target.value,
                        })
                      }
                    >
                      <option value="Office">Office</option>
                      <option value="Software">Software</option>
                      <option value="Travel">Travel</option>
                      <option value="Utilities">Utilities</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
                <div className="mt-4">
                  <button
                    className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-blue-700"
                    onClick={handleAddExpense}
                  >
                    Add Expense
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow">
              <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-lg font-medium text-gray-800">
                  Expense Records
                </h2>
                <span className="font-medium">
                  Total: {formatCurrency(totalExpenses)}
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider "
                      >
                        Description
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider"
                      >
                        Amount
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider"
                      >
                        Date
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider"
                      >
                        Category
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {expenses.map((expense) => (
                      <tr key={expense.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {expense.description}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {formatCurrency(expense.amount)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {expense.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                            {expense.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            className="text-red-600 hover:text-red-900"
                            onClick={() => handleDeleteExpense(expense.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tax Calculator Section - Redesigned */}
        {activeTab === "tax" && (
          <div className="space-y-6">
            {/* Current Tax Situation */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="bg-purple-600 p-4">
                <h2 className="text-xl font-bold text-white">
                  Current Tax Situation
                </h2>
                <p className="text-white mt-1">
                  Based on paid invoices and current expenses
                </p>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Income Summary */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-800 mb-4">
                      Income & Expenses
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">
                          Total Paid Invoices
                        </span>
                        <span className="font-medium">
                          {formatCurrency(totalPaid)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Total Expenses</span>
                        <span className="font-medium text-red-600">
                          -{formatCurrency(totalExpenses)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                        <span className="font-medium">Net Taxable Income</span>
                        <span className="font-bold text-lg">
                          {formatCurrency(netIncome)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Tax Calculation */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-medium text-gray-800 mb-4">
                      Tax Calculation
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span>
                          First ${taxRates.bracket1.threshold.toLocaleString()}{" "}
                          at {taxRates.bracket1.rate}%
                        </span>
                        <span>
                          {formatCurrency(
                            Math.min(netIncome, taxRates.bracket1.threshold) *
                              (taxRates.bracket1.rate / 100)
                          )}
                        </span>
                      </div>

                      {netIncome > taxRates.bracket1.threshold && (
                        <div className="flex justify-between items-center">
                          <span>
                            ${taxRates.bracket1.threshold.toLocaleString()} to $
                            {taxRates.bracket2.threshold.toLocaleString()} at{" "}
                            {taxRates.bracket2.rate}%
                          </span>
                          <span>
                            {formatCurrency(
                              Math.min(
                                Math.max(
                                  0,
                                  netIncome - taxRates.bracket1.threshold
                                ),
                                taxRates.bracket2.threshold -
                                  taxRates.bracket1.threshold
                              ) *
                                (taxRates.bracket2.rate / 100)
                            )}
                          </span>
                        </div>
                      )}

                      {netIncome > taxRates.bracket2.threshold && (
                        <div className="flex justify-between items-center">
                          <span>
                            Above $
                            {taxRates.bracket2.threshold.toLocaleString()} at{" "}
                            {taxRates.bracket3.rate}%
                          </span>
                          <span>
                            {formatCurrency(
                              Math.max(
                                0,
                                netIncome - taxRates.bracket2.threshold
                              ) *
                                (taxRates.bracket3.rate / 100)
                            )}
                          </span>
                        </div>
                      )}

                      <div className="flex justify-between items-center pt-2 border-t border-gray-300">
                        <span className="font-medium">Total Tax Payable</span>
                        <span className="font-bold text-lg">
                          {formatCurrency(currentTaxPayable)}
                        </span>
                      </div>

                      <div className="flex justify-between items-center text-sm text-gray-600">
                        <span>Effective Tax Rate</span>
                        <span>
                          {netIncome > 0
                            ? ((currentTaxPayable / netIncome) * 100).toFixed(
                                1
                              ) + "%"
                            : "0%"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Potential Tax With Outstanding Invoices */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="bg-purple-600 p-4">
                <h2 className="text-xl font-bold text-white">
                  Tax Projection with Outstanding Invoices
                </h2>
                <p className="text-white mt-1">
                  If all pending and overdue invoices are paid
                </p>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Income Summary */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-800 mb-4">
                      Projected Income
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">
                          Current Net Income
                        </span>
                        <span className="font-medium">
                          {formatCurrency(netIncome)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Pending Invoices</span>
                        <span className="font-medium text-yellow-600">
                          {formatCurrency(totalPending)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Overdue Invoices</span>
                        <span className="font-medium text-red-600">
                          {formatCurrency(totalOverdue)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                        <span className="font-medium">
                          Potential Net Income
                        </span>
                        <span className="font-bold text-lg">
                          {formatCurrency(potentialNetIncome)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Tax Calculation */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-medium text-gray-800 mb-4">
                      Projected Tax
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">
                          Current Tax Liability
                        </span>
                        <span className="font-medium">
                          {formatCurrency(currentTaxPayable)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">
                          Additional Tax on Outstanding
                        </span>
                        <span className="font-medium text-purple-600">
                          +{formatCurrency(additionalTaxOnOutstanding)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center pt-2 border-t border-gray-300">
                        <span className="font-medium">Potential Total Tax</span>
                        <span className="font-bold text-lg">
                          {formatCurrency(potentialTaxPayable)}
                        </span>
                      </div>

                      <div className="flex justify-between items-center text-sm text-gray-600">
                        <span>Potential Effective Tax Rate</span>
                        <span>
                          {potentialNetIncome > 0
                            ? (
                                (potentialTaxPayable / potentialNetIncome) *
                                100
                              ).toFixed(1) + "%"
                            : "0%"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tax Savings Insights */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-800 mb-4">
                Tax Insights
              </h3>

              <div className="bg-blue-50 border-l-4 border-purple-400 p-4 mb-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-purple-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-purple-700">
                      Your current effective tax rate is{" "}
                      <span className="font-bold">
                        {netIncome > 0
                          ? ((currentTaxPayable / netIncome) * 100).toFixed(1) +
                            "%"
                          : "0%"}
                      </span>
                      . If all outstanding invoices are paid, your tax liability
                      would increase by{" "}
                      <span className="font-bold">
                        {formatCurrency(additionalTaxOnOutstanding)}
                      </span>
                      .
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium mb-2">Deduction Opportunities</h4>
                  <p className="text-sm text-gray-600 mb-2">
                    Consider tracking these common business deductions:
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Home office expenses</li>
                    <li>• Professional development</li>
                    <li>• Business travel</li>
                    <li>• Professional services</li>
                  </ul>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-medium mb-2">Tax Planning</h4>
                  <p className="text-sm text-gray-600">
                    You're currently in the{" "}
                    {netIncome <= taxRates.bracket1.threshold
                      ? "lowest"
                      : netIncome <= taxRates.bracket2.threshold
                      ? "middle"
                      : "highest"}{" "}
                    tax bracket.{" "}
                    {potentialNetIncome > taxRates.bracket2.threshold &&
                    netIncome <= taxRates.bracket2.threshold
                      ? "Collecting all outstanding invoices would push you into the highest tax bracket."
                      : "Consider timing income and expenses strategically to optimize your tax position."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FinancialDashboard;
