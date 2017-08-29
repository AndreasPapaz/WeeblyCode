var fs = require('fs');
var csv = require('fast-csv');
var indexItems = {};
var subValues = [];
var targetValue;
var tallyUp = 0;
var result = null;


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

	console.log(indexItems);
	console.log(targetValue);
	console.log(subValues);


});

