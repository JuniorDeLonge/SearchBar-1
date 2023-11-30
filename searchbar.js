function searchGoogle() {
    const searchInput = document.getElementById("searchInput");
    const searchResults = document.getElementById("searchResults");

    const query = searchInput.value;

    if (query.trim() === '') {
        alert('Por favor, insira um termo de pesquisa.');
        return false; // Impede o envio do formulário se a consulta estiver vazia
    }

    const cx = 'a31b17ca840904da5'; // Substitua 'SEU_CX' pelo ID da Pesquisa Personalizada do Google

    const apiUrl = `https://www.googleapis.com/customsearch/v1?q=${query}&cx=${cx}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displaySearchResults(data.items);
        })
        .catch(error => {
            console.error('Erro ao realizar a busca:', error);
        });

    return false; // Impede o envio do formulário
}

function displaySearchResults(results) {
    const searchResults = document.getElementById("searchResults");
    searchResults.innerHTML = '';

    if (!results || results.length === 0) {
        searchResults.innerHTML = '<p>Nenhum resultado encontrado.</p>';
        return;
    }

    results.forEach(result => {
        const resultItem = document.createElement('div');
        resultItem.innerHTML = `<h3><a href="${result.link}" target="_blank">${result.title}</a></h3><p>${result.snippet}</p>`;
        searchResults.appendChild(resultItem);
    });
}
