// Inicjalizacja tablicy data (przykład danych)
const data = [
    { name: "Siomek101", wins: 2, additionalWins: [] },
    { name: "jherson", wins: 147, additionalWins: [[28685818, 5]] },
    // ... inne dane graczy
];

// Funkcja pobierająca dane z zewnętrznego źródła
function pobierzIDaneIZewnetrznegoZrodla() {
    const url = 'https://cors-anywhere.herokuapp.com/https://bubbleam.pl/1v1'; // Zmień na właściwy adres URL
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(text => {
            const newData = JSON.parse(text);
            newData.forEach(player => {
                const existingPlayer = data.find(item => item.name === player.name);
                if (existingPlayer) {
                    // Sprawdź, czy nowe wygrane są większe niż aktualne
                    if (player.wins > existingPlayer.wins) {
                        const difference = player.wins - existingPlayer.wins;
                        const existime = existingPlayer.additionalWins[existingPlayer.additionalWins.length - 1][0];
                        existingPlayer.additionalWins.push([Math.trunc(Date.now() / 60000) - existime, difference]);
                    }
                    existingPlayer.wins = player.wins;
                } else {
                    data.push({
                        name: player.name,
                        wins: player.wins,
                        additionalWins: [[Math.trunc(Date.now() / 60000), player.wins]],
                    });
                }
            });
            data.sort((a, b) => b.wins - a.wins);
            
            // Wyświetlanie posortowanych danych
            const outputDiv = document.getElementById('output'); 
            outputDiv.innerHTML = ''; // Wyczyść poprzednie dane
            data.forEach((player, index) => {
                const line = document.createElement('p');
                //const additionalWinsText = player.additionalWins.map(win => `${win[0]} (${win[1]}) +${win[2]}`).join(', ');
                const additionalWinsText = player.additionalWins.map(win => `(${win[0]} +${win[1]})`).join(',  ');
                line.textContent = `${index + 1}. ${player.name}: ${player.wins} ${additionalWinsText}`;
                outputDiv.appendChild(line);
            });



        })
        .catch(error => console.error('Błąd: ' + error.message));
}

// Wywołaj funkcję co minutę
setInterval(pobierzIDaneIZewnetrznegoZrodla, 10000);

