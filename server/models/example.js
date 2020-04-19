console.log("User 1 made a request");
setTimeout(callback,5000);

console.log("User 2 made a request");
setTimeout(callback,5000);

console.log("User 3 made a request");
setTimeout(callback,5000);


function callback(){
  console.log("Queried Database and deliever data");	
}
