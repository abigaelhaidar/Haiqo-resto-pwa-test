import API_ENDPOINT from '../globals/api-endpoint.js';
import axios from 'axios';

class RestaurantDbSource {
  static async listRestaurants() {
    const response = await axios.get(API_ENDPOINT.LIST);
    return response.data;
  }


  static async detailRestaurant(id) {
    const response = await axios.get(API_ENDPOINT.DETAIL(id));
    return response.data;
  }

  static async reviewRestaurant(data) {
    const response = await axios.post(API_ENDPOINT.REVIEW, data);
    return response.data;
  }
};

export default RestaurantDbSource;