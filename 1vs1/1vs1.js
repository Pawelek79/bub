
// Funkcja pobierająca dane z zewnętrznego źródła
function pobierzIDaneIZewnetrznegoZrodla() {
    const url = 'https://api.codetabs.com/v1/proxy?quest=https://bubbleam.pl/1v1'; // Zmień na właściwy adres URL
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
                        existingPlayer.additionalWins.push([Math.trunc(Date.now() / 1000) - existime, difference]);
                    }
                    existingPlayer.wins = player.wins;
                } else {
                    data.push({
                        name: player.name,
                        wins: player.wins,
                        additionalWins: [[Math.trunc(Date.now() / 1000), player.wins]],
                    });
                }
            });
            data.sort((a, b) => b.wins - a.wins);
            
            // Wyświetlanie posortowanych danych
            const outputDiv = document.getElementById('output'); 
            outputDiv.innerHTML = ''; // Wyczyść poprzednie dane
            outputDiv.textContent = new Date().toLocaleTimeString();  //Wyświetlanie aktualnego czasu
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
    pobierzIDaneIZewnetrznegoZrodla();
// Wywołaj funkcję co minutę
setInterval(pobierzIDaneIZewnetrznegoZrodla, 10000);

const data = [{ "name": "Siomek101", "wins": 2, additionalWins: [] }, { "name": "jherson", "wins": 149, additionalWins: [] },
    { "name": "Alesus", "wins": 13, additionalWins: [] }, { "name": "ZlAnonymuslZ", "wins": 62, additionalWins: [] },
    { "name": "Yupi 2K", "wins": 179, additionalWins: [] }, { "name": "D o c t o r e  YT", "wins": 50, additionalWins: [] },
    { "name": "Cegid", "wins": 44, additionalWins: [] }, { "name": "Bliody", "wins": 16, additionalWins: [] },
    { "name": "Luffy  M", "wins": 137, additionalWins: [] }, { "name": "Extremouserd19", "wins": 18, additionalWins: [] },
    { "name": "H E R C U L E S", "wins": 172, additionalWins: [] }, { "name": "Jheff GM", "wins": 51, additionalWins: [] },
    { "name": "libreto", "wins": 1, additionalWins: [] }, { "name": "IhanPro", "wins": 128, additionalWins: [] },
    { "name": "P O I N T", "wins": 251, additionalWins: [] }, { "name": "Mefin", "wins": 3, additionalWins: [] },
    { "name": "miles01", "wins": 36, additionalWins: [] }, { "name": "P R I N C E S A", "wins": 166, additionalWins: [] },
    { "name": "pcku", "wins": 14, additionalWins: [] }, { "name": "Antyzks", "wins": 36, additionalWins: [] },
    { "name": "MasKup", "wins": 1, additionalWins: [] }, { "name": "E9pato", "wins": 2, additionalWins: [] },
    { "name": "Release", "wins": 23, additionalWins: [] }, { "name": "Rash", "wins": 102, additionalWins: [] },
    { "name": "F 1 R E", "wins": 201, additionalWins: [] }, { "name": "kj", "wins": 2, additionalWins: [] },
    { "name": "jherson111", "wins": 1, additionalWins: [] }, { "name": "Pexxxx", "wins": 255, additionalWins: [] },
    { "name": "RobiePlejsa", "wins": 4, additionalWins: [] }, { "name": "ilvu", "wins": 405, additionalWins: [] },
    { "name": "Linus", "wins": 5, additionalWins: [] }, { "name": "DEUS ABSOLUTO", "wins": 147, additionalWins: [] },
    { "name": "Adzce", "wins": 242, additionalWins: [] }, { "name": "Yolo", "wins": 435, additionalWins: [] },
    { "name": "Veert", "wins": 23, additionalWins: [] }, { "name": "P O L A Y", "wins": 101, additionalWins: [] },
    { "name": "Mendoza PL", "wins": 1, additionalWins: [] }, { "name": "GGG", "wins": 8, additionalWins: [] },
    { "name": "julax", "wins": 1, additionalWins: [] }, { "name": "Mirabelka", "wins": 165, additionalWins: [] },
    { "name": "iSora", "wins": 9, additionalWins: [] }, { "name": "Sora", "wins": 46, additionalWins: [] },
    { "name": "BreyNeroxx", "wins": 4, additionalWins: [] }, { "name": "A Y M E", "wins": 100, additionalWins: [] },
    { "name": "Jorge", "wins": 51, additionalWins: [] }, { "name": "Akaxze", "wins": 26, additionalWins: [] },
    { "name": "SiA", "wins": 113, additionalWins: [] }, { "name": "S EL PACIFICO ", "wins": 108, additionalWins: [] },
    { "name": "SWAN", "wins": 11, additionalWins: [] }, { "name": "BARON", "wins": 51, additionalWins: [] },
    { "name": "REMA500K", "wins": 102, additionalWins: [] }, { "name": "Mugiwara", "wins": 1, additionalWins: [] },
    { "name": "I M P O S T O R", "wins": 13, additionalWins: [] }, { "name": "WarLords", "wins": 11, additionalWins: [] },
    { "name": "wanssss", "wins": 1, additionalWins: [] }, { "name": "skwar", "wins": 1, additionalWins: [] },
    { "name": "smokeasac", "wins": 4, additionalWins: [] }, { "name": "Bonhart", "wins": 175, additionalWins: [] },
    { "name": "Mueran Perras", "wins": 164, additionalWins: [] }, { "name": "Adeodatus", "wins": 21, additionalWins: [] },
    { "name": "jalc", "wins": 16, additionalWins: [] }, { "name": "Canserbero", "wins": 4, additionalWins: [] },
    { "name": "Roxy 7", "wins": 9, additionalWins: [] }, { "name": "Resovia", "wins": 42, additionalWins: [] },
    { "name": "Sonic YT", "wins": 15, additionalWins: [] }, { "name": "ESCORPIO", "wins": 292, additionalWins: [] },
    { "name": "SXGOD", "wins": 152, additionalWins: [] }, { "name": "Zzzzzzz", "wins": 1, additionalWins: [] },
    { "name": "AkatsukeX", "wins": 12, additionalWins: [] }, { "name": "ft", "wins": 4, additionalWins: [] },
    { "name": "MILAGROS", "wins": 143, additionalWins: [] }, { "name": "Nabillyn", "wins": 18, additionalWins: [] },
    { "name": "Omega", "wins": 4, additionalWins: [] }, { "name": "S M", "wins": 6, additionalWins: [] },
    { "name": "Lemegeton", "wins": 12, additionalWins: [] }, { "name": "bubr", "wins": 49, additionalWins: [] },
    { "name": "YOKE NS", "wins": 15, additionalWins: [] }, { "name": "Anub1s", "wins": 38, additionalWins: [] },
    { "name": "NeyMess", "wins": 2, additionalWins: [] }, { "name": "stcom", "wins": 51, additionalWins: [] },
    { "name": "Br500Pro", "wins": 10, additionalWins: [] }, { "name": "linaxxx", "wins": 1, additionalWins: [] },
    { "name": "Ellysom", "wins": 3, additionalWins: [] }, { "name": "LAJA", "wins": 8, additionalWins: [] },
    { "name": "mafia2", "wins": 50, additionalWins: [] }, { "name": "gb0", "wins": 103, additionalWins: [] },
    { "name": "Rapleeey", "wins": 5, additionalWins: [] }, { "name": "D4RK", "wins": 242, additionalWins: [] },
    { "name": "WINDER", "wins": 2, additionalWins: [] }, { "name": "R A M O N", "wins": 74, additionalWins: [] },
    { "name": "M I C H O Z O U", "wins": 1, additionalWins: [] }, { "name": "ITHE KILLER", "wins": 76, additionalWins: [] },
    { "name": "sanik", "wins": 1, additionalWins: [] }, { "name": "cerator", "wins": 3, additionalWins: [] },
    { "name": "SOLO BR", "wins": 4, additionalWins: [] }, { "name": "C0JESTKURW4123", "wins": 35, additionalWins: [] },
    { "name": "KRASAVA", "wins": 116, additionalWins: [] }, { "name": "catgirl", "wins": 256, additionalWins: [] },
    { "name": "KTP18", "wins": 8, additionalWins: [] }, { "name": "S U E", "wins": 14, additionalWins: [] },
    { "name": "ZeusX", "wins": 6, additionalWins: [] }, { "name": "M E R A S A JAGO", "wins": 21, additionalWins: [] },
    { "name": "KUNTOL", "wins": 1, additionalWins: [] }, { "name": "R E N Z O", "wins": 250, additionalWins: [] },
    { "name": "adMEN", "wins": 3, additionalWins: [] }, { "name": "chamik16", "wins": 72, additionalWins: [] },
    { "name": "Anders", "wins": 51, additionalWins: [] }, { "name": "Neur", "wins": 3, additionalWins: [] },
    { "name": "DarkWolf07", "wins": 94, additionalWins: [] }, { "name": "xQueen", "wins": 5, additionalWins: [] },
    { "name": "E M P E R A D O R", "wins": 1, additionalWins: [] }, { "name": "P A C H A C U T E C", "wins": 89, additionalWins: [] },
    { "name": "Easy with you", "wins": 3, additionalWins: [] }, { "name": "Laskin", "wins": 1, additionalWins: [] },
    { "name": "Mathia", "wins": 50, additionalWins: [] }, { "name": "LiDA2", "wins": 51, additionalWins: [] },
    { "name": "Luk", "wins": 2, additionalWins: [] }, { "name": "C O R O N A D O R", "wins": 16, additionalWins: [] },
    { "name": "ZTROXx", "wins": 122, additionalWins: [] }, { "name": "Bankai", "wins": 51, additionalWins: [] },
    { "name": "SPLIT", "wins": 9, additionalWins: [] }, { "name": "MrBuch", "wins": 4, additionalWins: [] },
    { "name": "T H A N A T O S", "wins": 3, additionalWins: [] }, { "name": "Donngus", "wins": 2, additionalWins: [] },
    { "name": "MaxxD", "wins": 50, additionalWins: [] }, { "name": "Ananta", "wins": 4, additionalWins: [] },
    { "name": "PROS", "wins": 68, additionalWins: [] }, { "name": "bekik", "wins": 1, additionalWins: [] },
    { "name": "move15", "wins": 1, additionalWins: [] }, { "name": "BOOBLE", "wins": 47, additionalWins: [] },
    { "name": "Kaynes", "wins": 3, additionalWins: [] }, { "name": "j3atuhan ", "wins": 14, additionalWins: [] },
    { "name": "Jean", "wins": 50, additionalWins: [] }, { "name": "Dragonletal", "wins": 6, additionalWins: [] },
    { "name": "Pompa Wodna", "wins": 14, additionalWins: [] }, { "name": "Vortax", "wins": 1, additionalWins: [] },
    { "name": "Sujiro Kimimamy", "wins": 3, additionalWins: [] }, { "name": "Dios 666", "wins": 3, additionalWins: [] },
    { "name": "NOB BL3X ATR", "wins": 1, additionalWins: [] }, { "name": "XoX", "wins": 71, additionalWins: [] },
    { "name": "M y s i a", "wins": 2, additionalWins: [] }, { "name": "Snoop Dogg", "wins": 1, additionalWins: [] },
    { "name": "MrVenq", "wins": 5, additionalWins: [] }, { "name": "foloowerr", "wins": 4, additionalWins: [] },
    { "name": "mafios", "wins": 52, additionalWins: [] }, { "name": "kys", "wins": 23, additionalWins: [] },
    { "name": "kloc on", "wins": 8, additionalWins: [] }, { "name": "am", "wins": 49, additionalWins: [] },
    { "name": "motrox_zorroo", "wins": 190, additionalWins: [] }, { "name": "Kezi", "wins": 31, additionalWins: [] },
    { "name": "Orbi3214", "wins": 25, additionalWins: [] }, { "name": "TokarPRO", "wins": 4, additionalWins: [] },
    { "name": "JuiceWRLD", "wins": 5, additionalWins: [] }, { "name": "Papajjj", "wins": 30, additionalWins: [] },
    { "name": "shou", "wins": 140, additionalWins: [] }, { "name": "Mazik", "wins": 10, additionalWins: [] },
    { "name": "Tenerife", "wins": 7, additionalWins: [] }, { "name": "Kebs ON", "wins": 1, additionalWins: [] },
    { "name": "Feyss", "wins": 61, additionalWins: [] }, { "name": "Asylum", "wins": 26, additionalWins: [] },
    { "name": "PyToN", "wins": 2, additionalWins: [] }, { "name": "PECAI", "wins": 7, additionalWins: [] },
    { "name": "UNLIKERZ", "wins": 89, additionalWins: [] }, { "name": "Sungaze", "wins": 4, additionalWins: [] },
    { "name": "Wiktoria83", "wins": 31, additionalWins: [] }, { "name": "NoToBeka", "wins": 43, additionalWins: [] },
    { "name": "N3TI", "wins": 2, additionalWins: [] }, { "name": "LetMeSomeJackpot", "wins": 6, additionalWins: [] },
    { "name": "bagieta", "wins": 37, additionalWins: [] }, { "name": "TEAMSMASH", "wins": 30, additionalWins: [] },
    { "name": "raczyn", "wins": 37, additionalWins: [] }, { "name": "Scream", "wins": 1, additionalWins: [] },
    { "name": "mikmidor1", "wins": 32, additionalWins: [] }, { "name": "Mafija", "wins": 3, additionalWins: [] },
    { "name": "GryLol", "wins": 24, additionalWins: [] }, { "name": "kareli", "wins": 15, additionalWins: [] },
    { "name": "Yuri Boyka YT", "wins": 113, additionalWins: [] }, { "name": "J3fferscn", "wins": 2, additionalWins: [] },
    { "name": "Rolando", "wins": 109, additionalWins: [] }, { "name": "RANZZ", "wins": 61, additionalWins: [] },
    { "name": "Jeanpierre", "wins": 134, additionalWins: [] }, { "name": "GM Joseph", "wins": 6, additionalWins: [] },
    { "name": "DragonBall", "wins": 3, additionalWins: [] }, { "name": "RanggaXD", "wins": 111, additionalWins: [] },
    { "name": "Natalaaa", "wins": 8, additionalWins: [] }, { "name": "Wiedzmaa", "wins": 12, additionalWins: [] },
    { "name": "Sr Zx", "wins": 31, additionalWins: [] }, { "name": "Malina123", "wins": 5, additionalWins: [] },
    { "name": "Kurbwisony", "wins": 1, additionalWins: [] }, { "name": "Honorato", "wins": 7, additionalWins: [] },
    { "name": "GramBezMyszki", "wins": 13, additionalWins: [] }, { "name": "crackdown", "wins": 1, additionalWins: [] },
    { "name": "dtp", "wins": 55, additionalWins: [] }, { "name": "Edwin", "wins": 28, additionalWins: [] },
    { "name": "Patrock", "wins": 2, additionalWins: [] }, { "name": "Dominik5657", "wins": 1, additionalWins: [] },
    { "name": "Fifika", "wins": 12, additionalWins: [] }, { "name": "denyy gombka", "wins": 11, additionalWins: [] },
    { "name": "HitWcB", "wins": 6, additionalWins: [] }, { "name": "C A Z A D O R", "wins": 208, additionalWins: [] },
    { "name": "Kratoss", "wins": 5, additionalWins: [] }, { "name": "Kielbastian", "wins": 1, additionalWins: [] },
    { "name": "Richetti", "wins": 1, additionalWins: [] }, { "name": "oldczubii", "wins": 142, additionalWins: [] },
    { "name": "Bytar", "wins": 15, additionalWins: [] }, { "name": "Maciora", "wins": 171, additionalWins: [] },
    { "name": "Namii ", "wins": 31, additionalWins: [] }, { "name": "IILERGAMERS", "wins": 183, additionalWins: [] },
    { "name": "srakazmaka", "wins": 2, additionalWins: [] }, { "name": "Nikolsita", "wins": 3, additionalWins: [] },
    { "name": "Orochimaru", "wins": 2, additionalWins: [] }, { "name": "KAOS", "wins": 260, additionalWins: [] },
    { "name": "IT", "wins": 8, additionalWins: [] }, { "name": "kocvr", "wins": 1, additionalWins: [] },
    { "name": "420", "wins": 12, additionalWins: [] }, { "name": "Magik sqad", "wins": 1, additionalWins: [] },
    { "name": "wolf", "wins": 24, additionalWins: [] }, { "name": "HADES", "wins": 104, additionalWins: [] },
    { "name": "JJ ", "wins": 11, additionalWins: [] }, { "name": "XpdkWi", "wins": 44, additionalWins: [] },
    { "name": "WiN", "wins": 1, additionalWins: [] }, { "name": "Social", "wins": 15, additionalWins: [] },
    { "name": "Remi", "wins": 12, additionalWins: [] }, { "name": "UBER EATS", "wins": 121, additionalWins: [] },
    { "name": "kilosuki", "wins": 2, additionalWins: [] }, { "name": "F5", "wins": 5, additionalWins: [] },
    { "name": "IP", "wins": 18, additionalWins: [] }, { "name": "xJumper", "wins": 1, additionalWins: [] },
    { "name": "Alicja", "wins": 1, additionalWins: [] }, { "name": "Almeja SF", "wins": 170, additionalWins: [] },
    { "name": "Makassary", "wins": 3, additionalWins: [] }, { "name": "Mauricio123", "wins": 138, additionalWins: [] },
    { "name": "Stoker", "wins": 3, additionalWins: [] }, { "name": "HUHAUMxdd2d", "wins": 2, additionalWins: [] },
    { "name": "King YT", "wins": 52, additionalWins: [] }, { "name": "V I N C E N Z O", "wins": 3, additionalWins: [] },
    { "name": "SNAWST", "wins": 5, additionalWins: [] }, { "name": "zVeneno", "wins": 1, additionalWins: [] },
    { "name": "HUYBOOM", "wins": 51, additionalWins: [] }, { "name": "Niunia", "wins": 43, additionalWins: [] },
    { "name": "AtroZ", "wins": 94, additionalWins: [] }, { "name": "MrSromo1337", "wins": 265, additionalWins: [] },
    { "name": "GrandTurco", "wins": 51, additionalWins: [] }, { "name": "Cegid11", "wins": 2, additionalWins: [] },
    { "name": "XxJAMES RGxX", "wins": 27, additionalWins: [] }, { "name": "BRIXXXX", "wins": 1, additionalWins: [] },
    { "name": "kicia", "wins": 31, additionalWins: [] }, { "name": "ConcordIFF", "wins": 87, additionalWins: [] },
    { "name": "Bestia", "wins": 3, additionalWins: [] }, { "name": "BLAZE", "wins": 33, additionalWins: [] },
    { "name": "AMSEt", "wins": 1, additionalWins: [] }, { "name": "Asylumek", "wins": 50, additionalWins: [] },
    { "name": "Da4e001", "wins": 1, additionalWins: [] }, { "name": "ognos", "wins": 2, additionalWins: [] },
    { "name": "gruchaszef", "wins": 5, additionalWins: [] }, { "name": "Fachowiec", "wins": 8, additionalWins: [] },
    { "name": "RZCW", "wins": 100, additionalWins: [] }, { "name": "DarkJeff", "wins": 27, additionalWins: [] },
    { "name": "Jefecito12", "wins": 1, additionalWins: [] }, { "name": "gozdilla", "wins": 3, additionalWins: [] },
    { "name": "meejciorek", "wins": 152, additionalWins: [] }, { "name": "smachuddl", "wins": 3, additionalWins: [] },
    { "name": "lvczi", "wins": 5, additionalWins: [] }, { "name": "killerkomandos", "wins": 10, additionalWins: [] },
    { "name": "moonraker", "wins": 103, additionalWins: [] }, { "name": "WyzO", "wins": 50, additionalWins: [] },
    { "name": "Tiker", "wins": 18, additionalWins: [] }, { "name": "dominojwp", "wins": 23, additionalWins: [] },
    { "name": "JAREK", "wins": 50, additionalWins: [] }, { "name": "Aparatka", "wins": 51, additionalWins: [] },
    { "name": "OgAnt0n", "wins": 1, additionalWins: [] }, { "name": "PSY", "wins": 1, additionalWins: [] },
    { "name": "ExIsT", "wins": 2, additionalWins: [] }, { "name": "Amin K A", "wins": 175, additionalWins: [] },
    { "name": "llergames Zx", "wins": 207, additionalWins: [] }, { "name": "Pela Gato", "wins": 1, additionalWins: [] },
    { "name": "LEON OG", "wins": 3, additionalWins: [] }, { "name": "DRUNKZ", "wins": 5, additionalWins: [] },
    { "name": "riansayangsafa", "wins": 1, additionalWins: [] }, { "name": "zidan 123", "wins": 4, additionalWins: [] },
    { "name": "RITUVLZ", "wins": 227, additionalWins: [] }, { "name": "berg", "wins": 7, additionalWins: [] },
    { "name": "SzaulinaBombie", "wins": 15, additionalWins: [] }, { "name": "http", "wins": 7, additionalWins: [] },
    { "name": "JhonSnc", "wins": 19, additionalWins: [] }, { "name": "zuma", "wins": 53, additionalWins: [] },
    { "name": "koks159", "wins": 152, additionalWins: [] }, { "name": "Polandzio7", "wins": 5, additionalWins: [] },
    { "name": "Michas7", "wins": 1, additionalWins: [] }, { "name": "3", "wins": 171, additionalWins: [] },
    { "name": "C I N D Y", "wins": 1, additionalWins: [] }, { "name": "GODboy", "wins": 8, additionalWins: [] },
    { "name": "Kamyk2115", "wins": 1, additionalWins: [] }, { "name": "jodke", "wins": 2, additionalWins: [] },
    { "name": "AkbarXd", "wins": 5, additionalWins: [] }, { "name": "Bunaaxxy", "wins": 2, additionalWins: [] },
    { "name": "Ingenieria Civil", "wins": 56, additionalWins: [] }, { "name": "JUMBO FS", "wins": 2, additionalWins: [] },
    { "name": "NAME", "wins": 50, additionalWins: [] }, { "name": "zx", "wins": 51, additionalWins: [] },
    { "name": "JEREMY TDH", "wins": 4, additionalWins: [] }, { "name": "Kirk", "wins": 70, additionalWins: [] },
    { "name": "PaTuS", "wins": 3, additionalWins: [] }, { "name": "Ander", "wins": 56, additionalWins: [] },
    { "name": "XKaWi", "wins": 1, additionalWins: [] }, { "name": "PafciuBiczys", "wins": 1, additionalWins: [] },
    { "name": "AZIT", "wins": 1, additionalWins: [] }, { "name": "E X O T I C", "wins": 710, additionalWins: [] },
    { "name": "xXDiOsiToXx", "wins": 1, additionalWins: [] }, { "name": "N A R U T O YT", "wins": 1, additionalWins: [] },
    { "name": "tuli159", "wins": 5, additionalWins: [] }, { "name": "BeTSoN", "wins": 5, additionalWins: [] },
    { "name": "peppa", "wins": 151, additionalWins: [] }, { "name": "Magic Special", "wins": 51, additionalWins: [] },
    { "name": "soso", "wins": 1, additionalWins: [] }, { "name": "S3ba", "wins": 1, additionalWins: [] },
    { "name": "Bargor", "wins": 7, additionalWins: [] }, { "name": "megaroksana9", "wins": 3, additionalWins: [] },
    { "name": "Qrei", "wins": 13, additionalWins: [] }, { "name": "Pawelek", "wins": 2, additionalWins: [] },
    { "name": "squeruu", "wins": 8, additionalWins: [] }, { "name": "Erick HC", "wins": 2, additionalWins: [] },
    { "name": "G 4 A B I ", "wins": 51, additionalWins: [] }, { "name": "GB21", "wins": 35, additionalWins: [] },
    { "name": "Anthony", "wins": 51, additionalWins: [] }, { "name": "FxJ", "wins": 10, additionalWins: [] },
    { "name": "Siwy", "wins": 1, additionalWins: [] }, { "name": "DrEyk", "wins": 2, additionalWins: [] },
    { "name": "R I T U 5 L Z", "wins": 50, additionalWins: [] }, { "name": "The Sombrero", "wins": 1, additionalWins: [] },
    { "name": "Burak31", "wins": 100, additionalWins: [] }, { "name": "gofan", "wins": 50, additionalWins: [] },
    { "name": "cvelox", "wins": 2, additionalWins: [] }, { "name": "weteranW", "wins": 30, additionalWins: [] },
    { "name": "Aracne", "wins": 20, additionalWins: [] }, { "name": "Jenty ", "wins": 3, additionalWins: [] },
    { "name": "M0nst3r3k", "wins": 45, additionalWins: [] }, { "name": "FALLENTHESHADOWW", "wins": 5, additionalWins: [] },
    { "name": "FAUZAN", "wins": 202, additionalWins: [] }, { "name": "CHAMPIONS", "wins": 27, additionalWins: [] },
    { "name": "SKILL JEDYNY", "wins": 7, additionalWins: [] }, { "name": "R O B L O X", "wins": 46, additionalWins: [] },
    { "name": "WEzyr", "wins": 137, additionalWins: [] }, { "name": "wemzyes", "wins": 2, additionalWins: [] },
    { "name": "balinafali", "wins": 131, additionalWins: [] }, { "name": "Gondorianv2", "wins": 4, additionalWins: [] },
    { "name": "REIVAJ", "wins": 4, additionalWins: [] }, { "name": "Rowerowymaks", "wins": 1, additionalWins: [] },
    { "name": "Carlos Bonzano 1", "wins": 51, additionalWins: [] }, { "name": "Gondorian", "wins": 4, additionalWins: [] },
    { "name": "M E T A D O R ", "wins": 145, additionalWins: [] }, { "name": "Charles Chaplin", "wins": 51, additionalWins: [] },
    { "name": "MITSUBISHI", "wins": 5, additionalWins: [] }];
