import Node from './Node.js';

export default class CompleteMe {
  constructor () {
    this.count = 0;
    this.children = {};
  }
  insert(string) {
    const addWordHelper = (node, string) => {
      // if children doesn't contain the first letter of the string
      if (!node.children[string[0]]) {
        //create a new node in the children object
        node.children[string[0]] = new Node (string[0]);
        //if that's the last character in the string
        if (string.length === 1){
          //set end of word
          node.children[string[0]].endWord = 1;
          this.count++
        } else {

        }
        if (string.length > 1) {
          addWordHelper(node.children[string[0]], string.slice(1));
        }
      }
      addWordHelper(this, string)
    }
  }
}
