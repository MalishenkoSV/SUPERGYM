'use strict';
var slider = document.querySelector('.slider');
var activeTrainers = slider.querySelector('.trainers__list--one');
var activeTrainersTwo = slider.querySelector('.trainers__list--two');
// var phone = popup.querySelector('#popup-tel');
// var question = popup.querySelector('#popup-question');
var startBtn = slider.querySelector('.slider__item--start');
var finishBtn = slider.querySelector('.slider__item--finish');

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
