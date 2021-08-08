'use strict';

let imgArray = [
  'bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg',
  'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'water-can.jpg', 'wine-glass.jpg'
];

let counter = 0;
let numberOfRound = 25;

let sectionElement = document.getElementById('result-section');
const imageSection = document.getElementById('imageSection');

let leftImage = document.getElementById('leftImage');
let centerImage = document.getElementById('centerImage');
let rightImage = document.getElementById('rightImage');

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function Pick(name, imageSrc) {
  this.name = name;
  this.imagePath = imageSrc;
  this.timesShown = 0;
  this.timesClicked = 0;
  Pick.all.push(this);
}

Pick.all = [];

for (let i = 0; i < imgArray.length; i++) {
  new Pick(imgArray[i].split('.')[0], imgArray[i]);
}

let leftRandom;
let centerRandom;
let rightRandom;

function render() {

  leftRandom = getRandomNumber(0, imgArray.length - 1);
  centerRandom = getRandomNumber(0, imgArray.length - 1);
  rightRandom = getRandomNumber(0, imgArray.length - 1);

  leftImage.src = './img/' + Pick.all[leftRandom].imagePath;
  centerImage.src = './img/' + Pick.all[centerRandom].imagePath;
  rightImage.src = './img/' + Pick.all[rightRandom].imagePath;

  Pick.all[leftRandom].timesShown++;
  Pick.all[centerRandom].timesShown++;
  Pick.all[rightRandom].timesShown++;
}

render();

imageSection.addEventListener('click', clickImage);
function clickImage(event) {
  if ((event.target.id === 'leftImage' || event.target.id === 'centerImage' || event.target.id === 'rightImage') && counter !== numberOfRound) {
    render();
    counter++;
  }
}

leftImage.addEventListener('click', isclicked);
centerImage.addEventListener('click', isclicked);
rightImage.addEventListener('click', isclicked);

function isclicked(event) {
  if (event.target.id === 'leftImage') {
    Pick.all[leftRandom].timesClicked++;
  }
  if (event.target.id === 'centerImage') {
    Pick.all[centerRandom].timesClicked++;
  }
  if (event.target.id === 'rightImage') {
    Pick.all[rightRandom].timesClicked++;
  }
}

let buttonElement = document.createElement('button');
buttonElement.textContent = 'SHOW RESULTS';
buttonElement.id = 'result';
sectionElement.appendChild(buttonElement);

buttonElement.addEventListener('click', result);

function result() {

  imageSection.removeEventListener('click', clickImage);

  let ulElement = document.createElement('ul');
  sectionElement.appendChild(ulElement);

  for (let i = 0; i < imgArray.length; i++) {
    let liElemnt = document.createElement('li');
    liElemnt.textContent = imgArray[i].split('.')[0] + ' vote is ' + Pick.all[i].timesClicked + ' , and was seen ' + Pick.all[i].timesShown + ' Times';
    ulElement.appendChild(liElemnt);
  }
}

