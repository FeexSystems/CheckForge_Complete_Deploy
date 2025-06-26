import React, { useState, useEffect } from 'react';
import { 
  DollarSign, 
  FileText, 
  Calendar, 
  BarChart3, 
  Users, 
  Settings, 
  MessageCircle, 
  Receipt, 
  TrendingUp, 
  CheckCircle,
  Plus,
  Search,
  Bell,
  Filter,
  Download,
  Upload,
  Mic,
  Brain,
  CreditCard,
  Building,
  Target,
  Zap
} from 'lucide-react';

const FinanceForge = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [userRole, setUserRole] = useState('admin');
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false);
  const [voiceActive, setVoiceActive] = useState(false);
  const [notifications, setNotifications] = useState(3);

  // Mock data
  const dashboardData = {
    totalRevenue: 127580,
    pendingInvoices: 23,
    overduePayments: 5,
    cashFlow: 45230,
    monthlyGrowth: 12.5
  };

  const recentTransactions = [
    { id: 1, type: 'check', amount: 2500, payee: 'TechCorp Ltd', date: '2025-06-25', status: 'completed' },
    { id: 2, type: 'invoice', amount: 4200, payee: 'Design Studio', date: '2025-06-24', status: 'pending' },
    { id: 3, type: 'expense', amount: 850, payee: 'Office Supplies', date: '2025-06-23', status: 'completed' }
  ];

  const aiInsights = [
    "Cash flow will improve by 18% next month based on pending invoices",
    "Recommend setting up automated payments for recurring expenses",
    "3 invoices due in next 48 hours - send reminders now"
  ];

  const Navigation = () => (
    <div className="w-64 bg-gradient-to-b from-slate-900 to-slate-800 text-white p-6 flex flex-col">
      <div className="flex items-center mb-8">
        <Brain className="w-8 h-8 mr-3 text-blue-400" />
        <h1 className="text-xl font-bold">FinanceForge AI</h1>
      </div>
      
      <nav className="flex-1">
        <div className="space-y-2">
          {[
            { id: 'dashboard', icon: BarChart3, label: 'Dashboard' },
            { id: 'checks', icon: CheckCircle, label: 'Check Manager' },
            { id: 'invoices', icon: FileText, label: 'Invoicing' },
            { id: 'expenses', icon: Receipt, label: 'Expenses' },
            { id: 'analytics', icon: TrendingUp, label: 'Analytics' },
            { id: 'tasks', icon: Calendar, label: 'Smart Tasks' },
            { id: 'clients', icon: Users, label: 'Client Portal' }
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center px-4 py-3 rounded-lg transition-all ${
                activeTab === item.id 
                  ? 'bg-blue-600 shadow-lg' 
                  : 'hover:bg-slate-700'
              }`}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      <div className="border-t border-slate-700 pt-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-slate-300">Role: {userRole}</span>
          <Settings className="w-4 h-4 text-slate-400 cursor-pointer hover:text-white" />
        </div>
        <select 
          value={userRole} 
          onChange={(e) => setUserRole(e.target.value)}
          className="w-full bg-slate-700 rounded px-3 py-2 text-sm"
        >
          <option value="admin">Admin</option>
          <option value="accountant">Accountant</option>
          <option value="employee">Employee</option>
          <option value="client">Client</option>
        </select>
      </div>
    </div>
  );

  const Header = () => (
    <div className="bg-white shadow-sm border-b px-6 py-4 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <h2 className="text-2xl font-semibold text-gray-900 capitalize">{activeTab}</h2>
        <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2">
          <Search className="w-4 h-4 text-gray-500 mr-2" />
          <input 
            type="text" 
            placeholder="Search transactions, clients..." 
            className="bg-transparent text-sm focus:outline-none"
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <button
          onClick={() => setVoiceActive(!voiceActive)}
          className={`p-2 rounded-full ${voiceActive ? 'bg-red-500 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
        >
          <Mic className="w-5 h-5" />
        </button>
        
        <button className="relative p-2 bg-gray-100 rounded-full hover:bg-gray-200">
          <Bell className="w-5 h-5" />
          {notifications > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {notifications}
            </span>
          )}
        </button>
        
        <button
          onClick={() => setAiAssistantOpen(!aiAssistantOpen)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
        >
          <MessageCircle className="w-4 h-4 mr-2" />
          AI Assistant
        </button>
      </div>
    </div>
  );

  const Dashboard = () => (
    <div className="p-6 space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Revenue', value: `$${dashboardData.totalRevenue.toLocaleString()}`, icon: DollarSign, color: 'green' },
          { label: 'Pending Invoices', value: dashboardData.pendingInvoices, icon: FileText, color: 'yellow' },
          { label: 'Overdue Payments', value: dashboardData.overduePayments, icon: CreditCard, color: 'red' },
          { label: 'Monthly Growth', value: `+${dashboardData.monthlyGrowth}%`, icon: TrendingUp, color: 'blue' }
        ].map((metric, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{metric.label}</p>
                <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
              </div>
              <div className={`p-3 rounded-full bg-${metric.color}-100`}>
                <metric.icon className={`w-6 h-6 text-${metric.color}-600`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* AI Insights */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
        <div className="flex items-center mb-4">
          <Brain className="w-6 h-6 text-blue-600 mr-3" />
          <h3 className="text-lg font-semibold text-gray-900">AI Insights</h3>
        </div>
        <div className="space-y-3">
          {aiInsights.map((insight, idx) => (
            <div key={idx} className="flex items-start">
              <Zap className="w-4 h-4 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
              <p className="text-gray-700">{insight}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-xl shadow-sm border">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
            <div className="flex space-x-2">
              <button className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200">
                <Filter className="w-4 h-4" />
              </button>
              <button className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200">
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {recentTransactions.map(transaction => (
              <div key={transaction.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className={`p-2 rounded-full mr-4 ${
                    transaction.type === 'check' ? 'bg-green-100' :
                    transaction.type === 'invoice' ? 'bg-blue-100' : 'bg-red-100'
                  }`}>
                    {transaction.type === 'check' ? <CheckCircle className="w-5 h-5 text-green-600" /> :
                     transaction.type === 'invoice' ? <FileText className="w-5 h-5 text-blue-600" /> :
                     <Receipt className="w-5 h-5 text-red-600" />}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{transaction.payee}</p>
                    <p className="text-sm text-gray-500">{transaction.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">${transaction.amount.toLocaleString()}</p>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    transaction.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {transaction.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const AIAssistant = () => (
    aiAssistantOpen && (
      <div className="fixed bottom-4 right-4 w-96 bg-white rounded-xl shadow-2xl border border-gray-200 z-50">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <div className="flex items-center">
            <Brain className="w-5 h-5 text-blue-600 mr-2" />
            <h3 className="font-semibold text-gray-900">AI Assistant</h3>
          </div>
          <button 
            onClick={() => setAiAssistantOpen(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            ×
          </button>
        </div>
        <div className="p-4 h-64 overflow-y-auto">
          <div className="space-y-3">
            <div className="bg-gray-100 rounded-lg p-3">
              <p className="text-sm text-gray-700">Hi! I'm your AI financial assistant. I can help you:</p>
              <ul className="text-xs text-gray-600 mt-2 space-y-1">
                <li>• Generate checks and invoices</li>
                <li>• Analyze spending patterns</li>
                <li>• Schedule payments</li>
                <li>• Create financial reports</li>
              </ul>
            </div>
            <div className="bg-blue-50 rounded-lg p-3">
              <p className="text-sm text-gray-700">What would you like me to help you with today?</p>
            </div>
          </div>
        </div>
        <div className="p-4 border-t border-gray-200">
          <div className="flex space-x-2">
            <input 
              type="text" 
              placeholder="Ask me anything..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Send
            </button>
          </div>
        </div>
      </div>
    )
  );

  const CheckManager = () => (
    <div className="p-6">
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h3 className="text-lg font-semibold mb-4">Enhanced Check Generation</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Check Number</label>
              <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Auto-generated" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
              <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="$0.00" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Pay to</label>
              <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Payee name" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Memo</label>
              <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Payment description" />
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-center">
            <div className="text-center">
              <CheckCircle className="w-16 h-16 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600">Check Preview</p>
            </div>
          </div>
        </div>
        <div className="mt-6 flex space-x-3">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Generate Check</button>
          <button className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50">Save Template</button>
          <button className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50">Voice Input</button>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch(activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'checks': return <CheckManager />;
      case 'invoices': return <div className="p-6"><div className="bg-white rounded-xl shadow-sm border p-6 text-center text-gray-500">Invoice Management - Coming Soon</div></div>;
      case 'expenses': return <div className="p-6"><div className="bg-white rounded-xl shadow-sm border p-6 text-center text-gray-500">Expense Tracking - Coming Soon</div></div>;
      case 'analytics': return <div className="p-6"><div className="bg-white rounded-xl shadow-sm border p-6 text-center text-gray-500">Advanced Analytics - Coming Soon</div></div>;
      case 'tasks': return <div className="p-6"><div className="bg-white rounded-xl shadow-sm border p-6 text-center text-gray-500">Smart Task Scheduling - Coming Soon</div></div>;
      case 'clients': return <div className="p-6"><div className="bg-white rounded-xl shadow-sm border p-6 text-center text-gray-500">Client Portal - Coming Soon</div></div>;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Navigation />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <div className="flex-1 overflow-y-auto">
          {renderContent()}
        </div>
      </div>
      <AIAssistant />
    </div>
  );
};

export default FinanceForge;