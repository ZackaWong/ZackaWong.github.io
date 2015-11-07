//***********************************
//    91.461 Assignment 7:  JQ Validation
//          Zachary Wong, UMass Lowell Computer Science, zwong@cs.uml.edu
//          Copyright (c) 2015 by Zachary Wong.  All rights reserved.  
//
//    CHANGELOG:
//    11/05/15:  Same script file as script.js, just renamed
//    11/06/15:  Removed all JS "if" test cases in place of JQ validation.
//   
//    Other sources used:
//    http://www.w3schools.com/tags/tag_table.asp
//    http://www.w3schools.com/jsref/jsref_parseint.asp ***to get absolute integer values
//    An old Computing III program which generated a dynamic matrix
//***********************************



function submitForm() {
    //collect all results from the datatable
    //using parseInt allows for inputs like 0000001 or 000000010 which would be
    //1 and 10 respectively.  It also generates NaN if there are letters or symbols other than numbers
    var table_inputs = document.getElementById("TableParam").elements;
    var row_min = parseInt(table_inputs[0].value);
    var row_max = parseInt(table_inputs[1].value);
    var col_min = parseInt(table_inputs[2].value);
    var col_max = parseInt(table_inputs[3].value);
    //Test for numbers in the range of -12 and 12
    buildTable(row_min, row_max, col_min, col_max);
}

function buildTable(row_min, row_max, col_min, col_max) {
    //variable table is a string of html code to be injected
    //var i and j are iterators.
    //first_row, last_row, last_col are adjusted to align the table correctly
    //these are last minute changes and a bit of a "spaghetti"-ish method.
    var first_row = row_min;
    var last_row = row_max;
    var first_col = col_min;
    var last_col = col_max;
    var table_header = "<th class=\"multabl\">", table_header_end = "</th>";
    var table_row = "<tr class=\"multabl\">", table_row_end = "</tr>";
    var table_data = "<td class=\"multabl\">", table_data_end = "</td>";
    var i, j, table = "", info = "", value = 0;
    first_row--, last_row++, last_col++;
    //Display your inputs before generating the table.
    info =  "<p class=\"display\">Y-Table: [" + row_min.toString() + "," + row_max.toString() + "]</p>" +
            "<p class=\"display\">X-Table: [" + col_min.toString() + "," + col_max.toString() +"]</p>";
    document.getElementById("rangeDisplay").innerHTML = info;
    //generate the dynamic table here
    for (i = first_row; i < last_row; i++) {
        table += table_row;
        //first row, first column is a blank spot
        if (i === first_row) {
            table += "<th id=\"blankbox\"></th>";
        } else {
            //create Y-direction headers
            table += table_header + i + table_header_end;
        }
        //fill in column
        for (j = first_col; j < last_col; j++) {
            if (i === first_row) {
                //create X-direction headers
                table += table_header + j + table_header_end;
            } else {
                value = i * j;
                if(value === 0) {
                table += "<td id=\"zero\">" + value.toString() + "</td>";
                } else if(value < 0) {
                table += "<td id=\"negative\">" + value.toString() + "</td>";
                } else {
                table += table_data + value.toString() + table_data_end;
                }
            }
        }
        table += table_row;
    }
    //"inject" our table code into our html document
    document.getElementById("dynamicTable").innerHTML = table;
    document.getElementById("TableParam").reset();
}
