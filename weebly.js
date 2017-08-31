var fs = require('fs');
var csv = require('fast-csv');
var indexItems = {};
var targetValue;
var tallyUp = 0;
var result = null;
var priceArr = [];


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
	//need to convert index values to numbers
	priceArr = Object.values(indexItems);

	console.log(priceArr);
	console.log(targetValue);


	function findPrice(numbers, target, partial) {
		console.log('start');
		let s, n, remaining

		partial = partial || []
		s = partial.reduce( (a, b) => a + b, 0);

		if (s > target || partial.length > 4) {
			return null;
		}

		if (s === target && partial.length == 4) {
			if (!result) {
				result = [];
			}
			result.push(partial);
		}

		for (let i = 0; i < numbers.length; i++) {
			n = numbers[i];
			remining = numbers.slice(i + 1);
			findPrice(remaining, target, partial.concat([n]));
		}
		return result;
	}

	findPrice(targetValue, priceArr);
});


/**
 * Recursive approach
 * Time complexity - O(2^n)
 * Space complexity - O(n), take into account additional stack memory and memory for subsets
 */
// const arr = [17, 2, 8, 34, 4, 0.5, 42, 6, 3, 7, 15, 14, 9]
// const sum = 20

// let result = null
// function subset_sum(numbers, target, partial) {
//     let s, n, remaining

//     partial = partial || []
//     s = partial.reduce( (a, b) => a + b, 0)

//     if (s > target || partial.length > 4) return null
    
//     // check if the partial sum is equals to target
//     if (s === target && partial.length == 4) {
//         if(!result) result = []
//         result.push(partial)
//         // console.log("%s=%s", partial.join("+"), target)
//     }

//     for (let i = 0; i < numbers.length; i++) {
//         n = numbers[i]
//         remaining = numbers.slice(i + 1)
//         subset_sum(remaining, target, partial.concat([n]))
//     }

//     return result
// }

// // lets calculate time
// const startTime = process.hrtime()
// const res = subset_sum(arr, sum)
// const diff = process.hrtime(startTime)

// console.log(`Result:`, res)
// console.log(`Time: ${ (diff[0] * 1e9 + diff[1]) / 1000000} ms`)

