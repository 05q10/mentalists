import React, { useState, useEffect } from 'react';
import { 
  Container, Grid, Paper, Typography, Button, Box, 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Divider, Card, CardContent, List, ListItem, ListItemIcon, ListItemText,
  Accordion, AccordionSummary, AccordionDetails
} from '@mui/material';
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { 
  DownloadOutlined, TrendingUp, TrendingDown, MoneyOff,
  ArrowBack, ExpandMore, LocalAtm, Category, CalendarToday,
  Lightbulb, ShowChart, AccountBalance, Receipt
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Reports = () => {
  const navigate = useNavigate();
  const [financialData, setFinancialData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reportDate] = useState(new Date().toLocaleDateString());
  
  useEffect(() => {
    // Load financial data saved in localStorage
    const savedData = localStorage.getItem('financialData');
    if (savedData) {
      setFinancialData(JSON.parse(savedData));
    }
    setLoading(false);
  }, []);
  
  const goBack = () => {
    navigate('/financial');
  };
  
  // Calculate monthly trends
  const getMonthlyTrends = () => {
    if (!financialData) return [];
    
    const transactions = financialData.transactions;
    const monthsMap = {};
    
    transactions.forEach(t => {
      const month = new Date(t.date).toLocaleString('default', { month: 'short' });
      if (!monthsMap[month]) {
        monthsMap[month] = { month, income: 0, expenses: 0 };
      }
      
      if (t.type === 'income') {
        monthsMap[month].income += t.amount;
      } else {
        monthsMap[month].expenses += t.amount;
      }
    });
    
    // Calculate net for each month
    Object.values(monthsMap).forEach(m => {
      m.net = m.income - m.expenses;
    });
    
    return Object.values(monthsMap).sort((a, b) => {
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      return months.indexOf(a.month) - months.indexOf(b.month);
    });
  };
  
  // Top earning platforms/clients
  const getTopPlatforms = () => {
    if (!financialData) return [];
    
    const platforms = {};
    financialData.transactions
      .filter(t => t.type === 'income' && t.platform)
      .forEach(t => {
        platforms[t.platform] = (platforms[t.platform] || 0) + t.amount;
      });
      
    return Object.entries(platforms)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);
  };
  
  // Growth rate calculations
  const calculateGrowthRate = () => {
    if (!financialData) return { income: 0, expenses: 0, net: 0 };
    
    const trends = getMonthlyTrends();
    if (trends.length < 2) return { income: 0, expenses: 0, net: 0 };
    
    const current = trends[trends.length - 1];
    const previous = trends[trends.length - 2];
    
    const incomeGrowth = previous.income ? ((current.income - previous.income) / previous.income * 100).toFixed(1) : 0;
    const expenseGrowth = previous.expenses ? ((current.expenses - previous.expenses) / previous.expenses * 100).toFixed(1) : 0;
    const netGrowth = previous.net ? ((current.net - previous.net) / previous.net * 100).toFixed(1) : 0;
    
    return {
      income: incomeGrowth,
      expenses: expenseGrowth,
      net: netGrowth
    };
  };
  
  // Tax optimization opportunities
  const getTaxOptimizations = () => {
    if (!financialData) return [];
    
    const optimizations = [];
    const summary = financialData.summary;
    const expCat = financialData.expenseCategories;
    
    if (summary.totalIncome > 10000 && (!expCat['Insurance'] || expCat['Insurance'] < 1000)) {
      optimizations.push({
        title: "Health Insurance Deduction",
        description: "Self-employed individuals can often deduct health insurance premiums. Consider setting up a qualifying health plan.",
        potential: "$1,000 - $5,000"
      });
    }
    
    if (summary.totalIncome > 5000 && (!expCat['Equipment'] || expCat['Equipment'] < 500)) {
      optimizations.push({
        title: "Home Office & Equipment Deductions",
        description: "Deduct home office space and equipment used exclusively for your gig work.",
        potential: "$500 - $2,000"
      });
    }
    
    if (summary.totalIncome > 8000 && (!expCat['Software'] || expCat['Software'] < 300)) {
      optimizations.push({
        title: "Software & Subscription Deductions",
        description: "Track and deduct work-related software, apps, and subscriptions.",
        potential: "$200 - $1,000"
      });
    }
    
    return optimizations;
  };
  
  // Calculate income diversification score
  const getDiversificationScore = () => {
    if (!financialData) return { score: 0, analysis: "" };
    
    const platforms = getTopPlatforms();
    
    // Perfect diversification would be equal amounts from each source
    if (platforms.length === 0) {
      return { score: 0, analysis: "No income sources recorded." };
    }
    
    if (platforms.length === 1) {
      return { 
        score: 1, 
        analysis: "All income from a single source. High dependency risk." 
      };
    }
    
    const totalIncome = platforms.reduce((sum, p) => sum + p.value, 0);
    const topSourcePercentage = (platforms[0].value / totalIncome * 100).toFixed(0);
    
    let score, analysis;
    
    if (platforms.length >= 4 && topSourcePercentage < 40) {
      score = 9;
      analysis = "Excellent diversification across multiple income sources.";
    } else if (platforms.length >= 3 && topSourcePercentage < 60) {
      score = 7;
      analysis = "Good diversification with income spread across several sources.";
    } else if (platforms.length >= 2) {
      score = 4;
      analysis = `Limited diversification. Your top source accounts for ${topSourcePercentage}% of income.`; // ✅ Fixed
    } else {
      score = 2;
      analysis = "Over-reliance on a single income source creates significant risk.";
    }
    
    
    return { score, analysis };
  };
  
  // Helper for color schemes
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#FF6B6B'];
  
  if (loading) {
    return (
      <Container sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
        <Typography variant="h5">Loading report data...</Typography>
      </Container>
    );
  }
  
  if (!financialData) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>No financial data available</Typography>
        <Button variant="contained" onClick={goBack}>Return to Financial Dashboard</Button>
      </Container>
    );
  }
  
  const growthRates = calculateGrowthRate();
  const diversification = getDiversificationScore();
  
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
      <Paper sx={{ p: 3, mb: 3, borderRadius: '10px' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Button 
            variant="outlined" 
            startIcon={<ArrowBack />} 
            onClick={goBack}
          >
            Back to Dashboard
          </Button>
          <Button 
            variant="contained" 
            color="primary" 
            startIcon={<DownloadOutlined />}
            onClick={() => {
              // In a real app, this would generate and download a PDF report
              alert("In a production app, this would download a PDF of your financial report");
            }}
          >
            Download Report
          </Button>
        </Box>
        
        <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold' }}>
          Gig Worker Financial Report
        </Typography>
        <Typography variant="subtitle1" gutterBottom sx={{ textAlign: 'center', color: 'text.secondary' }}>
          Generated on {reportDate}
        </Typography>
      </Paper>
      
      {/* Financial Overview */}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 3, borderRadius: '10px' }}>
            <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              <AccountBalance sx={{ mr: 1 }} /> Financial Overview
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <Card sx={{ bgcolor: financialData.summary.netIncome > 0 ? '#e8f5e9' : '#ffebee' }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>Net Income</Typography>
                    <Typography variant="h4">${financialData.summary.netIncome.toLocaleString()}</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                      {parseFloat(growthRates.net) > 0 ? (
                        <TrendingUp color="success" />
                      ) : (
                        <TrendingDown color="error" />
                      )}
                      <Typography variant="body2" sx={{ ml: 1 }}>
                        {growthRates.net}% from previous month
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>Income</Typography>
                    <Typography variant="h4">${financialData.summary.totalIncome.toLocaleString()}</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                      {parseFloat(growthRates.income) > 0 ? (
                        <TrendingUp color="success" />
                      ) : (
                        <TrendingDown color="error" />
                      )}
                      <Typography variant="body2" sx={{ ml: 1 }}>
                        {growthRates.income}% from previous month
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>Expenses</Typography>
                    <Typography variant="h4">${financialData.summary.totalExpenses.toLocaleString()}</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                      {parseFloat(growthRates.expenses) < 0 ? (
                        <TrendingDown color="success" />
                      ) : (
                        <TrendingUp color="error" />
                      )}
                      <Typography variant="body2" sx={{ ml: 1 }}>
                        {parseFloat(growthRates.expenses) < 0 ? growthRates.expenses.substring(1) : growthRates.expenses}% from previous month
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        
        {/* Monthly Trends */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, borderRadius: '10px' }}>
            <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              <ShowChart sx={{ mr: 1 }} /> Monthly Financial Trends
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={getMonthlyTrends()}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => `$${value}`} />

                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="income" 
                  stroke="#4caf50" 
                  activeDot={{ r: 8 }} 
                  name="Income"
                />
                <Line 
                  type="monotone" 
                  dataKey="expenses" 
                  stroke="#f44336" 
                  name="Expenses"
                />
                <Line 
                  type="monotone" 
                  dataKey="net" 
                  stroke="#2196f3" 
                  strokeWidth={2}
                  name="Net Income"
                />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        
        {/* Income Diversification Score */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, height: '100%', borderRadius: '10px' }}>
            <Typography variant="h5" gutterBottom>
              Income Diversification
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
              <Box
                sx={{
                  position: 'relative',
                  width: 150,
                  height: 150,
                  borderRadius: '50%',
                  background: `conic-gradient(
                    #4caf50 ${diversification.score * 10}%, 
                    #e0e0e0 ${diversification.score * 10}% 100%
                  )`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Box
                  sx={{
                    width: 130,
                    height: 130,
                    borderRadius: '50%',
                    backgroundColor: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column'
                  }}
                >
                  <Typography variant="h4">{diversification.score}</Typography>
                  <Typography variant="body2" color="textSecondary">out of 10</Typography>
                </Box>
              </Box>
            </Box>
            <Typography variant="body1" align="center">
              {diversification.analysis}
            </Typography>
            
            <Divider sx={{ my: 2 }} />
            
            <Typography variant="subtitle1" gutterBottom>
              Top Income Sources
            </Typography>
            <ResponsiveContainer width="100%" height={150}>
              <PieChart>
              <Pie
  data={getTopPlatforms()}
  dataKey="value"
  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
>
  {getTopPlatforms().map((entry, index) => (
    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
  ))}
</Pie>

              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        
        {/* Category Analysis */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, borderRadius: '10px' }}>
            <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              <Category sx={{ mr: 1 }} /> Category Analysis
            </Typography>
            
            <Accordion defaultExpanded>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography variant="h6">Expense Breakdown</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart
                    data={Object.entries(financialData.expenseCategories).map(([name, value]) => ({ name, value }))}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={100} />
                    <Tooltip formatter={(value) => `$${value}`} />

                    <Bar dataKey="value" fill="#f44336" />
                  </BarChart>
                </ResponsiveContainer>
              </AccordionDetails>
            </Accordion>
            
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography variant="h6">Income Categories</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart
                    data={Object.entries(financialData.incomeCategories).map(([name, value]) => ({ name, value }))}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={100} />
                    <Tooltip formatter={(value) => `$${value}`} />

                    <Bar dataKey="value" fill="#4caf50" />
                  </BarChart>
                </ResponsiveContainer>
              </AccordionDetails>
            </Accordion>
          </Paper>
        </Grid>
        
        {/* Tax Optimization */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, borderRadius: '10px' }}>
            <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              <Receipt sx={{ mr: 1 }} /> Tax Planning
            </Typography>
            
            <Box sx={{ mb: 2 }}>
              <Card sx={{ mb: 2, bgcolor: '#e3f2fd' }}>
                <CardContent>
                  <Typography variant="h6">Estimated Tax Liability</Typography>
                  <Typography variant="h4">${financialData.taxInfo.taxOwed}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    Based on an estimated tax rate of {(financialData.taxInfo.estimatedTaxRate * 100).toFixed(0)}%
                  </Typography>
                </CardContent>
              </Card>
              
              <Typography variant="h6" gutterBottom>
                Potential Tax Optimizations
              </Typography>
              
              {getTaxOptimizations().map((opt, index) => (
                <Card key={index} sx={{ mb: 1, bgcolor: '#f9fbe7' }}>
                  <CardContent>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                      {opt.title}
                    </Typography>
                    <Typography variant="body2">
                      {opt.description}
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 'bold', mt: 1 }}>
                      Potential savings: {opt.potential}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
              
              {getTaxOptimizations().length === 0 && (
                <Typography variant="body1">
                  No specific tax optimizations identified at this time. Consider consulting with a tax professional for personalized advice.
                </Typography>
              )}
            </Box>
          </Paper>
        </Grid>
        
        {/* AI Insights */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3, borderRadius: '10px' }}>
            <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              <Lightbulb sx={{ mr: 1 }} color="warning" /> AI-Powered Financial Insights
            </Typography>
            
            <Grid container spacing={2}>
              {financialData.suggestions.map((suggestion, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <Card sx={{ bgcolor: '#f5f5f5' }}>
                    <CardContent>
                      <Typography variant="body1">{suggestion}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
              
              {financialData.suggestions.length === 0 && (
                <Grid item xs={12}>
                  <Typography variant="body1">
                    Add more financial data to receive AI-powered insights tailored to your specific situation.
                  </Typography>
                </Grid>
              )}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Reports;