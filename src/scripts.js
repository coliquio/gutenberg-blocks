/**
 * Frontend script
 */

const gallery = document.getElementsByClassName('wp-block-coliquio-image-gallery');
const iFrame = document.getElementsByClassName('wp-block-coliquio-iframe');

/**
 * Gallery Block
 */
function onOpenGallery () {
  gallery[0]
  .getElementsByClassName('image-gallery-overlay')[0]
  .style.display = 'block';

  document.querySelectorAll('.btn-close-gallery')
  .forEach(node => node.addEventListener('click', onCloseGallery));

}

function onCloseGallery () {
  gallery[0]
  .getElementsByClassName('image-gallery-overlay')[0]
  .style.display = 'none';

  document.querySelectorAll('.btn-close-gallery')
  .forEach(node => node.removeEventListener('click', onCloseGallery));

}

if (gallery.length > 0) {
  gallery[0]
  .getElementsByClassName('btn-open-gallery')[0]
  .addEventListener('click', onOpenGallery);
}

/**
 * iFrame Block
 */
if (iFrame.length > 0) {
  const iFrameNode = iFrame[0];

  // Only run script if set to 'dynamic'
  if (iFrameNode.height === 0) {
    window.addEventListener('message', function (e) {
      const eventName = e.data[0];
      const height = e.data[1];
      switch (eventName) {
        case 'setHeight':
          // +2 to compensate for the border
          iFrameNode.height = height + 2;
          break;
      }
    }, false);
  }
}
