const DrawerInitiator = {
  init({ button, drawer, content }) {
    if (!button || !drawer || !content) {
      console.error('Button, drawer, atau content tidak ditemukan!');
      return;
    }

    button.addEventListener('click', (event) => {
      this._toggleDrawer(event, drawer, button);
    });

    content.addEventListener('click', (event) => {
      this._closeDrawer(event, drawer, button);
    });
  },

  _toggleDrawer(event, drawer, button) {
    event.stopPropagation();
    drawer.classList.toggle('active');
    button.classList.toggle('active');
  },

  _closeDrawer(event, drawer, button) {
    event.stopPropagation();
    drawer.classList.remove('active');
    button.classList.remove('active');
  },
};

export default DrawerInitiator;