function Financial() {
    document.addEventListener('DOMContentLoaded', function() {
      const elements = {
        tabButtons: document.querySelectorAll('.tab-button'),
        tabContents: document.querySelectorAll('.tab-content'),
        transactionForm: document.getElementById('transaction-form'),
        transactionTable: document.getElementById('transaction-tbody'),
        incomeTotal: document.getElementById('income-total'),
        expenseTotal: document.getElementById('expense-total'),
        balanceTotal: document.getElementById('balance-total'),
        annualIncomeInput: document.getElementById('annual-income'),
        deductionsInput: document.getElementById('deductions'),
        taxableIncomeDisplay: document.getElementById('taxable-income'),
        estimatedTaxDisplay: document.getElementById('estimated-tax'),
        quarterlyPaymentDisplay: document.getElementById('quarterly-payment'),
        generateReportBtn: document.getElementById('generate-report-btn'),
        downloadReportBtn: document.getElementById('download-report-btn')
      };
  
      let transactions = [
        { id: 1, type: 'income', description: 'Web Development Project', amount: 1200, date: '2025-03-01', category: 'Freelance' },
        { id: 2, type: 'expense', description: 'Adobe Creative Suite', amount: 52.99, date: '2025-03-02', category: 'Software' }
      ];
  
      const taxBrackets = [
        { income: 12000, rate: 0.10 }, { income: 40000, rate: 0.12 }, { income: 86000, rate: 0.22 },
        { income: 160000, rate: 0.24 }, { income: 204000, rate: 0.32 }, { income: 510000, rate: 0.35 },
        { income: Infinity, rate: 0.37 }
      ];
  
      function setupTabs() {
        elements.tabButtons.forEach(button => {
          button.addEventListener('click', () => {
            elements.tabButtons.forEach(btn => btn.classList.remove('active'));
            elements.tabContents.forEach(content => content.classList.remove('active'));
            button.classList.add('active');
            document.getElementById(button.getAttribute('data-tab')).classList.add('active');
          });
        });
      }
  
      function renderTransactions() {
        elements.transactionTable.innerHTML = '';
        transactions.forEach(transaction => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${transaction.date}</td>
            <td>${transaction.description}</td>
            <td>${transaction.category}</td>
            <td class="${transaction.type === 'income' ? 'income-amount' : 'expense-amount'}">
              ${transaction.type === 'income' ? '+' : '-'}$${transaction.amount.toFixed(2)}
            </td>
            <td><button class='delete-btn' onclick='deleteTransaction(${transaction.id})'>🗑</button></td>
          `;
          elements.transactionTable.appendChild(row);
        });
      }
  
      function updateFinancialSummary() {
        const totalIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
        const totalExpenses = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
        const balance = totalIncome - totalExpenses;
        elements.incomeTotal.textContent = $${totalIncome.toFixed(2)};
        elements.expenseTotal.textContent = $${totalExpenses.toFixed(2)};
        elements.balanceTotal.textContent = $${balance.toFixed(2)};
      }
  
      function calculateTax() {
        const annualIncome = parseFloat(elements.annualIncomeInput.value) || 0;
        const deductions = parseFloat(elements.deductionsInput.value) || 0;
        let taxableIncome = Math.max(0, annualIncome - deductions);
        let totalTax = 0, remainingIncome = taxableIncome;
        for (const bracket of taxBrackets) {
          if (remainingIncome > 0) {
            const taxableAmountInBracket = Math.min(remainingIncome, bracket.income);
            totalTax += taxableAmountInBracket * bracket.rate;
            remainingIncome -= taxableAmountInBracket;
          }
        }
        elements.taxableIncomeDisplay.textContent = $${taxableIncome.toFixed(2)};
        elements.estimatedTaxDisplay.textContent = $${totalTax.toFixed(2)};
        elements.quarterlyPaymentDisplay.textContent = $${(totalTax / 4).toFixed(2)};
      }
  
      function addTransaction(event) {
        event.preventDefault();
        const type = document.getElementById('transaction-type').value;
        const description = document.getElementById('transaction-description').value;
        const amount = parseFloat(document.getElementById('transaction-amount').value);
        const date = document.getElementById('transaction-date').value;
        const category = document.getElementById('transaction-category').value;
        if (description && amount && date && category) {
          transactions.push({ id: transactions.length + 1, type, description, amount, date, category });
          renderTransactions();
          updateFinancialSummary();
          elements.transactionForm.reset();
        }
      }
  
      /*function deleteTransaction(id) {
        transactions = transactions.filter(transaction => transaction.id !== id);
        renderTransactions();
        updateFinancialSummary();
      }*/
  
      function generateFinancialReport() {
        console.log('Generating financial report...');
      }
  
      function downloadReport() {
        console.log('Downloading financial report...');
      }
  
      function setupEventListeners() {
        elements.transactionForm.addEventListener('submit', addTransaction);
        elements.annualIncomeInput.addEventListener('input', calculateTax);
        elements.deductionsInput.addEventListener('input', calculateTax);
        elements.generateReportBtn.addEventListener('click', generateFinancialReport);
        elements.downloadReportBtn.addEventListener('click', downloadReport);
      }
  
      function init() {
        setupTabs();
        renderTransactions();
        setupEventListeners();
        updateFinancialSummary();
        calculateTax();
      }
  
      init();
    });
  }
  
 export default Financial();