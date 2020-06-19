'use strict';
(function () {
  /**
   * Функция определения события swipe на элементе.
   * @param {Object} el - элемент DOM.
   * @param {Object} settings - объект с предварительными настройками.
   */
  var swipe = function (el, settings) {

    // настройки по умолчанию
    settings = Object.assign({}, {
      minDist: 60, // минимальная дистанция, которую должен пройти указатель, чтобы жест считался как свайп (px)
      maxDist: 120, // максимальная дистанция, не превышая которую может пройти указатель, чтобы жест считался как свайп (px)
      maxTime: 700, // максимальное время, за которое должен быть совершен свайп (ms)
      minTime: 50 // минимальное время, за которое должен быть совершен свайп (ms)
    }, settings);

    // коррекция времени при ошибочных значениях
    if (settings.maxTime < settings.minTime) {
      settings.maxTime = settings.minTime + 500;
    }
    if (settings.maxTime < 100 || settings.minTime < 50) {
      settings.maxTime = 700;
      settings.minTime = 50;
    }

    var dir,                // направление свайпа (horizontal, vertical)
      swipeType,            // тип свайпа (up, down, left, right)
      dist,                 // дистанция, пройденная указателем
      isMouse = false,      // поддержка мыши (не используется для тач-событий)
      isMouseDown = false,  // указание на активное нажатие мыши (не используется для тач-событий)
      startX = 0,           // начало координат по оси X (pageX)
      distX = 0,            // дистанция, пройденная указателем по оси X
      startY = 0,           // начало координат по оси Y (pageY)
      distY = 0,            // дистанция, пройденная указателем по оси Y
      startTime = 0,        // время начала касания
      support = {           // поддерживаемые браузером типы событий
        pointer: !!('PointerEvent' in window || ('msPointerEnabled' in window.navigator)),
        touch: !!(typeof window.orientation !== 'undefined' || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 'ontouchstart' in window || navigator.msMaxTouchPoints || 'maxTouchPoints' in window.navigator > 1 || 'msMaxTouchPoints' in window.navigator > 1)
      };

    /**
     * Опредление доступных в браузере событий: pointer, touch и mouse.
     * @return {Object} - возвращает объект с доступными событиями.
     */
    var getSupportedEvents = function () {
      switch (true) {
        case support.pointer:
          events = {
            type: 'pointer',
            start: 'PointerDown',
            move: 'PointerMove',
            end: 'PointerUp',
            cancel: 'PointerCancel',
            leave: 'PointerLeave'
          };
          // добавление префиксов для IE10
          var ie10 = (window.navigator.msPointerEnabled && Function('/*@cc_on return document.documentMode===10@*/')());
          for (var value in events) {
            if (value === 'type') {
              continue;
            }
            events[value] = (ie10) ? 'MS' + events[value] : events[value].toLowerCase();
          }
          break;
        case support.touch:
          events = {
            type: 'touch',
            start: 'touchstart',
            move: 'touchmove',
            end: 'touchend',
            cancel: 'touchcancel'
          };
          break;
        default:
          events = {
            type: 'mouse',
            start: 'mousedown',
            move: 'mousemove',
            end: 'mouseup',
            leave: 'mouseleave'
          };
          break;
      }
      return events;
    };


    /**
     * Объединение событий mouse/pointer и touch.
     * @param evt {object} - принимает в качестве аргумента событие.
     * @return{TouchList|Event} - возвращает либо TouchList, либо оставляет событие без изменения.
     */
    var eventsUnify = function (evt) {
      return evt.changedTouches ? evt.changedTouches[0] : evt;
    };


    /**
     * Обрабочик начала касания указателем.
     * @param evt {Event} - получает событие.
     */
    var checkStart = function (evt) {
      var event = eventsUnify(evt);
      if (support.touch && typeof evt.touches !== 'undefined' && evt.touches.length !== 1) {
        return; // игнорирование касания несколькими пальцами
      }
      dir = 'none';
      swipeType = 'none';
      dist = 0;
      startX = event.pageX;
      startY = event.pageY;
      startTime = new Date().getTime();
      if (isMouse) {
        isMouseDown = true; // поддержка мыши
      }
      evt.preventDefault();
    };

    /**
     * Обработчик движения указателя.
     * @param evt {Event} - получает событие.
     */
    var checkMove = function (evt) {
      if (isMouse && !isMouseDown) {
        return; // выход из функции, если мышь перестала быть активна во время движения
      }
      var event = eventsUnify(evt);
      distX = event.pageX - startX;
      distY = event.pageY - startY;
      if (Math.abs(distX) > Math.abs(distY)) {
        dir = (distX < 0) ? 'left' : 'right';
      } else {
        dir = (distY < 0) ? 'up' : 'down';
      }
      evt.preventDefault();
    };

    /**
     * Обработчик окончания касания указателем.
     * @param evt {Event} - получает событие.
     */
    var checkEnd = function (evt) {
      if (isMouse && !isMouseDown) { // выход из функции и сброс проверки нажатия мыши
        mouseDown = false;
        return;
      }
      var endTime = new Date().getTime();
      var time = endTime - startTime;
      if (time >= settings.minTime && time <= settings.maxTime) { // проверка времени жеста
        if (Math.abs(distX) >= settings.minDist && Math.abs(distY) <= settings.maxDist) {
          swipeType = dir; // опредление типа свайпа как 'left' или 'right'
        } else if (Math.abs(distY) >= settings.minDist && Math.abs(distX) <= settings.maxDist) {
          swipeType = dir; // опредление типа свайпа как 'top' или 'down'
        }
      }
      dist = (dir === 'left' || dir === 'right') ? Math.abs(distX) : Math.abs(distY); // опредление пройденной указателем дистанции

      // генерация кастомного события swipe
      if (swipeType !== 'none' && dist >= settings.minDist) {
        var swipeEvent = new CustomEvent('swipe', {
          bubbles: true,
          cancelable: true,
          detail: {
            full: evt, // полное событие Event
            dir: swipeType, // направление свайпа
            dist: dist, // дистанция свайпа
            time: time // время, потраченное на свайп
          }
        });
        el.dispatchEvent(swipeEvent);
      }
      evt.preventDefault();
    };

    // добавление поддерживаемых событий
    var events = getSupportedEvents();

    // проверка наличия мыши
    if ((support.pointer && !support.touch) || events.type === 'mouse') isMouse = true;

    // добавление обработчиков на элемент
    el.addEventListener(events.start, checkStart);
    el.addEventListener(events.move, checkMove);
    el.addEventListener(events.end, checkEnd);

  };


  /**
   * Примеры работы swipe()
   */
  var getExampleDiv = function (id) {
    return document.getElementById('example-' + id);
  };

  var makeDone = function (el, currentDir, dirs) {
    if (dirs.indexOf(currentDir) > -1) {
      el.classList.add('swiped');
      el.querySelector('.swipe-block-text').textContent = 'сделан свайп (' + currentDir + ')';
    }
  };

  var examples = {
    simpleLeft: {
      el: getExampleDiv('simple-one'),
      callback: function (evt) {
        makeDone(evt.target, evt.detail.dir, 'left');
      }
    },
    simpleRight: {
      el: getExampleDiv('simple-two'),
      callback: function (evt) {
        makeDone(evt.target, evt.detail.dir, 'right');
      }
    },
    simpleUpDown: {
      el: getExampleDiv('simple-three'),
      callback: function (evt) {
        makeDone(evt.target, evt.detail.dir, 'up down');
      }
    },
    distRight: {
      el: getExampleDiv('dist-one'),
      callback: function (evt) {
        makeDone(evt.target, evt.detail.dir, 'right');
      },
      set: {
        minDist: 180,
        maxDist: 250
      }
    },
    distLeft: {
      el: getExampleDiv('dist-two'),
      callback: function (evt) {
        makeDone(evt.target, evt.detail.dir, 'left');
      },
      set: {
        minDist: parseInt((getExampleDiv('dist-two').clientWidth / 2).toFixed(), 10),
        maxDist: parseInt(getExampleDiv('dist-two').clientWidth.toFixed(), 10)
      }
    },
    timeDown: {
      el: getExampleDiv('timeout-one'),
      callback: function (evt) {
        makeDone(evt.target, evt.detail.dir, 'down');
      },
      set: {
        minTime: 750,
        maxTime: 1750
      }
    },
    timeLeft: {
      el: getExampleDiv('timeout-two'),
      callback: function (evt) {
        makeDone(evt.target, evt.detail.dir, 'left');
      },
      set: {
        maxTime: 175,
        minTime: 50
      }
    }
  };


})();
