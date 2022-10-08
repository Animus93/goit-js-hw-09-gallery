import galleryItems from './js/source.js';

const refs = {
    ulGallery: document.querySelector('.js-gallery'),
    divLightbox: document.querySelector('.js-lightbox'),
    divLightboxContent: document.querySelector('.lightbox__content'),
    divLightboxImg: document.querySelector('.lightbox__image'),
};

galleryItems.forEach((item, index) => 
refs.ulGallery.insertAdjacentHTML('beforeEnd',`<li class="gallery__item">
    <a
      class="gallery__link"
      href="${item.original}"
    >
    <img
      data-index = ${index}
      class="gallery__image"
      src="${item.preview}"
      data-source="${item.original}"
      alt="${item.description}"
    />
  </a>
</li>`
));
refs.ulGallery.addEventListener('click', openModal);

function openModal (event) {
  event.preventDefault();
  event.target.nodeName === "IMG"?
    onOpenModal(event.target.dataset.source, event.target.dataset.index) 
    : null;
};

function onOpenModal (url, index) {
  window.addEventListener('keydown',onEscape);
  refs.divLightbox.addEventListener('click',onEscape);
  refs.divLightboxImg.dataset.index = index;
  refs.divLightboxImg.src = url;

  refs.divLightbox.classList.add("is-open");

};

function onEscape (event) {
  if(event.target.dataset.action === "close-lightbox" || event.target.className === "lightbox__overlay" || event.code === 'Escape' )
  {
    closeModal();
  };

};

function closeModal () {
  refs.divLightbox.classList.remove("is-open");
  refs.divLightboxImg.src = '';
  refs.divLightboxImg.dataset.index = '';
  window.removeEventListener('keydown',onEscape);
  refs.divLightbox.removeEventListener('click',onEscape);
};

window.addEventListener('keydown', (event)=>{
  if(refs.divLightbox.classList.contains('is-open')){
    let currentIndex = Number(refs.divLightboxImg.dataset.index)
    if(event.code === 'ArrowRight'){
    currentIndex += 1;
    if(currentIndex > galleryItems.length-1){
      currentIndex = 0;
    }
      refs.divLightboxImg.dataset.index = refs.ulGallery.childNodes[currentIndex].children[0].children[0].dataset.index
      refs.divLightboxImg.src = refs.ulGallery.childNodes[currentIndex].children[0].children[0].dataset.source
    } 
    if(event.code === 'ArrowLeft'){
    currentIndex -= 1;
    if(currentIndex < 0){
      currentIndex = galleryItems.length-1;
    }
      refs.divLightboxImg.dataset.index = refs.ulGallery.childNodes[currentIndex].children[0].children[0].dataset.index;
      refs.divLightboxImg.src =refs.ulGallery.childNodes[currentIndex].children[0].children[0].dataset.source;
    }
  }
})
