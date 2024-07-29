// Funkcja pobierająca dane z zewnętrznego źródła
function pobierzIDaneIZewnetrznegoZrodla() {
    const url = "https://api.codetabs.com/v1/proxy?quest=https://bubbleam.pl/1v1"; // Adres pobierania danych
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.text();                                     //dane do text
        })
        .then(text => {
            const newData = JSON.parse(text);                               
            const diagnosticsDiv = document.getElementById("diagnostics");
            newData.forEach(player => {               
                const existingPlayer = data.find(item => item.name === player.name);    //Porównywanie nowych danych z bazą data
                if (existingPlayer) {                   
                    if (player.wins > existingPlayer.wins) {                 // Sprawdź, czy nowe wygrane są większe niż aktualne
                        const winDifference = player.wins - existingPlayer.wins;
                        const currentTime = Math.trunc(Date.now() / 1000);
                        const lastWinTime =                                            //czas ostatniej wygranej
                            existingPlayer.additionalWins[
                            existingPlayer.additionalWins.length - 1
                            ][0];
                        const timeSinceLastWin = currentTime - lastWinTime;             //czas od ostatniej wygranej
                        existingPlayer.additionalWins.push([                            // aktualizowanie tablicy dodatkowych wygranych 
                            currentTime,
                            timeSinceLastWin,
                            winDifference
                        ]);

                        //Wyświetlanie zaktualizowanego gracza              
                        const updateInfo = document.createElement("p");                      
                        updateInfo.textContent = `${new Date().toLocaleTimeString()}, ${ existingPlayer.name }, Wygrane: ${ existingPlayer.wins } ` //, Nowe wygrane: +${winDifference}, ${additionalWinsText}`;
                        diagnosticsDiv.appendChild(updateInfo);                       
                    }

                    existingPlayer.wins = player.wins;
                } else {                                            //jeśli gracza nie ma w bazie
                    data.push({                                     //dopisujemy go
                        name: player.name,
                        wins: player.wins,
                        additionalWins: [[Math.trunc(Date.now() / 1000), 0, player.wins]]
                    });

                    //Wyświetlanie dodanego gracza
                    const addInfo = document.createElement("p");
                    addInfo.textContent = `N: ${new Date().toLocaleTimeString()}, ${player.name}, Wygrane: ${player.wins}`;
                    diagnosticsDiv.appendChild(addInfo);                                  
                }
            });
            data.sort((a, b) => b.wins - a.wins);

            // Wyświetlanie posortowanych danych
            sendNotification('Powiadomienie', {
                body: 'To jest powiadomienie',
                tag: 'example notify'
            });
            const outputDiv = document.getElementById("output");
            outputDiv.innerHTML = "";                                   // Wyczyść poprzednie dane
            outputDiv.textContent = new Date().toLocaleTimeString();    //Wyświetlanie aktualnego czasu
            data.forEach((player, index) => {
                const line = document.createElement("p");
                const additionalWinsText = player.additionalWins
                    .map(win => `(${new Date(win[0]*1000).toLocaleTimeString()}, ${win[1]} +${win[2]})`)
                    .join(",  ");
                line.textContent = `${index + 1}. ${player.name}: ${player.wins } ${additionalWinsText}`;
                outputDiv.appendChild(line);
            });
        })
        .catch(error => console.error("Błąd: " + error.message));
}

//Funkcja do proszenia o pozwolenie na powiadomienia
function requestNotificationPermission() {
    if (!("Notification" in window)) {          //Sprawdzamy czy przeglądarka obsługuje powiadomienia
        console.log("Ta przeglądarka nie obsługuje powiadomień");
        return;
    }
    Notification.requestPermission().then(permission => {       //Prośba o pozwolenie
        if (permission === 'granted') {
            console.log("Pozwolenie na powiadomienia zostało udzielone");
        } else {
            console.log("Pozwolenie na powiadomienia zostało odrzucone")
        }
    });
}

//Funkcja do wysyłania powiadomienia
function sendNotification(title, options) {
    if (Notification.permission === 'granted') {
        if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {       //czy Serice Worker jest zarejestrowany
            navigator.serviceWorker.ready.then(registration => {            //wysyłamy powiadomienie przez serwiceWorker
                registration.showNotification(title, options);
            });
        } else {                //Jeśli serwiceWorker niedostępny to używamy standardowego API powiadomień
            new Notification(title, options);
        }
    } else {
        console.log("Brak pozwolenia na wysyłanie powiadomień");
    }
}

//Rejestracja serwiceWorker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worer.js').then(registration => {
        console.log('Service Worker zarejestrowany z zakresem', registration.scope);
    }).catch(error => {
        console.log('Rejestracja Service Workera nie powiodła się:', error);
    });
}

requestNotificationPermission();
pobierzIDaneIZewnetrznegoZrodla();
// Wywołaj funkcję co minutę
setInterval(pobierzIDaneIZewnetrznegoZrodla, 10000);

const data = [
    { name: "Siomek101", wins: 2, additionalWins: [[1721454000, 0, 0]] },
    { name: "jherson", wins: 149, additionalWins: [[1721454000, 0, 0]] },
    { name: "Alesus", wins: 13, additionalWins: [[1721454000, 0, 0]] },
    { name: "ZlAnonymuslZ", wins: 62, additionalWins: [[1721454000, 0, 0]] },
    { name: "Yupi 2K", wins: 179, additionalWins: [[1721454000, 0, 0]] },
    { name: "D o c t o r e  YT", wins: 50, additionalWins: [[1721454000, 0, 0]] },
    { name: "Cegid", wins: 44, additionalWins: [[1721454000, 0, 0]] },
    { name: "Bliody", wins: 16, additionalWins: [[1721454000, 0, 0]] },
    { name: "Luffy  M", wins: 137, additionalWins: [[1721454000, 0, 0]] },
    { name: "Extremouserd19", wins: 18, additionalWins: [[1721454000, 0, 0]] },
    { name: "H E R C U L E S", wins: 172, additionalWins: [[1721454000, 0, 0]] },
    { name: "Jheff GM", wins: 51, additionalWins: [[1721454000, 0, 0]] },
    { name: "libreto", wins: 1, additionalWins: [[1721454000, 0, 0]] },
    { name: "IhanPro", wins: 128, additionalWins: [[1721454000, 0, 0]] },
    { name: "P O I N T", wins: 251, additionalWins: [[1721454000, 0, 0]] },
    { name: "Mefin", wins: 3, additionalWins: [[1721454000, 0, 0]] },
    { name: "miles01", wins: 36, additionalWins: [[1721454000, 0, 0]] },
    { name: "P R I N C E S A", wins: 166, additionalWins: [[1721454000, 0, 0]] },
    { name: "pcku", wins: 14, additionalWins: [[1721454000, 0, 0]] },
    { name: "Antyzks", wins: 36, additionalWins: [[1721454000, 0, 0]] },
    { name: "MasKup", wins: 1, additionalWins: [[1721454000, 0, 0]] },
    { name: "E9pato", wins: 2, additionalWins: [[1721454000, 0, 0]] },
    { name: "Release", wins: 23, additionalWins: [[1721454000, 0, 0]] },
    { name: "Rash", wins: 102, additionalWins: [[1721454000, 0, 0]] },
    { name: "F 1 R E", wins: 201, additionalWins: [[1721454000, 0, 0]] },
    { name: "kj", wins: 2, additionalWins: [[1721454000, 0, 0]] },
    { name: "jherson111", wins: 1, additionalWins: [[1721454000, 0, 0]] },
    { name: "Pexxxx", wins: 255, additionalWins: [[1721454000, 0, 0]] },
    { name: "RobiePlejsa", wins: 4, additionalWins: [[1721454000, 0, 0]] },
    { name: "ilvu", wins: 405, additionalWins: [[1721454000, 0, 0]] },
    { name: "Linus", wins: 5, additionalWins: [[1721454000, 0, 0]] },
    { name: "DEUS ABSOLUTO", wins: 147, additionalWins: [[1721454000, 0, 0]] },
    { name: "Adzce", wins: 242, additionalWins: [[1721454000, 0, 0]] },
    { name: "Yolo", wins: 435, additionalWins: [[1721454000, 0, 0]] },
    { name: "Veert", wins: 23, additionalWins: [[1721454000, 0, 0]] },
    { name: "P O L A Y", wins: 101, additionalWins: [[1721454000, 0, 0]] },
    { name: "Mendoza PL", wins: 1, additionalWins: [[1721454000, 0, 0]] },
    { name: "GGG", wins: 8, additionalWins: [[1721454000, 0, 0]] },
    { name: "julax", wins: 1, additionalWins: [[1721454000, 0, 0]] },
    { name: "Mirabelka", "wins": 169, additionalWins: [[1721454000, 0, 0], [1721764901, 310901, 1], [1721765201, 300, 1], [1721765261, 60, 1], [1721765741, 480, 1]] },
    { name: "iSora", wins: 9, additionalWins: [[1721454000, 0, 0]] },
    { name: "Sora", wins: 46, additionalWins: [[1721454000, 0, 0]] },
    { name: "BreyNeroxx", wins: 4, additionalWins: [[1721454000, 0, 0]] },
    { name: "A Y M E", wins: 100, additionalWins: [[1721454000, 0, 0]] },
    { name: "Jorge", wins: 51, additionalWins: [[1721454000, 0, 0]] },
    { name: "Akaxze", wins: 30, additionalWins: [[1721454000, 0, 0], [1722240516, 786516, 4]] },
    { name: "SiA", wins: 113, additionalWins: [[1721454000, 0, 0]] },
    { name: "S EL PACIFICO ", wins: 108, additionalWins: [[1721454000, 0, 0]] },
    { name: "SWAN", wins: 11, additionalWins: [[1721454000, 0, 0]] },
    { name: "BARON", wins: 51, additionalWins: [[1721454000, 0, 0]] },
    { name: "REMA500K", wins: 102, additionalWins: [[1721454000, 0, 0]] },
    { name: "Mugiwara", wins: 1, additionalWins: [[1721454000, 0, 0]] },
    { name: "I M P O S T O R", wins: 13, additionalWins: [[1721454000, 0, 0]] },
    { name: "WarLords", wins: 11, additionalWins: [[1721454000, 0, 0]] },
    { name: "wanssss", wins: 1, additionalWins: [[1721454000, 0, 0]] },
    { name: "skwar", wins: 1, additionalWins: [[1721454000, 0, 0]] },
    { name: "smokeasac", wins: 4, additionalWins: [[1721454000, 0, 0]] },
    { name: "Bonhart", wins: 175, additionalWins: [[1721454000, 0, 0]] },
    { name: "Mueran Perras", wins: 164, additionalWins: [[1721454000, 0, 0]] },
    { name: "Adeodatus", wins: 21, additionalWins: [[1721454000, 0, 0]] },
    { name: "jalc", wins: 16, additionalWins: [[1721454000, 0, 0]] },
    { name: "Canserbero", wins: 4, additionalWins: [[1721454000, 0, 0]] },
    { name: "Roxy 7", wins: 9, additionalWins: [[1721454000, 0, 0]] },
    { name: "Resovia", wins: 42, additionalWins: [[1721454000, 0, 0]] },
    { name: "Sonic YT", wins: 15, additionalWins: [[1721454000, 0, 0]] },
    { name: "ESCORPIO", wins: 292, additionalWins: [[1721454000, 0, 0]] },
    { name: "SXGOD", wins: 152, additionalWins: [[1721454000, 0, 0]] },
    { name: "Zzzzzzz", wins: 1, additionalWins: [[1721454000, 0, 0]] },
    { name: "AkatsukeX", wins: 12, additionalWins: [[1721454000, 0, 0]] },
    { name: "ft", wins: 4, additionalWins: [[1721454000, 0, 0]] },
    { name: "MILAGROS", wins: 147, additionalWins: [[1721454000, 0, 0], [1722240516, 786516, 4]] },
    { name: "Nabillyn", wins: 18, additionalWins: [[1721454000, 0, 0]] },
    { name: "Omega", wins: 4, additionalWins: [[1721454000, 0, 0]] },
    { name: "S M", wins: 6, additionalWins: [[1721454000, 0, 0]] },
    { name: "Lemegeton", wins: 12, additionalWins: [[1721454000, 0, 0]] },
    { name: "bubr", wins: 49, additionalWins: [[1721454000, 0, 0]] },
    { name: "YOKE NS", wins: 15, additionalWins: [[1721454000, 0, 0]] },
    { name: "Anub1s", wins: 38, additionalWins: [[1721454000, 0, 0]] },
    { name: "NeyMess", wins: 2, additionalWins: [[1721454000, 0, 0]] },
    { name: "stcom", wins: 51, additionalWins: [[1721454000, 0, 0]] },
    { name: "Br500Pro", wins: 10, additionalWins: [[1721454000, 0, 0]] },
    { name: "linaxxx", wins: 1, additionalWins: [[1721454000, 0, 0]] },
    { name: "Ellysom", wins: 3, additionalWins: [[1721454000, 0, 0]] },
    { name: "LAJA", wins: 8, additionalWins: [[1721454000, 0, 0]] },
    { name: "mafia2", wins: 50, additionalWins: [[1721454000, 0, 0]] },
    { name: "gb0", wins: 103, additionalWins: [[1721454000, 0, 0]] },
    { name: "Rapleeey", wins: 5, additionalWins: [[1721454000, 0, 0]] },
    { name: "D4RK", wins: 242, additionalWins: [[1721454000, 0, 0]] },
    { name: "WINDER", wins: 2, additionalWins: [[1721454000, 0, 0]] },
    { name: "R A M O N", wins: 74, additionalWins: [[1721454000, 0, 0]] },
    { name: "M I C H O Z O U", wins: 1, additionalWins: [[1721454000, 0, 0]] },
    { name: "ITHE KILLER", wins: 76, additionalWins: [[1721454000, 0, 0]] },
    { name: "sanik", wins: 1, additionalWins: [[1721454000, 0, 0]] },
    { name: "cerator", wins: 3, additionalWins: [[1721454000, 0, 0]] },
    { name: "SOLO BR", wins: 4, additionalWins: [[1721454000, 0, 0]] },
    { name: "C0JESTKURW4123", wins: 35, additionalWins: [[1721454000, 0, 0]] },
    { name: "KRASAVA", wins: 116, additionalWins: [[1721454000, 0, 0]] },
    { name: "catgirl", wins: 256, additionalWins: [[1721454000, 0, 0]] },
    { name: "KTP18", wins: 8, additionalWins: [[1721454000, 0, 0]] },
    { name: "S U E", wins: 14, additionalWins: [[1721454000, 0, 0]] },
    { name: "ZeusX", wins: 6, additionalWins: [[1721454000, 0, 0]] },
    { name: "M E R A S A JAGO", wins: 21, additionalWins: [[1721454000, 0, 0]] },
    { name: "KUNTOL", wins: 1, additionalWins: [[1721454000, 0, 0]] },
    { name: "R E N Z O", wins: 250, additionalWins: [[1721454000, 0, 0]] },
    { name: "adMEN", wins: 3, additionalWins: [[1721454000, 0, 0]] },
    { name: "chamik16", wins: 72, additionalWins: [[1721454000, 0, 0]] },
    { name: "Anders", wins: 51, additionalWins: [[1721454000, 0, 0]] },
    { name: "Neur", wins: 3, additionalWins: [[1721454000, 0, 0]] },
    { name: "DarkWolf07", wins: 94, additionalWins: [[1721454000, 0, 0]] },
    { name: "xQueen", wins: 5, additionalWins: [[1721454000, 0, 0]] },
    { name: "E M P E R A D O R", wins: 1, additionalWins: [[1721454000, 0, 0]] },
    { name: "P A C H A C U T E C", wins: 89, additionalWins: [[1721454000, 0, 0]] },
    { name: "Easy with you", wins: 3, additionalWins: [[1721454000, 0, 0]] },
    { name: "Laskin", wins: 1, additionalWins: [[1721454000, 0, 0]] },
    { name: "Mathia", wins: 50, additionalWins: [[1721454000, 0, 0]] },
    { name: "LiDA2", wins: 51, additionalWins: [[1721454000, 0, 0]] },
    { name: "Luk", wins: 2, additionalWins: [[1721454000, 0, 0]] },
    { name: "C O R O N A D O R", wins: 16, additionalWins: [[1721454000, 0, 0]] },
    { name: "ZTROXx", wins: 122, additionalWins: [[1721454000, 0, 0]] },
    { name: "Bankai", wins: 51, additionalWins: [[1721454000, 0, 0]] },
    { name: "SPLIT", wins: 9, additionalWins: [[1721454000, 0, 0]] },
    { name: "MrBuch", wins: 4, additionalWins: [[1721454000, 0, 0]] },
    { name: "T H A N A T O S", wins: 3, additionalWins: [[1721454000, 0, 0]] },
    { name: "Donngus", wins: 2, additionalWins: [[1721454000, 0, 0]] },
    { name: "MaxxD", wins: 50, additionalWins: [[1721454000, 0, 0]] },
    { name: "Ananta", wins: 4, additionalWins: [[1721454000, 0, 0]] },
    { name: "PROS", wins: 68, additionalWins: [[1721454000, 0, 0]] },
    { name: "bekik", wins: 1, additionalWins: [[1721454000, 0, 0]] },
    { name: "move15", wins: 1, additionalWins: [[1721454000, 0, 0]] },
    { name: "BOOBLE", wins: 47, additionalWins: [[1721454000, 0, 0]] },
    { name: "Kaynes", wins: 3, additionalWins: [[1721454000, 0, 0]] },
    { name: "j3atuhan ", wins: 14, additionalWins: [[1721454000, 0, 0]] },
    { name: "Jean", wins: 50, additionalWins: [[1721454000, 0, 0]] },
    { name: "Dragonletal", wins: 6, additionalWins: [[1721454000, 0, 0]] },
    { name: "Pompa Wodna", wins: 14, additionalWins: [[1721454000, 0, 0]] },
    { name: "Vortax", wins: 1, additionalWins: [[1721454000, 0, 0]] },
    { name: "Sujiro Kimimamy", wins: 3, additionalWins: [[1721454000, 0, 0]] },
    { name: "Dios 666", wins: 3, additionalWins: [[1721454000, 0, 0]] },
    { name: "NOB BL3X ATR", wins: 1, additionalWins: [[1721454000, 0, 0]] },
    { name: "XoX", wins: 71, additionalWins: [[1721454000, 0, 0]] },
    { name: "M y s i a", wins: 2, additionalWins: [[1721454000, 0, 0]] },
    { name: "Snoop Dogg", wins: 1, additionalWins: [[1721454000, 0, 0]] },
    { name: "MrVenq", wins: 5, additionalWins: [[1721454000, 0, 0]] },
    { name: "foloowerr", wins: 4, additionalWins: [[1721454000, 0, 0]] },
    { name: "mafios", wins: 52, additionalWins: [[1721454000, 0, 0]] },
    { name: "kys", wins: 23, additionalWins: [[1721454000, 0, 0]] },
    { name: "kloc on", wins: 8, additionalWins: [[1721454000, 0, 0]] },
    { name: "am", wins: 49, additionalWins: [[1721454000, 0, 0]] },
    { name: "motrox_zorroo", wins: 191, additionalWins: [[1721454000, 0, 0], [1721765381, 311381, 1]] },
    { name: "Kezi", wins: 31, additionalWins: [[1721454000, 0, 0]] },
    { name: "Orbi3214", wins: 25, additionalWins: [[1721454000, 0, 0]] },
    { name: "TokarPRO", wins: 4, additionalWins: [[1721454000, 0, 0]] },
    { name: "JuiceWRLD", wins: 5, additionalWins: [[1721454000, 0, 0]] },
    { name: "Papajjj", wins: 30, additionalWins: [[1721454000, 0, 0]] },
    { name: "shou", wins: 140, additionalWins: [[1721454000, 0, 0]] },
    { name: "Mazik", wins: 10, additionalWins: [[1721454000, 0, 0]] },
    { name: "Tenerife", wins: 7, additionalWins: [[1721454000, 0, 0]] },
    { name: "Kebs ON", wins: 1, additionalWins: [[1721454000, 0, 0]] },
    { name: "Feyss", wins: 61, additionalWins: [[1721454000, 0, 0]] },
    { name: "Asylum", wins: 26, additionalWins: [[1721454000, 0, 0]] },
    { name: "PyToN", wins: 2, additionalWins: [[1721454000, 0, 0]] },
    { name: "PECAI", wins: 7, additionalWins: [[1721454000, 0, 0]] },
    { name: "UNLIKERZ", wins: 89, additionalWins: [[1721454000, 0, 0]] },
    { name: "Sungaze", wins: 4, additionalWins: [[1721454000, 0, 0]] },
    { name: "Wiktoria83", wins: 31, additionalWins: [[1721454000, 0, 0]] },
    { name: "NoToBeka", wins: 43, additionalWins: [[1721454000, 0, 0]] },
    { name: "N3TI", wins: 2, additionalWins: [[1721454000, 0, 0]] },
    { name: "LetMeSomeJackpot", wins: 6, additionalWins: [[1721454000, 0, 0]] },
    { name: "bagieta", wins: 37, additionalWins: [[1721454000, 0, 0]] },
    { name: "TEAMSMASH", wins: 30, additionalWins: [[1721454000, 0, 0]] },
    { name: "raczyn", wins: 37, additionalWins: [[1721454000, 0, 0]] },
    { name: "Scream", wins: 1, additionalWins: [[1721454000, 0, 0]] },
    { name: "mikmidor1", wins: 32, additionalWins: [[1721454000, 0, 0]] },
    { name: "Mafija", wins: 3, additionalWins: [[1721454000, 0, 0]] },
    { name: "GryLol", wins: 24, additionalWins: [[1721454000, 0, 0]] },
    { name: "kareli", wins: 15, additionalWins: [[1721454000, 0, 0]] },
    { name: "Yuri Boyka YT", wins: 113, additionalWins: [[1721454000, 0, 0]] },
    { name: "J3fferscn", wins: 2, additionalWins: [[1721454000, 0, 0]] },
    { name: "Rolando", wins: 112, additionalWins: [[1721454000, 0, 0]] },
    { name: "RANZZ", wins: 61, additionalWins: [[1721454000, 0, 0]] },
    { name: "Jeanpierre", wins: 134, additionalWins: [[1721454000, 0, 0]] },
    { name: "GM Joseph", wins: 6, additionalWins: [[1721454000, 0, 0]] },
    { name: "DragonBall", wins: 3, additionalWins: [[1721454000, 0, 0]] },
    { name: "RanggaXD", wins: 111, additionalWins: [[1721454000, 0, 0]] },
    { name: "Natalaaa", wins: 8, additionalWins: [[1721454000, 0, 0]] },
    { name: "Wiedzmaa", wins: 12, additionalWins: [[1721454000, 0, 0]] },
    { name: "Sr Zx", wins: 31, additionalWins: [[1721454000, 0, 0]] },
    { name: "Malina123", wins: 5, additionalWins: [[1721454000, 0, 0]] },
    { name: "Kurbwisony", wins: 1, additionalWins: [[1721454000, 0, 0]] },
    { name: "Honorato", wins: 7, additionalWins: [[1721454000, 0, 0]] },
    { name: "GramBezMyszki", wins: 13, additionalWins: [[1721454000, 0, 0]] },
    { name: "crackdown", wins: 1, additionalWins: [[1721454000, 0, 0]] },
    { name: "dtp", wins: 55, additionalWins: [[1721454000, 0, 0]] },
    { name: "Edwin", wins: 28, additionalWins: [[1721454000, 0, 0]] },
    { name: "Patrock", wins: 2, additionalWins: [[1721454000, 0, 0]] },
    { name: "Dominik5657", wins: 1, additionalWins: [[1721454000, 0, 0]] },
    { name: "Fifika", wins: 12, additionalWins: [[1721454000, 0, 0]] },
    { name: "denyy gombka", wins: 11, additionalWins: [[1721454000, 0, 0]] },
    { name: "HitWcB", wins: 6, additionalWins: [[1721454000, 0, 0]] },
    { name: "C A Z A D O R", wins: 208, additionalWins: [[1721454000, 0, 0]] },
    { name: "Kratoss", wins: 5, additionalWins: [[1721454000, 0, 0]] },
    { name: "Kielbastian", wins: 1, additionalWins: [[1721454000, 0, 0]] },
    { name: "Richetti", wins: 1, additionalWins: [[1721454000, 0, 0]] },
    { name: "oldczubii", wins: 142, additionalWins: [[1721454000, 0, 0]] },
    { name: "Bytar", wins: 15, additionalWins: [[1721454000, 0, 0]] },
    { name: "Maciora", wins: 171, additionalWins: [[1721454000, 0, 0]] },
    { name: "Namii ", wins: 31, additionalWins: [[1721454000, 0, 0]] },
    { name: "IILERGAMERS", wins: 183, additionalWins: [[1721454000, 0, 0]] },
    { name: "srakazmaka", wins: 2, additionalWins: [[1721454000, 0, 0]] },
    { name: "Nikolsita", wins: 3, additionalWins: [[1721454000, 0, 0]] },
    { name: "Orochimaru", wins: 2, additionalWins: [[1721454000, 0, 0]] },
    { name: "KAOS", wins: 260, additionalWins: [[1721454000, 0, 0]] },
    { name: "IT", wins: 8, additionalWins: [[1721454000, 0, 0]] },
    { name: "kocvr", wins: 1, additionalWins: [[1721454000, 0, 0]] },
    { name: "420", wins: 12, additionalWins: [[1721454000, 0, 0]] },
    { name: "Magik sqad", wins: 1, additionalWins: [[1721454000, 0, 0]] },
    { name: "wolf", wins: 24, additionalWins: [[1721454000, 0, 0]] },
    { name: "HADES", wins: 104, additionalWins: [[1721454000, 0, 0]] },
    { name: "JJ ", wins: 11, additionalWins: [[1721454000, 0, 0]] },
    { name: "XpdkWi", wins: 44, additionalWins: [[1721454000, 0, 0]] },
    { name: "WiN", wins: 1, additionalWins: [[1721454000, 0, 0]] },
    { name: "Social", wins: 15, additionalWins: [[1721454000, 0, 0]] },
    { name: "Remi", wins: 12, additionalWins: [[1721454000, 0, 0]] },
    { name: "UBER EATS", wins: 121, additionalWins: [[1721454000, 0, 0]] },
    { name: "kilosuki", wins: 2, additionalWins: [[1721454000, 0, 0]] },
    { name: "F5", wins: 5, additionalWins: [[1721454000, 0, 0]] },
    { name: "IP", wins: 18, additionalWins: [[1721454000, 0, 0]] },
    { name: "xJumper", wins: 1, additionalWins: [[1721454000, 0, 0]] },
    { name: "Alicja", wins: 1, additionalWins: [[1721454000, 0, 0]] },
    { name: "Almeja SF", wins: 170, additionalWins: [[1721454000, 0, 0]] },
    { name: "Makassary", wins: 4, additionalWins: [[1721454000, 0, 0], [1721575405, 121405, 1], [1721653953, 78548, 1]] },
    { name: "Mauricio123", wins: 138, additionalWins: [[1721454000, 0, 0]] },
    { name: "Stoker", wins: 3, additionalWins: [[1721454000, 0, 0]] },
    { name: "HUHAUMxdd2d", wins: 2, additionalWins: [[1721454000, 0, 0]] },
    { name: "King YT", wins: 52, additionalWins: [[1721454000, 0, 0]] },
    { name: "V I N C E N Z O", wins: 3, additionalWins: [[1721454000, 0, 0]] },
    { name: "SNAWST", wins: 5, additionalWins: [[1721454000, 0, 0]] },
    { name: "zVeneno", wins: 1, additionalWins: [[1721454000, 0, 0]] },
    { name: "HUYBOOM", wins: 51, additionalWins: [[1721454000, 0, 0]] },
    { name: "Niunia", wins: 43, additionalWins: [[1721454000, 0, 0]] },
    { name: "AtroZ", wins: 94, additionalWins: [[1721454000, 0, 0]] },
    { name: "MrSromo1337", wins: 265, additionalWins: [[1721454000, 0, 0]] },
    { name: "GrandTurco", wins: 51, additionalWins: [[1721454000, 0, 0]] },
    { name: "Cegid11", wins: 2, additionalWins: [[1721454000, 0, 0]] },
    { name: "XxJAMES RGxX", wins: 27, additionalWins: [[1721454000, 0, 0]] },
    { name: "BRIXXXX", wins: 1, additionalWins: [[1721454000, 0, 0]] },
    { name: "kicia", wins: 31, additionalWins: [[1721454000, 0, 0]] },
    { name: "ConcordIFF", wins: 87, additionalWins: [[1721454000, 0, 0]] },
    { name: "Bestia", wins: 3, additionalWins: [[1721454000, 0, 0]] },
    { name: "BLAZE", wins: 33, additionalWins: [[1721454000, 0, 0]] },
    { name: "AMSEt", wins: 1, additionalWins: [[1721454000, 0, 0]] },
    { name: "Asylumek", wins: 50, additionalWins: [[1721454000, 0, 0]] },
    { name: "Da4e001", wins: 1, additionalWins: [[1721454000, 0, 0]] },
    { name: "ognos", wins: 2, additionalWins: [[1721454000, 0, 0]] },
    { name: "gruchaszef", wins: 5, additionalWins: [[1721454000, 0, 0]] },
    { name: "Fachowiec", wins: 8, additionalWins: [[1721454000, 0, 0]] },
    { name: "RZCW", wins: 100, additionalWins: [[1721454000, 0, 0]] },
    { name: "DarkJeff", wins: 27, additionalWins: [[1721454000, 0, 0]] },
    { name: "Jefecito12", wins: 1, additionalWins: [[1721454000, 0, 0]] },
    { name: "gozdilla", wins: 3, additionalWins: [[1721454000, 0, 0]] },
    { name: "meejciorek", wins: 152, additionalWins: [[1721454000, 0, 0]] },
    { name: "smachuddl", wins: 3, additionalWins: [[1721454000, 0, 0]] },
    { name: "lvczi", wins: 5, additionalWins: [[1721454000, 0, 0]] },
    { name: "killerkomandos", wins: 10, additionalWins: [[1721454000, 0, 0]] },
    { name: "moonraker", wins: 103, additionalWins: [[1721454000, 0, 0]] },
    { name: "WyzO", wins: 50, additionalWins: [[1721454000, 0, 0]] },
    { name: "Tiker", wins: 18, additionalWins: [[1721454000, 0, 0]] },
    { name: "dominojwp", wins: 23, additionalWins: [[1721454000, 0, 0]] },
    { name: "JAREK", wins: 50, additionalWins: [[1721454000, 0, 0]] },
    { name: "Aparatka", wins: 51, additionalWins: [[1721454000, 0, 0]] },
    { name: "OgAnt0n", wins: 1, additionalWins: [[1721454000, 0, 0]] },
    { name: "PSY", wins: 1, additionalWins: [[1721454000, 0, 0]] },
    { name: "ExIsT", wins: 2, additionalWins: [[1721454000, 0, 0]] },
    { name: "Amin K A", wins: 175, additionalWins: [[1721454000, 0, 0]] },
    { name: "llergames Zx", wins: 207, additionalWins: [[1721454000, 0, 0]] },
    { name: "Pela Gato", wins: 1, additionalWins: [[1721454000, 0, 0]] },
    { name: "LEON OG", wins: 3, additionalWins: [[1721454000, 0, 0]] },
    { name: "DRUNKZ", wins: 5, additionalWins: [[1721454000, 0, 0]] },
    { name: "riansayangsafa", wins: 1, additionalWins: [[1721454000, 0, 0]] },
    { name: "zidan 123", wins: 4, additionalWins: [[1721454000, 0, 0]] },
    { name: "RITUVLZ", wins: 227, additionalWins: [[1721454000, 0, 0]] },
    { name: "berg", wins: 7, additionalWins: [[1721454000, 0, 0]] },
    { name: "SzaulinaBombie", wins: 15, additionalWins: [[1721454000, 0, 0]] },
    { name: "http", wins: 7, additionalWins: [[1721454000, 0, 0]] },
    { name: "JhonSnc", wins: 19, additionalWins: [[1721454000, 0, 0]] },
    { name: "zuma", wins: 53, additionalWins: [[1721454000, 0, 0]] },
    { name: "koks159", wins: 152, additionalWins: [[1721454000, 0, 0]] },
    { name: "Polandzio7", wins: 5, additionalWins: [[1721454000, 0, 0]] },
    { name: "Michas7", wins: 1, additionalWins: [[1721454000, 0, 0]] },
    { name: "3", wins: 171, additionalWins: [[1721454000, 0, 0]] },
    { name: "C I N D Y", wins: 1, additionalWins: [[1721454000, 0, 0]] },
    { name: "GODboy", wins: 8, additionalWins: [[1721454000, 0, 0]] },
    { name: "Kamyk2115", wins: 1, additionalWins: [[1721454000, 0, 0]] },
    { name: "jodke", wins: 2, additionalWins: [[1721454000, 0, 0]] },
    { name: "AkbarXd", wins: 5, additionalWins: [[1721454000, 0, 0]] },
    { name: "Bunaaxxy", wins: 2, additionalWins: [[1721454000, 0, 0]] },
    { name: "Ingenieria Civil", wins: 56, additionalWins: [[1721454000, 0, 0]] },
    { name: "JUMBO FS", wins: 2, additionalWins: [[1721454000, 0, 0]] },
    { name: "NAME", wins: 50, additionalWins: [[1721454000, 0, 0]] },
    { name: "zx", wins: 51, additionalWins: [[1721454000, 0, 0]] },
    { name: "JEREMY TDH", wins: 4, additionalWins: [[1721454000, 0, 0]] },
    { name: "Kirk", wins: 70, additionalWins: [[1721454000, 0, 0]] },
    { name: "PaTuS", wins: 3, additionalWins: [[1721454000, 0, 0]] },
    { name: "Ander", wins: 56, additionalWins: [[1721454000, 0, 0]] },
    { name: "XKaWi", wins: 1, additionalWins: [[1721454000, 0, 0]] },
    { name: "PafciuBiczys", wins: 1, additionalWins: [[1721454000, 0, 0]] },
    { name: "AZIT", wins: 1, additionalWins: [[1721454000, 0, 0]] },
    { name: "E X O T I C", wins: 710, additionalWins: [[1721454000, 0, 0]] },
    { name: "xXDiOsiToXx", wins: 1, additionalWins: [[1721454000, 0, 0]] },
    { name: "N A R U T O YT", wins: 1, additionalWins: [[1721454000, 0, 0]] },
    { name: "tuli159", wins: 5, additionalWins: [[1721454000, 0, 0]] },
    { name: "BeTSoN", wins: 5, additionalWins: [[1721454000, 0, 0]] },
    { name: "peppa", wins: 151, additionalWins: [[1721454000, 0, 0]] },
    { name: "Magic Special", wins: 51, additionalWins: [[1721454000, 0, 0]] },
    { name: "soso", wins: 1, additionalWins: [[1721454000, 0, 0]] },
    { name: "S3ba", wins: 1, additionalWins: [[1721454000, 0, 0]] },
    { name: "Bargor", wins: 7, additionalWins: [[1721454000, 0, 0]] },
    { name: "megaroksana9", wins: 3, additionalWins: [[1721454000, 0, 0]] },
    { name: "Qrei", wins: 13, additionalWins: [[1721454000, 0, 0]] },
    { name: "Pawelek", wins: 2, additionalWins: [[1721454000, 0, 0]] },
    { name: "squeruu", wins: 8, additionalWins: [[1721454000, 0, 0]] },
    { name: "Erick HC", wins: 2, additionalWins: [[1721454000, 0, 0]] },
    { name: "G 4 A B I ", wins: 51, additionalWins: [[1721454000, 0, 0]] },
    { name: "GB21", wins: 35, additionalWins: [[1721454000, 0, 0]] },
    { name: "Anthony", wins: 51, additionalWins: [[1721454000, 0, 0]] },
    { name: "FxJ", wins: 10, additionalWins: [[1721454000, 0, 0]] },
    { name: "Siwy", wins: 1, additionalWins: [[1721454000, 0, 0]] },
    { name: "DrEyk", wins: 2, additionalWins: [[1721454000, 0, 0]] },
    { name: "R I T U 5 L Z", wins: 50, additionalWins: [[1721454000, 0, 0]] },
    { name: "The Sombrero", wins: 1, additionalWins: [[1721454000, 0, 0]] },
    { name: "Burak31", wins: 100, additionalWins: [[1721454000, 0, 0]] },
    { name: "gofan", wins: 50, additionalWins: [[1721454000, 0, 0]] },
    { name: "cvelox", wins: 2, additionalWins: [[1721454000, 0, 0]] },
    { name: "weteranW", wins: 30, additionalWins: [[1721454000, 0, 0]] },
    { name: "Aracne", wins: 20, additionalWins: [[1721454000, 0, 0]] },
    { name: "Jenty ", wins: 3, additionalWins: [[1721454000, 0, 0]] },
    { name: "M0nst3r3k", wins: 45, additionalWins: [[1721454000, 0, 0]] },
    { name: "FALLENTHESHADOWW", wins: 5, additionalWins: [[1721454000, 0, 0]] },
    { name: "FAUZAN", wins: 202, additionalWins: [[1721454000, 0, 0]] },
    { name: "CHAMPIONS", wins: 27, additionalWins: [[1721454000, 0, 0]] },
    { name: "SKILL JEDYNY", wins: 7, additionalWins: [[1721454000, 0, 0]] },
    { name: "R O B L O X", wins: 46, additionalWins: [[1721454000, 0, 0]] },
    { name: "WEzyr", wins: 137, additionalWins: [[1721454000, 0, 0]] },
    { name: "wemzyes", wins: 2, additionalWins: [[1721454000, 0, 0]] },
    { name: "balinafali", wins: 131, additionalWins: [[1721454000, 0, 0]] },
    { name: "Gondorianv2", wins: 4, additionalWins: [[1721454000, 0, 0]] },
    { name: "REIVAJ", wins: 4, additionalWins: [[1721454000, 0, 0]] },
    { name: "Rowerowymaks", wins: 1, additionalWins: [[1721454000, 0, 0]] },
    { name: "Carlos Bonzano 1", wins: 51, additionalWins: [[1721454000, 0, 0]] },
    { name: "Gondorian", wins: 4, additionalWins: [[1721454000, 0, 0]] },
    { name: "M E T A D O R ", wins: 189, additionalWins: [[1721454000, 0, 0]] },
    { name: "Charles Chaplin", wins: 51, additionalWins: [[1721454000, 0, 0]] },
    { name: "MITSUBISHI", wins: 5, additionalWins: [[1721454000, 0, 0]] },
    { name: "Arzsq", "wins": 8, additionalWins: [[1721454000, 0, 0], [1721454080, 80, 1], [1721454140, 60, 2], [1721454200, 60, 1], [1721454260, 60, 2], [1721454320, 120, 2]] },
    { name: "DILZX", wins: 3, additionalWins: [[1721506940, 0, 1], [1721507000, 60, 2]] },
    { name: "LowisLZY", "wins": 3, additionalWins: [[1721555060, 0, 1], [1721555120, 60, 1], [1721580522, 25402, 1]] },
    { name: "Gracia", "wins": 8, additionalWins: [[1721653953, 0, 5], [1721700963, 47010, 1], [1721701323, 360, 1], [1722240516, 539193, 1]] },
    { name: "AxEsO", "wins": 22, additionalWins: [[1721653953, 0, 4], [1721667903, 13950, 1], [1721667963, 60, 1], [1721668023, 60, 1], [1721668083, 60, 2], [1721668143, 60, 2], [1721668203, 60, 1], [1721668263, 60, 1], [1721668443, 180, 1], [1721668743, 300, 1], [1721668923, 180, 1]] },
    { name: "Akattsuki", "wins": 1, additionalWins: [[1721828777, 0, 1]] },
    { name: "Shania ", "wins": 2, additionalWins: [[1721828777, 0, 1]] },
    { name: "BANYAK BACOT", "wins": 96, additionalWins: [[1722071669, 0, 35], [1722240516, 168847, 61]] },
    { name: "P O L Y T R O N", "wins": 101, additionalWins: [[1722071669, 0, 43], [1722082621, 10952, 1], [1722082681, 60, 4], [1722082741, 60, 1], [1722082801, 60, 4], [1722082861, 60, 3], [1722082921, 60, 3], [1722082981, 60, 4], [1722083041, 60, 4], [1722083101, 60, 3], [1722083161, 60, 4], [1722083221, 60, 4], [1722083281, 60, 4], [1722083341, 60, 3], [1722083401, 60, 3], [1722083461, 60, 4], [1722083521, 60, 2], [1722083581, 60, 3], [1722083641, 60, 3], [1722083761, 120, 1]] },
    { name: "MASUKTV", "wins": 55, additionalWins: [[1722071669, 0, 15], [1722083641, 11972, 1], [1722083701, 60, 3], [1722083761, 60, 2], [1722110761, 27000, 2], [1722110821, 60, 4], [1722110881, 60, 2], [1722110941, 60, 3], [1722111001, 60, 3], [1722111061, 60, 4], [1722111073, 12, 1], [1722111094, 21, 1], [1722111114, 20, 1], [1722111134, 20, 1], [1722111181, 47, 2], [1722111241, 60, 4], [1722111295, 54, 1], [1722240883, 129588, 2], [1722240943, 60, 2], [1722241003, 60, 1]] },
    { name: "Mayiq", "wins": 6, additionalWins: [[1722240516, 0, 6]] }
];
