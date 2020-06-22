'use strict';
// input mask validation

// (function () {
//   var KeyCode = {
//     BACKSPACE: 8,
//     ESCAPE: 27,
//     ENTER: 13
//   };
//   var form = document.querySelector('.form');
//   var setInputMask = function () {
//     var swap;

//     form.addEventListener('focus', function () {
//       form.value = swap || '+7(';
//     });

//     form.addEventListener('input', function () {
//       if (form.value.match(/\+$|\+7$|\+7\([^\d]/)) {
//         form.value = '+7('; // не допускает значений '+', '+7' и ввода после скобки нечисловых значений
//       }
//       if (!form.value.match(/\)/)) { // проверка на наличие закрывающей скобки
//         if (form.value.match(/\+7\(\d+/)) {
//           form.value = form.value.match(/\+7\(\d+/); // записывает в значение поля вводимые числа и блокирует ввод нечисловых значений
//         }

//         if (form.value.match(/\+7\(\d{3}/)) { // добавляет скобку после ввода 3 чисел
//           form.value += ')';
//         }
//       } else {
//         form.value = form.value.match(/\+7\(\d{3}\)\d{0,7}/);
//       }

//       form.addEventListener('keydown', function (evt) {
//         if (evt.keyCode === KeyCode.BACKSPACE && form.value.match(/\+7\(\d{3}\)$/)) { // добавляет возможность удалять закрывающую скобку и число перед ней
//           form.value = form.value.slice(0, -1);
//         }
//       });

//       form.addEventListener('change', function () {
//         swap = form.value;
//       });
//     });

//     form.addEventListener('invalid', function () {
//       form.setCustomValidity('Значение поля должно быть в формате: +7(999)9999999');
//     });

//   };

//   form.addEventListener('submit', function (evt) {
//     evt.preventDefault();
//     setInputMask();
//   });
//   // // Маска номера телефона
//   // var phone = document.querySelector('#phone');
//   // var form = document.querySelector('.form');
//   // var rep = /[-\.;":'a-zA-Zа-яА-Я]/;

//   // var phoneValidate = function () {
//   //   var value = phone.value;
//   //   phone.addEventListener('input', function () {
//   //     if (rep.test(value)) {
//   //       value = value.replace(rep, 'Введите номер телефона');
//   //     }
//   //   });
//   // };
//   //
})();
