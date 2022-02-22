if (gauges) {
	let river1 = gauges["USGS:02027000"] //TYE RIVER NEAR LOVINGSTON, VA
	let river2 = gauges["USGS:02027500"] //PINEY RIVER AT PINEY RIVER, VA

	let virtualGauge = {readings: []}

	let timestamps = Object.create(null)

	river1.readings.forEach((reading) => {
		if (!timestamps[reading.dateTime]) {
			timestamps[reading.dateTime] = {}
		}
		timestamps[reading.dateTime].river1 = reading
	})

	river2.readings.forEach((reading) => {
		if (!timestamps[reading.dateTime]) {
			timestamps[reading.dateTime] = {}
		}
		timestamps[reading.dateTime].river2 = reading
	})


	let times = Object.keys(timestamps).map(str => Number(str)).sort((a, b) => a-b)

	let lastRiver1Reading;
	let lastRiver2Reading;

	times.forEach((timestamp) => {
		lastRiver1Reading = timestamps[timestamp].river1 || lastRiver1Reading
		lastRiver2Reading = timestamps[timestamp].river2 || lastRiver2Reading

		if (lastRiver1Reading && lastRiver2Reading) {
			virtualGauge.readings.push({
				cfs: lastRiver1Reading.cfs + lastRiver2Reading.cfs,
				dateTime: timestamp
			})
		}
	})

	virtualGauge.name = "Tye @ Lovingston + Piney @ Piney River"
	virtualGauge
}
else {
	[
		"USGS:02027000",
		"USGS:02027500"
	]
}
