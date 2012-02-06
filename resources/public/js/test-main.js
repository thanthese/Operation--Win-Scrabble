/** setup on start **/

// the redirect is required to get console.logs to show up
$(function() { setTimeout(runTests, 0) })

/** "testing framework" **/

var passedTestsCount = 0
var failedTestsCount = 0

function is(desc, value) {
  if(value) {
    passedTestsCount += 1
  } else {
    console.log("FAILED: " + desc)
    failedTestsCount += 1
  }
}

function isEqual(desc, a, b) {
  if(a == b) {
    passedTestsCount += 1
  } else {
    failedTestsCount += 1
    console.log("FAILED: " + desc + "; " + a + " != " + b)
  }
}

function isEqualArrays(desc, a, b) {
  isEqual(desc, a.toString(), b.toString())
}

function showTotals() {
  console.log("Summary: failed " + failedTestsCount
                   + "; passed " + passedTestsCount)
}

/** tests **/

function runTests() {

  // initial setup
  isEqual("number of words", numberOfWords(), 28)
  isEqual("words gotten", gottenWords(), 0)
  isEqual("not gotten words", notGottenWords(), 28)
  isEqualArrays("letters in guess",
      lettersInGuess(),
      [])
  isEqualArrays("letters in rack",
      lettersInRack(),
      ['A', 'A', 'E', 'R', 'S'])

  is("rack contains 'S'", rackContains('S'))
  is("rack does not contain 'M'", !rackContains('M'))

  // 's' event
  handleLetter('S')
  isEqualArrays("letters in guess after 'S'",
      lettersInGuess(),
      ['S'])
  isEqualArrays("letters in rack after 'S'",
      lettersInRack(),
      ['A', 'A', 'E', 'R'])

  // 'a' event
  handleLetter('A')
  isEqualArrays("letters in guess after 'A'",
      lettersInGuess(),
      ['S', 'A'])
  isEqualArrays("letters in rack after 'A'",
      lettersInRack(),
      ['A', 'E', 'R'])

  // 2nd 'a' event
  handleLetter('A')
  isEqualArrays("letters in guess after second 'A'",
      lettersInGuess(),
      ['S', 'A', 'A'])
  isEqualArrays("letters in rack after second 'A'",
      lettersInRack(),
      ['E', 'R'])

  // 3rd 'a' event
  handleLetter('A')
  isEqualArrays("letters in guess after third 'A'",
      lettersInGuess(),
      ['S', 'A', 'A'])
  isEqualArrays("letters in rack after third 'A'",
      lettersInRack(),
      ['E', 'R'])

  // 'r' event
  handleLetter('R')
  isEqualArrays("letters in guess after 'R'",
      lettersInGuess(),
      ['S', 'A', 'A', 'R'])
  isEqualArrays("letters in rack after 'R'",
      lettersInRack(),
      ['E'])

  // 'e' event
  handleLetter('E')
  isEqualArrays("letters in guess after 'E'",
      lettersInGuess(),
      ['S', 'A', 'A', 'R', 'E'])
  isEqualArrays("letters in rack after 'E'",
      lettersInRack(),
      [])

  // random letter ('y') event
  handleLetter('Y')
  isEqualArrays("letters in guess after 'Y'",
      lettersInGuess(),
      ['S', 'A', 'A', 'R', 'E'])
  isEqualArrays("letters in rack after 'Y'",
      lettersInRack(),
      [])





  // done
  showTotals()
}
