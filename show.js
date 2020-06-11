function showGenerateNumber(i,j,num){
    var numbercell=$('#number-cell-'+i+'-'+j);

    numbercell.css('background-color',getNumberBackgroundColor(num));
    numbercell.css('color',getNumberColor(num));
    numbercell.text(num);

    numbercell.animate({
        width:"100px",
        height:"100px",
        top:getPosTop(i,j),
        left:getPosLeft(i,j),
    },50);
}

function showMoveNumber(fromx,fromy,tox,toy,board){
    var numbercell=$('#number-cell-'+fromx+'-'+fromy);

    numbercell.animate({
        top:getPosTop(tox,toy),
        left:getPosLeft(tox,toy),
    },200);
}

function updateScore(score){
    $('#score').text(score);
}