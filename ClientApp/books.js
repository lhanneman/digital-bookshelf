(function () {

    let books = null;

    var bookInfoRequest = new XMLHttpRequest();
    bookInfoRequest.addEventListener("load", loadBookJson);
    bookInfoRequest.open("GET", "book_images.json");
    bookInfoRequest.send();

    function loadBookJson() {
        books = JSON.parse(this.responseText);
        initSwiper(books);
    }

    function initSwiper(books) {

        var sw = document.querySelector('.swiper-wrapper');
      
        for (var i = 0; i < books.length; i++) {

            var slide = document.createElement('div');
            slide.classList.add('swiper-slide');

            var img = document.createElement('img');
            img.setAttribute('data-src', books[i]);
            img.classList.add('swiper-lazy');
            img.classList.add('book-cover');

            slide.appendChild(img);

            var preloader = document.createElement('div');
            preloader.classList.add('swiper-lazy-preloader');

            slide.appendChild(preloader);
            sw.appendChild(slide);
        }

        var swiper = new Swiper('.swiper-container', {
            lazy: true,
            effect: 'coverflow',
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: 'auto',
            coverflowEffect: {
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
            },
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
              },
        });
    }
})();