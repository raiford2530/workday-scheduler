$(document).ready(function () {
    var currentDay = $('#currentDay');
    //Create and store moment to get current day and time
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

          var row = $('<div class="row no-gutters time-block">');
          row.append('<div class="col-2 col-sm-2 col-lg-1"><div class="hour">' + hours[i].format("ha") + '</div></div>');
          row.append('<div class="col-9 col-sm-9 col-lg-10"><textarea class="form-control description" data-hour="' + hours[i].format("H") + '"></textarea></div>');
          row.append('<div class="col-1 col-sm-1 col-lg-1"><button class="saveBtn"><i class="far fa-save"></i></button></div>');
          $('.container').append(row);
        }

        //Get the current hour in 24 hour format
        var currentHour = parseInt(currentMoment.format("H"));
        //Get the textareas in each timeblock
        var eventList = $('.row textarea');
        console.log(eventList);
        for (var i = 0; i < eventList.length; i++) {

          var textArea = $(eventList[i]);
          //Get the hour that the time block corresponds to from the data-hour attribute
          var hour = parseInt(textArea.attr('data-hour'));

          //If the time block hour is later than the current hour then add the future class
          //else if the time block hour is earlier than the current time then add the past class
          //else add the present class
          if (hour > currentHour) {
            textArea.addClass("future");
          } else if (hour < currentHour) {
            textArea.addClass("past");
          }
          else {
            textArea.addClass("present");
          }
        }
      }

      createTimeBlocks();

  });