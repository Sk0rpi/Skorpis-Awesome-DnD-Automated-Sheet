function showCharacterInterface(): void {
  detailsSection?.classList.remove('is-hidden');
  characterCardWrapperSub?.classList.remove('is-hidden');

  setTimeout(() => {
    document.body.classList.add('has-character');
  }, 20);

  setTimeout(() => {
    const welcomeContainer = document.getElementById('welcome-container');
    welcomeContainer?.classList.add('is-completely-gone');
  }, 200); 
}