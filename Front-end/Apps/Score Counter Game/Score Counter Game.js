var player1 = document.querySelector("#p1");
var player2 = document.querySelector("#p2");
var reset  =  document.querySelector("#reset");
var p1Display = document.querySelector("#p1Display")
var p2Display = document.querySelector("#p2Display")
var maxScore = document.querySelector("p span")
var input = document.querySelector("input");
var gameOver= false;
//default for winning
var winningScore=5;

//initial score for the both players
var p1Score=0;
var p2Score=0;

//p1 function 
player1.addEventListener("click", function(){
	if(!gameOver)
	{
		p1Score++;
		if(p1Score==winningScore)
		{
			gameOver=true;
			p1Display.classList.add("winner");
		}	
		p1Display.textContent= p1Score;
	}

})

//p2function
player2.addEventListener("click", function(){
	if(!gameOver)
	{
		p2Score++;
		if(p2Score==winningScore)
		{
			gameOver=true;
			p2Display.classList.add("winner");
		}	
		p2Display.textContent= p2Score;
	}

})

//reset button
reset.addEventListener("click", function(){
	reset();
})

//reset function
function reset()
{
	p1Score=0;
	p2Score=0;
	p1Display.textContent=0;
	p2Display.textContent=0;
	p1Display.classList.remove("winner")
	p2Display.classList.remove("winner")
	gameOver=false;
}


input.addEventListener("change", function(){
	maxScore.textContent=this.value;
	winningScore=this.value;
	//whenever the input changes, it gets reseted
	reset();
})
