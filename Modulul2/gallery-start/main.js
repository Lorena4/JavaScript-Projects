var displayedImage = document.querySelector('.displayed-img');
var thumbBar = document.querySelector('.thumb-bar');


btn = document.querySelector('button');
var overlay = document.querySelector('.overlay');

/* Looping through images */
for (let i = 0; i < 5; i++) {
  let z = 'images/pic' + (i + 1) + '.jpg';
  var newImage = document.createElement('img');
  newImage.setAttribute('src', z);
  newImage.onclick = function () {
    displayedImage.src = z
  };
  thumbBar.appendChild(newImage);
}

