function milisecondsCalc(years, months, days, hours, minutes, seconds, miliseconds) {
	return years*3.154e+10
		+ months*2.628e+9
		+ days*8.64e+7
		+ hours*3.6e+6
		+ minutes*60000
		+ seconds*1000
		+ miliseconds;
}
