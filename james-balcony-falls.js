if (gauges) {
	let james = gauges["USGS:02019500"]
	let maury = gauges["USGS:02024000"]

	let balconyGauge = {readings: []}

	let timestamps = Object.create(null)

	james.readings.forEach((reading) => {
		if (!timestamps[reading.dateTime]) {
			timestamps[reading.dateTime] = {}
		}
		timestamps[reading.dateTime].james = reading
	})

	maury.readings.forEach((reading) => {
		if (!timestamps[reading.dateTime]) {
			timestamps[reading.dateTime] = {}
		}
		timestamps[reading.dateTime].maury = reading
	})


	let times = Object.keys(timestamps).map(str => Number(str)).sort((a, b) => a-b)

	let lastJames;
	let lastMaury;

	times.forEach((timestamp) => {
		lastJames = timestamps[timestamp].james || lastJames
		lastMaury = timestamps[timestamp].maury || lastMaury

		if (lastJames && lastMaury) {
			balconyGauge.readings.push({
				cfs: lastJames.cfs + lastMaury.cfs,
				dateTime: timestamp
			})
		}
	})

	balconyGauge.name = "James @ Buckhanan + Maury @ Buena Vista"
	balconyGauge
}
else {
	[
		"USGS:02019500", //USGS 02019500 JAMES RIVER AT BUCHANAN, VA
		"USGS:02024000" //USGS 02024000 MAURY RIVER NEAR BUENA VISTA, VA
	]
}
