function add_to_table(hour, minute, period, i) {
	var table = document.getElementById("times");
	var row = table.insertRow();
	var cell = row.insertCell(0)

	var text1 = hour + ":" + ("00" + minute).slice(-2) + " " + period;
	var text2 = (i + 1) * 1.5 + " hrs of sleep";
	var text3 = (i + 1) + " sleep cycles";

	if (i + 1 == 6) {
		text1 += " (suggested)";
		cell.style.backgroundColor = "gold";
	}
	cell.innerHTML = text1 + "<br><div class='small_text'>" + text2 + ', ' + text3 + "</div>";
}

function calculate() {
	var hour = parseInt(document.getElementById("hour").value);
	var minute = parseInt(document.getElementById("minute").value);
	var period = document.getElementById("period").value;

	if (isNaN(hour) || isNaN(minute) || period == "") {
		document.getElementById("instruction").innerHTML = "Please fill in all values";
		return;
	}

	document.getElementById("times").innerHTML = "";

	if (document.getElementById("choice").value == "I want to wake up at:") {
		document.getElementById("instruction").innerHTML = "Go to sleep at one of these times:";
	// set i to max 9 sleep cycles
		for (var i = 0; i < 9; i++) {
			var pastHour = hour

			if (minute < 30) {
				hour -= 2;
				minute += 30
			} else {
				hour -= 1;
				minute -= 30;
			}

			if (hour < 1 && pastHour > 0) {
				//period = (period == "AM") ? "PM" : "AM";
				period = (hour < 1) ? "PM" : "AM";
			}
			if (hour < 1) {
				hour += 12;
			}
			add_to_table(hour, minute, period, i);
		}

	} else {
		document.getElementById("instruction").innerHTML = "Set your alarm to one of these times:";
		// set i to max 9 sleep cycles
		for (var i = 0; i < 9; i++) {
			var pastHour = hour;

			if (minute < 30) {
				hour += 1;
				minute += 30;
			} else {
				hour += 2;
				minute -= 30
			}

			if (hour > 11 && pastHour < 12) {
				period = (period == "AM") ? "PM" : "AM";
			}

			if (hour > 12) {
				hour -= 12;
			}
			add_to_table(hour, minute, period, i);
		}
	}
}