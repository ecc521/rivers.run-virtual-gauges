if (gauges) {
	let james = gauges["USGS:02019500"]
	let maury = gauges["USGS:02024000"]

	let balconyGauge = {readings: []}

	//TODO: Make sure that the timestamps match.
	let len = Math.max(james.readings.length, maury.readings.length)
	for (let i=0;i<len;i++) {
		try {
			if (!james.readings[i] || !maury.readings[i]) {continue;} //Avoid unneeded error messages
			balconyGauge.readings[i] = {
				cfs: james.readings[i].cfs + maury.readings[i].cfs,
				dateTime: james.readings[i].dateTime
			}
		}
		catch(e) {
			console.error(e)
		}
	}

	balconyGauge.name = "James @ Buckhanan + Maury @ Buena Vista"
	balconyGauge
}
else {
	[
		"USGS:02019500", //USGS 02019500 JAMES RIVER AT BUCHANAN, VA
		"USGS:02024000" //USGS 02024000 MAURY RIVER NEAR BUENA VISTA, VA
	]
}
