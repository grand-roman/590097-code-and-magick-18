'use strict';

window.renderStatistics = function (ctx, names, times) {

  var statCloud = {

    cloudX: 100,
    cloudY: 10,
    cloudWidth: 420,
    cloudHeight: 270,
    cloudShadow: 10,
    cloudMargin: 40,

    cloudColor: ['rgba(0, 0, 0, 0.7)', '#fff'],
    cloudText: ['Ура вы победили!', 'Список результатов: ']
  };

  function renderCloud (x, y, cWidth, cHeight, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, cWidth, cHeight);
  }

  function writeText (textArray) {
    ctx.fillStyle = '#000';
    ctx.font = '16px PT Mono';

    for (var i = 0; i < textArray.length; i++) {
      ctx.fillText(textArray[i], statCloud.cloudX + statCloud.cloudMargin, statCloud.cloudY + (i + 1) * 25);
    }
  }

  function renderHistogram (histogramNames, histogramTimes) {

    var statHistogram = {

      barWidth: 40,
      indent: 90,
      indentName: 20,
      indentTime: 10,
      histogramHeight: 150,
      paddingTop: 50

    };

    var step = statHistogram.histogramHeight / (getMaxElement(histogramTimes) - 0);
    var initialX = statCloud.cloudX + statCloud.cloudMargin;
    var initialY = statCloud.cloudY + statHistogram.histogramHeight + statHistogram.indentName + statHistogram.indentTime + statHistogram.paddingTop;

    for (var i = 0; i < histogramNames.length; i++) {
      statHistogram.barHeight = histogramTimes[i] * step;
      var getY = initialY - histogramTimes[i] * step;
      var getX = initialX + statHistogram.indent * i;

      ctx.fillStyle = fillBarColor(histogramNames[i]);


      ctx.fillRect(getX, getY, statHistogram.barWidth, statHistogram.barHeight);

      ctx.fillText(histogramNames[i], getX, initialY + statHistogram.indentName);
      ctx.fillText(histogramTimes[i].toFixed(0), getX, getY - statHistogram.indentTime);

    }
  }

  function getMaxElement (array) {
    var max = -1;
    for (var i = 0; i < array.length; i++) {
      var value = array[i];
      if (value > max) {
        max = value;
      }
    }
    return max;
  }

  function fillBarColor (namePlayer) {
    var randomOpacity = Math.random().toFixed(3) * 1.5;
    if (namePlayer === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'rgba(0, 0, 255, ' + randomOpacity + ')';
    }
  }

  renderCloud(statCloud.cloudX + statCloud.cloudShadow, statCloud.cloudY + statCloud.cloudShadow, statCloud.cloudWidth, statCloud.cloudHeight, statCloud.cloudColor[0]);
  renderCloud(statCloud.cloudX, statCloud.cloudY, statCloud.cloudWidth, statCloud.cloudHeight, statCloud.cloudColor[1]);
  writeText(statCloud.cloudText);
  renderHistogram(names, times);
};

