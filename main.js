// import './style.css';

!(function (e) {
  'function' != typeof e.matches &&
    (e.matches =
      e.msMatchesSelector ||
      e.mozMatchesSelector ||
      e.webkitMatchesSelector ||
      function (e) {
        for (
          var t = this, o = (t.document || t.ownerDocument).querySelectorAll(e), n = 0;
          o[n] && o[n] !== t;

        )
          ++n;
        return Boolean(o[n]);
      }),
    'function' != typeof e.closest &&
      (e.closest = function (e) {
        for (var t = this; t && 1 === t.nodeType; ) {
          if (t.matches(e)) return t;
          t = t.parentNode;
        }
        return null;
      });
})(window.Element.prototype);

/*----------------------------------------------------------------------------------------------------*/

document.addEventListener('DOMContentLoaded', () => {
  const modalBtns = document.querySelectorAll('.js-modal__open');
  const overlay = document.querySelector('.js-modal__overlay');
  const closeBtns = document.querySelectorAll('.js-modal__close');

  /*------------------------------перебор кнопок------------------------------*/
  modalBtns.forEach((btn) => {
    /*каждая кнопка при клике*/
    btn.addEventListener('click', function (e) {
      /*блокировка стандартного действия элемента*/
      e.preventDefault();
      /*забрать содержимое data-modal и искать модальное окно с таким же modal-data*/
      const modalId = this.getAttribute('data-modal');
      const modalElem = document.querySelector('.modal[data-modal="' + modalId + '"]');

      /*после нахождения модального окна добавитьклассы подложке и окну, чтобы показать их*/
      modalElem.classList.add('active');
      overlay.classList.add('active');
    });
  });
  /*---------------------------------закрытие на крестик----------------------*/
  closeBtns.forEach((btn) => {
    btn.addEventListener('click', function (e) {
      const parentModal = this.closest('.modal');

      parentModal.classList.remove('active');
      overlay.classList.remove('active');
    });
  });

  /*-----------------------------------закрытие на ESC-------------------------*/
  document.addEventListener(
    'keyup',
    (e) => {
      const key = e.keyCode;

      if (key == 27) {
        document.querySelector('.modal.active').classList.remove('active');
        document.querySelector('.overlay').classList.remove('active');
      }
    },
    false
  );

  overlay.addEventListener('click', function () {
    document.querySelector('.modal.active').classList.remove('active');
    this.classList.remove('active');
  });

  /*----------------------------------------ACCORDION--------------------------------------------------*/

  const accordions = document.querySelectorAll('.js__accordion');

  accordions.forEach((accordion) => {
    accordion.addEventListener('click', function () {
      this.classList.toggle('active');
      this.nextElementSibling.classList.toggle('show');

      // if(this.classList.contains('active')){
      // 	this.nextElementSibling.style.maxHeight=`${this.nextElementSibling.scrollHeight + 80}px`;
      // } else{
      // 	this.nextElementSibling.style.maxHeight='0';
      // }
    });
  });

  /*----------------------------------------VIDEO--------------------------------------------------*/

  const findVideos = () => {
    const videos = document.querySelectorAll('.video');

    for (const video of videos) {
      setupVideo(video);
    }
  };

  const setupVideo = (video) => {
    const link = video.querySelector('.video__link');
    const media = video.querySelector('.video__media');
    const button = video.querySelector('.video__button');

    const id = parseMediaURL(media);

    //при клике на всё видео
    video.addEventListener('click', () => {
      const iframe = createIframe(id);

      link.remove();
      button.remove();
      video.appendChild(iframe);
    });

    link.removeAttribute('href');
    video.classList.add('video--enabled');
  };

  const parseMediaURL = (media) => {
    const regexp = /https:\/\/i\.ytimg\.com\/vi\/([a-zA-Z0-9_-]+)\/maxresdefault\.jpg/i;
    const url = media.src;
    const match = url.match(regexp);

    return match[1];
  };

  const createIframe = (id) => {
    const iframe = document.createElement('iframe');

    iframe.setAttribute('allowfullscreen', '');
    iframe.setAttribute('allow', 'autoplay');
    iframe.setAttribute('src', generateURL(id));
    iframe.classList.add('video__media');

    return iframe;
  };

  const generateURL = (id) => {
    const query = '?rel=0&showinfo=0&autoplay=1';

    return 'https://www.youtube.com/embed/' + id + query;
  };

  findVideos();
});
