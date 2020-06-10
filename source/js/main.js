'use strict';
// для табов
var controls = document.querySelector('.controls');
var togglesList = controls.querySelectorAll('.controls__btn');
var abonementsLists = document.querySelectorAll('.abonements__list');
var firstAbonementsList = document.querySelector('.abonements__list--first');
var secondAbonementsList = document.querySelector('.abonements__list--second');
var thirdAbonementsList = document.querySelector('.abonements__list--third');

// Скролл страницы
var btnScreen = document.querySelector('.main-screen__btn');

if (btnScreen) {
  btnScreen.addEventListener('click', function (evt) {
    evt.preventDefault();

    var blockSubscription = btnScreen.getAttribute('href');

    document.querySelector(blockSubscription).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  });
}

var togglesMap = {
  first: 'controls__btn--first',
  second: 'controls__btn--second',
  third: 'controls__btn--third',
};

// переключение табов в блоке Абонементы

controls.addEventListener('click', function (evt) {
  if (!evt.target.closest('button').classList.contains('controls__btn--active')) {
    togglesList.forEach(function (toggle) {
      if (toggle.classList.contains('controls__btn--active')) {
        toggle.classList.remove('controls__btn--active');
      }
    });

    var toggleButton = evt.target.closest('button');
    toggleButton.classList.add('controls__btn--active');

    abonementsLists.forEach(function (item) {
      if (item.classList.contains('abonemens__list--shown')) {
        item.classList.remove('abonemens__list--shown');
      }
    });

    if (toggleButton.classList.contains(togglesMap.first)) {
      firstAbonementsList.classList.add('abonemens__list--shown');
    } else if (toggleButton.classList.contains(togglesMap.second)) {
      secondAbonementsList.classList.add('abonemens__list--shown');
    } else if (toggleButton.classList.contains(togglesMap.third)) {
      thirdAbonementsList.classList.add('abonemens__list--shown');
    }
  }
});


// Тренеры
var slider = document.querySelector('.slider');
var activeTrainer = slider.querySelector('.trainers__list--one');
var activeTrainerTwo = slider.querySelector('.trainers__list--two');
var startBtn = slider.querySelector('.trainers__slider-btn-left');
var finishBtn = slider.querySelector('.trainers__slider-btn-right');
var trainersBlock = document.querySelector('.trainers');
var trainersList = document.querySelectorAll('.trainers__list-item');

var clientWidthMap = {
  desktop: 1200,
  tablet: 1199,
  mobile: 767,
};

var trainersStep = {
  tablet: 2,
  mobile: 1,
};


finishBtn.addEventListener('click', function () {
  if (activeTrainer.classList.contains('trainers__list--active')) {
    activeTrainer.classList.remove('trainers__list--hidden');
    activeTrainerTwo.classList.add('trainers__list--hidden');
    activeTrainer.classList.remove('trainers__list--active');
    activeTrainer.classList.add('trainers__list--active');
  }
  // } else {
  //   activeTrainers.classList.remove('trainers__list--visual');
  //   activeTrainers.classList.add('trainers__list--hidden');
  //   activeTrainers.classList.remove('trainers__list--active');
  //   activeTrainersTwo.classList.add('trainers__list--active');
  // }
});

startBtn.addEventListener('click', function () {
  if (activeTrainerTwo.classList.contains('trainers__list--active')) {
    activeTrainerTwo.classList.remove('trainers__list--hidden');
    activeTrainer.classList.add('trainers__list--hidden');
    activeTrainerTwo.classList.remove('trainers__list--active');
    activeTrainerTwo.classList.add('trainers__list--active');
  }
  // } else {
  //   activeTrainersTwo.classList.remove('trainers__list--visual');
  //   activeTrainersTwo.classList.add('trainers__list--hidden');
  //   activeTrainers.classList.add('trainers__list--active');
  //   activeTrainers.classList.remove('trainers__list--active');
  // }
});

// для планшета



// слайдер в блоке Отзывы
// для слайдера отзывов
// var reviewsNode = document.querySelector('.reviews');
var reviewsPrevButton = document.querySelector('.reviews__slider-btn-left');
var reviewsNextButton = document.querySelector('.reviews__slider-btn-right');
var reviews = Array.prototype.slice.call(document.querySelectorAll('.reviews__item'));
var reviewsStep = 1;

var slideReviewsToNext = function () {
  var currentIndex = 0;
  for (var a = 0; a < reviews.length; a++) {
    if (reviews[a].classList.contains('reviews__item--active')) {
      currentIndex = a;
      break;
    }
  }

  reviews[currentIndex].classList.remove('reviews__item--active');
  reviews[currentIndex].classList.add('reviews__item--hidden');

  if (currentIndex < reviews.length - 1) {
    reviews[currentIndex + reviewsStep].classList.remove('reviews__item--hidden');
    reviews[currentIndex + reviewsStep].classList.add('reviews__item--active');
  } else {
    reviews[0].classList.remove('reviews__item--hidden');
    reviews[0].classList.add('reviews__item--active');
  }
};

var slideReviewsToPrev = function () {
  var currentIndex = 0;
  for (var z = 0; z < reviews.length; z++) {
    if (reviews[z].classList.contains('reviews__item--active')) {
      currentIndex = z;
      break;
    }
  }

  reviews[currentIndex].classList.remove('reviews__item--active');
  reviews[currentIndex].classList.add('reviews__item--hidden');

  if (currentIndex > 0) {
    reviews[currentIndex - reviewsStep].classList.remove('reviews__item--hidden');
    reviews[currentIndex - reviewsStep].classList.add('reviews__item--active');
  } else {
    reviews[reviews.length - 1].classList.remove('reviews__item--hidden');
    reviews[reviews.length - 1].classList.add('reviews__item--active');
  }
};

if (reviewsNextButton && reviews) {
  reviewsNextButton.addEventListener('click', slideReviewsToNext);
}

if (reviewsPrevButton && reviews) {
  reviewsPrevButton.addEventListener('click', slideReviewsToPrev);
}
