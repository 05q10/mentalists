import React, { useState } from 'react';

const Proposal = () => {
  const [activeTab, setActiveTab] = useState('proposal');
  const [jobDescription, setJobDescription] = useState('');
  const [pastProposals, setPastProposals] = useState('');
  const [contractDetails, setContractDetails] = useState({
    clientName: '',
    projectTitle: '',
    scope: '',
    deliverables: '',
    timeline: '',
    payment: ''
  });
  const [contractText, setContractText] = useState('');
  const [generatedProposal, setGeneratedProposal] = useState('');
  const [riskAnalysis, setRiskAnalysis] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const generateProposal = () => {
    setIsGenerating(true);
    
    // Simulate AI processing
    setTimeout(() => {
      const proposal = `
Project Proposal: ${contractDetails.projectTitle || 'Custom Development Project'}

Dear ${contractDetails.clientName || 'Valued Client'},

Thank you for the opportunity to submit a proposal for your project. Based on my understanding of your requirements, I'm confident I can deliver exceptional results.

 Project Understanding
${jobDescription || 'As discussed, you need a professional who can deliver high-quality work on time and within budget.'}

Proposed Solution
I'll provide a comprehensive solution that includes:
- Detailed planning and regular updates
- High-quality deliverables meeting all requirements
- Responsive communication throughout the project

Deliverables
${contractDetails.deliverables || '- Complete project files\n- Documentation\n- Ongoing support as needed'}

 Timeline
${contractDetails.timeline || 'I can complete this project within 2-3 weeks from the start date, with key milestones provided weekly.'}

 Investment
${contractDetails.payment || 'My rate for this project is $XXX, payable in two installments - 50% upfront and 50% upon completion.'}

I'm excited about the opportunity to work with you on this project and deliver outstanding results.

Looking forward to your response.

Sincerely,
[Your Name]
      `;
      
      setGeneratedProposal(proposal);
      setIsGenerating(false);
    }, 2000);
  };

  const generateContract = () => {
    setIsGenerating(true);
    
    // Simulate AI processing
    setTimeout(() => {
      const contract = `
# FREELANCE SERVICE AGREEMENT

## PARTIES
This Agreement is made between ${contractDetails.clientName || '[CLIENT NAME]'} ("Client") and [FREELANCER NAME] ("Freelancer").

## PROJECT
Freelancer agrees to provide services related to ${contractDetails.projectTitle || '[PROJECT TITLE]'}.

## SCOPE OF WORK
${contractDetails.scope || 'Freelancer will provide the following services: [DETAILED DESCRIPTION OF SERVICES]'}

## DELIVERABLES
${contractDetails.deliverables || 'Freelancer will deliver the following: [LIST OF DELIVERABLES]'}

## TIMELINE
${contractDetails.timeline || 'The project will commence on [START DATE] and be completed by [END DATE], according to the following schedule: [TIMELINE DETAILS]'}

## PAYMENT TERMS
${contractDetails.payment || 'Client agrees to pay Freelancer a total fee of $[AMOUNT] according to the following schedule:\n- 50% ($[AMOUNT]) upon signing this agreement\n- 50% ($[AMOUNT]) upon project completion'}

## INTELLECTUAL PROPERTY
Upon receipt of full payment, Freelancer assigns to Client all rights, title, and interest in the deliverables.

## CONFIDENTIALITY
Both parties agree to maintain confidentiality regarding all business information shared during the project.

## TERMINATION
Either party may terminate this agreement with written notice if the other party materially breaches this agreement and fails to cure such breach within 14 days.

## SIGNATURES

Client: ______________________ Date: __________

Freelancer: __________________ Date: __________
      `;
      
      setContractText(contract);
      setIsGenerating(false);
    }, 2000);
  };

  const analyzeRisks = () => {
    setIsAnalyzing(true);
    
    // Simulate AI risk analysis
    setTimeout(() => {
      const risks = [
        {
          severity: 'high',
          issue: 'Vague payment terms',
          description: 'Payment schedule and amounts are not clearly defined',
          recommendation: 'Specify exact payment amounts and due dates'
        },
        {
          severity: 'medium',
          issue: 'Incomplete deliverables',
          description: 'Deliverables section lacks specific details about formats and specifications',
          recommendation: 'List each deliverable with detailed specifications'
        },
        {
          severity: 'low',
          issue: 'Missing revision clause',
          description: 'No mention of how many revisions are included',
          recommendation: 'Add specific limits on revision rounds and additional costs'
        }
      ];
      
      setRiskAnalysis(risks);
      setIsAnalyzing(false);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <header className="bg-purple-600 p-6 text-white">
          <h1 className="text-3xl font-bold">AI-Powered Contract & Proposal Assistant</h1>
          <p className="mt-2 text-purple-100">Create winning proposals and secure contracts with AI assistance</p>
        </header>
        
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('proposal')}
              className={`px-6 py-4 text-sm font-medium ${
                activeTab === 'proposal'
                  ? 'border-b-2 border-purple-500 text-purple-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Smart Proposal Generator
            </button>
            <button
              onClick={() => setActiveTab('contract')}
              className={`px-6 py-4 text-sm font-medium ${
                activeTab === 'contract'
                  ? 'border-b-2 border-purple-500 text-purple-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              AI Contract Drafting
            </button>
            <button
              onClick={() => setActiveTab('risk')}
              className={`px-6 py-4 text-sm font-medium ${
                activeTab === 'risk'
                  ? 'border-b-2 border-purple-500 text-purple-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Risk Analysis
            </button>
          </nav>
        </div>
        
        <div className="p-6">
          {activeTab === 'proposal' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">Generate Winning Proposal</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Job Description
                    </label>
                    <textarea
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                      rows="4"
                      placeholder="Paste the client's job description here"
                      value={jobDescription}
                      onChange={(e) => setJobDescription(e.target.value)}
                    ></textarea>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Past Successful Proposals (Optional)
                    </label>
                    <textarea
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                      rows="4"
                      placeholder="Paste examples of your successful proposals to help the AI learn your style"
                      value={pastProposals}
                      onChange={(e) => setPastProposals(e.target.value)}
                    ></textarea>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Client Name
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                        placeholder="Client name"
                        value={contractDetails.clientName}
                        onChange={(e) => setContractDetails({...contractDetails, clientName: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Project Title
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                        placeholder="Project title"
                        value={contractDetails.projectTitle}
                        onChange={(e) => setContractDetails({...contractDetails, projectTitle: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <button
                    onClick={generateProposal}
                    className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                    disabled={isGenerating}
                  >
                    {isGenerating ? 'Generating...' : 'Generate Proposal'}
                  </button>
                </div>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-4">Generated Proposal</h2>
                <div className="border border-gray-300 rounded-md p-4 bg-gray-50 h-full overflow-auto whitespace-pre-wrap">
                  {isGenerating ? (
                    <div className="flex justify-center items-center h-full">
                      <div className="animate-pulse text-gray-400">AI is crafting your proposal...</div>
                    </div>
                  ) : generatedProposal ? (
                    <div className="prose max-w-none">
                      {generatedProposal.split('\n').map((line, index) => (
                        <div key={index}>{line}</div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-gray-400 text-center">
                      Your AI-generated proposal will appear here
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'contract' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">Generate Legal Contract</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Client Name
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                        placeholder="Client name"
                        value={contractDetails.clientName}
                        onChange={(e) => setContractDetails({...contractDetails, clientName: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Project Title
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                        placeholder="Project title"
                        value={contractDetails.projectTitle}
                        onChange={(e) => setContractDetails({...contractDetails, projectTitle: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Project Scope
                    </label>
                    <textarea
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                      rows="3"
                      placeholder="Describe the scope of work"
                      value={contractDetails.scope}
                      onChange={(e) => setContractDetails({...contractDetails, scope: e.target.value})}
                    ></textarea>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Deliverables
                    </label>
                    <textarea
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                      rows="3"
                      placeholder="List all deliverables"
                      value={contractDetails.deliverables}
                      onChange={(e) => setContractDetails({...contractDetails, deliverables: e.target.value})}
                    ></textarea>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Timeline
                    </label>
                    <textarea
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                      rows="2"
                      placeholder="Project timeline and milestones"
                      value={contractDetails.timeline}
                      onChange={(e) => setContractDetails({...contractDetails, timeline: e.target.value})}
                    ></textarea>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Payment Terms
                    </label>
                    <textarea
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                      rows="2"
                      placeholder="Payment amount, schedule, and method"
                      value={contractDetails.payment}
                      onChange={(e) => setContractDetails({...contractDetails, payment: e.target.value})}
                    ></textarea>
                  </div>
                  
                  <button
                    onClick={generateContract}
                    className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                    disabled={isGenerating}
                  >
                    {isGenerating ? 'Generating...' : 'Generate Contract'}
                  </button>
                </div>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-4">Generated Contract</h2>
                <div className="border border-gray-300 rounded-md p-4 bg-gray-50 h-full overflow-auto whitespace-pre-wrap">
                  {isGenerating ? (
                    <div className="flex justify-center items-center h-full">
                      <div className="animate-pulse text-gray-400">AI is drafting your contract...</div>
                    </div>
                  ) : contractText ? (
                    <div className="prose max-w-none">
                      {contractText.split('\n').map((line, index) => (
                        <div key={index}>{line}</div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-gray-400 text-center">
                      Your AI-generated contract will appear here
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'risk' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Contract Risk Analysis</h2>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Paste Contract for Analysis
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                  rows="10"
                  placeholder="Paste the contract text you want to analyze"
                  value={contractText}
                  onChange={(e) => setContractText(e.target.value)}
                ></textarea>
              </div>
              
              <div className="mb-6">
                <button
                  onClick={analyzeRisks}
                  className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                  disabled={isAnalyzing || !contractText}
                >
                  {isAnalyzing ? 'Analyzing...' : 'Analyze Risks'}
                </button>
              </div>
              
              {isAnalyzing ? (
                <div className="text-center py-8">
                  <div className="animate-pulse text-gray-400">AI is analyzing your contract for risks...</div>
                </div>
              ) : riskAnalysis.length > 0 ? (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Risk Analysis Results</h3>
                  
                  {riskAnalysis.map((risk, index) => (
                    <div 
                      key={index} 
                      className={`p-4 rounded-md ${
                        risk.severity === 'high' 
                          ? 'bg-red-50 border-l-4 border-red-500' 
                          : risk.severity === 'medium'
                            ? 'bg-yellow-50 border-l-4 border-yellow-500'
                            : 'bg-purple-50 border-l-4 border-purple-500'
                      }`}
                    >
                      <div className="flex justify-between">
                        <h4 className="text-md font-medium">{risk.issue}</h4>
                        <span className={`text-sm px-2 py-1 rounded-full ${
                          risk.severity === 'high' 
                            ? 'bg-red-100 text-red-800' 
                            : risk.severity === 'medium'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-purple-100 text-purple-800'
                        }`}>
                          {risk.severity} risk
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-gray-600">{risk.description}</p>
                      <div className="mt-2">
                        <span className="text-sm font-medium">Recommendation: </span>
                        <span className="text-sm">{risk.recommendation}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-400">
                  No risks analyzed yet. Paste your contract and click "Analyze Risks"
                </div>
              )}
            </div>
          )}
        </div>
        
        <footer className="bg-gray-50 px-6 py-4 border-t border-gray-200">
          <div className="text-sm text-gray-500 text-center">
            AI-Powered Contract & Proposal Assistant • Helping freelancers create winning proposals and secure contracts
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Proposal;