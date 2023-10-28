const positionContainer = document.getElementById("position-container");
const labelContainer = document.getElementById("label-container");
const resetButton = document.getElementById("reset-button");

const ROWS = 5;
const COLS = 4;

let selectedPosition = null;

const getButtonId = (row, col) => `button-${row}-${col}`;

const setPositionButtonState = (row, state) => {
  const rows = positionContainer.querySelectorAll(".row");

  const activeRow = rows[row];

  rows.forEach((row, index) => {
    const buttons = row.querySelectorAll(".button");
    buttons.forEach((button) => {
      button.disabled = true;
    });
  });

  if (row > ROWS - 1) {
    return;
  }

  const buttons = activeRow.querySelectorAll(".button");
  buttons.forEach((button) => {
    button.disabled = state;
  });
};

const setLabelButtonState = (state) => {
  const buttons = labelContainer.querySelectorAll(".button");
  buttons.forEach((button) => {
    button.disabled = state;
  });
};

const renderPositions = () => {
  for (let i = 0; i < ROWS; i++) {
    const row = document.createElement("div");
    row.classList.add("row");

    for (let j = 0; j < COLS; j++) {
      const button = document.createElement("button");
      button.classList.add("button");
      button.id = getButtonId(i, j);

      if (i !== 0) {
        button.disabled = true;
      }

      row.appendChild(button);

      button.addEventListener("click", () => {
        selectPosition(i, j);
      });
    }

    positionContainer.appendChild(row);
  }
};

const renderLabels = () => {
  const row = document.createElement("div");
  row.classList.add("row");

  for (let j = 0; j < COLS; j++) {
    const button = document.createElement("button");
    button.classList.add("button");
    button.id = getButtonId(ROWS, j);
    button.innerText = j + 1;
    button.disabled = true;
    row.appendChild(button);

    button.addEventListener("click", () => {
      selectLabel(j);
    });
  }

  labelContainer.appendChild(row);
};

const selectPosition = (row, col) => {
  if (selectedPosition) {
    const button = document.getElementById(getButtonId(...selectedPosition));
    button.classList.remove("selected");
  }

  selectedPosition = [row, col];

  const button = document.getElementById(getButtonId(row, col));
  button.classList.add("selected");

  setLabelButtonState(false);
};

const selectLabel = (col) => {
  if (!selectedPosition) {
    return;
  }

  const button = document.getElementById(getButtonId(...selectedPosition));
  button.innerText = col + 1;
  button.classList.remove("selected");
  button.classList.add("highlight");

  const row = selectedPosition[0];
  setPositionButtonState(row + 1, false);

  selectedPosition = null;
  setLabelButtonState(true);
};

const reset = () => {
  positionContainer.innerHTML = "";
  labelContainer.innerHTML = "";

  selectedPosition = null;

  render();
};

const render = () => {
  renderPositions();
  renderLabels();
};

resetButton.addEventListener("click", reset);

render();
