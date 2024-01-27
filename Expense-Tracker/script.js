const budgetInput = document.querySelector(".budget-input");
const budgetBtn = document.querySelector(".set-budget-btn");
const budget = document.querySelector(".box-title-budget");
const balance = document.querySelector(".box-title-balance");
const btnAdd = document.querySelector(".add-transaction-btn");
const transactionValue = document.querySelector(".transaction-cost-input");
console.log(btnAdd);
console.log(budget);

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
  getBalance(value) {
    this.balance = this.balance - this.expenses;
  }
  getValueBudget() {
    return this.budget;
  }
  getValueBalance() {
    return this.balance;
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
  BUDGET.getBalance(budgetValue);
  UX.displayBudget(budget, BUDGET.getValueBudget());
  UX.displayBalance(balance, BUDGET.getValueBalance());
  console.log("Postavljeni budZet:", BUDGET.budget);
  console.log("Postavljeni bilans:", BUDGET.balance);
});
