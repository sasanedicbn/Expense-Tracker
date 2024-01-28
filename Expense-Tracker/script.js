const budgetInput = document.querySelector(".budget-input");
const budgetBtn = document.querySelector(".set-budget-btn");
const budget = document.querySelector(".box-title-budget");
const balance = document.querySelector(".box-title-balance");
const expense = document.querySelector(".box-title-expenses");
const btnAdd = document.querySelector(".add-transaction-btn");
const transactionValue = document.querySelector(".transaction-cost-input");

//globalna koji mi je balance i koji mi je array expensova
//a da bi napravio taj expense moram da napravim ono new Expense
//svaki put kad dodam pravim novi expense i gurnem to u array
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
  // oko ovoga gore rad
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
class Transaction {
  constructor(name, transaction) {
    (this.transactionName = name), (this.transaction = transaction);
  }
  sendingMoney() {}
}
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
  console.log("Postavljeni budZet:", BUDGET.budget);
  console.log("Postavljeni bilans:", BUDGET.balance);
});
btnAdd.addEventListener("click", function () {
  const transactionMoney = transactionValue.value;
  if (!transactionMoney) return;
  BUDGET.addExpense(transactionMoney);
  UX.displayExpense(expense, BUDGET.getExpense());
  BUDGET.getBalance();
});
