$(document).ready(function () {
    var currentDay = $('#currentDay');
    var currentMoment = moment();

    currentDay.text(currentMoment.format("dddd, MMMM Do"))

  });