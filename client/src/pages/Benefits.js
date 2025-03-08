import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Heart, Briefcase, Calendar, ArrowRight, User, DollarSign, Clock } from 'lucide-react';

const Benefits = () => {
  // States for the different sections
  const [activeTab, setActiveTab] = useState('health');
  const [income, setIncome] = useState(30000);
  const [age, setAge] = useState(35);
  const [workType, setWorkType] = useState('ride-share');
  const [hoursPerWeek, setHoursPerWeek] = useState(30);
  
  // Sample data for visualizations
  const healthPlans = [
    { name: 'Basic Plan', cost: 150, coverage: 70, rating: 4.1 },
    { name: 'Standard Plan', cost: 220, coverage: 85, rating: 4.5 },
    { name: 'Premium Plan', cost: 320, coverage: 95, rating: 4.8 },
  ];
  
  const retirementData = [
    { age: 'Now', savings: income * 0.1 },
    { age: '5 years', savings: income * 0.1 * 5 * 1.2 },
    { age: '10 years', savings: income * 0.1 * 10 * 1.35 },
    { age: '20 years', savings: income * 0.1 * 20 * 1.8 },
    { age: '30 years', savings: income * 0.1 * 30 * 2.4 },
  ];
  
  const paidLeaveOptions = [
    { name: 'Community Fund', amount: 1500, duration: '2 weeks', requirements: 'Must join community' },
    { name: 'Gig Worker Pool', amount: 2200, duration: '3 weeks', requirements: '6 month membership' },
    { name: 'Emergency Plan', amount: 3000, duration: '4 weeks', requirements: 'Medical documentation' },
  ];
  
  // Calculate recommended plans based on input
  const getRecommendedPlan = () => {
    if (income < 25000) return healthPlans[0];
    if (income < 45000) return healthPlans[1];
    return healthPlans[2];
  };
  
  // Colors for charts
  const COLORS = ['#FF6B6B', '#4ECDC4', '#FFD166', '#6A0572'];
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };
  
  return (
    <div className="bg-gradient-to-br from-purple-50 to-blue-50 min-h-screen p-6">
      <motion.div 
        className="max-w-6xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h1 className="text-4xl font-bold text-purple-800 mb-4">Benefits Navigator</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Find the perfect health, retirement, and paid leave options tailored to your unique needs as a gig worker.
          </p>
        </motion.div>
        
        {/* Personal Profile Card */}
        <motion.div 
          variants={itemVariants}
          className="bg-white rounded-lg shadow-lg p-6 mb-10"
        >
          <h2 className="text-2xl font-semibold text-purple-800 mb-6 flex items-center">
            <User className="mr-2" /> Your Profile
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <label className="block text-gray-700 mb-2">Annual Income</label>
              <div className="flex items-center">
                <DollarSign className="text-purple-500 mr-2" size={20} />
                <input 
                  type="range" 
                  min="10000" 
                  max="100000" 
                  step="1000" 
                  value={income} 
                  onChange={(e) => setIncome(parseInt(e.target.value))}
                  className="w-full"
                />
              </div>
              <p className="text-right text-purple-800 font-semibold">${income.toLocaleString()}</p>
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">Your Age</label>
              <div className="flex items-center">
                <input 
                  type="range" 
                  min="18" 
                  max="70" 
                  value={age} 
                  onChange={(e) => setAge(parseInt(e.target.value))}
                  className="w-full"
                />
              </div>
              <p className="text-right text-purple-800 font-semibold">{age} years old</p>
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">Work Type</label>
              <select 
                value={workType} 
                onChange={(e) => setWorkType(e.target.value)}
                className="w-full p-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="ride-share">Ride-share Driver</option>
                <option value="delivery">Food/Package Delivery</option>
                <option value="freelance">Freelance Creative</option>
                <option value="home-services">Home Services</option>
                <option value="care-provider">Care Provider</option>
              </select>
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">Hours per Week</label>
              <div className="flex items-center">
                <Clock className="text-purple-500 mr-2" size={20} />
                <input 
                  type="range" 
                  min="5" 
                  max="60" 
                  value={hoursPerWeek} 
                  onChange={(e) => setHoursPerWeek(parseInt(e.target.value))}
                  className="w-full"
                />
              </div>
              <p className="text-right text-purple-800 font-semibold">{hoursPerWeek} hours</p>
            </div>
          </div>
        </motion.div>
        
        {/* Tabs for different benefits */}
        <motion.div variants={itemVariants} className="flex flex-wrap mb-6 bg-white rounded-lg shadow-md">
          <button
            className={`flex items-center py-3 px-6 font-medium text-sm rounded-tl-lg ${activeTab === 'health' ? 'bg-purple-100 text-purple-800' : 'text-gray-500'}`}
            onClick={() => setActiveTab('health')}
          >
            <Heart className="mr-2" size={18} /> Health Insurance
          </button>
          <button
            className={`flex items-center py-3 px-6 font-medium text-sm ${activeTab === 'retirement' ? 'bg-purple-100 text-purple-800' : 'text-gray-500'}`}
            onClick={() => setActiveTab('retirement')}
          >
            <Briefcase className="mr-2" size={18} /> Retirement Planning
          </button>
          <button
            className={`flex items-center py-3 px-6 font-medium text-sm rounded-tr-lg ${activeTab === 'leave' ? 'bg-purple-100 text-purple-800' : 'text-gray-500'}`}
            onClick={() => setActiveTab('leave')}
          >
            <Calendar className="mr-2" size={18} /> Paid Leave Options
          </button>
        </motion.div>
        
        {/* Content based on active tab */}
        <motion.div 
          variants={itemVariants}
          className="bg-white rounded-lg shadow-lg p-6"
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          key={activeTab}
        >
          {activeTab === 'health' && (
            <div>
              <h2 className="text-2xl font-semibold text-purple-800 mb-6">Health Insurance Marketplace</h2>
              <p className="text-gray-600 mb-8">
                Based on your income of ${income.toLocaleString()} and your work as a {workType.replace('-', ' ')} worker, 
                here are your best options:
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-purple-700 mb-4">Recommended Plans</h3>
                  <div className="space-y-4">
                    {healthPlans.map((plan, index) => (
                      <motion.div
                        key={plan.name}
                        className={`border rounded-lg p-4 relative ${getRecommendedPlan().name === plan.name ? 'border-purple-500 bg-purple-50' : 'border-gray-200'}`}
                        whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
                      >
                        {getRecommendedPlan().name === plan.name && (
                          <div className="absolute -top-3 -right-3 bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                            Best Match
                          </div>
                        )}
                        <div className="flex justify-between items-center">
                          <h4 className="font-medium text-lg">{plan.name}</h4>
                          <span className="font-bold text-purple-800">${plan.cost}/mo</span>
                        </div>
                        <div className="mt-2 flex items-center">
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div 
                              className="bg-purple-600 h-2.5 rounded-full" 
                              style={{ width: `${plan.coverage}%` }}
                            ></div>
                          </div>
                          <span className="ml-2 text-sm font-medium text-gray-500">{plan.coverage}% coverage</span>
                        </div>
                        <div className="mt-4 flex justify-between items-center">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <svg key={i} className={`w-4 h-4 ${i < Math.floor(plan.rating) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                              </svg>
                            ))}
                            <span className="ml-1 text-sm text-gray-500">{plan.rating}</span>
                          </div>
                          <button className="text-purple-600 hover:text-purple-800 text-sm font-medium flex items-center">
                            View details <ArrowRight size={16} className="ml-1" />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-purple-700 mb-4">Coverage Comparison</h3>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={healthPlans}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="coverage"
                          nameKey="name"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {healthPlans.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'retirement' && (
            <div>
              <h2 className="text-2xl font-semibold text-purple-800 mb-6">Retirement Planning AI</h2>
              <p className="text-gray-600 mb-8">
                Based on your current income of ${income.toLocaleString()} and age of {age}, 
                here's a projection of your potential retirement savings if you save 10% of your income:
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <h3 className="text-xl font-semibold text-purple-700 mb-4">Savings Projection</h3>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={retirementData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="age" />
                        <YAxis tickFormatter={(value) => `$${value.toLocaleString()}`} />
                        <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                        <Bar dataKey="savings" fill="#8884d8" name="Savings">
                          {retirementData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-purple-700 mb-4">Retirement Options</h3>
                  <div className="space-y-4">
                    <motion.div 
                      className="border border-purple-500 bg-purple-50 rounded-lg p-4"
                      whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
                    >
                      <h4 className="font-medium text-lg">Solo 401(k)</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Ideal for self-employed individuals with no employees. Contribute up to $22,500 in 2023.
                      </p>
                      <button className="mt-3 text-purple-600 hover:text-purple-800 text-sm font-medium flex items-center">
                        Learn more <ArrowRight size={16} className="ml-1" />
                      </button>
                    </motion.div>
                    
                    <motion.div 
                      className="border border-gray-200 rounded-lg p-4"
                      whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
                    >
                      <h4 className="font-medium text-lg">SEP IRA</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Simplified Employee Pension plan allows you to contribute up to 25% of your net earnings.
                      </p>
                      <button className="mt-3 text-purple-600 hover:text-purple-800 text-sm font-medium flex items-center">
                        Learn more <ArrowRight size={16} className="ml-1" />
                      </button>
                    </motion.div>
                    
                    <motion.div 
                      className="border border-gray-200 rounded-lg p-4"
                      whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
                    >
                      <h4 className="font-medium text-lg">Roth IRA</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Tax-free growth and withdrawals in retirement. Income limits apply.
                      </p>
                      <button className="mt-3 text-purple-600 hover:text-purple-800 text-sm font-medium flex items-center">
                        Learn more <ArrowRight size={16} className="ml-1" />
                      </button>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'leave' && (
            <div>
              <h2 className="text-2xl font-semibold text-purple-800 mb-6">Paid Leave Alternatives</h2>
              <p className="text-gray-600 mb-8">
                As a gig worker, you don't have traditional paid leave benefits. Here are crowdfunded and gig-specific solutions:
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {paidLeaveOptions.map((option, index) => (
                  <motion.div
                    key={option.name}
                    className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden"
                    whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
                  >
                    <div className="h-2 bg-purple-600"></div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-purple-800 mb-3">{option.name}</h3>
                      <div className="flex items-center mb-4">
                        <DollarSign className="text-green-500 mr-2" size={20} />
                        <span className="text-lg font-bold text-gray-800">${option.amount}</span>
                      </div>
                      <div className="space-y-2 mb-6">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Duration:</span>
                          <span className="font-medium">{option.duration}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Requirements:</span>
                          <span className="font-medium">{option.requirements}</span>
                        </div>
                      </div>
                      <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-md transition duration-200 flex items-center justify-center">
                        Apply Now <ArrowRight size={16} className="ml-2" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {/* Community support section */}
              <div className="mt-10 bg-purple-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-purple-800 mb-4">Community Support</h3>
                <p className="text-gray-600 mb-6">
                  Join our community of gig workers who support each other during tough times. 
                  Share your story and connect with others who understand your challenges.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-purple-200 flex items-center justify-center mr-3">
                        <span className="text-purple-700 font-bold">S</span>
                      </div>
                      <div>
                        <h4 className="font-medium">Sarah</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          "The community fund helped me take two weeks off when my daughter was sick. I couldn't have done it without this support."
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-purple-200 flex items-center justify-center mr-3">
                        <span className="text-purple-700 font-bold">M</span>
                      </div>
                      <div>
                        <h4 className="font-medium">Maria</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          "I was able to take a month off to care for my mother after surgery thanks to the Emergency Plan. It was a lifesaver."
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <button className="mt-6 bg-white text-purple-700 border border-purple-700 font-medium py-2 px-6 rounded-md hover:bg-purple-50 transition duration-200">
                  Join Our Community
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Benefits;