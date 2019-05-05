const getRandomEntry = arr => {
  const randomInt = Math.floor(Math.random() * Math.floor(arr.length));
  return arr[randomInt];
};

module.exports = { getRandomEntry };
