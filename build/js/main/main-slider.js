// slider
'use strict';
(function () {
  function initSlider(section) {
    var sliderTtainers = document.querySelector(section); // основный элемент блока
    var sliderWrapper = sliderTtainers.querySelector('.slider__wrapper'); // обертка для элементов слайдера
    var sliderInner = sliderTtainers.querySelector('.slider__inner'); // динамический блок слайдера
    var sliderItems = sliderTtainers.querySelectorAll('.slider__item'); // элементы (.slider-item)
    // console.log(sliderItems[0].offsetWidth);
    var sliderControls = sliderTtainers.querySelectorAll('.slider__btn'); // элементы управления
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
    var controlClick = function (e) {
      if (e.target.classList.contains('slider__btn') || e.target.parentNode.classList.contains('slider__btn')) {
        e.preventDefault();
        var direction = (e.target.classList.contains('slider__btn--right') || e.target.parentNode.classList.contains('slider__control--right')) ? 'right' : 'left';
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
  }

  initSlider('.trainers');
  initSlider('.reviews');
}());
