var selectBreed = document.getElementById("breedSelect");
var imageBreed = document.getElementById("catImg");
var infoAboutBreed = document.getElementById("breedInfo");

var selectCategory = document.getElementById("categorySelect");
var imageCategory = document.getElementById("categoryImage");



function getBreeds(){
    return fetch("https://api.thecatapi.com/v1/breeds", {
        method: "GET",
        mode: "cors",
        headers: {
        "x-api-key": "b77e8861-8f11-45e4-930a-1a28e7287dd2",
        }
    })
        .then(res => res.json())
}

function getImages(){
    return fetch("https://api.thecatapi.com/v1/images/search", {
        method: "GET",
        mode: "cors",
        headers: {
        "x-api-key": "b77e8861-8f11-45e4-930a-1a28e7287dd2",
        }
    })
    .then(res => res.json())
}


function getCategories(){
    return fetch("https://api.thecatapi.com/v1/categories",{
        method:"GET",
        mode:"cors",
        headers: {
            "x-api-key": "b77e8861-8f11-45e4-930a-1a28e7287dd2",
        }
    })
    .then(res => res.json())
}



getBreeds().then(data => {
    loadInfoBreed(data);
});

getImages().then(data => {
    showImageBreed(data);
});

getImages().then(data => {
    showImageCategory(data);
});

getCategories().then(data => {
    loadInfoCategory(data);
})


function showImageBreed(object){

    var image = document.createElement("img");
    image.id = "randomCat";
    image.src = object[0].url;
    image.alt = "Pretty cat";
    imageBreed.appendChild(image);
};

function showImageCategory(object){

    var image = document.createElement("img");
    image.id = "randomCat";
    image.src = object[0].url;
    image.alt = "Pretty cat";
    imageCategory.appendChild(image);
};


function loadInfoBreed(array){
    array.forEach(element => {
        var Option = document.createElement("option");
        Option.textContent = element.name;
        selectBreed.appendChild(Option);
    });
};

function loadInfoCategory(array){
    array.forEach(element => {
        var Option = document.createElement("option");
        Option.textContent = element.name;
        selectCategory.appendChild(Option);
    });
};


function makeStars(nr){
    var stars='';
    for(var i=0;i<nr;i++)
        stars += "*";
    return stars;
}

function loadBreedInfo(object){
    while (infoAboutBreed.childNodes.length > 2) {
        infoAboutBreed.removeChild(infoAboutBreed.lastChild);
    }
    infoAboutBreed
    var infoBreed = document.createElement("li");                            
    infoBreed.textContent = "Origin: " + object.origin;               
    infoAboutBreed.appendChild(infoBreed);
    var infoBreed = document.createElement("li");                            
    infoBreed.textContent = "Weight: " + object.weight_imperial + " pounds";                
    infoAboutBreed.appendChild(infoBreed);
    var infoBreed = document.createElement("li");                            
    infoBreed.textContent = "Affection: " + makeStars(object.affection_level);                
    infoAboutBreed.appendChild(infoBreed);
    var infoBreed = document.createElement("li");                            
    infoBreed.textContent = "Child Friendly: " + makeStars(object.child_friendly);                
    infoAboutBreed.appendChild(infoBreed);
    var infoBreed = document.createElement("li");                            
    infoBreed.textContent = "Intelligence " + makeStars(object.intelligence);                
    infoAboutBreed.appendChild(infoBreed);
};

selectBreed.addEventListener("change", (event) => {
    imageBreed.removeChild(imageBreed.firstChild);
    getBreeds().then(data => {
        data.forEach(element =>{
            if (element.name === event.target.value){
                loadBreedInfo(element);
                fetch("https://api.thecatapi.com/v1/images/search?breed_id="+ element.id, {
                    method: "GET",
                    mode: "cors",
                    headers: {
                    "x-api-key": "b77e8861-8f11-45e4-930a-1a28e7287dd2",
                    }
                })
                    .then(res => res.json())
                    .then(data => showImageBreed(data))                             
            }
        });
    });
});

imageBreed.addEventListener("click", () =>{
    imageBreed.removeChild(imageBreed.firstChild);
    getBreeds().then(data => {
        data.forEach(element =>{
            if (element.name === selectBreed.value){
                fetch("https://api.thecatapi.com/v1/images/search?breed_id="+element.id, {
                    method: "GET",
                    mode: "cors",
                    headers: {
                    "x-api-key": "b77e8861-8f11-45e4-930a-1a28e7287dd2",
                    }
                })
                    .then(res => res.json())
                    .then(data => showImageBreed(data))                             
            }
        });
    });
});






selectCategory.addEventListener("change", (event) => {
    imageCategory.removeChild(imageCategory.firstChild);
    getCategories().then(data => {
        data.forEach(element =>{
            if (element.name === event.target.value){
                loadInfoCategory(element);
                fetch("https://api.thecatapi.com/images/search?category_ids=" +element.id, {
                    method: "GET",
                    mode: "cors",
                    headers: {
                    "x-api-key": "b77e8861-8f11-45e4-930a-1a28e7287dd2",
                    }
                })
                    .then(res => res.json())
                    .then(data => showImageCategory(data))                             
            }
        });
    });
});

imageCategory.addEventListener("click", () =>{
    imageCategory.removeChild(imageCategory.firstChild);
    getCategories().then(data => {
        data.forEach(element =>{
            if (element.name === selectCategory.value){
                fetch("https://api.thecatapi.com/images/search?category_ids=" +element.id, {
                    method: "GET",
                    mode: "cors",
                    headers: {
                    "x-api-key": "b77e8861-8f11-45e4-930a-1a28e7287dd2",
                    }
                })
                    .then(res => res.json())
                    .then(data => showImageCategory(data))                             
            }
        });
    });
});


