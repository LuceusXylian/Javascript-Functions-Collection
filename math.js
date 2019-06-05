function milisecondsCalc(years, months, days, hours, minutes, seconds, miliseconds) {
	let ret = years*3.154e+10;
	ret += months*2.628e+9;
	ret += days*8.64e+7;
	ret += hours*3.6e+6;
	ret += minutes*60000;
	ret += seconds*1000;
	ret += miliseconds;
	return ret;
}
