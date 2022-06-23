// import { IMask } from '/imask';

const balance = document.getElementById('viewer');
const addBtn = document.getElementById('add-income');
const subtractBtn = document.getElementById('add-expense');
const inputIncome = document.getElementById('input-income');
const inputExpense = document.getElementById('input-expense');
const incomeLog = document.getElementById('input-source-income');
const expenseLog = document.getElementById('input-source-expense');
const logs = document.querySelector('.logs-ul');
const earnedDisplay = document.querySelector('.earned-display');
const spendDisplay = document.querySelector('.spend-display');
// let input = SimpleMaskMoney.setMask('#input-incom');

loadEventListeners();

function loadEventListeners() {
  // DOM Load event
  document.addEventListener('DOMContentLoaded', getLogs);
  // document.addEventListener('DOMContentLoaded', addMask);
  // Add income event
  addBtn.addEventListener('click', addIncome);
  // Add expense event
  subtractBtn.addEventListener('click', addExpense);
}

// Get incomes, expenses and balance from LS
function getLogs() {
  // Get incomes
  let incomeAmounts;
  if (localStorage.getItem('incomeAmounts') === null) {
    incomeAmounts = [];
  } else {
    incomeAmounts = JSON.parse(localStorage.getItem('incomeAmounts'));
  }
  incomeAmounts.forEach((incomeAmount) => {
    if (
      typeof incomeAmount.date !== 'undefined' &&
      !logs.innerHTML.includes(incomeAmount.date)
    ) {
      logs.innerHTML += `
        <li>${incomeAmount.date}</li> 
        <li>${incomeAmount.incName} + ${incomeAmount.incomeAmount}</li>
      `;
    } else {
      logs.innerHTML += `
        <li>${incomeAmount.incName} + ${incomeAmount.incomeAmount}</li>
      `;
    }
  });

  // Get expenses
  let expenseAmounts;
  if (localStorage.getItem('expenseAmounts') === null) {
    expenseAmounts = [];
  } else {
    expenseAmounts = JSON.parse(localStorage.getItem('expenseAmounts'));
  }
  expenseAmounts.forEach((expenseAmount) => {
    if (
      typeof expenseAmount.date !== 'undefined' &&
      !logs.innerHTML.includes(expenseAmount.date)
    ) {
      logs.innerHTML += `
      <li>${expenseAmount.date}</li> 
      <li>${expenseAmount.expenseName} -${expenseAmount.expenseAmount}</li>
    `;
    } else {
      logs.innerHTML += `
      <li>${expenseAmount.expenseName} -${expenseAmount.expenseAmount}</li>
    `;
    }
  });

  // Get balance
  if (localStorage.getItem('balance') === null) {
    balance.innerText = 0;
  } else {
    balance.innerText = JSON.parse(localStorage.getItem('balance'));
  }

  // Get monthly earned value
  const earnMonthCheck = JSON.parse(localStorage.getItem('earnMonth'));
  const month = new Date().toLocaleString('default', { month: 'long' });
  if (earnMonthCheck === null || earnMonthCheck[0].month !== month) {
  } else {
    console.log('56734');
    earnedDisplay.innerText = earnMonthCheck[0].earnDisp;
  }

  // Get monthly costs value
  const spendMonthCheck = JSON.parse(localStorage.getItem('spendMonth'));
  if (spendMonthCheck === null || spendMonthCheck[0].month !== month) {
    spendDisplay.innerText = 0;
  } else {
    spendDisplay.innerText = spendMonthCheck[0].spendDisp;
  }
}

// Add balance changes
function addIncome() {
  incomeToLS();
  let date = new Date().toLocaleDateString();
  console.log(incomeLog.value);
  if (inputIncome.value === '') {
    alert('Enter a valid number');
  } else {
    balance.innerText = (
      +balance.innerText + parseFloat(inputIncome.value)
    ).toFixed(2);
    earnedDisplay.innerText = (
      +earnedDisplay.innerText + parseFloat(inputIncome.value)
    ).toFixed(2);
    localStorage.setItem('balance', JSON.stringify(balance.innerText));
    earnMonthToLS();
    if (logs.innerHTML.includes(new Date().toLocaleDateString())) {
      logs.innerHTML += ` 
      <li class="log-item">${incomeLog.value} +${inputIncome.value}</li>
      `;
    } else {
      console.log('if-else started');
      logs.innerHTML += `
        <li>${date}</li> 
        <li>${incomeLog.value} +${inputIncome.value}</li>
      `;
    }
  }

  inputIncome.value = '';
  incomeLog.value = '';
}

function addExpense() {
  expenseToLS();
  let date = new Date().toLocaleDateString();
  console.log(expenseLog.value);
  if (inputExpense.value === '') {
    alert('Enter a valid number');
  } else {
    balance.innerText = (balance.innerText - inputExpense.value).toFixed(2);
    spendDisplay.innerText = (
      +spendDisplay.innerText + parseFloat(inputExpense.value)
    ).toFixed(2);
    localStorage.setItem('balance', JSON.stringify(balance.innerText));
    spendMonthToLS();
    if (logs.innerHTML.includes(new Date().toLocaleDateString())) {
      console.log('if start');
      logs.innerHTML += ` 
      <li>${expenseLog.value} -${inputExpense.value}</li>
    `;
    } else {
      logs.innerHTML += `
        <li>${date}</li> 
        <li>${expenseLog.value} -${inputExpense.value}</li>
      `;
    }
  }
  inputExpense.value = '';
  expenseLog.value = '';
}

// Add to LS
function incomeToLS() {
  // Add income logs to LS
  const incomeAmount = inputIncome.value;
  const incName = incomeLog.value;
  let date = new Date().toLocaleDateString();
  let incomeAmounts;
  if (localStorage.getItem('incomeAmounts') === null) {
    incomeAmounts = [];
  } else {
    incomeAmounts = JSON.parse(localStorage.getItem('incomeAmounts'));
  }
  incomeAmounts.push({ incName, incomeAmount, date });
  localStorage.setItem('incomeAmounts', JSON.stringify(incomeAmounts));
  alert('income saved');
}

// Add monthly earned value to LS
function earnMonthToLS() {
  // Add current month earned value to LS
  const month = new Date().toLocaleString('default', { month: 'long' });
  const earnDisp = earnedDisplay.innerText;
  let earnedMonth = [];
  earnedMonth.push({ month, earnDisp });
  localStorage.setItem('earnMonth', JSON.stringify(earnedMonth));
}

// Add monthly spend value to LS
function spendMonthToLS() {
  const month = new Date().toLocaleString('default', { month: 'long' });
  const spendDisp = spendDisplay.innerText;
  let spendMonth = [];
  spendMonth.push({ month, spendDisp });
  localStorage.setItem('spendMonth', JSON.stringify(spendMonth));
}

// Add expenses to LS
function expenseToLS() {
  const expenseAmount = inputExpense.value;
  const expenseName = expenseLog.value;
  let date = new Date().toLocaleDateString();
  let expenseAmounts;
  if (localStorage.getItem('expenseAmounts') === null) {
    expenseAmounts = [];
  } else {
    expenseAmounts = JSON.parse(localStorage.getItem('expenseAmounts'));
  }
  expenseAmounts.push({ expenseName, expenseAmount, date });
  localStorage.setItem('expenseAmounts', JSON.stringify(expenseAmounts));
  alert('expense saved');
  console.log(localStorage.getItem('expenseAmounts'));
}
