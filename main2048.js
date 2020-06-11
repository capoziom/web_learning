var score=0;
var board=[];
var hasAdded=[];

$(document).ready(function(){
    newgame();
});

function newgame(){
    // 初始化棋盘
    init();
    // 随机两个数
    generateNumber();
    generateNumber();
}

function init(){
    for(var i=0;i<4;i++)
        for(var j=0;j<4;j++){
            var grid_cell=$("#grid-cell-"+i+"-"+j)
            grid_cell.css('top',getPosTop(i,j))
            grid_cell.css('left',getPosLeft(i,j))
        }
    
    for(var i=0;i<4;i++){
        board[i]=[];
        hasAdded[i]=[];
        for(var j=0;j<4;j++){
            board[i][j]=0;
            hasAdded[i][j]=false;
        }
    }

    updateBoardView();
    score=0;
}

function updateBoardView(){
    $(".number-cell").remove();
        for(var i=0;i<4;i++)
            for(var j=0;j<4;j++){
                $("#grid-container").append("<div class='number-cell' id='number-cell-"+i+"-"+j+"'></div>");
                var theNumberCell=$('#number-cell-'+i+'-'+j);

                if(board[i][j]==0){
                    theNumberCell.css('width','0px');
                    theNumberCell.css('height','0px');
                    theNumberCell.css('top',getPosTop(i,j)+50);
                    theNumberCell.css('left',getPosLeft(i,j)+50);
                }
                else{
                    theNumberCell.css('top',getPosTop(i,j));
                    theNumberCell.css('left',getPosLeft(i,j));
                    theNumberCell.css('width','100px');
                    theNumberCell.css('height','100px');
                    theNumberCell.css('background-color',getNumberBackgroundColor(board[i][j]));
                    theNumberCell.css('color',getNumberColor(board[i][j]));
                    theNumberCell.text(board[i][j])
                }
                hasAdded[i][j]=false;
            }
}

function generateNumber(){
    // 判断棋盘是否有空余空间
    if (nospace(board))
        return false;
    else {
        // 随机一个位置
        var randomx = parseInt(Math.floor(Math.random()*4));
        var randomy = parseInt(Math.floor(Math.random()*4));
        while(true){
            if(board[randomx][randomy]==0)
                break;
            else{
                randomx = parseInt(Math.floor(Math.random()*4));
                randomy = parseInt(Math.floor(Math.random()*4));
            }
        }
        // 随机一个数
        var randomNum=Math.random()>0.5?2:4;
        // 显示这个随机数
        board[randomx][randomy]=randomNum;
        showGenerateNumber(randomx,randomy,randomNum);
        return true
    }
    
}

$(document).keydown(function(event){
    event.preventDefault();
    switch(event.keyCode){
        case 37://left
            if(moveleft()){
                //generateNumber();
                setTimeout("generateNumber()",210);
                setTimeout("isGameOver()",300);
            }
            break;
        case 38: //up
            if(moveup()){
                setTimeout("generateNumber()",210);
                setTimeout("isGameOver()",300);
            }
            break;
        case 39://right
            if(moveright()){
                setTimeout("generateNumber()",210);
                setTimeout("isGameOver()",300);
            }
            break;
        case 40://down
            if(movedown()){
                setTimeout("generateNumber()",210);
                setTimeout("isGameOver()",300);
            } 
            break;
    }
    
});

function moveleft(){
    if(!canMoveLeft(board))
        return false;
    
    for (var i = 0 ; i < 4 ; i ++)
        for(var j = 1 ; j < 4 ; j ++){
            if(board[i][j]!=0){
                for(var k =0;k<j;k++){
                    if(board[i][k]==0&&noBlockHorizental(i,k,j,board)){
                        //move
                        showMoveNumber(i,j,i,k,board);
                        board[i][k]=board[i][j];
                        board[i][j]=0;
                    }
                    else if(board[i][k]==board[i][j]&&noBlockHorizental(i,k,j,board)&&hasAdded[i][k]==false){
                        //move
                        //add
                        showMoveNumber(i,j,i,k,board);
                        board[i][k]+=board[i][j];
                        board[i][j]=0;
                        score+=board[i][k];
                        updateScore(score);
                        hasAdded[i][k]=true;
                    }
                    continue;
                }
            }
        }
    setTimeout("updateBoardView()",200);
    
    return true;
} 

function moveright(){
    if(!canMoveRight(board))
        return false;
    for (var i = 0 ; i < 4 ; i ++)
        for(var j=2;j>=0;j --){
            if(board[i][j]!=0){
                for (var k=3;k>j;k--){
                    if(board[i][k]==0&&noBlockHorizental(i,j,k,board)){
                        showMoveNumber(i,j,i,k,board);
                        board[i][k]=board[i][j];
                        board[i][j]=0;
                    }
                    else if(board[i][k]==board[i][j]&&noBlockHorizental(i,j,k,board)&&hasAdded[i][k]==false){
                        showMoveNumber(i,j,i,k,board);
                        board[i][k]+=board[i][j];
                        board[i][j]=0;
                        score+=board[i][k];
                        updateScore(score);
                        hasAdded[i][k]=true;
                    }
                    continue;
                }
                
            }
        }
    setTimeout("updateBoardView()",200);
    return true;
}
function moveup(){
    if(!canMoveUp(board)){
        return false;
    }
    for(j=0;j<4;j++)
        for(i=1;i<4;i++){
            if(board[i][j]!=0){
                for(var k=0;k<i;k++){
                    if(board[k][j]==0&&noBlockoVertical(j,k,i,board)){
                        showMoveNumber(i,j,k,j,board);
                        board[k][j]=board[i][j];
                        board[i][j]=0;
                    }
                    else if(board[k][j]==board[i][j]&&noBlockoVertical(j,k,i,board)&&hasAdded[k][j]==false){
                        showMoveNumber(i,j,k,j,board);
                        board[k][j]+=board[i][j];
                        board[i][j]=0;
                        score+=board[k][j];
                        updateScore(score);
                        hasAdded[k][j]=true;
                    }
                    continue;
                }
            }
        }
    setTimeout("updateBoardView()",200);
    return true;
}
function movedown(){
    if(!canMoveDown(board)){
        return false;
    }
    for(var j=0;j<4;j++)
        for(var i=2;i>=0;i--){
            if(board[i][j]!=0){
                for(var k=3;k>i;k--){
                    if(board[k][j]==0&&noBlockoVertical(j,i,k,board)){
                        showMoveNumber(i,j,k,j,board);
                        board[k][j]=board[i][j];
                        board[i][j]=0;
                    }
                    else if(board[k][j]==board[i][j]&&noBlockoVertical(j,i,k,board)&&hasAdded[k][j]==false){
                        showMoveNumber(i,j,k,j,board);
                        board[k][j]+=board[i][j];
                        board[i][j]=0;
                        score+=board[k][j]; 
                        updateScore(score);
                        hasAdded[k][j]=true;
                    }
                    continue;
                }
            }
        }
    setTimeout("updateBoardView()",200)
    return true;
}
function isGameOver(){
    if(nospace(board)&&nomove(board)){
        gameOver();
    }
   
}
function gameOver(){
    alert('gameover!');
}
function nomove(){
    if(canMoveRight(board)||
    canMoveLeft(board)||
    canMoveUp(board)||
    canMoveDown(board))
        return false;
    return true;
}