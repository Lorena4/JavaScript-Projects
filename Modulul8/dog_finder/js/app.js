/**
 * Endpoint-uri Dog API:
 * imagine random: https://dog.ceo/api/breeds/image/random
 * toate rasele: https://dog.ceo/api/breeds/list
 * imagine random dintr-o rasa anume: https://dog.ceo/api/breed/{hound}/images/random
 */

// ------------------------------------------
//  Referinte la Elementele HTML pe care le vom folosi in cod
// ------------------------------------------

const select = document.getElementById('breeds');
const card = document.querySelector('.card');
const form = document.querySelector('form');
const image = document.createElement('img');

// ------------------------------------------
//  EVENT LISTENERS
// ------------------------------------------

// PAS 4: la schimbarea optiunii din <select> afiseaza o imagine din rasa selectata
select.addEventListener('change', () => {
    generateImage('https://dog.ceo/api/breed/' + select.value + '/images/random')
})

// PAS 5: la click in interiorul <div>-ului afiseaza alta imagine din rasa selectata

card.addEventListener('click', () => {
    generateImage('https://dog.ceo/api/breed/' + select.value + '/images/random')
})
// PAS 6: Creati o functie fetchData(url) care sa automatizeze primii doi pasi dintr-un request 
// (trimiterea request-ului si parsarea raspunsului JSON)
function fetchData(url) {
    return fetch(url)
        .then(response => response.json())
}


// PAS 7 - atasati cu metoda .catch() un handler care sa afiseze in consola un mesaj custom de eroare 
// si eroarea primita de la server. Ca sa va asigurati ca functioneaza, schimbati url-ul catre care
// trimiteti request-ul cu unul gresit.


// PAS 8 - integrati primele doua comenzi .fetch() intr-o singura comanda Promise.all()

Promise.all([fetchData('https://dog.ceo/api/breeds/image/random'),
            fetchData('https://dog.ceo/api/breeds/list')
    ])
    .then(() => {
        generateImage('https://dog.ceo/api/breeds/image/random');
        generateOptions();
    })


// ------------------------------------------
//  POST DATA
// ------------------------------------------


// PAS 9 - Transmiteti datele completate in formular printr-un request POST, catre https://jsonplaceholder.typicode.com/posts 
// Printati in consola raspunsul primit de la server, impreuna cu un mesaj custom.  

form.action = 'https://jsonplaceholder.typicode.com/posts';
form.method = 'POST';

// ------------------------------------------
//  HELPER FUNCTIONS
// ------------------------------------------

// generateImage(src, alt)
// Functie custom, care afiseaza o imagine in interiorul <div>-ului  


function generateImage(string) {
    fetchData(string)
        .then(info => {
            image.src = info.message;
            image.alt = select.value;
            image.title = select.value;
            card.appendChild(image);
        })
}


// generateOptions(data)
// Functie custom, care completeaza optiunile din <select>


function generateOptions(str) {
    fetchData('https://dog.ceo/api/breeds/list')
        .then(info => {
            var arr = info.message;
            arr.forEach(element => {
                let Option = document.createElement('option');
                Option.innerText = element;
                Option.value = element;
                select.appendChild(Option);
            });
        })
}