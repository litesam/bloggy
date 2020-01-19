
function reformatTimeToRead(minutes) {
  const cups = Math.round(minutes / 5);
  return `${new Array(cups || 1).fill('☕').join('')} ${minutes} min read`;
}

export default reformatTimeToRead;