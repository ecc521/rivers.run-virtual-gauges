//This is a development util. For development of virtual gauges.
const path = require("path")
const fs = require("fs")
let riversRunGauges = path.join("../../", "rivers.run", "server", "gauges")

let USGS = require(path.join(riversRunGauges, "usgsGauges.js"))

//Loads gauges and saves them.
let args = process.argv.slice(2)

let outputLocation = args[args.indexOf("--save")+1]
args.splice(args.indexOf("--save"), 2)
console.log("Saving to " + path.resolve(outputLocation))

let startTime = args[args.indexOf("--start")+1]
args.splice(args.indexOf("--start"), 2)
if (new Date(startTime) == "Invalid Date") {throw "Provided invalid start time. "}
console.log("Requesting data from " + new Date(startTime).toString())

let endTime = args[args.indexOf("--end")+1]
args.splice(args.indexOf("--end"), 2)
if (new Date(endTime) == "Invalid Date") {throw "Provided invalid end time. "}
console.log("Requesting data until " + new Date(endTime).toString())

let siteCodes = args
if (siteCodes.length === 0) {throw "Provided no site codes. "}
console.log("Requesting data for sites: " + siteCodes.join(", "))

let timeInPast = Date.now() - new Date(startTime).getTime()
let timeInFuture = -(Date.now() - new Date(endTime).getTime())
USGS.loadSitesFromUSGS(siteCodes, timeInPast, timeInFuture).then((sites) => {
	fs.writeFileSync(outputLocation, JSON.stringify(sites, null, "\t"))
})
