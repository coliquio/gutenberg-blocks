/**
 * Frontend script
 * Note: This is only used for the image gallery custom block.
 */

const gallery = document.getElementsByClassName('wp-block-coliquio-image-gallery');

function onOpenGallery(E) {
  gallery[0]
      .getElementsByClassName('image-gallery-overlay')[0]
      .style.display = "block";

  document.querySelectorAll('.btn-close-gallery')
      .forEach(node => node.addEventListener('click', onCloseGallery));

}

function onCloseGallery(e) {
  gallery[0]
      .getElementsByClassName('image-gallery-overlay')[0]
      .style.display = "none";

  document.querySelectorAll('.btn-close-gallery')
      .forEach(node => node.removeEventListener('click', onCloseGallery));

}

if (gallery) {
  gallery[0]
      .getElementsByClassName('btn-open-gallery')[0]
      .addEventListener('click', onOpenGallery);
}

