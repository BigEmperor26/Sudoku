import { useEffect, useState } from "react";
import Sudoku2DHome from "./Sudoku2DHome";
import Sudoku2DPage from "./Sudoku2DPage";
import { Sudoku2D } from "common/types/sudoku2d";
import { solveSudoku } from "common/types/dlxSolver2d";
import { getStorage, setStorage } from "common/utils/storage";
import SudokuLost from "./Sudoku2DLost";
import SudokuWin from "./Sudoku2DWin";

const difficultyMap: Record<string, number> = {
  easy: 0.3,
  medium: 0.5,
  hard: 0.7,
  impossible: 0.8,
};
const maxLifes = 3;
// initial landing page that handles difficulty selection, state management on page refresh, and sudoku generation
const Sudoku2DComplete = () => {
  const [difficulty, setDifficulty] = useState<string | null>(
    () => getStorage("difficulty") || null
  );
  const [initialSudoku, setInitialSudoku] = useState<Sudoku2D>(() => {
    const data = getStorage("initialSudoku");
    if (data) {
      const sudoku = new Sudoku2D();
      sudoku.data = data;
      return sudoku;
    }
    return new Sudoku2D();
  });
  const [sudoku, setSudoku] = useState<Sudoku2D>(() => {
    const data = getStorage("sudoku");
    if (data) {
      const sudo = new Sudoku2D();
      sudo.data = data;
      const possible = getStorage("possible");
      if (possible) {
        sudo.possible = possible;
      }
      return sudo;
    }

    return new Sudoku2D();
  });
  const [solvedSudoku, setSolvedSudoku] = useState<Sudoku2D>(() => {
    const data = getStorage("solvedSudoku");
    if (data) {
      const sudo = new Sudoku2D();
      sudo.data = data;
      return sudo;
    }

    return new Sudoku2D();
  });
  const [missingNumbersCounts, setMissingNumbersCounts] = useState<number[]>(
    () =>
      getStorage("missingNumbersCounts") || Array.from({ length: 9 }, () => 0)
  );
  useEffect(() => {
    console.log("sudoku", missingNumbersCounts);
  }, [missingNumbersCounts]);

  const [hints, setHints] = useState<number>(() => getStorage("hints") || 3);
  const [lives, setLives] = useState<number>(() => getStorage("lives") || 3);

  function resetSudoku(diff: string) {
    const newSudoku = new Sudoku2D();
    newSudoku.initRandomSeed();
    const solution = solveSudoku(newSudoku.data, 9);
    if (!solution) {
      resetSudoku(diff);
      return;
    }
    setSolvedSudoku(() => {
      const sol = new Sudoku2D();
      sol.data = solution;
      setStorage("solvedSudoku", sol.data);
      return sol;
    });

    setSudoku(() => {
      const sol = new Sudoku2D();
      sol.fillSudoku(solution);
      sol.clearPercentage(difficultyMap[diff]);
      const counts = sol.countNumbers();
      setMissingNumbersCounts(counts);
      setStorage("missingNumbersCounts", counts);
      // set the initial sudoku
      setInitialSudoku(() => {
        const init = new Sudoku2D();
        init.data = sol.data.map((x) => x.map((y) => y));
        setStorage("initialSudoku", sol.data);
        return init;
      });
      setStorage("sudoku", sol.data);
      setStorage("possible", sol.possible);
      return sol;
    });
    setStorage("lives", maxLifes);
    setLives(maxLifes);
    setStorage("hints", 3);
    setHints(3);
  }

  function handleInput(
    value: number,
    curr: [number, number] | null,
    isCurrentNote: boolean
  ) {
    // skip if current selected cell was setted by initial sudoku
    if (curr && initialSudoku?.data[curr[0]][curr[1]] !== 0) {
      return;
    }
    if (isCurrentNote && curr) {
      setSudoku((prev) => {
        const newInputSudoku = new Sudoku2D();
        newInputSudoku.possible = prev.possible.map((x) =>
          x.map((y) => y.map((z) => z))
        );
        newInputSudoku.data = prev.data.map((x) => x.map((y) => y));

        const [x, y] = curr;
        // if value is already in the possible array, remove it
        if (prev.possible[x][y].includes(value)) {
          newInputSudoku.possible[x][y] = prev.possible[x][y].filter(
            (val) => val !== value
          );
        } else {
          newInputSudoku.possible[x][y] = [...prev.possible[x][y], value];
        }
        setStorage("sudoku", newInputSudoku.data);
        setStorage("possible", newInputSudoku.possible);
        return newInputSudoku;
      });
    } else if (curr) {
      // check if there is a solution for the new input
      // const prevValue = sudoku.data[curr[0]][curr[1]];

      setSudoku((prev) => {
        const newInputSudoku = new Sudoku2D();
        newInputSudoku.data = prev.data.map((x) => x.map((y) => y));
        newInputSudoku.possible = prev.possible.map((x) => x.map((y) => y));
        // set the new value
        newInputSudoku.data[curr[0]][curr[1]] = value;
        const solution = solveSudoku(newInputSudoku.data, 9);
        if (!solution) {
          setLives((pr) => {
            setStorage("lives", pr - 1);
            return pr - 1;
          });
          return newInputSudoku;
        } else {
          // if there is a solution, update the solution beacause it might not match the previous solution
          setSolvedSudoku(() => {
            const sol = new Sudoku2D();
            sol.data = solution;
            setStorage("solvedSudoku", sol.data);
            return sol;
          });
          setMissingNumbersCounts(() => {
            const counts = newInputSudoku.countNumbers();
            setStorage("missingNumbersCounts", counts);
            return counts;
          });
          // update also the possible values
          newInputSudoku.removePossible(value, curr[0], curr[1]);
          setStorage("sudoku", newInputSudoku.data);

          return newInputSudoku;
        }
      });
    }
  }

  function clearInput(curr: [number, number] | null) {
    if (curr && initialSudoku.data[curr[0]][curr[1]] === 0) {
      setSudoku((prev) => {
        const newInputSudoku = new Sudoku2D();
        newInputSudoku.data = prev.data.map((x) => x.map((y) => y));
        newInputSudoku.possible = prev.possible.map((x) =>
          x.map((y) => y.map((z) => z))
        );
        const [x, y] = curr;
        newInputSudoku.data[x][y] = 0;
        newInputSudoku.possible[x][y] = [];
        setMissingNumbersCounts(() => {
          const counts = newInputSudoku.countNumbers();
          setStorage("missingNumbersCounts", counts);
          return counts;
        });
        setStorage("sudoku", newInputSudoku.data);
        return newInputSudoku;
      });
    }
  }
  function showHint(curr: [number, number] | null) {
    if (curr && hints > 0 && initialSudoku.data[curr[0]][curr[1]] === 0) {
      setHints((prev) => {
        setStorage("hints", prev - 1);
        return prev - 1;
      });
      setSudoku((prev) => {
        const newInputSudoku = new Sudoku2D();
        newInputSudoku.data = prev.data.map((x) => x.map((y) => y));
        newInputSudoku.possible = prev.possible.map((x) =>
          x.map((y) => y.map((z) => z))
        );
        const [x, y] = curr;
        newInputSudoku.data[x][y] = solvedSudoku.data[x][y];
        setMissingNumbersCounts(() => {
          const counts = newInputSudoku.countNumbers();
          setStorage("missingNumbersCounts", counts);
          return counts;
        });

        // update also the possible values
        newInputSudoku.removePossible(
          solvedSudoku.data[x][y],
          curr[0],
          curr[1]
        );
        setStorage("sudoku", newInputSudoku.data);
        return newInputSudoku;
      });
    }
  }

  if (difficulty === null) {
    return (
      <Sudoku2DHome
        onChange={(dif) => {
          setDifficulty(dif);
          setStorage("difficulty", dif);
          resetSudoku(dif);
        }}
      />
    );
  } else {
    return (
      <>
        <Sudoku2DPage
          lives={lives}
          maxLifes={maxLifes}
          difficulty={difficulty}
          initialSudoku={initialSudoku}
          sudoku={sudoku}
          onInputChange={(value, curr, isNote) => {
            handleInput(value, curr, isNote);
          }}
          solvedSudoku={solvedSudoku}
          missingNumbersCounts={missingNumbersCounts}
          hints={hints}
          onReset={resetSudoku}
          onSHowHint={(curr) => {
            showHint(curr);
          }}
          onClearInput={(curr) => {
            clearInput(curr);
          }}
          onQuit={() => {
            setDifficulty(null);
            setStorage("difficulty", null);
            setHints(3);
            setStorage("hints", 3);
          }}
        />

        <SudokuLost
          lost={lives === 0}
          onNewGame={() => {
            setDifficulty(null);
            setStorage("difficulty", null);
          }}
          onContinue={() => {
            setLives(maxLifes);
            setStorage("lives", maxLifes);
          }}
        />

        <SudokuWin
          win={missingNumbersCounts.every((x) => x === 9)}
          onNewGame={() => {
            setDifficulty(null);
            setStorage("difficulty", null);
          }}
          onContinue={() => {
            setLives(maxLifes);
            setStorage("lives", maxLifes);
          }}
        />
      </>
    );
  }
};
export default Sudoku2DComplete;
