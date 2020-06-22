'use strict';
// input mask validation

(function () {
  var KeyCode = {
    BACKSPACE: 8,
    ESCAPE: 27,
    ENTER: 13
  };

  var setInputMask = function () {
    var form = document.querySelector('.form');
    var telInput = form.querySelector('#phone');
    var swap;


    telInput.addEventListener('focus', function () {
      telInput.value = swap || '+7(';
    });

    telInput.addEventListener('input', function () {
      if (telInput.value.match(/\+$|\+7$|\+7\([^\d]/)) {
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

  // Маска номера телефона
  var phone = document.querySelector('#phone');
  var form = document.querySelector('.form');
  var rep = /[-\.;":'a-zA-Zа-яА-Я]/;

  var phoneValidate = function () {
    var value = phone.value;
    phone.addEventListener('input', function () {
      if (rep.test(value)) {
        value = value.replace(rep, 'Введите номер телефона');
      }
    });
  };
  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    setInputMask();
    phoneValidate();

  });
})();
