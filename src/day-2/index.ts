/*
 * Foe
 * A Rock
 * B Paper
 * C Scissors
 *
 * Me
 * X Lose
 * Y Draw
 * Z Win
 *
 * Rock +1
 * Paper +2
 * Scissors +3
 *
 * Round scoring
 * +0 Loss
 * +3 Draw
 * +6 Win
 */

import * as fs from "fs";
import * as readline from "readline";

const shapes = {
  rock: {
    value: 1,
    beats: "scissors",
  },
  paper: {
    value: 2,
    beats: "rock",
  },
  scissors: {
    value: 3,
    beats: "paper",
  },
};

const opponentShapeSelections = {
  a: "rock",
  b: "paper",
  c: "scissors",
};

const roundeOutcomes = {
  x: "lose",
  y: "draw",
  z: "win",
};

function main() {
  // Read in values
  const fileStream = fs.createReadStream("src/day-2/input.txt");

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  let finalScore = 0;

  rl.on("line", (line) => {
    let roundScore = 0;

    // Split on the space
    // inputs[0] is for opponent and inputs[1] is for me
    const inputs = line.split(" ");

    const opponentInput = inputs[0].toLowerCase();
    const myInput = inputs[1].toLowerCase();

    const opponentShapeSelection =
      opponentShapeSelections[
        opponentInput as keyof typeof opponentShapeSelections
      ];
    const opponentShape = shapes[opponentShapeSelection as keyof typeof shapes];

    const roundOutcome = roundeOutcomes[myInput as keyof typeof roundeOutcomes];

    if (roundOutcome === "lose") {
      // We lose, so pick the shape that loses to the selection
      const myShape = opponentShape.beats;
      roundScore += shapes[myShape as keyof typeof shapes].value;
    } else if (roundOutcome === "draw") {
      // Draw, so pick the shape the oppponenet selected
      roundScore += opponentShape.value + 3;
    } else {
      // Only other case is we win, so find the shape the beats our opponents
      const myShapeKey = Object.keys(shapes).find(
        (key) =>
          shapes[key as keyof typeof shapes].beats === opponentShapeSelection
      );
      roundScore += shapes[myShapeKey as keyof typeof shapes].value + 6;
    }

    finalScore += roundScore;
  });

  rl.on("close", () => {
    console.log(`Done! Final score is ${finalScore}`);
  });
}

main();
