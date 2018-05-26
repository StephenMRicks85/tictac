import { Component } from '@angular/core';
import {Platform} from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  player = 'X';
  cells = Array(9).fill(null);
  winner = null;
  platform = null;

  constructor(platform: Platform) {
  	this.platform = platform;
  }

  get gameState(){

  	var draw = this.cells.indexOf(null) //check if no moves are left
  	if (draw === -1)
  		return 'DRAW';
  	if (this.winner) {
  		return `${this.winner} WINS!`;
  	} else {
  		return `${this.player}'S TURN`;
  	}
  }

  makeMove(position) {
    if(!this.winner && !this.cells[position] ){
      this.cells[position] = this.player;
      if(this.winnerCheck()) {
        this.winner = this.player;
      }
      this.player = this.player === 'X' ? 'O' : 'X';
    }
  }

  winnerCheck() {
    const winConditions = [
      [0, 1, 2], 
      [3, 4, 5], 
      [6, 7, 8],
      [0, 3, 6], 
      [1, 4, 7], 
      [2, 5, 8],
      [0, 4, 8], 
      [2, 4, 6] 
    ];

    for (let position of winConditions) {
        if (   this.cells[position[0]] === this.player
            && this.cells[position[1]] === this.player
            && this.cells[position[2]] === this.player) {
              return true;
        }
    }
    return false;
  }

  restartGame() {

    this.player = 'X';
    this.cells = Array(9).fill(null);
    this.winner = null;
  }

  exitApp(){
  	if (this.platform) //not present when running with ionc serve
     this.platform.exitApp();
  }

}