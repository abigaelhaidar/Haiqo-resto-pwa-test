/* eslint-disable linebreak-style */
/* eslint-disable linebreak-style */
import FavoriteRestaurantIdb from '../src/scripts/data/fav-restaurant-idb';
import * as TestFactories from './helper/testFactories.js';
import { describe, it, expect, beforeEach } from '@jest/globals';

describe('Liking A Restaurant', () => {
  const addLikeButtonContainer = () => {
    document.body.innerHTML = '<div id="likeButtonContainer"></div>';
  };

  beforeEach(() => {
    addLikeButtonContainer();
  });
  // 1. Memastikan validasi ID restaurant
  it('should show the like button when the restaurant has not been liked before', async () => {
    await TestFactories.createLikeButtonWithRestaurant({ id: 1 });

    expect(
      document.querySelector('[aria-label="like this restaurant"]')
    ).toBeTruthy();
  });
  // 2. Memastikan validasi ID restaurant
  it('should not show the unlike button when the restaurant has not been liked before', async () => {
    await TestFactories.createLikeButtonWithRestaurant({ id: 1 });

    expect(
      document.querySelector('[aria-label="unlike this restaurant"]')).toBeFalsy();
  });
  // 3. Memastikan validasi ID restaurant
  it('should be able to like the restaurant', async () => {
    await TestFactories.createLikeButtonWithRestaurant({ id: 1 });

    document.querySelector('#likeButton').dispatchEvent(new Event('click'));

    // Memastikan restaurant berhasil disukai
    const restaurant = await FavoriteRestaurantIdb.getRestaurant(1);
    expect(restaurant).toEqual({ id: 1 });

    //hapus data test dari database
    await FavoriteRestaurantIdb.deleteRestaurant(1);
  });

  // 4. Memastikan validasi ID restaurant
  it('should not add a restaurant again when its already liked', async () => {
    await TestFactories.createLikeButtonWithRestaurant({ id: 1 });

    // Tambahkan restaurant ke database
    await FavoriteRestaurantIdb.putRestaurant({ id: 1 });

    // Simulasi klik tombol like
    document.querySelector('#likeButton').dispatchEvent(new Event('click'));

    // Verifikasi tidak ada duplikasi data
    expect(await FavoriteRestaurantIdb.getAllRestaurants()).toEqual([
      { id: 1 },
    ]);

    // Cleanup: Hapus data test
    await FavoriteRestaurantIdb.deleteRestaurant(1);
  });

  // 5. Memastikan validasi ID restaurant
  it('should not add a restaurant when it has no id', async () => {
    await TestFactories.createLikeButtonWithRestaurant({});

    // Simulasi klik tombol like
    document.querySelector('#likeButton').dispatchEvent(new Event('click'));

    // Verifikasi tidak ada data yang tersimpan
    expect(await FavoriteRestaurantIdb.getAllRestaurants()).toEqual([]);
  });
});
