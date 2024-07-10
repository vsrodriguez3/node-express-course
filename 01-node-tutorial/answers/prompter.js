const http = require("http");
var StringDecoder = require("string_decoder").StringDecoder;

const getBody = (req, callback) => {
  const decode = new StringDecoder("utf-8");
  let body = "";
  req.on("data", function (data) {
    body += decode.write(data);
  });
  req.on("end", function () {
    body += decode.end();
    const body1 = decodeURI(body);
    const bodyArray = body1.split("&");
    const resultHash = {};
    bodyArray.forEach((part) => {
      const partArray = part.split("=");
      resultHash[partArray[0]] = partArray[1];
    });
    callback(resultHash);
  });
};

// here, you could declare one or more variables to store what comes back from the form.
let randomNumber = Math.floor(Math.random() * 100) + 1;
let feedback = "Guess a number between 1 and 100";

// here, you can change the form below to modify the input fields and what is displayed.
// This is just ordinary html with string interpolation.
const form = () => {
  return `
  <body>
  <h1>Number Guessing Game</h1>
  <p>${feedback}</p>
  <form method="POST">
  <input type="number" name="guess" required></input>
  <button type="submit">Submit</button>
  </form>
  </body>
  `;
};

const server = http.createServer((req, res) => {
  console.log("req.method is ", req.method);
  console.log("req.url is ", req.url);
  if (req.method === "POST") {
    getBody(req, (body) => {
      console.log("The body of the post is ", body);
      // here, you can add your own logic 
      const userGuess = parseInt(body["guess"], 10);
      if (isNaN(userGuess)) {
        feedback = "Please enter a valid number.";
      } else if (userGuess < randomNumber) {
        feedback = `Your guess of ${userGuess} is too low. Try again!`;
      } else if (userGuess > randomNumber) {
        feedback = `Your guess of ${userGuess} is too high. Try again!`;
      } else {
        feedback = `Congratulations! You guessed the number ${randomNumber} correctly!`;
    
        randomNumber = Math.floor(Math.random() * 100) + 1;
      }
      // Your code changes would end here
      res.writeHead(303, {
        Location: "/",
      });
      res.end();
    });
  } else {
    res.end(form());
  }
});

server.on("request", (req) => {  
  console.log("event received: ", req.method, req.url);  
});

server.listen(3000);
console.log("The server is listening on port 3000.");
