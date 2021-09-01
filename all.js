let urls = [
  'https://api.github.com/users/pbyrne',
  'https://api.github.com/users/mo-mar',
  'https://api.github.com/users/sabrinathecodewitch'
];

let requests = urls.map(url => fetch(url));

// wont work -> responses are an array of unresolved promises
Promise.all(requests)
  .then((responses) => responses.map(r => r.json()))
  .then(users => users.forEach(user => console.log(user)));

// will work
// fetch returns a promise so responses are a list of promises
// what will we do?
Promise.all(requests)
  .then((responses) => Promise.all(responses.map(r => r.json())))
  .then(users => users.forEach(user => alert(`got ${user.name}`)));

// If any of the promises is rejected, the promise returned by Promise.all
// immediately rejects with that error.
Promise.all([
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
  new Promise((resolve, reject) => setTimeout(() => reject(new Error("Whoops!")), 2000)),
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
]).catch(alert);

// Promise.all - rejects as a whole if any promise rejects
// Promise.any - waits only for the first fulfilled promise and gets its result

// Promise.allSettled - just waits for all promises to settle, regardless of the results
// Promise.race - waits only for the first settled promise and gets its result
