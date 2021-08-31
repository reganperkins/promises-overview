
// What are promises?
// Promises are a mechanism that allow us to kick off an asynchronous process in the background and respond to its result when it becomes available

new Promise((resolve, reject) => {
  // some logic that may take time to return a value
});

// a lot of the time we use promises for network requests, Ill show you an example
// using the fetch API

fetch('https://api.icndb.com/jokes/random/?escape=javascript')
  .then((fetchPromise) => fetchPromise.json())
  .then((jokeObj) => {
    alert(jokeObj.value.joke);
    // best practice for asynchronous actions to always return a promise
    // this makes it easier to chain other actions on later if needed
    return jokeObj;
  });

// error handling with catch
fetch('https://api.icndb.com/jokes/random/?escape=javascript')
  .then((fetchPromise) => fetchPromise.json())
  .then((jokeObj) => {
    alert(jokeObj.value.joke);
    return jokeObj;
  })
  .then((jokeObj) => {
    throw new Error(`Sorry, the joke "${jokeObj.value.joke}" is not funny`);
  })
  .catch((err)=>  {
    alert(err.message)
  });