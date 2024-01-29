const budgetInput = document.querySelector(".budget-input");
const budgetBtn = document.querySelector(".set-budget-btn");
const budget = document.querySelector(".box-title-budget");
const balance = document.querySelector(".box-title-balance");
const expense = document.querySelector(".box-title-expenses");
const btnAdd = document.querySelector(".add-transaction-btn");
const transactionValue = document.querySelector(".transaction-cost-input");
const transactionName = document.querySelector(".transaction-name-input");
const message = document.querySelector(".message-transaction");

class Budget {
  constructor() {
    this.budget = 0;
    this.expenses = 0;
    this.balance = 0;
    this.expenseArray = [];
  }

  getBudget(value) {
    return (this.budget = Number(value));
  }
  getBalance() {
    this.balance = this.budget - this.getExpense();
  }

  getValueBudget() {
    return this.budget;
  }
  getValueBalance() {
    return this.balance;
  }
  addExpense(expense) {
    this.expenseArray.push(Number(expense));
  }
  getExpense() {
    return this.expenseArray.reduce((total, expense) => total + expense, 0);
  }
}
// class Transaction {
//   constructor(name, transaction) {
//     (this.transactionName = name), (this.transaction = transaction);
//   }
//   sendingMoney() {}
// }
// class Transactions {
//   currentDate = new Date();
//   formattedDate = currentDate.toLocaleDateString("en-US", {
//     day: "numeric",
//     month: "long",
//     year: "numeric",
//   });
//   constructor(id, name, cost, action) {
//     this.id = id;
//     this.name = name;
//     this.cost = cost;
//     this.date = this.formattedDate;
//     this.action = action;
//     this.data = []
//   }
//   usersData(){
//     {}
//   }
// }
class Ux {
  displayBudget(element, budget) {
    element.textContent = `$${budget}`;
  }
  displayBalance(element, balance) {
    element.textContent = `$${balance}`;
  }
  displayExpense(element, expense) {
    element.textContent = `$${expense}`;
  }
  displayTransaction(id, name, cost, date, action) {
    const transactionList = document.querySelector(".transaction-list");

    const transactionItem = document.createElement("li");
    message.remove();
    transactionItem.innerHTML = `
   
    `;

    transactionList.appendChild(transactionItem);
  }
}
const BUDGET = new Budget();
const UX = new Ux();

budgetBtn.addEventListener("click", function () {
  console.log(budgetInput.value);
  const budgetValue = budgetInput.value;
  if (!budgetValue) {
    Toastify({
      text: "The budget cannot be empty. ",
      className: "info",
      style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
      },
    }).showToast();
  }
  BUDGET.getBudget(budgetValue);
  BUDGET.getBalance();
  UX.displayBudget(budget, BUDGET.getValueBudget());
  UX.displayBalance(balance, BUDGET.getValueBalance());
});
btnAdd.addEventListener("click", function () {
  const transactionNameinput = transactionName.value;
  const transactionMoney = transactionValue.value;
  let id;
  let currentDate = new Date();
  let formattedDate = currentDate.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  if (!transactionNameinput)
    Toastify({
      text: "You have to input transaction name. ",
      className: "info",
      style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
      },
    }).showToast();
  if (!transactionMoney)
    Toastify({
      text: "The transaction cannot be empty. ",
      className: "info",
      style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
      },
    }).showToast();

  BUDGET.addExpense(transactionMoney);
  UX.displayExpense(expense, BUDGET.getExpense());
  BUDGET.getBalance();
  UX.displayBalance(balance, BUDGET.getValueBalance());

  UX.displayTransaction(
    id++,
    transactionNameinput,
    transactionMoney,
    formattedDate,
    "Remove"
  );
});
