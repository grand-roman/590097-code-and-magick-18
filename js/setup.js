'use strict';

var DataWizards = {
  COUNT: 4,
  NAMES: ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'],
  SURNAMES: ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'],
  COAT_COLOR: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
  EYES_COLOR: ['black', 'red', 'blue', 'yellow', 'green'],
  FIREBALL_BACKGROUND: ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848']
};

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var userDialog = document.querySelector('.setup');
var setupSimilarWizards = document.querySelector('.setup-similar');
var similarListElement = userDialog.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;

var userDialogOpen = document.querySelector('.setup-open');
var userDialogClose = userDialog.querySelector('.setup-close');
var userNameInput = userDialog.querySelector('.setup-user-name');
var userDialogWizard = userDialog.querySelector('.setup-wizard-appearance');
var userDialogWizardCoat = userDialogWizard.querySelector('.wizard-coat');
var userDialogInputWizardCoat = userDialogWizard.querySelector('input[name=coat-color]');
var userDialogWizardEyes = userDialogWizard.querySelector('.wizard-eyes');
var userDialogInputWizardEyes = userDialogWizard.querySelector('input[name=eyes-color]');
var userDialogFireball = userDialog.querySelector('.setup-fireball-wrap');
var userDialogInputFireball = userDialogFireball.querySelector('input[name=fireball-color]');

var allWizards = generateWizards();
var fragment = document.createDocumentFragment();

for (var i = 0; i < allWizards.length; i++) {
  fragment.appendChild(renderWizard(allWizards[i]));
}
similarListElement.appendChild(fragment);

// Функция, возвращающаая массив объектов магов
function generateWizards() {
  var shuffleWizardNames = shuffleArray(DataWizards.NAMES);
  var shuffleWizardSurnames = shuffleArray(DataWizards.SURNAMES);

  var wizards = [];
  for (var count = 0; count < DataWizards.COUNT; count++) {
    wizards.push({
      names: shuffleWizardNames[count],
      surnames: shuffleWizardSurnames[count],
      coatColor: getRandomElement(DataWizards.COAT_COLOR),
      eyesColor: getRandomElement(DataWizards.EYES_COLOR)
    });
  }
  return wizards;
}
// Генерируем шаблон волшебника
function renderWizard(wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.names + '\n ' + wizard.surnames;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return wizardElement;
}
// Функция, возвращающая новый массив из старого в случайном порядке
function shuffleArray(array) {
  var mixedArray = array.slice();
  for (var j = mixedArray.length - 1; j > 0; j--) {
    var randomIndex = Math.floor(Math.random() * (j + 1));
    var tempValue = mixedArray[j];
    mixedArray[j] = array[randomIndex];
    mixedArray[randomIndex] = tempValue;
  }
  return mixedArray;
}

// Функция, возвращающая случайный элемемент массива
function getRandomElement(array) {
  for (var next = 0; next < array.length; next++) {
    var randomIndex = Math.floor(Math.random() * array.length);
    var randomElement = array[randomIndex];
  }
  return randomElement;
}

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE && evt.target !== userNameInput) {
    closePopup();
  }
};

// Функция, открывающая окно с похожими волшебниками
var openPopup = function () {
  userDialog.classList.remove('hidden');
  setupSimilarWizards.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  userDialog.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

userDialogOpen.addEventListener('click', function () {
  openPopup();
});

userDialogOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

userDialogClose.addEventListener('click', function () {
  closePopup();
});

userDialogClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

userNameInput.addEventListener('invalid', function () {
  if (userNameInput.validity.tooShort) {
    userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else if (userNameInput.validity.tooLong) {
    userNameInput.setCustomValidity('Имя не должно превышать 25-ти символов');
  } else if (userNameInput.validity.valueMissing) {
    userNameInput.setCustomValidity('Обязательное поле');
  } else {
    userNameInput.setCustomValidity('');
  }
});

userNameInput.addEventListener('input', function (evt) {
  var target = evt.target;
  if (target.value.length < 2) {
    target.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else {
    target.setCustomValidity('');
  }
});

var setWizardColor = function (arrayOfVariables, itemName, inputName) {
  var randomElement = getRandomElement(arrayOfVariables);
  inputName.value = randomElement;
  if (itemName === userDialogFireball) { // в фаерболе меняем цвет background вместо fill
    itemName.style.backgroundColor = randomElement;
  } else {
    itemName.style.fill = randomElement;
  }
};

userDialogWizardCoat.addEventListener('click', function () {
  setWizardColor(DataWizards.COAT_COLOR, userDialogWizardCoat, userDialogInputWizardCoat);
});

userDialogWizardEyes.addEventListener('click', function () {
  setWizardColor(DataWizards.EYES_COLOR, userDialogWizardEyes, userDialogInputWizardEyes);
});

userDialogFireball.addEventListener('click', function () {
  setWizardColor(DataWizards.FIREBALL_BACKGROUND, userDialogFireball, userDialogInputFireball);
});
