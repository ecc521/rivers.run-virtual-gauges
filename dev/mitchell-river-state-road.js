const fs = require("fs")
let historical = JSON.parse(fs.readFileSync("test.json"))
let reddies = historical["02111500"].readings
let mitchell = historical["02112360"].readings

//console.log(reddies.slice(-100))

console.log(reddies.length)
for (let i=0;i<reddies.length;i++) {
	if (!(i%5000)) {console.log("Filtering positions from " + i + ". Total of " + reddies.length)}
	if (!reddies[i].cfs) {
		reddies.splice(i, 1)
		mitchell.splice(i, 1)
		i--
	}
}
console.log(reddies.length)

let mismatches = 0

let ratio = 0
let num = 0

for (let i=1;i<reddies.length;i++) {
	if ((reddies[reddies.length - i].dateTime) === (mitchell[mitchell.length - i].dateTime)) {
		ratio += (reddies[reddies.length - i].cfs) / (mitchell[mitchell.length - i].cfs)
		num++

		if ((reddies[reddies.length - i].cfs) / (mitchell[mitchell.length - i].cfs) > 50) {console.log("weirdly high")}
	}
	else {mismatches++}
}
console.log(mismatches)
console.log(ratio)
console.log(num)
console.log(ratio / num)
