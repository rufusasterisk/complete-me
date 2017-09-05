export default class Node {
  constructor(string, currentPosition) {
    this.wordsBelowThisNode = [];
    parseString(string, currentPosition);
  }

  parseString(stringToParse, currentPosition) {
    this.wordsBelowThisNode.push(stringToParse)
    if (stringToParse.length === currentPosition) {
      //terminate parse
      // this.wordsBelowThisNode.push(stringToParse);
      return;
    } else {
      let currentCharacter = string.slice(currentPosition, currentPosition + 1)
      if (this[currentCharacter]) {
        this[currentCharacter].parseString(stringToParse, currentPosition + 1);
      } else {
        this[currentCharacter] = new Node(stringToParse, currentPosition + 1)
      }
    }
  }
}
