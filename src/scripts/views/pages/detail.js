import RestaurantDbSource from '../../data/restaurant-source.js';
import UrlParser from '../../routes/url-parser.js';
import LikeButtonInitiator from '../../utils/like-button-initiator.js';
import { createRestaurantDetailTemplate } from '../templates/template-creator.js';
import Swal from 'sweetalert2';

const Detail = {
  async render() {
    return `
      <h1>Detail</h1>
      <div id="restaurant-detail"></div>
      <div id="likeButtonContainer"></div>
    `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const { restaurant, error } = await RestaurantDbSource.detailRestaurant(url.id);
    if (error) {
      return error;
    }
    const restaurantContainer = document.querySelector('#restaurant-detail');
    restaurantContainer.innerHTML = createRestaurantDetailTemplate(restaurant);

    const formReview = document.querySelector('#review-form');
    formReview.addEventListener('submit', async (event) => {
      event.preventDefault();
      const res = await RestaurantDbSource.reviewRestaurant({
        id: url.id,
        name: document.querySelector('#name').value,
        review: document.querySelector('#review').value,
      });

      if (res.message === 'success') {
        Swal.fire({
          title: 'Review Submitted!',
          text: 'Thank you for your feedback!',
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(() => {
          // Reload halaman setelah notifikasi
          window.location.reload();
        });
      } else {
        Swal.fire({
          title: 'Submission Failed',
          text: 'Please try again.',
          icon: 'error',
          confirmButtonText: 'Retry',
        });
      }
    });

    LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      restaurant: {
        id: restaurant.id,
        name: restaurant.name,
        description: restaurant.description,
        pictureId: restaurant.pictureId,
        city: restaurant.city,
        rating: restaurant.rating,
      },
    });
  }
};

export default Detail;