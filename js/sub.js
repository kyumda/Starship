
AOS.init();


const store_swiper = new Swiper(".store_swiper", {
    pagination: { //슬라이드 아래 동그라미 (슬라이드 갯수만큼 자동 생성)
        el: ".swiper-pagination", //여기까지만 넣으면 동그라미
        clicable: true, //버튼클릭여부
    },
    effect: "fade",
    autoplay: { //자동슬라이드
        delay: 2500, //2.5초 대기시간 밀리세컨 사용.. 5초=5000
        disableOnInteraction: false,
    },
});

const album_swiper = new Swiper(".album_swiper", {
    centeredSlides: true,
    loop: true,
    navigation: {//슬라이드 방향 버튼
        nextEl: ".swiper-button-next", //다음 슬라이드
        prevEl: ".swiper-button-prev", //이전 슬라이드
    },
    autoplay: { //자동슬라이드
        delay: 3000, //2.5초 대기시간 밀리세컨 사용.. 5초=5000
        disableOnInteraction: false,
    },
    breakpoints: {
        768: {
            slidesPerView: 3,
        },
        0: {
            slidesPerView: 1.8,
        },
    },
});

/* artists-person */
$(".person .btn_more a").click(function (e) {
    e.preventDefault();

    const $section = $(this).closest(".top, .bot");
    const isClosing = $section.hasClass("active");

    $section.toggleClass("active");
    $(this).text(isClosing ? "more" : "close");

    if (isClosing) {
        this.scrollIntoView({ block: "center" });
    }
});

/* artists_more */
$(".right img").hide();
$(".right img").eq(0).show();
$(".gall ul li").click(function () {
    let idx = $(this).index();
    $(".right img").eq(idx).show().siblings().hide();
});

/* store */
$(".best .btn_more a").click(function (e) {
    e.preventDefault();
    $(".best").toggleClass("active");
    $(this).text($(".best").hasClass("active") ? "close" : "more");
});