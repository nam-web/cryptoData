// Fetch data using .then
function fetchDataUsingThen() {
    fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false')
        .then(response => response.json())
        .then(data => {
            originalData = data;
            renderData(data);
        })
        .catch(error => console.error('Error fetching data:', error));
}

// Fetch data using async/await
async function fetchDataUsingAsyncAwait() {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false');
        const data = await response.json();
        originalData = data;
        renderData(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Render data in the table
function renderData(data) {
    const tbody = document.getElementById('cryptoTable').getElementsByTagName('tbody')[0];
    tbody.innerHTML = ''; // Clear existing data
    data.forEach(coin => {
        const row = tbody.insertRow();
        const percentageChangeClass = coin.price_change_percentage_24h >= 0 ? 'green' : 'red';
        row.innerHTML = `
            <td><img src="${coin.image}" alt="${coin.name}" width="30"></td>
            <td>${coin.name}</td>
            <td>${coin.symbol.toUpperCase()}</td>
            <td>$${coin.current_price}</td>
            <td>$${coin.total_volume.toLocaleString()}</td>
            <td class="${percentageChangeClass}">${coin.price_change_percentage_24h.toFixed(2)}%</td>
            <td>$${coin.market_cap.toLocaleString()}</td>`;
    });
}

// Search data
function searchData() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const filteredData = originalData.filter(coin => 
        coin.name.toLowerCase().includes(input) || 
        coin.symbol.toLowerCase().includes(input)
    );
    renderData(filteredData);
}

// Sort data
function sortData(criteria) {
    let sortedData = [];
    if (criteria === 'market_cap') {
        sortedData = [...originalData].sort((a, b) => b.market_cap - a.market_cap);
    } else if (criteria === 'percentage_change') {
        sortedData = [...originalData].sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h);
    }
    renderData(sortedData);
}

// Initialize data
let originalData = [];

// Fetch and render data on page load
fetchDataUsingAsyncAwait();
