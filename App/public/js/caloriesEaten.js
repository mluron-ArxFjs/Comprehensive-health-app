$(".meal-info-card").on('click', function () {
    if ($(this).attr("id") === "Break-info-card") {
        $(this).addClass('active-card-orange');
        $(this).siblings().removeClass('active-card-orange');
        $("#lunch-info").addClass('hide')
        $("#dinner-snack-info").addClass('hide')
        $("#breakfast-info").removeClass('hide')
    }
    else if ($(this).attr("id") === "Lunch-info-card") {
        $(this).addClass('active-card-orange');
        $(this).siblings().removeClass('active-card-orange');
        $("#lunch-info").removeClass('hide')
        $("#dinner-snack-info").addClass('hide')
        $("#breakfast-info").addClass('hide')
    }
    else if ($(this).attr("id") === "Dinner-info-card") {
        $(this).addClass('active-card-orange');
        $(this).siblings().removeClass('active-card-orange');
        $("#breakfast-info").addClass('hide')
        $("#lunch-info").addClass('hide')
        $("#dinner-snack-info").removeClass('hide')   
    }
    else  {
        $(this).addClass('active-card-orange');
        $(this).siblings().removeClass('active-card-orange');
        $("#breakfast-info").addClass('hide')
        $("#lunch-info").addClass('hide')
        $("#dinner-snack-info").removeClass('hide') 
    }


});  