$(document).ready(function () {
  var currentDay = $("#currentDay");
  //Create and store moment to get current day and time
  var currentMoment = moment();
  var events = [];
  //Create key for the current schedule
  var key = "schedule-" + currentMoment.format("MM/DD/YY");
  //Get the stored schedule from local storage
  var scheduleInStorage = localStorage.getItem(key);

  //Set text to show current day and date in the #currentDay paragraph
  currentDay.text(currentMoment.format("dddd, MMMM Do"));

  //If there is a schedule in local storage parse the object and store it in memory
  //but if not create a new schedule with no events
  if (scheduleInStorage) {
    scheduleInStorage = JSON.parse(scheduleInStorage);
    //Get the events for the day
    events = scheduleInStorage.events;
  } else {
    scheduleInStorage = { date: currentMoment.format("MM/DD/YY"), events: [] };
  }

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
      row.append(
        '<div class="col-2 col-sm-2 col-lg-1"><div class="hour">' +
          hours[i].format("ha") +
          "</div></div>"
      );

      var description = getEventDescription(
        scheduleInStorage.date,
        hours[i].format("H")
      );
      row.append(
        '<div class="col-9 col-sm-9 col-lg-10"><textarea class="form-control description" data-hour="' +
          hours[i].format("H") +
          '">' +
          description +
          "</textarea></div>"
      );
      row.append(
        '<div class="col-1 col-sm-1 col-lg-1"><button class="saveBtn"><i class="far fa-save"></i></button></div>'
      );
      $(".container").append(row);
    }

    //Get the current hour in 24 hour format
    var currentHour = parseInt(currentMoment.format("H"));
    //Get the textareas in each timeblock
    var eventList = $(".row textarea");

    for (var i = 0; i < eventList.length; i++) {
      var textArea = $(eventList[i]);
      //Get the hour that the time block corresponds to from the data-hour attribute
      var hour = parseInt(textArea.attr("data-hour"));

      //If the time block hour is later than the current hour then add the future class
      //else if the time block hour is earlier than the current time then add the past class
      //else add the present class
      if (hour > currentHour) {
        textArea.addClass("future");
      } else if (hour < currentHour) {
        textArea.addClass("past");
      } else {
        textArea.addClass("present");
      }
    }
  }

  function getEventDescription(date, hour) {
    //Get the event that was saved for the date and the hour
    var event = events.find((event) => event.hour === hour);
    console.log(event);
    //Get the description for the event if it exists else return a blank string
    if (event && date === currentMoment.format("MM/DD/YY")) {
      return event.description;
    } else {
      return "";
    }
  }

  function saveTimeBlock() {
    var btn = $(this);
    //Get the textarea from the row
    var timeBlock = btn.parent().parent().find("textarea");
    //Get the value from the text area
    var eventDescription = timeBlock.val();

    if (eventDescription) {
      //Get the corresponding hour for the description
      var eventHour = timeBlock.attr("data-hour");
      //Create an event to store the hour and description
      var event = { hour: eventHour, description: eventDescription };

      //Check to see if an event already exists for the hour saved on and if so
      //then update the description and if not then add the new event
      var existingEvent = events.find(
        (storedEvent) => storedEvent.hour === event.hour
      );
      if (existingEvent) {
        existingEvent.description = event.description;
      } else {
        events.push(event);
      }

      //Create key for the current schedule
      var key = "schedule-" + currentMoment.format("MM/DD/YY");
      //Create a schedule object to save
      var schedule = { date: currentMoment.format("MM/DD/YY"), events: events };
      //Save the schedule
      localStorage.setItem(key, JSON.stringify(schedule));
    }
  }

  createTimeBlocks();

  $(".row").on("click", ".saveBtn", saveTimeBlock);
});
