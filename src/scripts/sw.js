import { registerRoute } from 'workbox-routing';
import { CacheFirst } from 'workbox-strategies';

registerRoute(
  ({ url }) => url.href.startsWith('https://restaurant-api.dicoding.dev/'),
  new CacheFirst({
    cacheName: 'resto-catalogue-v1',
  }),
);