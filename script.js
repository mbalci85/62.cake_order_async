'use strict';

const patisserie = {
	bananaCaramel: {
		stock: 3,
		price: 9.99,
	},
	contessa: {
		stock: 5,
		price: 7.99,
	},
	concorde: {
		stock: 11,
		price: 22.99,
	},
	mouseCake: {
		stock: 8,
		price: 16.99,
	},
	confettiSuprise: {
		stock: 9,
		price: 14.99,
	},
};

const cakeType = document.getElementById('cakeSelect');
const cakeAmount = document.getElementById('cakeAmount');
const orderBtn = document.getElementById('submit_btn');

let orderArray = [cakeType, cakeAmount];

const checkOrder = (order) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			console.log(`You ordered ${order[1].value} ${order[0].value}`);
			if (patisserie[order[0].value].stock >= order[1].value) {
				let cost = order[1].value * patisserie[order[0].value].price;
				console.log(
					`All of the items are in stock. The total cost of the order is ${cost} `,
				);
				resolve([order[0].value, order[1].value, cost]);
			} else {
				reject(
					`We cannot proceed your order. We have ${
						patisserie[order[0].value].stock
					} ${order[0].value} in stock`,
				);
			}
		}, 1000);
	});
};

const payment = (order) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			let key = prompt('Enter 1 if it is ok?');
			if (key == '1') {
				console.log(`Payment is completed. You paid ${order[2]}`);
				resolve(order);
				patisserie[order[0]].stock -= order[1];
			}
		}, 2000);
	});
};

const stockControl = (order) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			if (patisserie[order[0]].stock > 2) {
				console.log(`To Cashier: Wait for checking stock....`);
				console.log(`${order[0]} stock is enough`);
			} else {
				console.log(`To Cashier: Wait for checking stock....`);
				console.log(
					`${order[0]} stock is ${
						patisserie[order[0]].stock
					} and it is critical`,
				);
			}
		}, 3000);
	});
};

// orderBtn.onclick = () => {
// 	checkOrder(orderArray)
// 		.then((resolvedArray) => payment(resolvedArray))
// 		.then((resolvedArray) => stockControl(resolvedArray))
// 		.catch((err) => console.log(err));
// };

orderBtn.onclick = async () => {
	try {
		const order = await checkOrder(orderArray);
		const resolvedOrder = await payment(order);
		await stockControl(resolvedOrder);
		// console.log(stock);
	} catch (err) {
		console.log(err);
	}
};
