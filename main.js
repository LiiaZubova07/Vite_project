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
  const modalBtn = document.querySelector('.js-modal__open');
  const overlay = document.querySelector('.js-modal__overlay');
  const closeBtn = document.querySelector('.js-modal__close');
  const accordions = document.querySelectorAll('.js__accordion');
  const removeActive = () => {
    document.querySelector('.modal.active').classList.remove('active');
    document.querySelector('.modal__overlay').classList.remove('active');
  };

  /*------------------------------перебор кнопок------------------------------*/
  //   modalBtns.forEach((btn) => {
  //     /*каждая кнопка при клике*/
  //     btn.addEventListener('click', function (e) {
  //       /*блокировка стандартного действия элемента*/
  //       e.preventDefault();
  //       /*забрать содержимое data-modal и искать модальное окно с таким же modal-data*/
  //       // const modalId = this.getAttribute('data-modal');
  //       // const modalElem = document.querySelector('.modal[data-modal="' + modalId + '"]');

  //       const modalCloseBtn = document.querySelector('.modal__close');
  //       if (modalCloseBtn) {
  //         modalCloseBtn.focus();
  //       }

  //       /*после нахождения модального окна добавить классы подложке и окну, чтобы показать их*/
  //       document.querySelector('.modal').classList.add('active');
  //       overlay.classList.add('active');
  //     });
  //   });

  /*каждая кнопка при клике*/
  modalBtn.addEventListener('click', function (e) {
    /*блокировка стандартного действия элемента*/
    e.preventDefault();
    /*забрать содержимое data-modal и искать модальное окно с таким же modal-data*/
    // const modalId = this.getAttribute('data-modal');
    // const modalElem = document.querySelector('.modal[data-modal="' + modalId + '"]');

    //фокус на крестике
    if (closeBtn) {
      closeBtn.focus();
    }

    /*после нахождения модального окна добавить классы подложке и окну, чтобы показать их*/
    document.querySelector('.modal').classList.add('active');
    overlay.classList.add('active');
  });

  /*---------------------------------закрытие на крестик----------------------*/
  //   closeBtns.forEach((btn) => {
  //     btn.addEventListener('click', function (e) {
  //       const parentModal = this.closest('.modal');

  //       parentModal.classList.remove('active');
  //       overlay.classList.remove('active');
  //     });
  //   });

  closeBtn.addEventListener('click', function (e) {
    const parentModal = this.closest('.modal');

    parentModal.classList.remove('active');
    overlay.classList.remove('active');
  });

  /*-----------------------------------закрытие на ESC-------------------------*/
  document.addEventListener(
    'keydown',
    (e) => {
      if (e.key == 'Escape') {
        removeActive();
      }
    },
    false
  );

  overlay.addEventListener('click', () => {
    removeActive();
  });

  /*----------------------------------------ACCORDION--------------------------------------------------*/
  accordions.forEach((accordion) => {
    accordion.addEventListener('click', function () {
      this.classList.toggle('active');
      this.nextElementSibling.classList.toggle('show');
    });
  });


  /*плавное открытие аккордиона*/
  accordions.forEach((accordion) => {
    accordion.addEventListener('click', () => {
      accordion.classList.toggle('active');
      const content = accordion.nextElementSibling;
      if (content.style.maxHeight) {
        content.style.maxHeight = null;
      } else {
        content.style.maxHeight = content.scrollHeight + 'px';
      }
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
