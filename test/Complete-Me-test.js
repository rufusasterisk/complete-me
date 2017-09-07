import { expect } from 'chai';
import fs from 'fs'
import Node from '../lib/Node';
import CompleteMe from '../lib/Complete-Me';
import locus from 'locus';
const text = "/usr/share/dict/words"
const dictionary = fs.readFileSync(text).toString().trim().split('\n')

describe('CompleteMe', function() {

  it('should start empty', function() {
    let myComplete = new CompleteMe();

    expect(myComplete.count).to.eq(0)
  })

  it('should accept a word', function() {
    let myComplete = new CompleteMe();
    myComplete.insert('dance');
    // console.log(JSON.stringify(myComplete.children));
    expect(myComplete.count).to.eq(1);
    expect(myComplete.children.d.children.a.children.n.children.c.children.e.endWord).to.equal(1);
  })

  // it.skip('should not duplicate nodes', function() {
  //   let myComplete = new CompleteMe();
  //   myComplete.insert('amber');
  //   myComplete.insert('apple');
  // expect(myComplete.a.wordsBelowThisNode).to.deep.eq(['amber', 'apple'])
  // })

  it('should return suggestions', function() {
    let myComplete = new CompleteMe();
    myComplete.insert('apple');
    myComplete.insert('application');
    myComplete.insert('amber');
    // console.log(myComplete.suggest('a'));
    expect(myComplete.suggest('a')).to.deep.eq(['apple', 'application', 'amber'])
  })

  it('should load a dictionary', function() {
    let myComplete = new CompleteMe();
    myComplete.populate(dictionary);
    expect(myComplete.count).to.eq(dictionary.length)
    console.log(JSON.stringify(myComplete.suggest('appl')));
  })
})
