//***********************************
//    91.461 Assignment 7:  JQ Validation
//          Zachary Wong, UMass Lowell Computer Science, zwong@cs.uml.edu
//          Copyright (c) 2015 by Zachary Wong.  All rights reserved.  
//
//    CHANGELOG:
//    11/05/15:  Changelog created.
//    11/06/15:  Added LOTS OF CONTENT.
//   
//    Other sources used:
//    jQuery Validation Plugin: Simple Validation (1/4) by CodeCast 
//    https://www.youtube.com/watch?v=xNSQ3i-BWMo
//    Greater Than validation method source
//    http://stackoverflow.com/questions/14347177/how-can-i-validate-that-the-max-field-is-greater-than-the-min-field
//    
//***********************************

//Not really the best method... but generates a default table at start
$(function () {
    $(document).ready(function () {
        buildTable(1, 10, 1, 10);
    });

//http://stackoverflow.com/questions/14347177/how-can-i-validate-that-the-max-field-is-greater-than-the-min-field
    $.validator.addMethod("greaterThan", function (value, element, param)
    {
        var $min = $(param);
        if (this.settings.onfocusout) {
            $min.off(".validate-greaterThan").on("blur.validate-greaterThan", function () {
                $(element).valid();
            });
        }
        return parseInt(value) > parseInt($min.val());
    }, "Max must be greater than min");
    
    /* Attempt at working on a custom rule where the user is can enter
     * any value as long as the difference between the min and max is
     * less than or equal to 12.
     * Result was unsucessful.
    $.validator.addMethod("rangeOf12", function (value, element, param)
    {
        var $min = $(param);
        if (this.settings.onfocusout) {
            $min.off(".validate-rangeOf12").on("blur.validate-rangeOf12", function () {
                $(element).valid();
            });
        }
        
        var diff = parseInt(value) - parseInt($min.val());
        return Math.abs(diff) > 12;
    }, "Value range is to large");
    */
    $("#TableParam").validate({
        rules: {
            minRow: {
                required: true,
                min: -12,
                max: 12
            },
            maxRow: {
                required: true,
                min: -12,
                max: 12,
                greaterThan: "#minRow"
            },
            minCol: {
                required: true,
                min: -12,
                max: 12
            },
            maxCol: {
                required: true,
                min: -12,
                max: 12,
                greaterThan: "#minCol"
            }
        },
        submitHandler: function (form) {
            submitForm();
            return false;  //This doesn't prevent the form from submitting.
        }

    });
});
