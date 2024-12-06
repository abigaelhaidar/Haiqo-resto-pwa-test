/* eslint-disable linebreak-style */
/* eslint-disable quotes */
/* eslint-disable linebreak-style */
import LikeButtonInitiator from "../../src/scripts/utils/like-button-initiator";
import FavoriteRestaurantIdb from "../../src/scripts/data/fav-restaurant-idb";

const createLikeButtonWithRestaurant = async (restaurant) => {
  await LikeButtonInitiator.init({
    likeButtonContainer: document.querySelector("#likeButtonContainer"),
    favoriteRestaurants: FavoriteRestaurantIdb,
    restaurant,
  });
};

export { createLikeButtonWithRestaurant };
