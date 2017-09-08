import Node from './Node.js';
const Word = function(word, priority) {
  this.word = word;
  this.priority = priority;
}

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
        }
      }
      if (string.length > 1) {
        addWordHelper(node.children[string[0]], string.slice(1));
      }
    }
    addWordHelper(this, string);
  }

  suggest(string) {
    let wordObjectArray = [];
    const findStartingNode = function(string, head) {
      let node = head;
      while (string) {
        // console.log(string[0]);
        node = node.children[string[0]];
        string = string.slice(1);
      }
      return node;
    }
    const allWords = function(stringSoFar, node) {
      // console.log(node.children);
      Object.keys(node.children).forEach(function(childKey){
        var newString = stringSoFar + node.children[childKey].data;
        if (node.children[childKey].endWord) {
          wordObjectArray.push(new Word(newString, node.children[childKey].endWord));
        }
        allWords(newString, node.children[childKey]);
      })
    }

    let startingNode = findStartingNode(string, this);
    if (startingNode) {
      allWords(string, startingNode)
    }

    let sortedObjectArray = wordObjectArray.sort( (a,b) => {
      return b.priority - a.priority;
    })

    let sortedWordArray = sortedObjectArray.map( (currentWordObject) => {
      return currentWordObject.word;
    })

    return sortedWordArray;
  }

  select(word) {
    let node = this;
    while (word) {
      // console.log(string[0]);
      node = node.children[word[0]];
      word = word.slice(1);
    }
    node.endWord ++;
  }

  populate(arrayToAdd){
    arrayToAdd.forEach((word) => {
      this.insert(word);
    })
  }

}
