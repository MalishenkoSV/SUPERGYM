'use strict';
var slider = document.querySelector('.slider');
var activeTrainers = slider.querySelector('.trainers__list--one');
var activeTrainersTwo = slider.querySelector('.trainers__list--two');
// var phone = popup.querySelector('#popup-tel');
// var question = popup.querySelector('#popup-question');
var startBtn = slider.querySelector('.slider__item--start');
var finishBtn = slider.querySelector('.slider__item--finish');


// для табов
var togglesList = document.querySelector('.controls');
var toggles = togglesList.querySelectorAll('.controls__btn');
var abonements = document.querySelectorAll('.abonements');
var abonementsList = abonements.querySelectorAll('.abonements__list');
var firstAbonementsList = abonements.querySelector('.abonements__list--first');
var secondAbonementsList = abonements.querySelector('.abonements__list--second');
var thirdAbonementsList = abonements.querySelector('.abonements__list--third');

var togglesMap = {
  first: 'controls__btn--first',
  second: 'controls__btn--second',
  third: 'controls__btn--third',
};

// для слайдера тренеров
var trainersNode = document.querySelector('#trainers');
var trainersPrevButton = document.querySelector('#trainers-prev');
var trainersNextButton = document.querySelector('#trainers-next');
var trainers = Array.prototype.slice.call(document.querySelectorAll('.trainers__list-item'));

var clientWidthMap = {
  desktop: 1200,
  tablet: 1199,
  mobile: 767,
};

var trainersStepMap = {
  desktop: 4,
  tablet: 2,
  mobile: 1,
};

// переключение табов в блоке Абонементы

togglesList.addEventListener('click', function (evt) {
  if (!evt.target.closest('controls__btn').classList.contains('controls__btn--active')) {
    for (var i = 0; i < toggles.length; i++) {
      if (toggles[i].classList.contains('controls__btn--active')) {
        toggles[i].classList.remove('controls__btn--active');
      }
    }

    var toggleButton = evt.target.closest('button');
    toggleButton.classList.add('controls__btn--active');

    for (var j = 0; j < abonementsList.length; j++) {
      if (abonementsList[j].classList.contains('abonemens__list--shown')) {
        abonementsList[j].classList.remove('abonemens__list--shown');
      }
    }

    if (toggleButton.classList.contains(togglesMap.first)) {
      firstAbonementsList.classList.add('abonemens__list--shown');
    } else if (toggleButton.classList.contains(togglesMap.second)) {
      secondAbonementsList.classList.add('abonemens__list--shown');
    } else if (toggleButton.classList.contains(togglesMap.third)) {
      thirdAbonementsList.classList.add('abonemens__list--shown');
    }
  }
});


activeTrainers.classList.add('trainers__list--active');
finishBtn.addEventListener('click', function () {
  if (activeTrainers.classList.contains('trainers__list--active')) {
    activeTrainers.classList.remove('trainers__list--hidden');
    activeTrainers.classList.add('trainers__list--visual');

  } else {
    activeTrainers.classList.add('trainers__list--visual');
    activeTrainersTwo.classList.remove('trainers__list--active');
  }
});

// activeTrainers.classList.add('trainers__list--tablet-hidden');
    // activeTrainers.classList.add('trainers__list--mobile-hidden');
     // activeTrainers.classList.add('trainers__list--tablet-visual');
    // activeTrainers.classList.add('trainers__list--mobile-visual');
