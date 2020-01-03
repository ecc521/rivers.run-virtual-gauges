if (globalThis.gauges !== undefined) {
	let damReleases = requireUtil("damReleases.js")

	let nantahala = gauges["USGS:03505550"]
	//TODO: Check if 03504000 Nantahala Rainbow Springs is related to this.
	//It may be above the dam or something, and there could be some minimum outflow based on inflow.

	//I'm not sure if the minimum of ~60 cfs is from cascades, dam, both, or what. (it shows up at rainbow springs)

	let upperNanty = {readings: []}

	let len = nantahala.readings.length
	for (let i=0;i<len;i++) {
		try {
			//Generation flow is about 550cfs.
			upperNanty.readings[i] = {
				cfs: Math.max(nantahala.readings[i].cfs - 675, 0),
				dateTime: nantahala.readings[i].dateTime
			}
		}
		catch(e) {
			console.error(e)
		}
	}

	upperNanty.name = "Upper Nantahala (Hewitt - 675cfs)"
	upperNanty
}
else {
	[
		"USGS:03505550", //Nantahala Hewitt
	]
}
