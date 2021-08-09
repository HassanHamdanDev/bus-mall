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
let newImgArray = [];

function render() {

  do {
    leftRandom = getRandomNumber(0, imgArray.length - 1);
    centerRandom = getRandomNumber(0, imgArray.length - 1);
    rightRandom = getRandomNumber(0, imgArray.length - 1);
  } while (leftRandom === rightRandom || leftRandom === centerRandom || rightRandom === centerRandom || newImgArray.includes(leftRandom) || newImgArray.includes(centerRandom) || newImgArray.includes(rightRandom));

  newImgArray[0] = leftRandom;
  newImgArray[1] = centerRandom;
  newImgArray[2] = rightRandom;

  leftImage.src = './img/' + Pick.all[leftRandom].imagePath;
  centerImage.src = './img/' + Pick.all[centerRandom].imagePath;
  rightImage.src = './img/' + Pick.all[rightRandom].imagePath;

  Pick.all[leftRandom].timesShown++;
  Pick.all[centerRandom].timesShown++;
  Pick.all[rightRandom].timesShown++;
}

render();

let buttonElement;
let buttonChartElement;

imageSection.addEventListener('click', clickImage);
function clickImage(event) {
  if ((event.target.id === 'leftImage' || event.target.id === 'centerImage' || event.target.id === 'rightImage') && counter !== numberOfRound) {
    render();
    counter++;
  } else {

    imageSection.removeEventListener('click', clickImage);

    buttonElement = document.createElement('button');
    buttonElement.textContent = 'SHOW RESULTS';
    sectionElement.appendChild(buttonElement);

    buttonElement.addEventListener('click', result);

    buttonChartElement = document.createElement('button');
    buttonChartElement.textContent = 'SHOW Chart';
    sectionElement.appendChild(buttonChartElement);

    buttonChartElement.addEventListener('click', resultChart);
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


function result() {

  let ulElement = document.createElement('ul');
  sectionElement.appendChild(ulElement);

  for (let i = 0; i < imgArray.length; i++) {
    let liElemnt = document.createElement('li');
    liElemnt.textContent = imgArray[i].split('.')[0] + ' vote is ' + Pick.all[i].timesClicked + ' , and was seen ' + Pick.all[i].timesShown + ' Times';
    ulElement.appendChild(liElemnt);
  }
  buttonElement.removeEventListener('click', result);

}

function resultChart() {

  let namesArr = [];
  let shownArr = [];
  let clickArr = [];

  for (let i = 0; i < Pick.all.length; i++) {
    namesArr.push(Pick.all[i].name);
    shownArr.push(Pick.all[i].timesShown);
    clickArr.push(Pick.all[i].timesClicked);
  }

  let ctx = document.getElementById('myChart').getContext('2d');
  let myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: namesArr,
      datasets: [{
        label: 'Number of Seen ',
        data: shownArr,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }, {
        label: 'Number Of Click',
        data: clickArr,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 2
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });

  buttonChartElement.removeEventListener('click', resultChart);

}
