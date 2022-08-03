let currentRandomString = '';

const randomString = () => {
  let string = '';
  const length = Math.round(Math.random() * 5 + 1);

  for (let i = 0; i < length; i++) {
    string += Math.round(Math.random() * 10 + 1); 
  }

  return string;
};

const printRandomString = () => {
  currentRandomString = `${new Date()}: ${randomString()}`;
  console.log(currentRandomString);
};

const getCurrentRandomString = () => currentRandomString;

setInterval(() => {
  printRandomString();
}, 5000);

printRandomString();

module.exports = {
  getCurrentRandomString
};
