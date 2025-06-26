import React, { useState, useEffect, useCallback } from 'react';
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
  Zap,
  X,
  Send,
  Save,
  RefreshCw
} from 'lucide-react';

const FinanceForge = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [userRole, setUserRole] = useState('admin');
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false);
  const [voiceActive, setVoiceActive] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const [loading, setLoading] = useState(false);
  const [aiMessage, setAiMessage] = useState('');
  const [checkData, setCheckData] = useState({
    checkNumber: '',
    amount: '',
    payee: '',
    memo: ''
  });

  // Mock API functions
  const handleVoiceIntent = async (transcript) => {
    setLoading(true);
    try {
      const response = await window.claude.complete(`
        Parse this voice command for financial action: "${transcript}"
        
        Respond with JSON only:
        {
          "action": "check|invoice|expense|query",
          "amount": "extracted amount or null",
          "payee": "extracted payee or null", 
          "memo": "extracted memo or null",
          "intent": "brief description of intent"
        }
      `);
      
      const intent = JSON.parse(response);
      console.log('Voice intent parsed:', intent);
      
      if (intent.action === 'check') {
        setActiveTab('checks');
        setCheckData({
          checkNumber: Date.now().toString(),
          amount: intent.amount || '',
          payee: intent.payee || '',
          memo: intent.memo || ''
        });
      }
      
      return intent;
    } catch (error) {
      console.error('Voice intent error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAIQuery = async (query) => {
    if (!query.trim()) return;
    
    setLoading(true);
    try {
      const response = await window.claude.complete(`
        You are a financial AI assistant. Answer this question: "${query}"
        
        Consider the user's current financial context:
        - Role: ${userRole}
        - Active section: ${activeTab}
        - Recent activity: check generation, invoice management
        
        Provide a helpful, concise response focused on financial guidance.
      `);
      
      return response;
    } catch (error) {
      console.error('AI query error:', error);
      return "I'm having trouble processing that request. Please try again.";
    } finally {
      setLoading(false);
    }
  };

  const generatePDF = async (data) => {
    setLoading(true);
    try {
      const response = await window.claude.complete(`
        Generate a professional check PDF content structure for:
        Check Number: ${data.checkNumber}
        Amount: $${data.amount}
        Payee: ${data.payee}
        Memo: ${data.memo}
        
        Respond with JSON:
        {
          "pdfStructure": "detailed PDF layout description",
          "micr": "MICR line format",
          "status": "generated"
        }
      `);
      
      const pdfData = JSON.parse(response);
      console.log('PDF generated:', pdfData);
      return pdfData;
    } catch (error) {
      console.error('PDF generation error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Enhanced navigation handler
  const handleNavigation = useCallback((tab) => {
    setActiveTab(tab);
    console.log(`Navigation: ${tab} activated`);
  }, []);

  // Voice toggle handler
  const handleVoiceToggle = useCallback(async () => {
    setVoiceActive(!voiceActive);
    
    if (!voiceActive) {
      // Simulate voice recognition
      setTimeout(async () => {
        const mockTranscript = "Create a check for $1500 to TechCorp for consulting services";
        await handleVoiceIntent(mockTranscript);
        setVoiceActive(false);
      }, 3000);
    }
  }, [voiceActive]);

  // Notification handler
  const handleNotifications = useCallback(() => {
    setNotifications(0);
    console.log('Notifications cleared');
  }, []);

  // Mock data with real-time updates
  const [dashboardData, setDashboardData] = useState({
    totalRevenue: 127580,
    pendingInvoices: 23,
    overduePayments: 5,
    cashFlow: 45230,
    monthlyGrowth: 12.5
  });

  const [recentTransactions, setRecentTransactions] = useState([
    { id: 1, type: 'check', amount: 2500, payee: 'TechCorp Ltd', date: '2025-06-25', status: 'completed' },
    { id: 2, type: 'invoice', amount: 4200, payee: 'Design Studio', date: '2025-06-24', status: 'pending' },
    { id: 3, type: 'expense', amount: 850, payee: 'Office Supplies', date: '2025-06-23', status: 'completed' }
  ]);

  // Real-time data simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setDashboardData(prev => ({
        ...prev,
        totalRevenue: prev.totalRevenue + Math.floor(Math.random() * 100),
        monthlyGrowth: +(prev.monthlyGrowth + (Math.random() - 0.5) * 0.1).toFixed(1)
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

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
              onClick={() => handleNavigation(item.id)}
              className={`w-full flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
                activeTab === item.id 
                  ? 'bg-blue-600 shadow-lg transform scale-105' 
                  : 'hover:bg-slate-700 hover:transform hover:scale-102'
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
          <Settings className="w-4 h-4 text-slate-400 cursor-pointer hover:text-white transition-colors" />
        </div>
        <select 
          value={userRole} 
          onChange={(e) => setUserRole(e.target.value)}
          className="w-full bg-slate-700 rounded px-3 py-2 text-sm border border-slate-600 focus:border-blue-400 transition-colors"
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
            className="bg-transparent text-sm focus:outline-none w-64"
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <button
          onClick={handleVoiceToggle}
          disabled={loading}
          className={`p-2 rounded-full transition-all duration-200 ${
            voiceActive 
              ? 'bg-red-500 text-white animate-pulse' 
              : loading 
                ? 'bg-yellow-500 text-white' 
                : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          {loading ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Mic className="w-5 h-5" />}
        </button>
        
        <button 
          onClick={handleNotifications}
          className="relative p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
        >
          <Bell className="w-5 h-5" />
          {notifications > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-bounce">
              {notifications}
            </span>
          )}
        </button>
        
        <button
          onClick={() => setAiAssistantOpen(!aiAssistantOpen)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center transition-colors"
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
          <div key={idx} className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{metric.label}</p>
                <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
              </div>
              <div className={`p-3 rounded-full ${
                metric.color === 'green' ? 'bg-green-100' :
                metric.color === 'yellow' ? 'bg-yellow-100' :
                metric.color === 'red' ? 'bg-red-100' : 'bg-blue-100'
              }`}>
                <metric.icon className={`w-6 h-6 ${
                  metric.color === 'green' ? 'text-green-600' :
                  metric.color === 'yellow' ? 'text-yellow-600' :
                  metric.color === 'red' ? 'text-red-600' : 'text-blue-600'
                }`} />
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
          <div className="flex items-start">
            <Zap className="w-4 h-4 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
            <p className="text-gray-700">Cash flow will improve by 18% next month based on pending invoices</p>
          </div>
          <div className="flex items-start">
            <Zap className="w-4 h-4 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
            <p className="text-gray-700">Recommend setting up automated payments for recurring expenses</p>
          </div>
          <div className="flex items-start">
            <Zap className="w-4 h-4 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
            <p className="text-gray-700">3 invoices due in next 48 hours - send reminders now</p>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-xl shadow-sm border">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
            <div className="flex space-x-2">
              <button className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                <Filter className="w-4 h-4" />
              </button>
              <button className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {recentTransactions.map(transaction => (
              <div key={transaction.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
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

  const CheckManager = () => (
    <div className="p-6">
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h3 className="text-lg font-semibold mb-4">Enhanced Check Generation</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Check Number</label>
              <input 
                type="text" 
                value={checkData.checkNumber}
                onChange={(e) => setCheckData({...checkData, checkNumber: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors" 
                placeholder="Auto-generated" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
              <input 
                type="text" 
                value={checkData.amount}
                onChange={(e) => setCheckData({...checkData, amount: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors" 
                placeholder="$0.00" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Pay to</label>
              <input 
                type="text" 
                value={checkData.payee}
                onChange={(e) => setCheckData({...checkData, payee: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors" 
                placeholder="Payee name" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Memo</label>
              <input 
                type="text" 
                value={checkData.memo}
                onChange={(e) => setCheckData({...checkData, memo: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors" 
                placeholder="Payment description" 
              />
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-center">
            <div className="text-center">
              <CheckCircle className="w-16 h-16 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600">Check Preview</p>
              {checkData.amount && (
                <div className="mt-4 text-sm text-gray-700">
                  <p>Amount: ${checkData.amount}</p>
                  <p>Pay to: {checkData.payee}</p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="mt-6 flex space-x-3">
          <button 
            onClick={() => generatePDF(checkData)}
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors flex items-center"
          >
            {loading ? <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> : <Download className="w-4 h-4 mr-2" />}
            Generate Check
          </button>
          <button className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
            <Save className="w-4 h-4 mr-2" />
            Save Template
          </button>
          <button 
            onClick={handleVoiceToggle}
            className="border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center"
          >
            <Mic className="w-4 h-4 mr-2" />
            Voice Input
          </button>
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
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
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
              value={aiMessage}
              onChange={(e) => setAiMessage(e.target.value)}
              placeholder="Ask me anything..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleAIQuery(aiMessage);
                  setAiMessage('');
                }
              }}
            />
            <button 
              onClick={() => {
                handleAIQuery(aiMessage);
                setAiMessage('');
              }}
              disabled={loading || !aiMessage.trim()}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>
    )
  );

  const renderContent = () => {
    switch(activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'checks': return <CheckManager />;
      case 'invoices': return (
        <div className="p-6">
          <div className="bg-white rounded-xl shadow-sm border p-6 text-center">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Invoice Management</h3>
            <p className="text-gray-500">Advanced invoicing features coming soon</p>
            <button 
              onClick={() => handleNavigation('checks')}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Check Manager
            </button>
          </div>
        </div>
      );
      case 'expenses': return (
        <div className="p-6">
          <div className="bg-white rounded-xl shadow-sm border p-6 text-center">
            <Receipt className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Expense Tracking</h3>
            <p className="text-gray-500">Smart expense categorization coming soon</p>
          </div>
        </div>
      );
      case 'analytics': return (
        