/**
 * Frontend script
 * Note: This is only used for the image gallery custom block.
 */

const gallery = document.getElementsByClassName('wp-block-coliquio-image-gallery');

function onOpenGallery(E) {
  console.log(E)
  gallery[0]
      .getElementsByClassName('image-gallery-overlay')[0]
      .style.display = "block";

console.log(document.querySelectorAll('btn-close-gallery'))

  document.querySelectorAll('.btn-close-gallery')
      .forEach(node => node.addEventListener('click', onCloseGallery));

}

function onCloseGallery(e) {
  console.log(e)
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

