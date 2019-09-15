if (globalThis.gauges !== undefined) {
	let james = gauges["02019500"]
	let maury = gauges["02024000"]
	
	let balconyGauge = {cfs: []}
	
	//TODO: Make sure that the timestamps match.
	let len = Math.max(james.cfs.length, maury.cfs.length)
	for (let i=0;i<len;i++) {
		balconyGauge.cfs[i] = {
			value: james.cfs[i].value + maury.cfs[i].value,
			dateTime: james.cfs[i].dateTime
		}
	}
	
	balconyGauge.name = "James @ Buckhanan + Maury @ Buena Vista"
	balconyGauge
}
else {
	[
		"02019500", //USGS 02019500 JAMES RIVER AT BUCHANAN, VA
		"02024000" //USGS 02024000 MAURY RIVER NEAR BUENA VISTA, VA
	]
}
