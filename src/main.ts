import "./style.css";

const resultEl = document.getElementById("result") as HTMLSpanElement;
const lengthEl = document.getElementById("length") as HTMLInputElement;
const uppercaseEl = document.getElementById("uppercase") as HTMLInputElement;
const lowercaseEl = document.getElementById("lowercase") as HTMLInputElement;
const numbersEl = document.getElementById("numbers") as HTMLInputElement;
const symbolsEl = document.getElementById("symbols") as HTMLInputElement;
const generateEl = document.getElementById("generate") as HTMLButtonElement;
const clipboardEl = document.getElementById("clipboard") as HTMLDivElement;

type RandomFunc = {
  lower: () => string;
  upper: () => string;
  number: () => string;
  symbol: () => string;
};

const randomFunc: RandomFunc = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbol,
};

clipboardEl.addEventListener("click", () => {
  const textArea = document.createElement("textarea");
  const password = resultEl.innerText;

  if (!password) return;

  textArea.value = password;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand("copy");
  textArea.remove();
  alert("Password copied to clipboard!");
});

// Generate password
generateEl.addEventListener("click", () => {
  const length = +lengthEl.value;
  const hasLower = lowercaseEl.checked;
  const hasUpper = uppercaseEl.checked;
  const hasNumber = numbersEl.checked;
  const hasSymbol = symbolsEl.checked;

  resultEl.innerText = generatePassword(
    hasLower,
    hasUpper,
    hasNumber,
    hasSymbol,
    length
  );
});

// Properly typed generatePassword function
const generatePassword = (
  lower: boolean,
  upper: boolean,
  number: boolean,
  symbol: boolean,
  length: number
): string => {
  let generatedPassword = "";
  const typesCount =
    Number(lower) + Number(upper) + Number(number) + Number(symbol);
  const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(
    (type) => Object.values(type)[0]
  );

  if (typesCount === 0) {
    console.log("No checkbox selected!");
    return "";
  }

  for (let i = 0; i < length; i += typesCount) {
    typesArr.forEach((type) => {
      const funcName = Object.keys(type)[0] as keyof RandomFunc;
      generatedPassword += randomFunc[funcName]();
    });
  }

  const finalPassword = generatedPassword.slice(0, length);
  return finalPassword;
};

// Random generators
function getRandomLower(): string {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper(): string {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber(): string {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol(): string {
  const symbols = "!@#$%^&*(){}[]=<>/,.";
  return symbols[Math.floor(Math.random() * symbols.length)];
}
