const createRestaurantItemTemplate = (restaurant) => `
  <div class="restaurant-card">
    <div class="restaurant-location">${restaurant.city}</div>
    <img 
      class="restaurant-image lazyload" 
      data-src="https://restaurant-api.dicoding.dev/images/medium/${restaurant.pictureId}" 
      alt="${restaurant.name}">
    <div class="restaurant-info">
      <div class="resto-rate" aria-label="Rating ${restaurant.rating} dari 5">
        Rating: <span class="rate">${restaurant.rating} ⭐</span>
      </div>
      <h3 class="restaurant-name">${restaurant.name}</h3>
      <p>${restaurant.description.slice(0, 100)}...</p>
      <a href="/#/detail/${restaurant.id}" class="btn-detail" data-id="${restaurant.id}">Detail</a>
    </div>
  </div>
`;


const createRestaurantDetailTemplate = (restaurant) => `
  <div class="restaurant-info-detail">
    <h2>${restaurant.name}</h2>
    <img src="https://restaurant-api.dicoding.dev/images/medium/${restaurant.pictureId}" alt="${restaurant.name}" class="restaurant-image-detail">
    <div class="resto-rate-detail" aria-label="Rating ${restaurant.rating} dari 5">
      Rating: <span class="rate-detail">${restaurant.rating} ⭐</span>
    </div>
    <p>${restaurant.description}</p>
    <div>
      <h3>categories</h3>
      <p>${restaurant.categories.map((category) => category.name).join(', ')}</p>
    </div>
    <div>
      <h3>Menu</h3>
      <p>${restaurant.menus.foods.map((food) => food.name).join(', ')}</p>
      <p>${restaurant.menus.drinks.map((drink) => drink.name).join(', ')}</p>
    </div>
    <h3>Customer Review</h3>
    <div class="customer-review">
      ${restaurant.customerReviews.map((review) => `
        <div class="review-item">
          <h4>${review.name}</h4>
          <p>${review.review}</p>
          <p>${review.date}</p>
        </div>
      `).join('')}
    </div>
    <div>Beri ulasan</div>
    <div>
      <form id="review-form" class="form-review">
        <input type="hidden" name="id" id="id" value="${restaurant.id}">
        <input type="text" placeholder="Nama" name="name" id="name" required>
        <input type="text" placeholder="Review" name="review" id="review" required>
        <button type="submit" id="submit-review">Submit</button>
      </form>
    </div>
  </div>
`;

const createLikeButtonTemplate = () => `
  <button aria-label="like this restaurant" id="likeButton" class="like">
     <i class="fa fa-heart-o" aria-hidden="true"></i>
  </button>
`;

const createLikedButtonTemplate = () => `
  <button aria-label="unlike this restaurant" id="likeButton" class="like">
    <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`;


export { createRestaurantItemTemplate, createRestaurantDetailTemplate, createLikeButtonTemplate, createLikedButtonTemplate };