// main.js

let body = document.getElementById("body")

let score = 0

while (true) {
  score++;

  if (score == 2) {
    continue;
  }

  console.log(score);
  const element = 
  body.innerHTML = body.innerHTML + `
      <p>${score}</p> <br>
    `

  if (score >= 4) {
    break
  }
}

body.innerHTML = body.innerHTML + `
  <p>Loop has been broken out of</p>
`

console.log("Loop has been broken out of");