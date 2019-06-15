'use strict';

var CLOUD_ORIGIN_X = 100;
var CLOUD_ORIGIN_Y = 10;
var SHADOW_OFFSET = 10;
var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;

var UPPER_TEXT_OFFSET = 10;
var UPPER_TEXT_Y_GAP = 26;

var MAX_COLUMN_HEIGHT = 150;
var COLUMN_WIDTH = 40;
var COLUMN_GAP = 50;
var COLUMN_ORIGIN_OFFSET_X = 30;
var COLUMN_ORIGIN_OFFSET_Y = 80;

var NAMES_OFFSET_X = 30;
var NAMES_OFFSET_Y = -20;
var NAMES_DELTA_X = 90;

var TEXT_UNDER_COLUMN_GAP = 15;

var titleTextArray = ['Ура, вы победили!', 'Список результатов:'];

// Отрисовка облака
var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

// Вывод текстового массива на экран
var renderTaxt = function (ctx, arr, x, y, column) {
  ctx.textBaseline = 'hanging';
  var yCoord = y;
  var xCoord = x;
  for (var i = 0; i < arr.length; i++) {
    if (column) {
      ctx.fillText(arr[i], x, yCoord);
      yCoord += UPPER_TEXT_Y_GAP;
    } else {
      ctx.fillText(arr[i], xCoord, y);
      xCoord += NAMES_DELTA_X;
    }
  }
};

// Возвращает максимальное время
var getMaxTime = function (timesArray) {
  var maxTime = timesArray[0];
  for (var i = 1; i < timesArray.length; i++) {
    if (maxTime < timesArray[i]) {
      maxTime = timesArray[i];
    }
  }
  return maxTime;
};


// Возвращает высоты столбцов гистаграммы
var getColumnHeights = function (timesArray) {
  var columnHeight = [];
  for (var i = 0; i < timesArray.length; i++) {
    columnHeight[i] = Math.round(MAX_COLUMN_HEIGHT * timesArray[i] / getMaxTime(timesArray));
  }
  return columnHeight;
};

// Получение случайного цвета
var getRandomColorSaturation = function () {
  return (Math.random().toFixed(1));
};

// Построение столбцов гистограммы
var buildColumns = function (ctx, columnHeightsArray, timesArray, namesArray) {
  var startX = CLOUD_ORIGIN_X + COLUMN_ORIGIN_OFFSET_X;
  var startY = CLOUD_ORIGIN_Y + COLUMN_ORIGIN_OFFSET_Y;

  for (var i = 0; i < columnHeightsArray.length; i++) {
    ctx.fillStyle = 'rgba(0, 0, 255, ' + getRandomColorSaturation() + ')';
    if (namesArray[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    }
    ctx.fillRect(startX, (startY + MAX_COLUMN_HEIGHT - columnHeightsArray[i]), COLUMN_WIDTH, columnHeightsArray[i]);
    ctx.fillStyle = 'rgba(0, 0, 0, 1)';
    ctx.fillText(Math.round(timesArray[i]), startX, (startY + (MAX_COLUMN_HEIGHT - TEXT_UNDER_COLUMN_GAP) - columnHeightsArray[i]));
    startX += COLUMN_WIDTH + COLUMN_GAP;
  }
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_ORIGIN_X + SHADOW_OFFSET, CLOUD_ORIGIN_Y + SHADOW_OFFSET, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_ORIGIN_X, CLOUD_ORIGIN_Y, '#fff');

  ctx.fillStyle = '#000';

  // Отрисовка верхнего текста
  renderTaxt(ctx, titleTextArray, CLOUD_ORIGIN_X + UPPER_TEXT_OFFSET, CLOUD_ORIGIN_Y + UPPER_TEXT_OFFSET, true);

  // Отрисовка имен
  renderTaxt(ctx, names, CLOUD_ORIGIN_X + NAMES_OFFSET_X, CLOUD_ORIGIN_Y + CLOUD_HEIGHT + NAMES_OFFSET_Y, false);
  getColumnHeights(times);
  buildColumns(ctx, getColumnHeights(times), times, names);
};
