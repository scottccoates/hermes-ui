//https://gist.github.com/danharper/74a5102363fbd85f6b67
export default function (ms = 0) {
  return new Promise(r => setTimeout(r, ms));
};
