if (gauges) {
	let sourceGauge1 = gauges["USGS:03106500"] //Slippery Rock Creek at Wurtemburg, PA - 03106500

	let virtualGauge = {readings: []}

	let len = sourceGauge1.readings.length
	for (let i=0;i<len;i++) {
		try {
			//Generation flow is about 550cfs.
			virtualGauge.readings[i] = {
				cfs: sourceGauge1.readings[i].cfs,
				feet: sourceGauge1.readings[i].feet * 1.4 - 2.36,
				dateTime: sourceGauge1.readings[i].dateTime
			}
		}
		catch(e) {
			console.error(e)
		}
	}

	virtualGauge.name = "McConnell's Mill (Wurtemburg * 1.4 - 2.36)"
	virtualGauge
}
else {
	//Gauges requested by the virtual gauge program.
	//If a gauge is not requested here, attempts to access it may fail.
	[
		"USGS:03106500",
	]
}
