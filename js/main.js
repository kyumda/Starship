const visual_swiper = new Swiper(".visual_swiper", {
    navigation: {//슬라이드 방향 버튼
        nextEl: ".swiper-button-next", //다음 슬라이드
        prevEl: ".swiper-button-prev", //이전 슬라이드
    },
    pagination: { //슬라이드 아래 동그라미 (슬라이드 갯수만큼 자동 생성)
        el: ".swiper-pagination", //여기까지만 넣으면 동그라미
        type: "fraction", //숫자로 변경 기본:bullets(동그라미)/ progressbar
        clicable: true, //버튼클릭여부
    },
    loop: true,
    on: {
        slideChange: function () {
            const h1Tag = document.querySelector('header h1 a');
            const hamTag = document.querySelector('.ham');
            const paginationTag = document.querySelector('.visual .swiper-pagination');
            const prevTag = document.querySelector('.visual .swiper-button-prev');
            const nextTag = document.querySelector('.visual .swiper-button-next');
            const index = this.realIndex; // 현재 슬라이드 인덱스 (0부터 시작)

            // 인덱스별 색상 설정
            if (index == 0 || index === 1 || index === 3 || index === 5 || index === 6 || index === 7) {
                h1Tag.classList.add("on");
                hamTag.classList.add("on");
                paginationTag.classList.add("on");
                prevTag.classList.add("on");
                nextTag.classList.add("on");
            } else {
                h1Tag.classList.remove("on");
                hamTag.classList.remove("on");
                paginationTag.classList.remove("on");
                prevTag.classList.remove("on");
                nextTag.classList.remove("on");
            }
        },
    },
    autoplay: { //자동슬라이드
        delay: 3000, //2.5초 대기시간 밀리세컨 사용.. 5초=5000
        disableOnInteraction: false,
    },
    speed: 1500,
    effect: "fade",
});

// 슬라이드가 동적으로 바뀔 때 갱신
function refreshSwiper() {
    swiper.update(); // 슬라이드 DOM 갱신
    updateColor.call(swiper); // 색상도 재적용
}


/* artists */
let art_swiper = null;
let art2_swiper = null;

const artWrapper = document.querySelector(".art_swiper .swiper-wrapper");
const art2Wrapper = document.querySelector(".art2_swiper .swiper-wrapper");
const art2SwiperEl = document.querySelector(".art2_swiper");

const artSlides = [...artWrapper.children];
const art2Slides = [...art2Wrapper.children];

function getRow1Config(width) {
    if (width >= 1600) return { slidesPerView: 3, spaceBetween: 60 };
    if (width >= 200) return { slidesPerView: 3.5, spaceBetween: 40 };
    return { slidesPerView: 4, spaceBetween: 28 };
}

function initArtistSwiper() {
    if (art_swiper) { art_swiper.destroy(true, true); art_swiper = null; }
    if (art2_swiper) { art2_swiper.destroy(true, true); art2_swiper = null; }

    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
        artWrapper.replaceChildren(...artSlides, ...art2Slides);
        art2SwiperEl.style.display = "none";

        art_swiper = new Swiper(".art_swiper", {
            slidesPerView: "auto",
            spaceBetween: 12,
            autoplay: { delay: 2000, disableOnInteraction: false },
            speed: 2000,
        });
    } else {
        artWrapper.replaceChildren(...artSlides);
        art2Wrapper.replaceChildren(...art2Slides);
        art2SwiperEl.style.display = "";

        const row1Config = getRow1Config(window.innerWidth);

        art_swiper = new Swiper(".art_swiper", {
            slidesPerView: row1Config.slidesPerView,
            spaceBetween: row1Config.spaceBetween,
            autoplay: { delay: 2000, disableOnInteraction: false },
            speed: 2000,
        });

        const targetSlideWidth = document.querySelector(".art_swiper .swiper-slide").getBoundingClientRect().width;
        const art2ContainerWidth = art2SwiperEl.getBoundingClientRect().width;
        const perView2 = art2ContainerWidth / (targetSlideWidth + row1Config.spaceBetween);

        art2_swiper = new Swiper(".art2_swiper", {
            centeredSlides: true,
            loop: true,
            slidesPerView: perView2,
            spaceBetween: row1Config.spaceBetween,
            autoplay: { delay: 2000, disableOnInteraction: false },
            speed: 2500,
        });
    }
}

initArtistSwiper();

let artResizeTimer;
window.addEventListener("resize", () => {
    clearTimeout(artResizeTimer);
    artResizeTimer = setTimeout(initArtistSwiper, 200);
});
/* /artists */

const rele_swiper = new Swiper(".rele_swiper", {
    navigation: {
        nextEl: ".btn_next",
        prevEl: ".btn_prev",
    },
    loop: true,
    speed: 800,
    watchSlidesProgress: true, // 추가
    autoplay: {
        delay: 2000,
        disableOnInteraction: false,
    },
    breakpoints: {
        0: {
            slidesPerView: 1.4,
            centeredSlides: true,
            spaceBetween: 20,
        },
        1025: {
            slidesPerView: 1,
            spaceBetween: 30,
            // effect: "fade" 삭제 -> 아래 progress 로직으로 대체
        }
    },
    on: {
        progress(swiper) {
            swiper.slides.forEach((slideEl) => {
                const p = Math.min(Math.abs(slideEl.progress), 1);
                slideEl.style.opacity = 1 - p * 0.75; // 0.75는 최소 흐림 정도, 조절 가능
            });
        },
        setTransition(swiper, duration) {
            swiper.slides.forEach((slideEl) => {
                slideEl.style.transitionDuration = `${duration}ms`;
                slideEl.style.transitionProperty = "opacity";
            });
        }
    }
});

const mv_swiper = new Swiper(".mv_swiper", {
    loop: true,
    navigation: {
        nextEl: ".video .v_next",
        prevEl: ".video .v_prev",
    },
    breakpoints: {
        0: {
            slidesPerView: 1,
            spaceBetween: 30,
            grid: { rows: 2, fill: "row" },
        },
        1025: {
            slidesPerView: 2,
            spaceBetween: 70,
            grid: { rows: 1 },
        },
        1400: {
            slidesPerView: 3,
            spaceBetween: 94,
            grid: { rows: 1 },
        }
    },
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    speed: 1500,
});


//news more
$(".news .btn_more").click(function (e) {
    e.preventDefault();
    $(".news").toggleClass("active");
    $(this).text($(".news").hasClass("active") ? "close" : "more");
});


