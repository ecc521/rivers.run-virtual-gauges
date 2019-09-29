if (globalThis.gauges !== undefined) {
	let damReleases = requireUtil("damReleases.js")

	let nantahala = gauges["03505550"]
	//TODO: Check if 03504000 Nantahala Rainbow Springs is related to this.
	//It may be above the dam or something, and there could be some minimum outflow based on inflow. 
	
	//I'm not sure if the minimum of ~60 cfs is from cascades, dam, both, or what. (it shows up at rainbow springs)
	
	let upperNanty = {cfs: []}
		
	let len = nantahala.cfs.length
	for (let i=0;i<len;i++) {
		try {
			//Generation flow is about 550cfs.
			//
			upperNanty.cfs[i] = {
				value: Math.max(nantahala.cfs[i].value - 675, 0),
				dateTime: nantahala.cfs[i].dateTime
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
		"03505550", //Nantahala Hewitt
	]
}
