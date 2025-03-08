import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Search, ThumbsUp, Users, Calendar, DollarSign, Clock, Briefcase, Award, Filter } from 'lucide-react';
import { motion } from 'framer-motion';

const Rate = () => {
  const [isListening, setIsListening] = useState(false);
  const [voiceInput, setVoiceInput] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    projectType: '',
    experience: 2,
    complexity: 'medium',
    duration: 3,
    location: 'United States',
    clientBudget: '',
  });
  const [calculatedRate, setCalculatedRate] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [activeTab, setActiveTab] = useState('calculator');
  const [previousProjects, setPreviousProjects] = useState([
    {
      id: 1,
      title: 'E-commerce Mobile App',
      date: '12/15/2024',
      rate: 4500,
      duration: '4 weeks',
      complexity: 'High'
    },
    {
      id: 2,
      title: 'Portfolio Website',
      date: '11/02/2024',
      rate: 1800,
      duration: '2 weeks',
      complexity: 'Medium'
    }
  ]);
  
  const [communityRates, setCommunityRates] = useState([
    {
      id: 1,
      projectType: 'Fashion E-commerce Website',
      freelancerType: 'Full Stack Developer',
      rate: 5200,
      date: '02/25/2025',
      username: 'WebDev_Pro',
      complexity: 'High',
      duration: '5 weeks'
    },
    {
      id: 2,
      projectType: 'Interior Design Project',
      freelancerType: 'Interior Designer',
      rate: 3800,
      date: '02/10/2025',
      username: 'DesignMaster',
      complexity: 'Medium',
      duration: '3 weeks'
    },
    {
      id: 3,
      projectType: 'Wedding Singer',
      freelancerType: 'Vocalist',
      rate: 1200,
      date: '03/01/2025',
      username: 'MelodyMaker',
      complexity: 'Medium',
      duration: '1 day'
    }
  ]);
  
  const [recentEvents, setRecentEvents] = useState([
    {
      id: 1,
      name: 'Tech Conference 2025',
      date: '02/15/2025',
      avgRate: 3500,
      freelancerType: 'Tech Speaker'
    },
    {
      id: 2,
      name: 'Spring Fashion Show',
      date: '03/05/2025',
      avgRate: 2800,
      freelancerType: 'Fashion Photographer'
    }
  ]);

  // Simulate voice recognition
  const toggleListening = () => {
    if (!isListening) {
      setIsListening(true);
      // Simulate voice input after 2 seconds
      setTimeout(() => {
        const exampleInputs = [
          "I have an offer to make a full stack fashion website but I don't know what to quote.",
          "I'm an interior designer with a new residential project inquiry. What should I charge?",
          "I'm a singer who got offered to perform at a wedding. How much should I ask for?"
        ];
        const randomInput = exampleInputs[Math.floor(Math.random() * exampleInputs.length)];
        setVoiceInput(randomInput);
        setIsListening(false);
        setShowForm(true);
        
        // Pre-fill form based on voice input
        if (randomInput.includes("fashion website")) {
          setFormData({
            ...formData,
            projectType: 'Website Development',
            complexity: 'high'
          });
        } else if (randomInput.includes("interior designer")) {
          setFormData({
            ...formData,
            projectType: 'Interior Design',
            complexity: 'medium'
          });
        } else if (randomInput.includes("singer")) {
          setFormData({
            ...formData,
            projectType: 'Performance',
            duration: 1,
            complexity: 'medium'
          });
        }
      }, 2000);
    } else {
      setIsListening(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSelectChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSliderChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: parseInt(value)
    });
  };

  const calculateRate = () => {
    // Base rates by project type
    const baseRates = {
      'Website Development': 3000,
      'Mobile App': 4000,
      'UI/UX Design': 2500,
      'Interior Design': 3200,
      'Performance': 800,
      'Photography': 1500
    };

    // Multipliers
    const complexityMultiplier = {
      'low': 0.8,
      'medium': 1.0,
      'high': 1.3
    };

    const experienceMultiplier = 1 + (formData.experience * 0.05);
    const locationMultiplier = formData.location === 'United States' ? 1.2 : 
                              formData.location === 'Western Europe' ? 1.1 : 
                              formData.location === 'Eastern Europe' ? 0.8 : 
                              formData.location === 'Asia' ? 0.7 : 0.9;

    // Calculate
    const baseRate = baseRates[formData.projectType] || 2000;
    const rate = baseRate * 
                 complexityMultiplier[formData.complexity] * 
                 experienceMultiplier * 
                 locationMultiplier * 
                 formData.duration;
    
    setCalculatedRate(Math.round(rate));
    setShowResult(true);
  };

  // Custom Dropdown component using Tailwind
  const Dropdown = ({ options, value, onChange, placeholder }) => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
    
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex justify-between items-center px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
        >
          {value || placeholder}
          <svg className="w-5 h-5 ml-2 -mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
        
        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg">
            <ul className="py-1 overflow-auto text-base rounded-md max-h-60 focus:outline-none sm:text-sm">
              {options.map((option) => (
                <li
                  key={option.value}
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className="relative py-2 pl-3 cursor-pointer select-none hover:bg-purple-100 hover:text-purple-900"
                >
                  {option.label}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white min-h-screen">
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-purple-900 mb-2">AI Rate Calculator</h1>
      <p className="text-gray-600 mb-8">Find the perfect price for your freelance projects with AI-powered rate suggestions</p>
      
      {/* Custom Tabs */}
      <div className="w-full mb-8">
        <div className="grid grid-cols-3 gap-2 bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setActiveTab('calculator')}
            className={`py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'calculator' 
              ? 'bg-white text-purple-700 shadow-sm' 
              : 'text-gray-600 hover:text-purple-700'
            }`}
          >
            Rate Calculator
          </button>
          <button
            onClick={() => setActiveTab('community')}
            className={`py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'community' 
              ? 'bg-white text-purple-700 shadow-sm' 
              : 'text-gray-600 hover:text-purple-700'
            }`}
          >
            Community Rates
          </button>
          <button
            onClick={() => setActiveTab('events')}
            className={`py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'events' 
              ? 'bg-white text-purple-700 shadow-sm' 
              : 'text-gray-600 hover:text-purple-700'
            }`}
          >
            Recent Events
          </button>
        </div>
      </div>
      
      {/* Calculator Tab Content */}
      <div className={`space-y-6 ${activeTab !== 'calculator' ? 'hidden' : ''}`}>
        {/* Voice Assistant Card */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="flex items-center text-lg font-medium text-gray-900">
              <Mic className="mr-2 h-5 w-5 text-purple-600" />
              Voice Assistant
            </h2>
          </div>
          <div className="px-6 py-4">
            <div className="flex items-center mb-4">
              <button 
                onClick={toggleListening}
                className={`rounded-full p-3 mr-4 border ${
                  isListening 
                  ? 'bg-red-100 text-red-600 border-red-300' 
                  : 'bg-purple-50 text-purple-600 border-purple-200'
                }`}
              >
                {isListening ? <MicOff size={20} /> : <Mic size={20} />}
              </button>
              <div className="flex-1 p-3 bg-gray-50 rounded-lg border border-gray-200">
                {isListening ? (
                  <div className="flex items-center text-sm text-gray-500">
                    <span>Listening...</span>
                    <span className="ml-3 flex space-x-1">
                      <motion.span
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ repeat: Infinity, duration: 1 }}
                        className="w-2 h-2 bg-purple-500 rounded-full"
                      />
                      <motion.span
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
                        className="w-2 h-2 bg-purple-500 rounded-full"
                      />
                      <motion.span
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
                        className="w-2 h-2 bg-purple-500 rounded-full"
                      />
                    </span>
                  </div>
                ) : (
                  <span className="text-sm text-gray-500">
                    {voiceInput || "Tap the microphone and ask something like \"I have an offer to build a website...\""}
                  </span>
                )}
              </div>
            </div>
            
            {voiceInput && (
              <div className="mt-4 p-4 bg-purple-50 rounded-lg border border-purple-100">
                <h3 className="font-medium text-purple-800 mb-2">I heard:</h3>
                <p className="text-gray-700">{voiceInput}</p>
              </div>
            )}
          </div>
        </div>
        
        {/* Project Details Form */}
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Project Details</h2>
              </div>
              <div className="px-6 py-4 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Project Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Project Type</label>
                    <Dropdown
                      options={[
                        { value: 'Website Development', label: 'Website Development' },
                        { value: 'Mobile App', label: 'Mobile App' },
                        { value: 'UI/UX Design', label: 'UI/UX Design' },
                        { value: 'Interior Design', label: 'Interior Design' },
                        { value: 'Performance', label: 'Performance' },
                        { value: 'Photography', label: 'Photography' }
                      ]}
                      value={formData.projectType}
                      onChange={(value) => handleSelectChange('projectType', value)}
                      placeholder="Select project type"
                    />
                  </div>
                  
                  {/* Project Complexity */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Project Complexity</label>
                    <Dropdown
                      options={[
                        { value: 'low', label: 'Low' },
                        { value: 'medium', label: 'Medium' },
                        { value: 'high', label: 'High' }
                      ]}
                      value={formData.complexity}
                      onChange={(value) => handleSelectChange('complexity', value)}
                      placeholder="Select complexity"
                    />
                  </div>
                  
                  {/* Experience Slider */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Experience (Years): {formData.experience}
                    </label>
                    <input
                      type="range"
                      name="experience"
                      min="0"
                      max="10"
                      step="1"
                      value={formData.experience}
                      onChange={handleSliderChange}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>0</span>
                      <span>5</span>
                      <span>10</span>
                    </div>
                  </div>
                  
                  {/* Duration Slider */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Project Duration (Weeks): {formData.duration}
                    </label>
                    <input
                      type="range"
                      name="duration"
                      min="1"
                      max="12"
                      step="1"
                      value={formData.duration}
                      onChange={handleSliderChange}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>1</span>
                      <span>6</span>
                      <span>12</span>
                    </div>
                  </div>
                  
                  {/* Location */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Your Location</label>
                    <Dropdown
                      options={[
                        { value: 'United States', label: 'United States' },
                        { value: 'Western Europe', label: 'Western Europe' },
                        { value: 'Eastern Europe', label: 'Eastern Europe' },
                        { value: 'Asia', label: 'Asia' },
                        { value: 'Other', label: 'Other' }
                      ]}
                      value={formData.location}
                      onChange={(value) => handleSelectChange('location', value)}
                      placeholder="Select location"
                    />
                  </div>
                  
                  {/* Client Budget */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Client's Budget (Optional)</label>
                    <input
                      type="number"
                      name="clientBudget"
                      placeholder="Enter amount"
                      value={formData.clientBudget}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>
                </div>
                
                {/* Calculate Button */}
                <button 
                  onClick={calculateRate}
                  className="w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-md shadow-sm transition-colors"
                >
                  Calculate Recommended Rate
                </button>
              </div>
            </div>
          </motion.div>
        )}
        
        {/* Results */}
        {showResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 border-t border-gray-200 pt-6"
          >
            <h3 className="text-2xl font-semibold text-purple-800 mb-4">Your Recommended Rate</h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
                <div className="flex justify-between items-center mb-6">
                  <h4 className="text-lg font-medium text-gray-800">Suggested Price</h4>
                  <span className="text-3xl font-bold text-purple-800">${calculatedRate.toLocaleString()}</span>
                </div>
                
                <div className="mb-6">
                  <h5 className="text-sm font-medium text-gray-500 mb-2">Price Range Based on Market</h5>
                  <div className="flex items-center">
                    <span className="text-lg font-semibold text-gray-700">${Math.round(calculatedRate * 0.85).toLocaleString()}</span>
                    <div className="h-1 bg-gradient-to-r from-purple-300 to-purple-600 flex-grow mx-4 rounded-full"></div>
                    <span className="text-lg font-semibold text-gray-700">${Math.round(calculatedRate * 1.15).toLocaleString()}</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Market Competitiveness</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <ThumbsUp key={i} size={16} className={i < 4 ? "text-purple-600" : "text-gray-300"} />
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Win Probability</span>
                    <span className="font-medium">82%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Project Complexity</span>
                    <span className="font-medium">Medium</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-medium text-gray-800 mb-4">Your Previous Projects</h4>
                {previousProjects.length > 0 ? (
                  <div className="space-y-4">
                    {previousProjects.map(project => (
                      <div key={project.id} className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex justify-between mb-2">
                          <h5 className="font-medium text-gray-800">{project.title}</h5>
                          <span className="text-purple-600 font-bold">${project.rate.toLocaleString()}</span>
                        </div>
                        <div className="flex text-sm text-gray-500 space-x-4">
                          <span className="flex items-center">
                            <Calendar size={14} className="mr-1" /> {project.date}
                          </span>
                          <span className="flex items-center">
                            <Clock size={14} className="mr-1" /> {project.duration}
                          </span>
                          <span className="flex items-center">
                            <Briefcase size={14} className="mr-1" /> {project.complexity}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center p-6 bg-gray-50 rounded-lg">
                    <p className="text-gray-500">No previous projects found</p>
                  </div>
                )}
                
                <div className="mt-6">
                  <button className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                    <Users size={16} className="mr-2" />
                    Connect with similar freelancers
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
      
      {/* Community Rates Tab Content */}
      <div className={`${activeTab !== 'community' ? 'hidden' : ''}`}>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex flex-row items-center justify-between">
            <h2 className="text-lg font-medium text-gray-900">Community Rate Insights</h2>
            <div className="flex space-x-2">
              <input 
                type="text" 
                placeholder="Search projects..." 
                className="w-48 md:w-64 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
              <button className="p-2 border border-gray-300 rounded-md shadow-sm hover:bg-gray-50">
                <Search size={16} />
              </button>
              <button className="p-2 border border-gray-300 rounded-md shadow-sm hover:bg-gray-50">
                <Filter size={16} />
              </button>
            </div>
          </div>
          <div className="px-6 py-4">
            <div className="space-y-6">
              {communityRates.map(rate => (
                <div key={rate.id} className="p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors">
                  <div className="flex justify-between mb-2">
                    <div className="flex items-center">
                      <div className="bg-purple-100 text-purple-800 rounded-full w-8 h-8 flex items-center justify-center mr-3">
                        {rate.username.charAt(0)}
                      </div>
                      <div>
                        <h5 className="font-medium text-gray-800">{rate.projectType}</h5>
                        <p className="text-sm text-gray-500">{rate.freelancerType}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-purple-600 font-bold">${rate.rate.toLocaleString()}</span>
                      <p className="text-xs text-gray-500">{rate.date}</p>
                    </div>
                  </div>
                  <div className="flex text-sm text-gray-500 space-x-4 mt-2">
                    <span className="flex items-center">
                      <Clock size={14} className="mr-1" /> {rate.duration}
                    </span>
                    <span className="flex items-center">
                      <Briefcase size={14} className="mr-1" /> {rate.complexity} Complexity
                    </span>
                    <span className="flex items-center">
                      <Users size={14} className="mr-1" /> @{rate.username}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Events Tab Content */}
      <div className={`${activeTab !== 'events' ? 'hidden' : ''}`}>
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Recent Events & Rate Data</h2>
          </div>
          <div className="px-6 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recentEvents.map(event => (
                <div key={event.id} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center mb-3">
                    <Award className="text-purple-500 mr-2" size={20} />
                    <h4 className="font-medium text-gray-800">{event.name}</h4>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">{event.freelancerType}</span>
                    <span className="text-purple-600 font-bold">${event.avgRate.toLocaleString()}</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    <Calendar size={14} className="inline mr-1" /> {event.date}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8">
              <h4 className="font-medium text-gray-800 mb-4">Search Recent Events</h4>
              <div className="flex space-x-2">
                <input 
                  placeholder="Search by event type or location..." 
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
                <button className="flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-md shadow-sm transition-colors">
                  <Search size={16} className="mr-2" />
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Rate;