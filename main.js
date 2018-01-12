/**
 *  *   @author Bregula, Arkadiusz (bregula@arek.pw)
 *  *   @version 0.0.1
 *  *   @summary Project 3
 *  */

"use strict";
const PROMPT = require("readline-sync");

const MIN_DAY = 1, MAX_DAY = 31,
	  MIN_MONTH = 1, MAX_MONTH = 12;

const BASE_PRICE = 100,
	  AT_FAULT_ACCIDENT_PRICE = 50;

// An array of rules in the format [MIN_YEAR, MAX_YEAR, PREMIUM].
const PREMIUM_AGE_RULES = 
	  [
		[16, 30, 20],
	    [30, 45, 10],
	    [60, 200, 30]
	  ];

let policyNumber,
	birthDay,
	birthMonth,
	birthYear,
	premiumDueDay,
	premiumDueMonth,
	premiumDueYear,
	atFaultAccidents,
	age,
	totalPrice;

let firstName,
	lastName;

function main() {
	while(1) {
		setPolicyNumber();
		setFirstName();
		setLastName();
		setBirthdate();
		setAtFaultAccidents();
		setPremiumDueDay();
		setPremiumDueMonth();
		setPremiumDueYear();

		setAge();
		setTotalPrice();

		printPolicyInfo();

		if(askIfContinue()) {
			continue;
		}
		break;
	}
	printGoodbye();
}

main();

function setPolicyNumber() {
	policyNumber = PROMPT.question("What is your policy number: ");
}

function setFirstName() {
	firstName = PROMPT.question("What is your first name: ");
}

function setLastName() {
	lastName = PROMPT.question("What is your last name: ");
}

function setBirthdate() {
	console.log("Please enter your birthday: ");
	setBirthDay();
	setBirthMonth();
	setBirthYear();
}

function setBirthDay() {
	birthDay = PROMPT.question("Day (0-31): ");
	if(birthDay < MIN_DAY || birthDay > MAX_DAY) {
		console.log("Invalid input!");
		setBirthDay();
	}
}

function setBirthMonth() {
	birthMonth = PROMPT.question("Month (1-12): ");
	if(birthMonth < MIN_MONTH || birthMonth > MAX_MONTH) {
		console.log("Invalid input!");
		setBirthMonth();
	}
}

function setBirthYear() {
	birthYear = PROMPT.question("Year (YYYY): ");
}

function setAtFaultAccidents() {
	atFaultAccidents = PROMPT.question("How many of the accidents you were involved in the past 3 years, if any, were you at fault: ");
}

function setPremiumDueDay() {
	premiumDueDay = PROMPT.question("Premium Due Day (0-31): ");
	if(premiumDueDay < MIN_DAY || premiumDueDay > MAX_DAY) {
		console.log("Invalid input!");
		setPremiumDueDay();
	}
}

function setPremiumDueMonth() {
	premiumDueMonth = PROMPT.question("Month (1-12): ");
	if(premiumDueMonth < MIN_MONTH || premiumDueMonth > MAX_MONTH) {
		console.log("Invalid input!");
		setPremiumDueMonth();
	}
}

function setPremiumDueYear() {
	premiumDueYear = PROMPT.question("Year (YYYY): ");
}

function setAge() {
	let birthdate = new Date(birthYear, birthMonth-1, birthDay);
	let now = new Date();

	// Divide the difference in time between birthday and now by
	// the number of seconds in 1.25 years.
	age = Math.floor((now.getTime() - birthdate.getTime()) / 31557600000);
}

function setTotalPrice() {
	totalPrice = BASE_PRICE;
	totalPrice += calculateAgePremium();
	totalPrice += AT_FAULT_ACCIDENT_PRICE * atFaultAccidents;
}

function calculateAgePremium() {
	for(let i = 0; i < PREMIUM_AGE_RULES.length; i++) {
		if(age >= PREMIUM_AGE_RULES[i][0] && age < PREMIUM_AGE_RULES[i][1]) {
			return PREMIUM_AGE_RULES[i][2];
		}
	}
}

function askIfContinue() {
	let answer = PROMPT.question("Would you like to continue? [y/n]: ");
	if(answer === "y") {
		return 1;
	} else if(answer === "n") {
		return 0;
	} else {
		return askIfContinue();
	}
}

function printPolicyInfo() {
	console.log(`\n\n=============================================`);
	console.log(`Name: ${lastName}, ${firstName}`);
	console.log(`Number of at fault accidents: ${atFaultAccidents}`);
	console.log(`Policy price: \$${totalPrice}`);
	console.log(`=============================================\n\n`);
}

function printGoodbye() {
	console.log("\n\n\tGoodbye!\n\n");
}
