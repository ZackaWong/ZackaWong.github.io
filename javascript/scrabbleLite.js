//***********************************
//    91.461 Assignment 9:  Scrabble
//          Zachary Wong, UMass Lowell Computer Science, zwong@cs.uml.edu
//          Copyright (c) 2015 by Zachary Wong.  All rights reserved.  
//
//    CHANGELOG:
//    12/09/15:  Created
//    JQuery Tutorial - 141 - Draggable https://www.youtube.com/watch?v=WLdlB76wqv0
//    JQuery Droppable API Documentation: http://api.jqueryui.com/droppable/
//    JQuery Draggable API Documentation: http://api.jqueryui.com/draggable/
//    
//***********************************

//Global Variables for the JS
var letters = ""; 
var score = 0;
var tileArray = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K",
    "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
var valueArray = [1, 3, 3, 2, 1, 4, 2, 4, 1, 8, 5, 
    1, 3, 1, 1, 3, 10, 1, 1, 1, 1, 4, 4, 8, 4, 10];



$(document).ready(function () {
    generateTiles();
    letterTile = {
        containment: '#gameSpace',
                cursor: 'pointer',
                revert: 'invalid',
                start: function () {
                    src = $(this).parent();
                }
            };
            
    $(".letterTile").draggable(letterTile);
                
    $('.emptyTile').droppable(
            {
                drop: function (event, ui) {
                    var $this = $(this);
                    //when a draggable is placed on a droppable, disable droppable.
                    $(this).droppable( "option", "accept", ui.draggable );
                    ui.draggable.position({
                        my: "center",
                        at: "center",
                        of: $this,
                        using: function (pos) {
                            $(this).animate(pos, 200, "linear");
                        }
                        
                    });
                },
               
                out: function (event, ui) {
                     //when a draggable is moved out of a droppable, re-enable it.
                    $(this).droppable( "option", "accept", '.letterTile' );
                },
                hoverClass: 'border',
                tolerance: 'pointer',
                accept: '.letterTile'
            });

});

    //Sampled from Alex Nevers
    function generateTiles() {
        letters = "";
        var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        
        for(var i=0; i<7; ++i) {
            letters += alphabet.charAt(Math.floor(Math.random()*alphabet.length));
        }
        
        for(var j=0; j<7;j++) {
            $('#letterSpace').append(
                    "<div class='emptyTile'>" + 
                        "<div class='letterTile'>" +
                            "<img src='ScrabbleImages/ScrabbleTiles/tile_" +
                                letters.charAt(j) +
                                ".jpg' width=90 height=90 alt='" +
                                letters.charAt(j) + "'>" +
                        "</div>" +
                    "</div>");
            score = 0;
            //alert($('.letterTile').attr('alt'));
            $("#score").html("<p>Total Score: " + score + "</p>");
        };
        
    }
    
    //Not working or implemented seriously yet.
    function scoringSystem(tile, square){
        var letterscore = 0;
        
        for (var i=0; i < 26; ++i) {
            if (tile === tileArray[i]) {
                letterscore = valueArray[i];
            }
        }
        if (square === "doubleletter")
            letterscore = letterscore * 2;
        
        score += letterscore;
        
        if (square === "tripleword")
            score = score * 3;
        
        //$("#scoreSpace").html("<p>Score: " + score + "<p>");
    };
    
    //Not working or implemented seriously yet.
    function subtractScore(tile){
        var letterscore = 0; //score of our current tile

        for (var i = 0; i < 26; i++) {
        if (tile === tileArray[i]) {
            letterscore = valueArray[i];
        }
    }
    
    Score = Score - letterscore ;
    
    //$("#score").html("<p>Score: " + Score + "<p>");
    }