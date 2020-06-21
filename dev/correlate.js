const path = require("path")
const fs = require("fs")



let args = process.argv.slice(2)

let inputLocation = args[args.indexOf("--load")+1]
args.splice(args.indexOf("--load"), 2)
console.log("Loading from " + path.resolve(inputLocation))

let outputLocation;
if (args.indexOf("--save") !== -1) {
	outputLocation = args[args.indexOf("--save")+1]
	args.splice(args.indexOf("--save"), 2)
	console.log("Saving to " + path.resolve(outputLocation))
}

let sites = JSON.parse(fs.readFileSync(inputLocation), {encoding: "utf8"})

//Reformat for correlation
let timestamps = {}
for (let gaugeID in sites) {
	let gauge = sites[gaugeID]
	gaugeID = gaugeID + " (" + sites[gaugeID].name.slice(0, sites[gaugeID].name.indexOf(" ")) + ")" //Add the name of the river to the gaugeID to make for easy reading.
	for (let i=0;i<gauge.readings.length;i++) {
		let reading = gauge.readings[i]
		if (reading.cfs) {
			if (!timestamps[reading.dateTime]) {
				timestamps[reading.dateTime] = {}
			}
			timestamps[reading.dateTime][gaugeID] = reading.cfs
		}
	}
}

let gauges = {}

console.log(Object.keys(sites))

for (let timestamp in timestamps) {
	let readings = timestamps[timestamp]
	if (Object.keys(readings).length === Object.keys(sites).length) {
		for (let gaugeID in readings) {
			if (!gauges[gaugeID]) {gauges[gaugeID] = []}
			gauges[gaugeID].push(readings[gaugeID])
		}
	}
}

console.log("Reformatting finished. ")
//fs.writeFileSync(outputLocation + ".correlation.json", JSON.stringify(gauges, null, "\t"))


function correlatePearson(d1, d2) {
	let { min, pow, sqrt } = Math
	let add = (a, b) => a + b
	let n = min(d1.length, d2.length)
	if (n === 0) {
		return 0
	}
	[d1, d2] = [d1.slice(0, n), d2.slice(0, n)]
	let [sum1, sum2] = [d1, d2].map(l => l.reduce(add))
	let [pow1, pow2] = [d1, d2].map(l => l.reduce((a, b) => a + pow(b, 2), 0))
	let mulSum = d1.map((n, i) => n * d2[i]).reduce(add)
	let dense = sqrt((pow1 - pow(sum1, 2) / n) * (pow2 - pow(sum2, 2) / n))
	if (dense === 0) {
		return 0
	}
	return (mulSum - (sum1 * sum2 / n)) / dense
}




//Time to run our correlation...
//For every pair of gauges, we need to decide the optimal offset.

let results = {}

for (let gaugeID in gauges) {
	console.log("Performing correlations with gauge " + gaugeID)
	for (let gaugeID2 in gauges) {
		if (gaugeID === gaugeID2) {
			continue;
		}
		console.log("Correlating " + gaugeID + " with " + gaugeID2)

		if (!results[gaugeID]) {results[gaugeID] = {}}

		if (results[gaugeID2] && results[gaugeID2][gaugeID]) {
			console.log("Correlation already completed. ")
			results[gaugeID][gaugeID2] = results[gaugeID2][gaugeID]
			results[gaugeID][gaugeID2].offset = -results[gaugeID][gaugeID2].offset
			continue;
		}

		let currentBest = {}
		let maximalOffset = 4*12 //Number of datapoints to allow offsetting in each direction. Typically, 4 datapoints per hour.

		for (let i=-maximalOffset;i<=maximalOffset;i++) {
			let gauge1 = gauges[gaugeID]
			let gauge2 = gauges[gaugeID2]

			if (i < 0) {
				gauge1 = gauge1.slice(0, i)
				gauge2 = gauge2.slice(-i)
			}
			else if (i > 0) {
				gauge1 = gauge1.slice(i)
				gauge2 = gauge2.slice(0, -i)
			}

			let correlation = correlatePearson(gauge1, gauge2)
			//console.log(i + ": " + correlation)
			if (correlation > currentBest.correlation || currentBest.correlation === undefined) {
				currentBest.correlation = correlation
				currentBest.offset = i
			}
		}
		console.log(currentBest)
		results[gaugeID][gaugeID2] = currentBest
	}
}

console.log(results)

if (outputLocation) {
	fs.writeFileSync(outputLocation, JSON.stringify(results, null, "\t"))
	console.log("Saved")
}
