import objList from './object-choices';

export const GameState = Object.freeze({
    WELCOMING:   Symbol("welcoming"),
    PLAY_AGAIN: Symbol("playAgain"),
    QUESTIONS: Symbol("questions"),
    END: Symbol("end")
});

export default class Game{
    constructor(){
        this.stateCur = GameState.WELCOMING;
        this.numQuestions = 20
        this.object = objList[Math.floor(Math.random()*objList.length)];
        this.gameNum=0;
    }
    // boolean function returns true when users guess is in chosen object's property list
    guessCorrect(sInput){
        var result = false;
        this.object.forEach(checkValue)
        
        function checkValue(item){
            result = result || (sInput.toLowerCase().match(item)!=null);
        };
        return result;
    }
    // string function, takes user input and responds with next step in the game. 
    makeAMove(sInput)
    {
        let sReply;
        switch(this.stateCur){
            case GameState.WELCOMING:
                sReply = "Welcome! I'm thinking of an animal. You have 20 yes or no questions to get the correct answer. Ask a question!";
                this.numQuestions = 20
                this.object = objList[Math.floor(Math.random()*objList.length)];
                this.stateCur = GameState.QUESTIONS;
                break;
            case GameState.PLAY_AGAIN:
                if(sInput.toLowerCase().match("play")||sInput.toLowerCase().match("again")||sInput.toLowerCase().match("start")||sInput.toLowerCase().match("yes")){
                    sReply = "I'm thinking of an animal. You have 20 yes or no questions to get the correct answer. Ask a question!";
                    this.stateCur = GameState.QUESTIONS;
                }
                else {
                    sReply = "Okay, have a nice day. Type anything to play again."
                    this.stateCur = GameState.END;
                }
                break;
            case GameState.QUESTIONS:
                if(this.numQuestions==1){
                    sReply ="Sorry, you lose! Do you want to play again?";
                    this.numQuestions=20;
                    this.gameNum+=1;
                    this.object = objList[Math.floor(Math.random(this.gameNum)*objList.length)];
                    this.stateCur = GameState.PLAY_AGAIN;
                }
                else if(sInput.toLowerCase().match(this.object.name)!=null){
                    sReply="Congratulations, you won! Do you want to play again?";
                    this.numQuestions=20;
                    this.gameNum+=1;
                    this.object = objList[Math.floor(Math.random(this.gameNum)*objList.length)];
                    this.stateCur =GameState.PLAY_AGAIN;
                }
                else if(this.guessCorrect(sInput)){
                    this.numQuestions-=1;
                    sReply="Yes! "+this.numQuestions+" questions left.";
                    this.stateCur = GameState.QUESTIONS;
                } 
                else {
                    this.numQuestions-=1;
                    sReply = "No :( "+this.numQuestions+" questions left.";
                    this.stateCur = GameState.QUESTIONS;
                }
                break; 
            case GameState.END:
                if(sInput){
                    sReply = "Welcome back! I'm thinking of an animal. You have 20 yes or no questions to get the correct answer. Ask a question!";
                    this.stateCur = GameState.QUESTIONS;
                }
                break;
        }
        return([sReply]);
    }
}