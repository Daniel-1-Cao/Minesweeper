import React from "react";

function Cell(props) {
  const { value, revealed, onLeft, onRightup, onRightdown } = props;

  return (
    <div>
      {revealed ? (
        <div>{value}</div>
      ) : (
        <button
          onClick={onLeft}
          onMouseDown={onRightdown}
          onMouseUp={onRightup}
        />
      )}
    </div>
  );
}

export default Cell;
