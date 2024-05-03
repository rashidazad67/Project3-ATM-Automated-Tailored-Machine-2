import inquirer from "inquirer";
import chalk from "chalk";
// Initialize user balance and pin code.
let myBalance = 100000;
let myPin = 6776;
//Print Welcome message.
console.log(chalk.blue("\n \tWelcome to Rashid ATM.\n"));
let pinAnswer = await inquirer.prompt([
    {
        name: "pin",
        type: "number",
        message: chalk.yellow("Enter your P.I.N")
    }
]);
if (pinAnswer.pin === myPin) {
    console.log(chalk.green("P.I.N is correct."));
    //console.log(`You Current Balance is ${myBalance}`);
    let operationAns = await inquirer.prompt([
        {
            name: "operation",
            type: "list",
            message: "Select an operation",
            choices: ["Balance Check", "Withdraw Cash"]
        }
    ]);
    if (operationAns.operation === "Withdraw Cash") {
        let withdrawAns = await inquirer.prompt([
            {
                name: "withdrawMethod",
                type: "list",
                message: "Select a withdrawl method",
                choices: ["Fast Cash", "Enter amount"]
            }
        ]);
        if (withdrawAns.withdrawMethod === "Fast Cash") {
            let fastCashAns = await inquirer.prompt([
                {
                    name: "fastCash",
                    type: "list",
                    message: "Select amount",
                    choices: [1000, 5000, 10000, 15000, 20000]
                }
            ]);
            if (fastCashAns.fastCash > myBalance) {
                console.log(chalk.red("Insufficient Balance."));
            }
            else {
                myBalance -= fastCashAns.fastCash;
                console.log(`${fastCashAns.fastCash} withdrawn successfully.`);
                console.log(`Your remaining balance is: ${myBalance}`);
            }
        }
        else if (withdrawAns.withdrawMethod === "Enter amount") {
            let amountAns = await inquirer.prompt([
                {
                    name: "amount",
                    type: "number",
                    message: "Enter the withdraw amount:",
                }
            ]);
            if (amountAns.amount > myBalance) {
                console.log(chalk.red("Insufficient Balance."));
            }
            else {
                myBalance -= amountAns.amount;
                console.log(`${amountAns.Amount} withdrawn successfully.`);
                console.log(`Your remaining balance is: ${myBalance}`);
            }
        }
    }
    else if (operationAns.operation === "Balance Check") {
        console.log(`Your Account Balance is: ${myBalance}.`);
    }
}
else {
    console.log(chalk.red("P.I.N is incorrect, try again."));
}
