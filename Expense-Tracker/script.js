const budgetInput = document.querySelector(".budget-input");
const budgetBtn = document.querySelector(".set-budget-btn");

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
  // addExpense(){
  //     this.expenseArray.push(this.expenses)
  // }
  getBudget(value) {
    this.budget = Number(value);
  }
  getBalance(value) {
    this.balance = Number(value);
  }
}
// const UX = {
//     displayBudget(){

//     }
// }
const BUDGET = new Budget();

budgetBtn.addEventListener("click", function () {
  console.log(budgetInput.value);
  const budgetValue = budgetInput.value;
});
