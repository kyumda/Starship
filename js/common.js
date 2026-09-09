function openGnb() {
    $(".gnb").addClass("active");
    $(".ham").addClass("active");
    $("body").addClass("no-scroll");
}

function closeGnb() {
    $(".gnb").removeClass("active");
    $(".ham").removeClass("active");
    $("body").removeClass("no-scroll");
}

$(".ham").click(function (e) {
    e.stopPropagation();
    if ($(".gnb").hasClass("active")) {
        closeGnb();
    } else {
        openGnb();
    }
});

$(document).click(function (e) {
    if ($(".gnb").hasClass("active") && !$(e.target).closest(".gnb, .ham").length) {
        closeGnb();
    }
});