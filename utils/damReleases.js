function eliminateReleases(arr) {
	let min = Math.min(...arr)
		
	//Scale everything.
	arr = arr.map((value) => {return value-min})
	
	//Make everything change from previous.
	let changes = []
	for (let i=1;i<arr.length;i++) {
		changes.push(arr[i] - arr[i-1])
	}
		
	//Find an increase then level off.
	//Find a decrease then level off.
	//Handle nested releases. (Ex. added a turbine).
	//Provide flow without release.
	
		
	let damChanges = changes.slice(0).sort((a, b) => {return Math.abs(b) - Math.abs(a)})
	
	//Look for a large gap in the changes - a point where the rate of change goes up down 3-5x
	for (let i=0;i<damChanges.length;i++) {
		let current = Math.abs(damChanges[i])
		let next = Math.abs(damChanges[i+1])
		
		if (current/next > 4) {
			damChanges = damChanges.slice(0, i + 1)
			break;
		}
	}
	
	//All values in changes are caused by dams.
	//TODO: If negatives start off, we know a dam release stopped.
	//TODO: Ignore changes right before/after dam turns on/off.
	
	//After a trend is established, stop dam after it stops.
	
	console.log(changes)
	console.log(damChanges)
	
	let current = arr[0] + min
	let results = []
	results.push(current)
	for (let i=1;i<changes.length;i++) {
		if (!damChanges.includes(changes[i])) {
			current += changes[i]
		}
		results.push(current)
	}
	
	return {
		min,
		start: arr[0] + min,
		changes,
		causedByDam: damChanges, //CFS value changes caused by a dam
		results //Flow data with dam releases removed.
	}
}


//console.log(eliminateReleases([110,99,107,312,715,699,710,701,719,720,709,323,109,110,111]))

//console.log(eliminateReleases([72.4,69.1,67.4,65.8,64.3,64.3,62.7,64.3,576,639,633,633,639,652,639,639,646,646,639,639,646,646,639,646,652,659,659,665,659,659,665,665,659,659,659,659,541,320,212,155,120,101,88.6,83,110,120,150]))



module.exports = {
	eliminateReleases,
}