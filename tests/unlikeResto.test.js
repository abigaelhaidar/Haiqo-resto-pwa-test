/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
/* eslint-disable linebreak-style */
import FavoriteRestaurantIdb from '../src/scripts/data/fav-restaurant-idb';
import * as TestFactories from './helper/testFactories.js';

describe('Unliking A Restaurant', () => {

  const addLikeButtonContainer = () => {
    document.body.innerHTML = '<div id="likeButtonContainer"></div>';
  };

  beforeEach(async () => {
    addLikeButtonContainer();
    await FavoriteRestaurantIdb.putRestaurant({ id: 1 });
  });

  afterEach(async () => {
    await FavoriteRestaurantIdb.deleteRestaurant(1);
  });

  // test case 1: Memastikan tombol unlike muncul untuk restaurant yang sudah dilike
  it('should display unlike widget when the restaurant has been liked', async () => {
    await TestFactories.createLikeButtonWithRestaurant({ id: 1 });

    expect(
      document.querySelector('[aria-label="unlike this restaurant"]')
    ).toBeTruthy();
  });

  // test case 2: Memastikan tombol like tidak muncul untuk restaurant yang sudah dilike
  it('should not display like widget when the restaurant has been liked', async () => {
    await TestFactories.createLikeButtonWithRestaurant({ id: 1 });

    expect(
      document.querySelector('[aria-label="like this restaurant"]')
    ).toBeFalsy();
  });

  // test case 3: Memastikan tombol unlike dapat menghapus restaurant dari database
  it('should be able to remove liked restaurant from the list', async () => {
    await TestFactories.createLikeButtonWithRestaurant({ id: 1 });
    // Simulasi klik tombol unlike
    document
      .querySelector('[aria-label="unlike this restaurant"]')
      .dispatchEvent(new Event('click'));

    // Verifikasi restaurant telah dihapus dari database
    expect(await FavoriteRestaurantIdb.getAllRestaurants()).toEqual([]);
  });

  // test case 4: Memastikan tombol unlike tidak menimbulkan error ketika user menghapus restaurant yang belum dilike
  it('should not throw error when user click unlike widget if the unliked restaurant is not in the list', async () => {
    await TestFactories.createLikeButtonWithRestaurant({ id: 1 });

    // Hapus restaurant dari database
    await FavoriteRestaurantIdb.deleteRestaurant(1);

    // Simulasi klik tombol unlike
    document
      .querySelector('[aria-label="unlike this restaurant"]')
      .dispatchEvent(new Event('click'));

    // Verifikasi tidak ada error dan database tetap kosong
    expect(await FavoriteRestaurantIdb.getAllRestaurants()).toEqual([]);
  });
});