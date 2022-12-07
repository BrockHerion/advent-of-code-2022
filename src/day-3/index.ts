import * as fs from "fs";
import * as readline from "readline";

const asciiUppercaseStart = 65; // A-Z 27-52
const asciiLowercaseStart = 97; // a-z 1-26

function main() {
  // Read in values
  const fileStream = fs.createReadStream("src/day-3/input.txt");

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  let duplicateCharsSum = 0;
  let lineIndex = 0;

  // Create a map to store our chars and their values in
  const charValuesMap = new Map<string, number>();
  // Create an array to filter help filter out values
  let knownChars: Array<string> = [];

  rl.on("line", (line) => {
    // Loop through the first line and build our map
    // We know the dupelicate has to be in the first line, so this will be our base
    if (lineIndex === 0) {
      for (let char of line) {
        const asciiCharCode = char.charCodeAt(0);

        let charValue = 0;
        // Check if it's lowercase first
        if (asciiCharCode >= asciiLowercaseStart) {
          charValue = asciiCharCode - asciiLowercaseStart + 1;
        } else {
          charValue = asciiCharCode - asciiUppercaseStart + 27;
        }

        // Add the char and its value to the map, if its not there already
        if (!charValuesMap.has(char)) {
          charValuesMap.set(char, charValue);
        }

        if (!knownChars.includes(char)) {
          knownChars.push(char);
        }
      }
    } else {
      knownChars = knownChars.filter((char) => line.includes(char));
    }

    lineIndex++;
    // Reset line if we're on the third one and update the sum
    // We should have one item left in the array by the time we're done
    if (lineIndex === 3 && knownChars.length === 1) {
      const dupelicateChar = knownChars[0];
      const dupelicateCharValue = charValuesMap.get(dupelicateChar);

      if (dupelicateCharValue) {
        duplicateCharsSum += dupelicateCharValue;
      }

      // Reset our values for the next 3 lines
      knownChars = [];
      lineIndex = 0;
    }
  });

  rl.on("close", () => {
    console.log(`Done, final result: ${duplicateCharsSum}`);
  });
}

main();
