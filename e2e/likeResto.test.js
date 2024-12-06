/* eslint-disable no-undef */
const assert = require('assert');

/* eslint-disable no-undef */
Feature('Liking Restaurant');

Before(({ I }) => {
  I.amOnPage('/');
});

Scenario('showing empty liked restaurant', ({ I }) => {
  I.amOnPage('/#/favorite');
  I.seeElement('#mainContent');
  I.see('<-Belum ada data favorite->', '.empty-message');
  I.dontSeeElement('.restaurant-list', 'No restaurants favorite');
});

//screnario liking
Scenario('liking one restaurant', async ({ I }) => {
  // Membuka halaman utama
  I.amOnPage('/');
  I.seeElement('.restaurant-card');

  // Menyimpan data restoran pertama
  const firstRestaurant = locate('.restaurant-card .restaurant-info a').first();
  const firstRestaurantTitle = await I.grabTextFrom(firstRestaurant);

  // Menyembunyikan iframe yang menghalangi klik
  I.executeScript(() => {
    const iframe = document.getElementById('webpack-dev-server-client-overlay');
    if (iframe) {
      iframe.style.display = 'none';
    }
  });

  // Membuka detail restoran pertama
  I.click(firstRestaurant);
  I.seeElement('#likeButton');

  // Menyukai restoran
  I.click('#likeButton');

  // Memastikan restoran muncul di halaman favorite
  I.amOnPage('/#/favorite');
  I.seeElement('.restaurant-card');
  const likedRestaurantTitle = await I.grabTextFrom(
    '.restaurant-card .restaurant-info a'
  );

  // Memastikan nama restoran yang disukai sesuai
  I.see(likedRestaurantTitle, '.restaurant-card .restaurant-info a');
  assert.strictEqual(
    firstRestaurantTitle,
    likedRestaurantTitle,
    'Restoran yang disukai harus sesuai dengan yang dipilih'
  );
});

//scenario unliking
Scenario('unliking one restaurant', async ({ I }) => {
  // Membuka halaman utama
  I.amOnPage('/');
  I.seeElement('.restaurant-card');

  // Menyimpan data restoran pertama
  const firstRestaurant = locate('.restaurant-card .restaurant-info a').first();
  const firstRestaurantTitle = await I.grabTextFrom(firstRestaurant);

  // Menyembunyikan iframe yang menghalangi klik
  I.executeScript(() => {
    const iframe = document.getElementById('webpack-dev-server-client-overlay');
    if (iframe) {
      iframe.style.display = 'none';
    }
  });

  // Membuka detail restoran pertama
  I.click(firstRestaurant);
  I.seeElement('#likeButton');

  // Menyukai restoran
  I.click('#likeButton');

  // Membuka halaman favorite
  I.amOnPage('/#/favorite');
  I.seeElement('.restaurant-card');
  const likedRestaurantTitle = await I.grabTextFrom(
    '.restaurant-card .restaurant-info a'
  );

  // Memastikan nama restoran yang disukai sesuai
  assert.strictEqual(
    firstRestaurantTitle,
    likedRestaurantTitle,
    'Restoran yang disukai harus sesuai dengan yang dipilih'
  );

  // Membuka detail restoran di halaman favorite
  I.click(locate('.restaurant-card .restaurant-info a').first());
  I.seeElement('#likeButton');

  // Membatalkan suka (unlike)
  I.click('#likeButton');

  // Memastikan restoran tidak muncul lagi di halaman favorite
  I.amOnPage('/#/favorite');
  I.dontSeeElement('.restaurant-card');
});

//scenario customer review
Scenario('adding and verifying a customer review', async ({ I }) => {
  // Membuka halaman utama
  I.amOnPage('/');
  I.seeElement('.restaurant-card');

  // Menyimpan data restoran pertama
  const firstRestaurant = locate('.restaurant-card .restaurant-info a').first();

  // Menyembunyikan iframe yang menghalangi klik
  I.executeScript(() => {
    const iframe = document.getElementById('webpack-dev-server-client-overlay');
    if (iframe) {
      iframe.style.display = 'none';
    }
  });

  // Membuka detail restoran pertama
  I.click(firstRestaurant);
  I.waitForElement('.form-review', 5);

  // Mengisi form ulasan
  const customerName = 'John Doe';
  const customerReview = 'Makanan sangat lezat dan pelayanannya ramah!';
  I.fillField('#name', customerName);
  I.fillField('#review', customerReview);

  // Menekan tombol submit untuk menambahkan ulasan
  I.click('#submit-review');

  // Menunggu tombol SweetAlert muncul
  I.waitForElement('.swal2-confirm.swal2-styled', 5);

  // Memastikan tombol SweetAlert muncul
  I.seeElement('.swal2-confirm.swal2-styled');

  // Klik tombol SweetAlert untuk menutup pop-up
  I.click('.swal2-confirm.swal2-styled');

  // Menunggu proses submit selesai dan ulasan baru muncul
  I.waitForElement('.review-item', 5);

  // Memastikan ulasan baru ditampilkan
  const lastReviewName = await I.grabTextFrom(locate('.review-item h4').last());
  const lastReviewText = await I.grabTextFrom(
    locate('.review-item p').withText(customerReview)
  );

  assert.strictEqual(
    lastReviewName,
    customerName,
    'Nama pengulas terakhir harus sesuai dengan yang dimasukkan'
  );

  assert.strictEqual(
    lastReviewText,
    customerReview,
    'Isi ulasan terakhir harus sesuai dengan yang dimasukkan'
  );

  // Menyelesaikan pengujian
  I.say('Customer review berhasil ditambahkan dan diverifikasi!');
});





