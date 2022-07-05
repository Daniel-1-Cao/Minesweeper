import React, { useState, useEffect } from "react";
import Cell from "../Cell/Cell";
import "./Board.css";

function Board() {
  const [board, setBoard] = useState([]);

  const createBoard = (r, c, b) => {
    let bd = [...Array(r)].map((e) =>
      Array(c).fill({ val: "0", revealed: false })
    );
    let bombLeft = r * c;
    let arr = [...Array(r * c).keys()];

    while (r * c - bombLeft < b) {
      const randIdx = Math.floor(Math.random() * bombLeft);
      const rand = arr[randIdx];
      [arr[randIdx], arr[bombLeft]] = [arr[bombLeft], arr[randIdx]];
      let x = Math.floor(rand / c);
      let y = rand % c;
      bd[x][y].val = "bomb";
      bombLeft--;
    }
    setBoard(bd);
  };

  const getSurrondBomb = (r, c) => {
    let surrBombs = 0;
    if (r > 0 && c > 0) {
      if (board[r - 1][c - 1].val === "bomb") {
        surrBombs++;
      }
      if (board[r - 1][c].val === "bomb") {
        surrBombs++;
      }
      if (board[r][c - 1].val === "bomb") {
        surrBombs++;
      }
    }
    if (r > 0 && c < board[0].length - 1) {
      if (board[r - 1][c + 1].val === "bomb") {
        surrBombs++;
      }
      if (board[r][c + 1].val === "bomb") {
        surrBombs++;
      }
    }
    if (c > 0 && r < board.length - 1) {
      if (board[r + 1][c - 1].val === "bomb") {
        surrBombs++;
      }
      if (board[r + 1][c].val === "bomb") {
        surrBombs++;
      }
    }
    if (r < board.length - 1 && c < board[0].length - 1) {
      if (board[r + 1][c + 1].val === "bomb") {
        surrBombs++;
      }
    }
    return surrBombs + "";
  };

  const leftClick = (e) => {
    console.log(e);
  };

  const rightClickup = (e) => {
    console.log(e);
  };

  const rightClickdown = (e) => {
    console.log(e);
  };

  useEffect(() => {
    createBoard(16, 30, 99);
  }, []);

  return (
    <div>
      {board.map((rowVal, rowIndex) => {
        return (
          <div className="row">
            {rowVal.map((colVal, colIndex) => {
              return (
                <Cell
                  value={
                    colVal.val === "bomb" || "flag"
                      ? colVal.val
                      : getSurrondBomb(rowIndex, colIndex)
                  }
                  revealed={colVal.revealed}
                  onLeft={leftClick}
                  onRightup={rightClickup}
                  onRightdown={rightClickdown}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

export default Board;
