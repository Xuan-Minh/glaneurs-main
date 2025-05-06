<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Menu Button Animation</title>
  <style>
 

  </style>
</head>
<body>


  <div class="content">
    <h1>Welcome!</h1>
    <p>Scroll down to see the fixed button.</p>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    <p>...</p>
    <p>More content here...</p>
    <p>...</p>
    <p>Even more content to make it scroll...</p>
    <p>...</p>
    <p>You can see the button at the top right as you scroll.</p>
  </div>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
  <script>

const menuButton = document.querySelector('.menu-button');
const lineTop = document.querySelector('.line-top');
const lineMiddle = document.querySelector('.line-middle');
const lineBottom = document.querySelector('.line-bottom');

let isOpen = false;

menuButton.addEventListener('click', () => {
  isOpen = !isOpen;

  const buttonHeight = menuButton.offsetHeight; // Récupérer la hauteur actuelle du bouton
  const translationY = buttonHeight / 4; // Calculer une translation basée sur la hauteur

  if (isOpen) {
    gsap.to(lineTop, { rotation: 45, y: translationY, backgroundColor: '#fff', duration: 0.3 });
    gsap.to(lineMiddle, { opacity: 0, duration: 0.3 });
    gsap.to(lineBottom, { rotation: -45, y: -translationY, backgroundColor: '#fff', duration: 0.3 });
    menuButton.classList.add('open');
  } else {
    gsap.to(lineTop, { rotation: 0, y: 0, backgroundColor: '#333', duration: 0.3 });
    gsap.to(lineMiddle, { opacity: 1, duration: 0.3 });
    gsap.to(lineBottom, { rotation: 0, y: 0, backgroundColor: '#333', duration: 0.3 });
    menuButton.classList.remove('open');
  }
});
  </script>

</body>
</html>