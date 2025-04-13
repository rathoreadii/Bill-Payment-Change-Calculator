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
    displayResults(change, changeBreakdown);
}

// calculate change breakdown
function calculateDenominations(change)
{
    const breakdown = {};
    let remainingChange = change;

    for (const denom of denomination)
    {
        if (remainingChange >= denom)
        {
            const count = Math.floor(remainingChange / denom);
            breakdown[denom] = count;
            remainingChange = remainingChange % denom;
        }
    }
    console.log(breakdown);
    return breakdown;
}

// Displaying results in a table
function displayResults(totalChange, breakdown)
{
    // clear previous result
    changeBodyElement.innerHTML = '';

    //set total change
    totalChangeElement.innerHTML = totalChange.toFixed(2);

    // calculate total
    let totalNotes = 0;
    let totalAmount = 0;

    // Add rows for each denomination
    for (const denom of denomination)
    {
        if (breakdown[denom])
        {
            const row = document.createElement('tr');
            
            // denomination cell
            const denomCell = document.createElement('td');
            denomCell.textContent = `₹${denom}`;
            row.appendChild(denomCell);

            // count cell
            const countCell = document.createElement('td');
            countCell.textContent = breakdown[denom];
            row.appendChild(countCell);

            // amount cell
            const amount= denom * breakdown[denom];
            const amountCell = document.createElement('td');
            amountCell.textContent = `₹${amount.toFixed(2)}`;
            row.appendChild(amountCell);

            changeBodyElement.appendChild(row);

            // update total
            totalNotes += breakdown[denom];
            totalAmount+= amount;
        }
    }

    // set totals
    totalNotesElement.innerHTML = totalNotes;
    totalAmountElement.innerHTML = `₹${totalAmount.toFixed(2)}`;

    // show result
    resultElement.style.display = 'block';
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

// event listener for enter key
document.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        calculateChange();
    }
});