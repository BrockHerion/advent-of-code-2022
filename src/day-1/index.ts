import * as fs from "fs";
import * as readline from "readline";

function main() {
  // Read in values
  const fileStream = fs.createReadStream("src/day-1/input.txt");

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  // Setup variables
  const totalCaloriesPerElf: Array<number> = [];

  let currentMax = 0;

  rl.on("line", (line) => {
    if (line.length > 0) {
      const calorieValue = parseInt(line);
      currentMax += calorieValue;
      return;
    }

    // If we made it here, we landed lon a blank line
    totalCaloriesPerElf.push(currentMax);
    currentMax = 0;
  });

  rl.on("close", () => {
    console.log("Done reading values");
    totalCaloriesPerElf.sort((a, b) => a - b);

    const totalCalories = totalCaloriesPerElf
      .slice(-3)
      .reduce((total, current) => {
        total += current;
        return total;
      }, 0);

    console.log(totalCalories);
  });
}

main();
