"use strict";
// Node has data and a yes (left) and no (right) answer
class Node {
  constructor(data, y, n){
    this.data = data;
    this.yes = y;
    this.no = n;
  }
}

readlineSync = require('readline-sync');
fs = require("fs");

class Tree{
  constructor(path){
    // Read in an animal decision tree
    this.tree = fs.readFileSync(path);
    this.root = JSON.parse(tree);
  }
}

(function () {
  var node;
  var ans = true;

  console.log('Welcome to the animal game!\nThink of an animal,\nand I will try to guess it!\nIf I do not know know your animal you can teach me!');

  // Play the game
  while (/*ask("\nDo you want to play?")*/ans) {
    node = (new Tree('tree.json')).root;
    go();
    ans = false;
  }

  function go() {
    // If it's not a "terminal" node (i.e. animal)
    while (node.yes && node.no) {
      // Ask the question: Yes or No?
      if (ask(node.data)) {
        node = node.yes;
      } else {
        node = node.no;
      }
    }
    // We're at the end, guess!
    if (!ask("Is it a " + node.data + "?")) {
      // Wrong!
      train(node);
    } else {
      // Right!
      console.log("I knew it!");
    }
  }

  // Ask a question, return true for yes
  function ask(question) {
    var answer = readlineSync.question(question + " (y/n): ").toUpperCase();
    return (answer.charAt(0) == "Y");
  }
/*
  // Train a node to get the right answer
  function train(node) {
    // The wrong guess
    var guess = node.data;
    // What is it?
    var answer = readlineSync.question("Ok, what are you? ");
    // Get a new question?
    var question = readlineSync.question("Suggest a yes/no question to distinguish a " + guess + " from a " + answer + ".\n");
    node.data = question;
    // Yes or no for that question
    if (ask("Answer for a " + answer + ": " + question)) {
      node.yes = new Node(answer);
      node.no = new Node(guess);
      console.log ("Great! Now I know about " + answer + "s !");
      console.log("Play again?");
    } else {
      node.yes = new Node(guess);
      node.no = new Node(answer);
      //adding it here did not gen a thanks
      //console.log(thank);
    }
    // Save back to the file
    var tree = JSON.stringify(root, null, 2);
    fs.writeFileSync('tree.json', tree);
  }*/
})();
