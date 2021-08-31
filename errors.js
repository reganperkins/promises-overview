
// deeper error handling

// When a promise rejects, the control jumps to the closest rejection handler
// so even though the error is the first promise and catch is at the very end it is still caught
fetch('https://no-such-server.blabla')
  .then(response => response.json())
  .then(user => fetch(`https://api.github.com/users/janwng`))
  .then(response => response.json())
  .then(githubUser => alert(githubUser))
  .catch((err)=>  {
    alert(err.message)
  })

// you don't have to have catch blocks just at the end of code
fetch('https://api.github.com/users/janwng')
  .then(response => response.json())
  .catch((err)=>  {
    alert(`first catch ${err.message}`)
  })
  .then(user => {
    alert(`${user.name} thinks chuck noris jokes are funny`);
    return user;
  })
  .then(user => {
    throw new Error('Opps');
  })
  .catch((err)=>  {
    alert(`second catch got the error ${err.message}`)
  })
  .then(() => {
    alert('Next handler still runs');
  })

// will this trigger the catch?
// no because the catch block can handle synchronous errors but the error
// is not created when the executor is running
new Promise(function(resolve, reject) {
  setTimeout(() => {
    throw new Error("Whoops!");
  }, 1000);
}).catch(alert);


// no issues so catch blocks are skipped
// fetch('https://api.github.com/users/janwng')
//   .then(response => response.json())
//   .catch((err)=>  {
//     alert(`first catch ${err.message}`)
//   })
//   .then(user => {
//     alert(`${user.name} thinks chuck noris jokes are funny`);
//     return user;
//   })
//   .then(user => fetch(`https://api.icndb.com/jokes/random/?escape=javascript`))
//   .catch((err)=>  {
//     alert(`second catch got the error ${err.message}`)
//   })
//   .then(response => response.json())
//   .then(jokeObj => {
//     alert(jokeObj.value.joke);
//     return jokeObj
//   })


// throwing and reject() do the same thing in the executor fn and handlers (then, finally, catch)
// it is better to always reject or throw with a new Error() for consistency and better error logging


// error handling flow-through
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
  })
  .then((mysteryBox) => {
    alert(mysteryBox)
  });