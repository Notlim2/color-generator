window.possibleValues = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
];

const generateColors = () => {
  const generatedColors = [];
  for (let i = 0; i < window.possibleValues.length; i++) {
    for (let j = 0; j < window.possibleValues.length; j++) {
      for (let k = 0; k < window.possibleValues.length; k++) {
        const iValue = window.possibleValues[i];
        const jValue = window.possibleValues[j];
        const kValue = window.possibleValues[k];
        generatedColors.push(`#${iValue}${jValue}${kValue}`);
      }
    }
  }

  const redTones = getByTone("red", generatedColors, window.possibleValues);
  const greenTones = getByTone("green", generatedColors, window.possibleValues);
  const blueTones = getByTone("blue", generatedColors, window.possibleValues);
  const grayTones = getByTone("", generatedColors, window.possibleValues);

  generatedColors.splice(
    0,
    generatedColors.length,
    ...grayTones,
    ...redTones,
    ...greenTones,
    ...blueTones
  );

  return generatedColors;
};

const getByTone = (tone, colors, possibleValues) => {
  let toneIndex = 0;
  switch ((tone || "").trim().toLowerCase()) {
    case "red":
      toneIndex = 1;
      break;
    case "green":
      toneIndex = 2;
      break;
    case "blue":
      toneIndex = 3;
      break;
    default:
      toneIndex = 0;
      break;
  }

  return (colors || []).filter((color) => {
    if (toneIndex === 0) {
      const rValue = color[1];
      const gValue = color[2];
      const bValue = color[3];
      return rValue === gValue && rValue === bValue;
    } else {
      const toneIndexes = [1, 2, 3];
      toneIndexes.splice(toneIndex - 1, 1);

      let isValidColorTone = true;
      for (let toneIndexToCompare of toneIndexes) {
        const possibleValueIndex = window.possibleValues.indexOf(
          `${color[toneIndex]}`
        );
        const possibleValueIndexToCompare = window.possibleValues.indexOf(
          `${color[toneIndexToCompare]}`
        );
        if (possibleValueIndex <= possibleValueIndexToCompare) {
          isValidColorTone = isValidColorTone && false;
        }
      }

      return isValidColorTone;
    }
  });
};

const pushColorsToDiv = (generatedColors) => {
  const colorsContainer = document.querySelector(".colors");
  colorsContainer.innerHTML = "";

  for (let generatedColor of generatedColors) {
    const colorDiv = document.createElement("div");
    colorDiv.innerText = generatedColor;
    colorDiv.style.background = generatedColor;
    colorDiv.classList.add("color");
    colorDiv.onclick = () => copyColor(generatedColor);

    colorsContainer.appendChild(colorDiv);
  }
};

const generateAndShowColors = (event, tone) => {
  const allGeneratedColors = generateColors();
  let generatedColors = [];

  if (!tone) {
    pushColorsToDiv(allGeneratedColors);
  } else {
    switch (tone) {
      case "red":
        generatedColors = getByTone(tone, allGeneratedColors);
        pushColorsToDiv(generatedColors);
        break;
      case "green":
        generatedColors = getByTone(tone, allGeneratedColors);
        pushColorsToDiv(generatedColors);
        break;
      case "blue":
        generatedColors = getByTone(tone, allGeneratedColors);
        pushColorsToDiv(generatedColors);
        break;
      case "gray":
        generatedColors = getByTone("", allGeneratedColors);
        pushColorsToDiv(generatedColors);
        break;
    }
  }
};

const copyColor = (color) => {
  const colorInput = document.createElement("input");
  colorInput.value = color;
  colorInput.style.display = "none";

  document.body.appendChild(colorInput);

  colorInput.select();
  colorInput.setSelectionRange(0, 9999);
  navigator.clipboard.writeText(colorInput.value);

  colorInput.remove();

  createAlert(`Cor "${color}" copiada com sucesso!`);
};

const createAlert = (text) => {
  const alert = document.createElement("div");
  alert.classList.add("alert");
  alert.innerText = text;

  document.body.appendChild(alert);

  setTimeout(() => {
    alert.remove();
  }, 5000);
};

window.onload = generateAndShowColors;
