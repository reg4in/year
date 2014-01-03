function diffMilliseconds(date1, date2) {
  return date1.getTime() - date2.getTime();
}

function diffSeconds(date1, date2) {
  return diffMilliseconds(date1, date2)/1000;
}

function diffMinutes(date1, date2) {
  return diffSeconds(date1, date2)/60;
}

function diffHours(date1, date2) {
  return diffMinutes(date1, date2)/60;
}

function diffDays(date1, date2) {
  return diffHours(date1, date2)/24;
}

function myRound(number, places) {
	return Math.round(number*Math.pow(10, places))/Math.pow(10, places);
}

function isLeapYear(year) {
	var isLeapYear = false;
	
	if (year % 4 == 0) {
		isLeapYear = true;
	}
	if (year % 100 == 0) {
		isLeapYear = false;
	}
	if (year % 400 == 0) {
		isLeapYear = true;
	}
	
	return isLeapYear;
}

function getYearLength(year) {
	var days = 365;
	
	if (isLeapYear(year)) {
		days++;
	}
	
	return days * 24 * 60 * 60 * 1000;
}

function withS(number) {
	if (Math.floor(number) == 1) {
		return false;
	} else {
		return true;
	}
}

function dots(nStr) {
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? ',' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + '.' + '$2');
    }
    return x1 + x2;
}

function comma(number) {
	number += '';
	
	return number.replace('.', ',');
}

function __(id) {
	return document.getElementById(id);
}

function display() {
	var now = new Date();
	
	var percentage = myRound(100 * (diffMilliseconds(now, firstJan)/yearLengthMilliseconds), 2) + '%';
	
	var seconds = Math.floor(diffSeconds(now, firstJan));
	var minutes =  Math.floor(diffMinutes(now, firstJan));
	var hours = Math.floor(diffHours(now, firstJan));
	var days = myRound(diffDays(now, firstJan), 1);
	
	__('percentage').innerHTML = comma(percentage);
	__('bar').style.width = percentage;
	
	__('seconds').innerHTML = dots(seconds);
	
	__('minutes').innerHTML = dots(minutes);
	
	__('hours').innerHTML = dots(hours);
	
	__('days').innerHTML = comma(days);
	
	//clear on nye
	if (diffMilliseconds(now, firstJan) > yearLengthMilliseconds) {
		window.clearInterval(running);
	}
}

window.onload = function() {
  lastYear = (new Date()).getFullYear() - 1;
  firstJan = new Date(lastYear + 1, 0, 1);
  yearLengthMilliseconds = getYearLength(lastYear + 1);
  yearLengthSeconds = Math.round(yearLengthMilliseconds/1000);
  yearLengthMinutes = Math.round(yearLengthSeconds/60);
  yearLengthHours = Math.round(yearLengthMinutes/60);
  yearLengthDays = Math.round(yearLengthHours/24);
  
  __('lastyear').innerHTML = lastYear;
  __('nextyear').innerHTML = lastYear + 2;
  
	__('label-seconds').innerHTML = 'of ' + yearLengthSeconds + ' seconds or';
	__('label-minutes').innerHTML = 'of ' + yearLengthMinutes + ' minutes or';
	__('label-hours').innerHTML = 'of ' + yearLengthHours + ' hours or';
	__('label-days').innerHTML = 'of ' + yearLengthDays + ' days since';
  
  display();
  running = window.setInterval(display, 1000);
};