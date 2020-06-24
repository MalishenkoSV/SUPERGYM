
'use strict';
// abonements
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

// slider
(function () {
  var initSlider = function (section) {
    var sliderSection = document.querySelector(section); // основный элемент блока
    var sliderWrapper = sliderSection.querySelector('.slider__wrapper'); // обертка для элементов слайдера
    var sliderInner = sliderSection.querySelector('.slider__inner'); // динамический блок слайдера
    var sliderItems = sliderSection.querySelectorAll('.slider__item'); // элементы (.slider-item)
    var sliderControls = sliderSection.querySelectorAll('.slider__btn'); // элементы управления
    var wrapperWidth = sliderWrapper.offsetWidth; // ширина обёртки
    var itemWidth = sliderItems[0].offsetWidth; // ширина одного элемента
    var itemsGutter = parseFloat(getComputedStyle(sliderItems[0]).marginRight); // ширина отступа между элементами
    var itemsPerView = (wrapperWidth - itemWidth) / (itemWidth + itemsGutter) + 1; // количество видимых элементов
    var leftItemPosition = 0; // позиция левого активного элемента
    var transform = 0; // значение транфсформации .slider_wrapper
    // var touchTransform = 0;
    var items = []; // массив элементов

    // сброс слайдера в начальное состояние
    sliderInner.removeAttribute('style');
    sliderItems.forEach(function (item) {
      item.removeAttribute('style');
    });

    // наполнение массива items
    sliderItems.forEach(function (item, index) {
      items.push({
        item: item,
        position: index,
        transform: 0
      });
    });

    var position = {
      getMinItem: function () {
        var indexItem = 0;
        items.forEach(function (item, index) {
          if (item.position < items[indexItem].position) {
            indexItem = index;
          }
        });
        return indexItem;
      },
      getMaxItem: function () {
        var indexItem = 0;
        items.forEach(function (item, index) {
          if (item.position > items[indexItem].position) {
            indexItem = index;
          }
        });
        return indexItem;
      },
      getMin: function () {
        return items[position.getMinItem()].position;
      },
      getMax: function () {
        return items[position.getMaxItem()].position;
      }
    };

    var transformSlider = function (direction) {
      var nextItemPosition;
      var i;

      if (direction === 'right') {
        leftItemPosition = leftItemPosition + itemsPerView;
        if ((leftItemPosition + itemsPerView - 1) > position.getMax()) {
          var itemsToAdd = leftItemPosition + itemsPerView - position.getMax() - 1;
          for (i = 0; i < itemsToAdd; i++) {
            nextItemPosition = position.getMinItem();
            items[nextItemPosition].position = position.getMax() + 1;
            items[nextItemPosition].transform += items.length * (itemWidth + itemsGutter);
            items[nextItemPosition].item.style.transform = 'translateX(' + items[nextItemPosition].transform + 'px)';
          }
        }
        transform -= wrapperWidth + itemsGutter;
      }
      if (direction === 'left') {
        leftItemPosition = leftItemPosition - itemsPerView;
        if (leftItemPosition < position.getMin()) {
          for (i = 0; i < itemsPerView; i++) {
            nextItemPosition = position.getMaxItem();
            items[nextItemPosition].position = position.getMin() - 1;
            items[nextItemPosition].transform -= items.length * (itemWidth + itemsGutter);
            items[nextItemPosition].item.style.transform = 'translateX(' + items[nextItemPosition].transform + 'px)';
          }
        }
        transform += wrapperWidth + itemsGutter;
      }
      sliderInner.style.transform = 'translateX(' + transform + 'px)';
    };

    // обработчик события click для кнопок "назад" и "вперед"
    var controlClick = function (evt) {
      if (evt.target.classList.contains('slider__btn') || evt.target.parentNode.classList.contains('slider__btn')) {
        evt.preventDefault();
        var direction = (evt.target.classList.contains('slider__btn--right') || evt.target.parentNode.classList.contains('slider__btn--right')) ? 'right' : 'left';
        transformSlider(direction);
      }
    };

    var onSliderTouchStart = function (touchStartEvt) {
      var initX = touchStartEvt.changedTouches[0].pageX;
      var moveDirection;
      var touchTransform = 0;

      var onSliderTouchMove = function (touchMoveEvt) {
        var currX = touchMoveEvt.changedTouches[0].pageX;
        var touchShift = initX - currX;

        if (touchShift < 0) {
          moveDirection = 'left';
        } else if (touchShift > 0) {
          moveDirection = 'right';
        } else {
          moveDirection = null;
        }

        touchTransform += Math.abs(touchShift);
        initX = currX;
      };


      var onSliderTouchEnd = function () {
        sliderInner.removeEventListener('touchmove', onSliderTouchMove);
        sliderInner.removeEventListener('touchend', onSliderTouchEnd);
        if (touchTransform > 0.3 * wrapperWidth) {
          transformSlider(moveDirection);
        }
      };

      sliderInner.addEventListener('touchmove', onSliderTouchMove);
      sliderInner.addEventListener('touchend', onSliderTouchEnd);
    };

    var setUpListeners = function () {
      // добавление к кнопкам "назад" и "вперед" обрботчика controlClick для события click
      sliderControls.forEach(function (contr) {
        contr.addEventListener('click', controlClick);
      });
      sliderInner.addEventListener('touchstart', onSliderTouchStart);
    };

    // инициализация
    setUpListeners();
  };

  initSlider('.trainers');
  initSlider('.reviews');
})();

// input mask validation

(function () {
  var KeyCode = {
    BACKSPACE: 8,
    ESCAPE: 27,
    ENTER: 13
  };
  var formSection = document.querySelector('.contacts');
  var form = formSection.querySelector('.registration__form');
  var telInput = form.querySelector('input[type="tel"]');
  var setInputMask = function () {
    var swap;

    telInput.addEventListener('focus', function () {
      form.value = swap || '+7(';
    });

    telInput.addEventListener('input', function () {
      if (telInput.match(/\+$|\+7$|\+7\([^\d]/)) {
        telInput.value = '+7('; // не допускает значений '+', '+7' и ввода после скобки нечисловых значений
      }
      if (!telInput.value.match(/\)/)) { // проверка на наличие закрывающей скобки
        if (telInput.value.match(/\+7\(\d+/)) {
          telInput.value = telInput.value.match(/\+7\(\d+/); // записывает в значение поля вводимые числа и блокирует ввод нечисловых значений
        }

        if (telInput.value.match(/\+7\(\d{3}/)) { // добавляет скобку после ввода 3 чисел
          telInput.value += ')';
        }
      } else {
        telInput.value = telInput.value.match(/\+7\(\d{3}\)\d{0,7}/);
      }

      telInput.addEventListener('keydown', function (evt) {
        if (evt.keyCode === KeyCode.BACKSPACE && telInput.value.match(/\+7\(\d{3}\)$/)) { // добавляет возможность удалять закрывающую скобку и число перед ней
          telInput.value = telInput.value.slice(0, -1);
        }
      });

      telInput.addEventListener('change', function () {
        swap = telInput.value;
      });
    });

    telInput.addEventListener('invalid', function () {
      telInput.setCustomValidity('Значение поля должно быть в формате: +7(999)9999999');
    });
  };
  setInputMask();

  form.addEventListener('submit', function (evt) {
    var value = telInput.value;
    var rep = /[-\.;":'a-zA-Zа-яА-Я]/;
    evt.preventDefault();
    if (rep.test(value)) {
      value = value.replace(rep, 'Значение поля должно быть в формате: +7(999)9999999');
      // telInput.setCustomValidity('Значение поля должно быть в формате: +7(999)9999999');
    }
  });
})();
