$(".dashboard-nav-card").on('click', function () {
    if ($(this).attr("id") === "calories") {
        $(this).addClass('active-card-orange');
        $(this).siblings().removeClass('active-card-green active-card-blue active-card-purple')
        $("#calories-eaten-info").removeClass('hide')
        $("#physical-activity-info").addClass('hide')
        $("#water-consumed-info").addClass('hide')
        $("#sleep-duration-info").addClass('hide')
    }
    else if ($(this).attr("id") === "step") {
        $(this).addClass('active-card-green');
        $(this).siblings().removeClass('active-card-orange active-card-blue active-card-purple')
        $("#physical-activity-info").removeClass('hide')
        $("#calories-eaten-info").addClass('hide')
        $("#water-consumed-info").addClass('hide')
        $("#sleep-duration-info").addClass('hide')
    }
    else if ($(this).attr("id") === "water") {
        $(this).addClass('active-card-blue');
        $(this).siblings().removeClass('active-card-orange active-card-green active-card-purple')
        $("#water-consumed-info").removeClass('hide')
        $("#calories-eaten-info").addClass('hide')
        $("#physical-activity-info").addClass('hide')
        $("#sleep-duration-info").addClass('hide')
    }
    else {
        $(this).addClass('active-card-purple');
        $(this).siblings().removeClass('active-card-orange active-card-green active-card-blue')
        $("#sleep-duration-info").removeClass('hide')
        $("#calories-eaten-info").addClass('hide')
        $("#water-consumed-info").addClass('hide')
        $("#physical-activity-info").addClass('hide')
    }
});
