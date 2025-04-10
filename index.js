// Currency denominations in descending order (notes and coins)
const denomination = [500, 200, 100, 50, 20, 10, 5, 2, 1];

// DOM elements
const calculateBtn = document.getElementById('calculate-btn');
const billAmountInput = document.getElementById('bill-amount');
const paidAmountInput = document.getElementById('paid-amount');
const errorElement = document.getElementById('error-message');
const resultElement = document.getElementById('result');
const totalChangeElement = document.getElementById('total-change');
const changeBodyElement = document.getElementById('change-body');
const totalNotesElement = document.getElementById('total-notes');
const totalAmountElement = document.getElementById('total-amount');

// Event listener for calculate button
calculateBtn.addEventListener('click', calculateChange);

// Main calculation function

function calculateChange()
{
    // Get input values.
    const billAmount = parseFloat(billAmountInput.value);
    const paidAmount = parseFloat(paidAmountInput.value);

    // Reset previous results and errors.
    errorElement.textContent = '';
    errorElement.style.display = 'none';
    resultElement.style.display = 'none';
    
    // Validate input values.
    if (isNaN(billAmount))
    {
        showError('Please enter a valid amount.')
        return;
    }

    if (isNaN(paidAmount))
    {
        showError('Please enter a valid amount.');
        return;
    }

    if (billAmount <= 0)
    {
        showError('Bill amount must be greater than zero.');
        return;
    }

    if (paidAmount <= 0)
    {
        showError('Paid amount must be greater than zero.');
        return;
    }

    if (paidAmount < billAmount)
    {
        showError('Paid amount must be greater than or equal to bill amount.');
        return;
    }

    // calculate change
    let change = paidAmount - billAmount;
    
    // if no change needed
    if (change === 0)
    {
        showError('No change needed', false);
        return;
    }

    // calculate denominations
    const changeBreakdown = calculateDenominations(change);
    
    // Display results

}

// calculate change breakdown
function calculateDenominations(change)
{
    
}

// show error message
function showError(message, isError = true)
{
    errorElement.textContent = message;
    errorElement.style.display = 'block';

    if (isError)
    {
        errorElement.style.backgroundColor = '#fadbd8';
        errorElement.style.color= '#e74c3c';
    }
    else
    {
        errorElement.style.backgroundColor = '#d4edda';
        errorElement.style.color = '#155724';
    }
}