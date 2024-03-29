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
  id = 1;
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
  addExpense(expenseObj) {
    this.expenseArray.push(expenseObj);
  }
  getExpense() {
    return this.expenseArray.reduce(
      (total, expense) => total + expense.number,
      0
    );
  }
  returnId() {
    return this.id++;
  }
  removeUser(id) {
    this.expenseArray = this.expenseArray.filter((user) => user.id !== id);
    console.log(this.expenseArray);
  }
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
  displayTransaction(id, name, cost, date, action) {
    const transactionList = document.querySelector(".transaction-list");

    const transactionItem = document.createElement("li");
    message.remove();
    transactionItem.innerHTML = `
    <li>
    <div class="user-container">
    <table id="customers">
  <tr>
    <th>No.</th>
    <th>Name</th>
    <th>Cost</th>
    <th>Date</th>
    <th>Delete </th>
  </tr>
  <tr>
    <td>${id}</td>
    <td>${name}</td>
    <td>$${cost}</td>
    <td>${date}</td>
    <td >
    <button class="remove-btn" data-id="${id}">❌</button></td>
  </tr>
  </div>
    `;

    transactionList.appendChild(transactionItem);
  }
  disabledElements() {}
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
  budgetInput.disabled = true;
  budgetBtn.disabled = true;
  budgetInput.style.backgroundColor = "#ccc";
  budgetBtn.style.backgroundColor = "#ccc";
  budgetInput.style.cursor = "not-allowed";
  budgetBtn.style.cursor = "not-allowed";
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

  if (!transactionNameinput) Warning("You have to input transaction name.");
  if (!transactionMoney) Warning("The transaction cannot be empty. ");
  if (transactionMoney) {
    const expenseObj = {
      id: BUDGET.returnId(),
      number: Number(transactionMoney),
    };
    BUDGET.addExpense(expenseObj);
    UX.displayExpense(expense, BUDGET.getExpense());
    BUDGET.getBalance();
    UX.displayBalance(balance, BUDGET.getValueBalance());
    UX.displayTransaction(
      expenseObj.id,
      transactionNameinput,
      transactionMoney,
      formattedDate,
      "Remove"
    );
    transactionName.value = "";
    transactionValue.value = "";
  }
  console.log(BUDGET.expenseArray);
});
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("remove-btn")) {
    const idToRemove = Number(event.target.getAttribute("data-id"));
    BUDGET.removeUser(idToRemove);
    console.log(BUDGET.expenseArray);
    // ne kontam ovo dole
    const elementToRemove = document
      .querySelector(`.remove-btn[data-id="${idToRemove}"]`)
      .closest("li");
    elementToRemove.remove();
    onDelete();
  }
});
function resetApp() {
  BUDGET.budget = 0;
  BUDGET.expenses = 0;
  BUDGET.balance = 0;
  BUDGET.expenseArray = [];

  UX.displayBudget(budget, BUDGET.getValueBudget());
  UX.displayBalance(balance, BUDGET.getValueBalance());
  UX.displayExpense(expense, BUDGET.getExpense());
  budgetInput.style.backgroundColor = "#fff";
  budgetBtn.style.backgroundColor = "#28a745";
  budgetInput.style.cursor = "pointer";
  budgetBtn.style.cursor = "pointer";
  budgetInput.disabled = false;
  budgetBtn.disabled = false;
  budgetInput.value = "";

  const transactionList = document.querySelector(".transaction-list");
  transactionList.innerHTML = "";
  Warning("You have successfully rebooted the data");
}

const restartButton = document.getElementById("restart-button");
restartButton.addEventListener("click", resetApp);
function onDelete() {
  Toastify({
    text: "You have successfully deleted the transaction!",
    duration: 3000,
    gravity: "bottom",
    position: "right",
    backgroundColor: "#27ae60",
    stopOnFocus: true,
  }).showToast();
}
function Warning(text) {
  Toastify({
    text: text,
    className: "info",
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    },
  }).showToast();
}
