import RestaurantDbSource from '../../data/restaurant-source.js';
import { createRestaurantItemTemplate } from '../templates/template-creator.js';

const Home = {
  async render() {
    return `
    <picture>
    <source media="(max-width: 600px)" srcset="./images/hero-image-small.jpg">
      <section class="hero-section" id="landing" aria-labelledby="hero-title">
      <div class="hero-overlay"></div>
      <div class="hero-text">
          <h1 id="hero-title">Healty Food</h1>
        </div>
      </section>
    </picture>
  
      <!-- Restaurant Section -->
      <section id="main-content" class="restaurant-section" aria-labelledby="restaurant-title">
        <h2 class="section-title">Explore Restaurant</h2>
        <div id="restaurant-list" class="restaurant-grid"></div>
      </section>
  
      <!-- Restaurant Recommendation Section -->
      <section id="recommendation-content" class="recommendation-section" aria-labelledby="recommendation-title">
        <h2 class="section-title">Restaurant Recommendation</h2>
        <div id="recommendation-list" class="restaurant-grid"></div>
      </section>
    `;
  },

  async afterRender() {
    const { restaurants, error  } = await RestaurantDbSource.listRestaurants();
    if (error) {
      return error;
    }
    const recommendations = restaurants.filter((restaurant) => restaurant.rating >= 4).sort((a, b) => b.rating - a.rating).slice(0, 8);

    const restaurantList = document.getElementById('restaurant-list');
    const recommendationList = document.getElementById('recommendation-list');

    restaurants.forEach((restaurant) => {
      const restaurantItem = document.createElement('div');
      restaurantItem.classList.add('restaurant-card');
      restaurantItem.innerHTML = createRestaurantItemTemplate(restaurant);
      restaurantList.appendChild(restaurantItem);
    });

    recommendations.forEach((recommendation) => {
      const recommendationItem = document.createElement('div');
      recommendationItem.classList.add('recommendation-card');
      recommendationItem.innerHTML = createRestaurantItemTemplate(recommendation);
      recommendationList.appendChild(recommendationItem);
    });
  },
};

export default Home;