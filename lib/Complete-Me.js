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
      if (!node.children[string[0]]) {
        node.children[string[0]] = new Node (string[0]);
        if (string.length === 1){
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
        node = node.children[string[0]];
        string = string.slice(1);
      }
      return node;
    }
    const allWords = function(stringSoFar, node) {
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
