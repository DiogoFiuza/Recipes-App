window.onload = () => {
  const shareButtons = document.querySelectorAll('.share-button');
  console.log(shareButtons);
  if (shareButtons) {
    shareButtons.forEach((button) => {
      button.addEventListener('click', (e) => {
        e.target.parentNode.innerHTML = 'Link copiado!';
      });
    });
  }
};
