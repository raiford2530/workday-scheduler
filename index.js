$(document).ready(function () {
    var currentDay = $('#currentDay');
    //Get current day and time using moment
    var currentMoment = moment();

    //Set text to show current day and date in the #currentDay paragraph
    currentDay.text(currentMoment.format("dddd, MMMM Do"))

    function createTimeBlocks() {
        var hours = [];

        //Create a moment for each time block and push each moment onto the hours array
        for (var i = 9; i < 18; i++) {
          var time = moment({ hours: i });
          hours.push(time);
        }

        //Create time blocks
        for (var i = 0; i < hours.length; i++) {

          var row = $('<div class="row no-gutters">');
          row.append('<div class="col-2 col-sm-2 col-lg-1"><div class="hour">' + hours[i].format("ha") + '</div></div>');
          row.append('<div class="col-9 col-sm-9 col-lg-10"><textarea class="form-control"></textarea></div>');
          row.append('<div class="col-1 col-sm-1 col-lg-1"><button class="saveBtn"><i class="far fa-save"></i></button></div>');
          $('.container').append(row);
        }
      }

      createTimeBlocks();

  });