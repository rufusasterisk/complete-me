import Node from './Node.js';

export default class CompleteMe {
  constructor () {
    this.count = 0;
  }
  insert(word) {
    //check if word exists (somehow :( )
    this.count ++;
    let currentCharacter = word.slice(0,1);
    if (this[currentCharacter]) {
      this[currentCharacter].parseString(word, 1)
    } else {
      this[currentCharacter] = new Node(word, 1);
    }
  }
}
