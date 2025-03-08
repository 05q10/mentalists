import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaMoneyBillTrendUp } from "react-icons/fa6";

const Money = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('payment');

  // Update active tab based on current path
  useEffect(() => {
    const path = location.pathname.split('/')[1] || 'payment';
    setActiveTab(path);
  }, [location]);

  const tabs = [
    { 
      id: 'GigFinance', 
      label: 'GigFinance', 
      path: '/payment',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    { 
      id: 'GigVenture', 
      label: 'GigVenture', 
      path: '/comm',
      icon: <FaMoneyBillTrendUp className="h-6 w-6" />
    },
    { 
      id: 'GigIt', 
      label: 'GigIt', 
      path: '/rate',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m6 1a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    { 
      id: 'GigVenture', 
      label: 'GigVenture', 
      path: '/comm',
      icon: <FaMoneyBillTrendUp className="h-6 w-6" />
    },
    // { 
    //   id: 'transactions', 
    //   label: 'Transactions', 
    //   path: '/',
    //   icon: (
    //     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    //       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
    //     </svg>
    //   )
    // }
  ];

  const handleTabClick = (path) => {
    navigate(path);
    setActiveTab(path.substring(1) || 'transactions');
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg min-h-20">
      <div className="flex w-full max-w-md mx-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.path)}
            className={`flex flex-col items-center justify-center flex-1 py-3 ${
              activeTab === tab.id 
                ? 'text-blue-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <div className={`${activeTab === tab.id ? 'text-blue-600' : 'text-gray-500'}`}>
              {tab.icon}
            </div>
            <span className={`mt-1 text-xs ${activeTab === tab.id ? 'font-medium' : ''}`}>
              {tab.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Money;