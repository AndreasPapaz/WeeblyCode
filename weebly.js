var fs = require('fs');
var csv = require('fast-csv');
var indexItems = {};
var targetValue;
var tallyUp = 0;


fs.createReadStream('./weeblytest.csv').pipe(csv()).on('data', function(data) {
	//Hash key values of .csv
	indexItems[data[0]] = data[1];
}).on('end', function(data) {
	console.log('Read Finsihed');
	// console.log(indexItems['Target price']);
	for (var i in indexItems) {
		if (i.replace(/^\d+|[\W_]+/g, '').toUpperCase() === 'TARGETPRICE') {
			targetValue = Number(indexItems[i].replace(/[^0-9\.-]+/g,""));
			delete indexItems[i];
		}
	}

	findPrice();

	findPrice(numbers, target, partial) {
		let s, n, remaining

		parial = partial || []
		s = partial.reduce((a, b) => a + b, 0)
	}

	// function findPrice() {
	// 	if (targetValue === null || targetValue === undefined) {
	// 		console.log("there is no target value");
	// 	}

	// 	for (var j in indexItems) {

	// 		// tallyUp += Number(indexItems[j].replace(/[^0-9\.-]+/g,""));
	// 		// if (tallyUp === targetValue) {
	// 		// 	console.log('winner winner chicken dinner');
	// 		// 	break;
	// 		// } else if (tallyUp > targetValue) {
	// 		// 	break;
	// 		// }
	// 	}
	// 	// console.log(indexItems);
	// 	console.log(tallyUp);
	// }
});

