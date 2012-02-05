/* mozRepl

   // re-enter repl
   repl.home()
   repl.enter(content)

   // prove that it's working
   $('body').show()

*/

/** "hardware" ui interface **/

function codeOf(ch) {
  return ch.charCodeAt(0)
}

// call handlers on physical keypress
$(document).keypress(function(key) {
  var code = key.which
  var in_az = (code >= codeOf('a') && code <= codeOf('z'))
  var in_AZ = (code >= codeOf('A') && code <= codeOf('Z'))
  var enter = (code == 13)
  if(in_az || in_AZ) {
    handleLetter(String.fromCharCode(key.which).toUpperCase())
  } else if(enter) {
    handleEnter()
  }
})

/** handlers **/

function handleLetter(letter) {
  //console.log(letter)
}

function handleEnter() {
  //console.log("enter")
}

/** counters **/

// number of words the user has figured out
function gottenWords() {
  return numberOfWords() - notGottenWords()
}

// number of words the user has not yet figured out
function notGottenWords() {
  return $('div.word[state="not-gotten"]').length
}

// the total number of words the user had to figure out when the
// round started
function numberOfWords() {
  return $('div.word').length
}

// the number of letters that have moved up to guess from rack
function lettersInGuess() {
  return $('div.guess-letter')
    .map(function(i, letter) { return letter.innerHTML })
    .toArray() // use native js filter method
    .filter(function(letter) { return letter != "" })
}

// the number of letters in rack that have not yet moved up to
// guess
function lettersInRack() {
  return $('div.rack-letter')
    .map(function(i, n) { return n.innerHTML })
    .toArray()
    .filter(function(letter) { return letter != "" })
}

// return whether the rack currently contains the characters --
// doesn't count if the letter has moved up the guess
function rackContains(ch) {
  return $(lettersInRack())
    .filter(function(i, n) { return (n == ch) })
    .length > 0
}
