// setting up todays date
var today = moment().format('MMMM Do YYYY');
var currentDay = document.getElementById('currentDay');
currentDay.innerHTML = today

// time hour slots
var hourSlot = [['9am', '9'], ['10am', '10'], ['11am', '11'], ['12pm', '12'], ['1pm', '13'], ['2pm', '14'], ['3pm', '15'], ['4pm', '16'], ['5pm', '17']];
var saveBtnId = [];

var timeContainer = $('.container');

// adding custom rows and columns for each hour
for (var i = 0; i < hourSlot.length; i++) {
    var section = $('<section class = "row time-block">');
    var timeBlk = $((`<time class = "col-md-2 hour">${hourSlot[i][0]}</time>`));
    var input = $(`<input class = "col-md-9 description" id= "input${hourSlot[i][0]}"></input>`);
    var saveBtn = $(`<button class = "col-md-1 saveBtn" id ="${hourSlot[i][0]}"><i class="far fa-save"></i></button>`);

    var storedInfo = localStorage.getItem(`input${hourSlot[i][0]}`);
    input.val(storedInfo);

    // adding the css properties to the page based on the hour of day it is
    if (moment().hour() == parseInt(hourSlot[i][1])) {
        input.addClass('present');
    } else if (moment().hour() > parseInt(hourSlot[i][1])) {
        input.addClass('past');
    } else if (moment().hour() < parseInt(hourSlot[i][1])) {
        input.addClass('future');
    }

    section.append(timeBlk);
    section.append(input);
    section.append(saveBtn);
    timeContainer.append(section);
    saveBtnId.push(`${hourSlot[i][0]}`);
}

saveBtnId.forEach(id => {
    $(`#${id}`).on("click", function () {
        var task = ($(`#input${id}`).val());
        localStorage.setItem(`input${id}`, task);
    });
})