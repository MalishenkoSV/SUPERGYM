
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
    if (!evt.target.closest('button').classList.contains('controls__btn--active')) {
      for (var i = 0; i < toggles.length; i++) {
        if (toggles[i].classList.contains('controls__btn--active')) {
          toggles[i].classList.remove('controls__btn--active');
        }
      }

      var toggleButton = evt.target.closest('button');
      toggleButton.classList.add('controls__btn--active');

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

})();
