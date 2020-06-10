'use strict';

(function () {

  var togglesList = document.querySelector('.controls__list');
  var toggles = document.querySelectorAll('.controls__btn');
  var abonements = document.querySelectorAll('.abonements__list');
  var firstList = document.querySelector('.abonements__list--first');
  var secondList = document.querySelector('.abonements__list--second');
  var thirdList = document.querySelector('.abonements__list--third');


  var togglesMap = {
    first: 'controls__btn--first',
    second: 'controls__btn--second',
    third: 'controls__btn--third',
  };

  // переключение табов в блоке Абонементы
  togglesList.addEventListener('click', function (evt) {
    if (!evt.target.closest('button').classList.contains('controls__button--active')) {
      for (var i = 0; i < toggles.length; i++) {
        if (toggles[i].classList.contains('controls__button--active')) {
          toggles[i].classList.remove('controls__button--active');
        }
      }

      var toggleButton = evt.target.closest('button');
      toggleButton.classList.add('controls__button--active');

      for (var j = 0; j < abonements.length; j++) {
        if (abonements[j].classList.contains('abonements__list--shown')) {
          abonements[j].classList.remove('abonements__list--shown');
        }
      }

      if (toggleButton.classList.contains(togglesMap.first)) {
        firstList.classList.add('abonements__list--shown');
      } else if (toggleButton.classList.contains(togglesMap.second)) {
        secondList.classList.add('abonements__list--shown');
      } else if (toggleButton.classList.contains(togglesMap.third)) {
        thirdList.classList.add('abonements__list--shown');
      }
    }
  });

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


 // слайдер в блоке Отзывы

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

})();
