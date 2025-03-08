import React, { useState, useEffect } from 'react';
import { 
  Container, Grid, Paper, Typography, TextField, Button, 
  Select, MenuItem, FormControl, InputLabel, Box,
  Card, CardContent, Divider, IconButton, InputAdornment
} from '@mui/material';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  PieChart, Pie, Cell, ResponsiveContainer 
} from 'recharts';
import { 
  AddCircleOutline, RemoveCircleOutline, Receipt, 
  AssessmentOutlined, TrendingUp, ArrowForward
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Financial = () => {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [expenseCategories, setExpenseCategories] = useState({});
  const [incomeCategories, setIncomeCategories] = useState({});
  const [newTransaction, setNewTransaction] = useState({
    type: 'income',
    amount: '',
    category: '',
    description: '',
    date: new Date().toISOString().slice(0, 10),
    platform: '',
  });
  const [taxInfo, setTaxInfo] = useState({
    estimatedTaxRate: 0.15,
    nextPaymentDate: '2025-04-15',
    taxOwed: 0,
  });
  const [financialSummary, setFinancialSummary] = useState({
    totalIncome: 0,
    totalExpenses: 0,
    netIncome: 0,
    savingsRate: 0,
  });

  // AI suggestions - would be powered by actual AI in production
  const [aiSuggestions, setAiSuggestions] = useState([]);

  const defaultCategories = {
    income: ['Freelance', 'Contract', 'Platform Work', 'Royalties', 'Other'],
    expense: ['Supplies', 'Software', 'Marketing', 'Utilities', 'Travel', 'Food', 'Equipment', 'Insurance']
  };

  useEffect(() => {
    // Load data from localStorage on component mount
    const savedTransactions = localStorage.getItem('transactions');
    if (savedTransactions) {
      setTransactions(JSON.parse(savedTransactions));
    } else {
      // Sample data for demonstration
      const sampleData = [
        { id: 1, type: 'income', amount: 1200, category: 'Freelance', description: 'Website redesign', date: '2025-02-15', platform: 'Upwork' },
        { id: 2, type: 'income', amount: 800, category: 'Contract', description: 'Logo design', date: '2025-02-20', platform: 'Direct' },
        { id: 3, type: 'expense', amount: 50, category: 'Software', description: 'Adobe subscription', date: '2025-02-10', platform: 'N/A' },
        { id: 4, type: 'expense', amount: 120, category: 'Equipment', description: 'New headphones', date: '2025-02-05', platform: 'N/A' },
        { id: 5, type: 'income', amount: 600, category: 'Platform Work', description: 'Content writing', date: '2025-03-01', platform: 'Fiverr' },
      ];
      setTransactions(sampleData);
      localStorage.setItem('transactions', JSON.stringify(sampleData));
    }
  }, []);

  useEffect(() => {
    // Calculate financial summary whenever transactions change
    const income = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
    const expenses = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
    const net = income - expenses;
    const savings = income > 0 ? ((income - expenses) / income * 100).toFixed(1) : 0;

    setFinancialSummary({
      totalIncome: income,
      totalExpenses: expenses,
      netIncome: net,
      savingsRate: savings
    });

    // Update tax estimation
    setTaxInfo(prev => ({
      ...prev,
      taxOwed: (income * prev.estimatedTaxRate).toFixed(2)
    }));

    // Calculate category breakdowns
    const expCat = {};
    const incCat = {};

    transactions.forEach(t => {
      if (t.type === 'expense') {
        expCat[t.category] = (expCat[t.category] || 0) + t.amount;
      } else {
        incCat[t.category] = (incCat[t.category] || 0) + t.amount;
      }
    });

    setExpenseCategories(expCat);
    setIncomeCategories(incCat);

    // Generate AI suggestions based on transaction data
    generateAiSuggestions(income, expenses, expCat);

    // Save transactions to localStorage
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  const generateAiSuggestions = (income, expenses, expCat) => {
    const suggestions = [];
    
    // Expense optimization suggestions
    const expenseRatio = expenses / income;
    if (expenseRatio > 0.7) {
      suggestions.push("Your expenses are high relative to income. Consider reducing non-essential spending.");
    }
    
    // Category-specific suggestions
    if (expCat['Software'] > 200) {
      suggestions.push("Your software expenses are high. Consider auditing subscriptions for unused services.");
    }
    
    // Income diversification
    const platforms = new Set(transactions.filter(t => t.type === 'income').map(t => t.platform));
    if (platforms.size < 2) {
      suggestions.push("Consider diversifying your income sources to reduce financial risk.");
    }
    
    // Tax savings
    if (income > 5000 && !expCat['Insurance']) {
      suggestions.push("Consider health insurance premiums as potential tax deductions for self-employed individuals.");
    }

    setAiSuggestions(suggestions);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTransaction({
      ...newTransaction,
      [name]: name === 'amount' ? parseFloat(value) || '' : value
    });
  };

  const handleAddTransaction = () => {
    if (!newTransaction.amount || !newTransaction.category) return;
    
    const updatedTransactions = [
      ...transactions,
      {
        ...newTransaction,
        id: Date.now(),
        amount: parseFloat(newTransaction.amount)
      }
    ];
    
    setTransactions(updatedTransactions);
    setNewTransaction({
      type: 'income',
      amount: '',
      category: '',
      description: '',
      date: new Date().toISOString().slice(0, 10),
      platform: '',
    });
  };

  const handleRemoveTransaction = (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  const prepareChartData = () => {
    const lastSixMonths = [];
    const today = new Date();
    
    for (let i = 5; i >= 0; i--) {
      const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
      lastSixMonths.push(d.toLocaleString('default', { month: 'short' }));
    }
    
    return lastSixMonths.map(month => {
      const incomeSum = transactions
        .filter(t => t.type === 'income' && new Date(t.date).toLocaleString('default', { month: 'short' }) === month)
        .reduce((sum, t) => sum + t.amount, 0);
        
      const expenseSum = transactions
        .filter(t => t.type === 'expense' && new Date(t.date).toLocaleString('default', { month: 'short' }) === month)
        .reduce((sum, t) => sum + t.amount, 0);
        
      return {
        name: month,
        income: incomeSum,
        expenses: expenseSum,
        profit: incomeSum - expenseSum
      };
    });
  };

  const preparePieData = (categories) => {
    return Object.entries(categories).map(([name, value]) => ({
      name,
      value
    }));
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#FF6B6B', '#6BCB77', '#4D96FF'];

  const viewDetailedReport = () => {
    // Store current state in localStorage for the Report component to access
    localStorage.setItem('financialData', JSON.stringify({
      transactions,
      summary: financialSummary,
      taxInfo,
      expenseCategories,
      incomeCategories,
      suggestions: aiSuggestions
    }));
    
    // Navigate to the Report page
    navigate('/report');
  };

  // Smart AI category suggestion - simplified version
  const suggestCategory = (description) => {
    const lowerDesc = description.toLowerCase();
    if (newTransaction.type === 'expense') {
      if (lowerDesc.includes('adobe') || lowerDesc.includes('subscription')) return 'Software';
      if (lowerDesc.includes('laptop') || lowerDesc.includes('camera')) return 'Equipment';
      if (lowerDesc.includes('ad') || lowerDesc.includes('promotion')) return 'Marketing';
    } else {
      if (lowerDesc.includes('design')) return 'Freelance';
      if (lowerDesc.includes('writing') || lowerDesc.includes('content')) return 'Platform Work';
    }
    return '';
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Financial Summary */}
        <Grid item xs={12}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              borderRadius: '10px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
            }}
          >
            <Typography variant="h5" gutterBottom>
              Financial Dashboard
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={3}>
                <Card sx={{ backgroundColor: '#e3f2fd', height: '100%' }}>
                  <CardContent>
                    <Typography color="textSecondary" gutterBottom>
                      Total Income
                    </Typography>
                    <Typography variant="h4" component="div">
                      ${financialSummary.totalIncome.toLocaleString()}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Card sx={{ backgroundColor: '#fff8e1', height: '100%' }}>
                  <CardContent>
                    <Typography color="textSecondary" gutterBottom>
                      Total Expenses
                    </Typography>
                    <Typography variant="h4" component="div">
                      ${financialSummary.totalExpenses.toLocaleString()}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Card sx={{ backgroundColor: '#e8f5e9', height: '100%' }}>
                  <CardContent>
                    <Typography color="textSecondary" gutterBottom>
                      Net Income
                    </Typography>
                    <Typography variant="h4" component="div">
                      ${financialSummary.netIncome.toLocaleString()}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Card sx={{ backgroundColor: '#e0f7fa', height: '100%' }}>
                  <CardContent>
                    <Typography color="textSecondary" gutterBottom>
                      Estimated Tax
                    </Typography>
                    <Typography variant="h4" component="div">
                      ${taxInfo.taxOwed}
                    </Typography>
                    <Typography variant="body2">
                      Next payment: {new Date(taxInfo.nextPaymentDate).toLocaleDateString()}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Income & Expense Entry Form */}
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              borderRadius: '10px',
              height: '100%'
            }}
          >
            <Typography variant="h6" gutterBottom>
              Add Transaction
            </Typography>
            <FormControl fullWidth margin="normal">
              <InputLabel>Transaction Type</InputLabel>
              <Select
                name="type"
                value={newTransaction.type}
                onChange={handleInputChange}
              >
                <MenuItem value="income">Income</MenuItem>
                <MenuItem value="expense">Expense</MenuItem>
              </Select>
            </FormControl>
            
            <TextField
              label="Amount"
              name="amount"
              type="number"
              value={newTransaction.amount}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
              }}
            />
            
            <TextField
              label="Description"
              name="description"
              value={newTransaction.description}
              onChange={(e) => {
                handleInputChange(e);
                const suggestedCategory = suggestCategory(e.target.value);
                if (suggestedCategory) {
                  setNewTransaction(prev => ({...prev, category: suggestedCategory}));
                }
              }}
              fullWidth
              margin="normal"
            />
            
            <FormControl fullWidth margin="normal">
              <InputLabel>Category</InputLabel>
              <Select
                name="category"
                value={newTransaction.category}
                onChange={handleInputChange}
              >
                {newTransaction.type === 'income' ? 
                  defaultCategories.income.map(cat => (
                    <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                  )) :
                  defaultCategories.expense.map(cat => (
                    <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                  ))
                }
              </Select>
            </FormControl>
            
            <TextField
              label="Date"
              name="date"
              type="date"
              value={newTransaction.date}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />
            
            {newTransaction.type === 'income' && (
              <TextField
                label="Platform/Client"
                name="platform"
                value={newTransaction.platform}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
              />
            )}
            
            <Button 
              variant="contained" 
              color="primary" 
              onClick={handleAddTransaction} 
              fullWidth
              sx={{ mt: 2 }}
              startIcon={<AddCircleOutline />}
              disabled={!newTransaction.amount || !newTransaction.category}
            >
              Add Transaction
            </Button>
          </Paper>
        </Grid>

        {/* Charts */}
        <Grid item xs={12} md={8}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              borderRadius: '10px'
            }}
          >
            <Typography variant="h6" gutterBottom>
              Income vs. Expenses
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={prepareChartData()}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => `$${value}`} />

                <Legend />
                <Bar dataKey="income" fill="#4caf50" name="Income" />
                <Bar dataKey="expenses" fill="#f44336" name="Expenses" />
              </BarChart>
            </ResponsiveContainer>
            
            <Divider sx={{ my: 2 }} />
            
            <Typography variant="h6" gutterBottom>
              Category Breakdown
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" align="center">
                  Expense Categories
                </Typography>
                <ResponsiveContainer width="100%" height={400}>
  <PieChart width={400} height={400}>
    <Pie
      data={preparePieData(expenseCategories)}
      cx="50%"
      cy="50%"
      labelLine={false}
      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
      outerRadius={80}
      fill="#8884d8"
      dataKey="value"
    >
      {preparePieData(expenseCategories).map((entry, index) => (
        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
      ))}
    </Pie>
    <Tooltip formatter={(value) => `$${value}`} />
  </PieChart>  
</ResponsiveContainer>  {/* ✅ Now properly wrapped */}

              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* AI Insights */}
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              borderRadius: '10px',
              backgroundColor: '#f5f5f5'
            }}
          >
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              <TrendingUp sx={{ mr: 1 }} /> AI Financial Insights
            </Typography>
            {aiSuggestions.length > 0 ? (
              <Box>
                {aiSuggestions.map((suggestion, index) => (
                  <Card key={index} sx={{ mb: 1, backgroundColor: '#ffffff' }}>
                    <CardContent>
                      <Typography variant="body1">{suggestion}</Typography>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            ) : (
              <Typography variant="body1">
                Add more transactions to receive AI-powered financial insights.
              </Typography>
            )}
          </Paper>
        </Grid>

        {/* Recent Transactions */}
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              borderRadius: '10px'
            }}
          >
            <Typography variant="h6" gutterBottom>
              Recent Transactions
            </Typography>
            <Box sx={{ maxHeight: '300px', overflow: 'auto' }}>
              {transactions.slice().reverse().slice(0, 10).map((transaction) => (
                <Card 
                  key={transaction.id} 
                  sx={{ 
                    mb: 1, 
                    backgroundColor: transaction.type === 'income' ? '#e8f5e9' : '#ffebee',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <CardContent sx={{ flex: 1 }}>
                    <Typography variant="body1">
                      {transaction.description || transaction.category}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {new Date(transaction.date).toLocaleDateString()} | {transaction.category}
                    </Typography>
                  </CardContent>
                  <Box sx={{ pr: 2, display: 'flex', alignItems: 'center' }}>
                    <Typography variant="h6" sx={{ mr: 2 }}>
                      {transaction.type === 'income' ? '+' : '-'}${transaction.amount}
                    </Typography>
                    <IconButton 
                      size="small" 
                      onClick={() => handleRemoveTransaction(transaction.id)}
                      color="error"
                    >
                      <RemoveCircleOutline />
                    </IconButton>
                  </Box>
                </Card>
              ))}
            </Box>
          </Paper>
        </Grid>

        {/* Generate Report Button */}
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              startIcon={<AssessmentOutlined />}
              endIcon={<ArrowForward />}
              onClick={viewDetailedReport}
              sx={{ 
                py: 1.5, 
                px: 4, 
                borderRadius: '30px',
                fontWeight: 'bold',
                fontSize: '1.1rem'
              }}
            >
              Generate Detailed Financial Report
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Financial;