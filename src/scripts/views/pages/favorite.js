import FavoriteRestarantIdb from '../../data/fav-restaurant-idb';
import { createRestaurantItemTemplate } from '../templates/template-creator';
import swRegister from '../../utils/sw-register';

const Favorite = {
  async render() {
    return `
    <section id="main-content" class="restaurant-section" aria-labelledby="restaurant-title">
        <h2 class="section-title" style="margin-top:50px;">Favorite Restaurant</h2>
        <div id="restaurant-list" class="restaurant-grid">
        
        </div>
        <p id="empty-favorite-message" class="empty-message" style="display: none;"> <-Belum ada data favorite-> </p>
      </section>
    `;
  },

  async afterRender() {
    // Daftarkan service worker
    await swRegister();

    const restaurants = await FavoriteRestarantIdb.getAllRestaurants();
    const restaurantsContainer = document.querySelector('#restaurant-list');
    const emptyMessage = document.querySelector('#empty-favorite-message');

    if (restaurants.length === 0) {
      // Jika tidak ada data, tampilkan pesan
      emptyMessage.style.display = 'block';
    } else {
      // Jika ada data, render daftar restoran
      emptyMessage.style.display = 'none';
      restaurants.forEach((restaurant) => {
        restaurantsContainer.innerHTML += createRestaurantItemTemplate(restaurant);
      });
    }
  },
};

export default Favorite;
