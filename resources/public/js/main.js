/* mozRepl

   // re-enter repl
   repl.home()
   repl.enter(content)

   // prove that it's working
   $('body').show()

*/

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

function handleLetter(letter) {
  console.log(letter)
}

function handleEnter() {
  console.log("enter")
}
