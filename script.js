// Get the form and expenses list elements from the HTML
const form = document.getElementById('expense-form');
const expensesList = document.getElementById('expenses-list');

// Initialize the expenses array from local storage, or create an empty array if it doesn't exist yet
let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

// Function to display the expenses list in the HTML
function displayExpenses() {
  expensesList.innerHTML = '';

  // Loop through the expenses array and create a new HTML element for each expense
  expenses.forEach((expense, index) => {
    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `
      <div class="card-body">
        <h5 class="card-title">${expense.name}</h5>
        <p class="card-text">$${expense.amount}</p>
        <button type="button" class="btn btn-danger delete" data-index="${index}">Delete</button>
      </div>
    `;
    expensesList.appendChild(div);
  });

  // Add an event listener to each delete button to remove the corresponding expense from the array and local storage
  const deleteButtons = document.querySelectorAll('.delete');
  deleteButtons.forEach(button => {
    button.addEventListener('click', () => {
      expenses.splice(button.dataset.index, 1);
      localStorage.setItem('expenses', JSON.stringify(expenses));
      displayExpenses();
    });
  });
}

// Add an event listener to the form submission
form.addEventListener('submit', (event) => {
  event.preventDefault();

  // Get the input values and create a new expense object
  const name = document.getElementById('name').value;
  const amount = document.getElementById('amount').value;
  const expense = { name, amount };

  //
