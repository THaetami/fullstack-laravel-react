// import _ from 'lodash';
// window._ = _;

// // /**
// //  * We'll load the axios HTTP library which allows us to easily issue requests
// //  * to our Laravel back-end. This library automatically handles sending the
// //  * CSRF token as a header based on the value of the "XSRF" token cookie.
// //  */

// import axios from 'axios';
// window.axios = axios;

// // Mendapatkan token dari cookie
// const getJwtTokenFromCookie = () => {
//     const cookie = document.cookie
//       .split('; ')
//       .find((row) => row.startsWith('token='));

//     if (cookie) {
//       return cookie.split('=')[1];
//     }

//     return null;
// }


// // Menambahkan interceptor untuk mengirimkan token dalam header permintaan
// axios.interceptors.request.use(
//     (config) => {
//       const token = getJwtTokenFromCookie(); // Fungsi untuk mendapatkan token dari cookie

//       if (token) {
//         config.headers['Authorization'] = `Bearer ${token}`;
//       }

//       return config;
//     },
//     (error) => {
//       return Promise.reject(error);
//     }
// );


// window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

// // /**
// //  * Echo exposes an expressive API for subscribing to channels and listening
// //  * for events that are broadcast by Laravel. Echo and event broadcasting
// //  * allows your team to easily build robust real-time web applications.
// //  */

// // // import Echo from 'laravel-echo';

// // // import Pusher from 'pusher-js';
// // // window.Pusher = Pusher;

// // // window.Echo = new Echo({
// // //     broadcaster: 'pusher',
// // //     key: import.meta.env.VITE_PUSHER_APP_KEY,
// // //     cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER ?? 'mt1',
// // //     wsHost: import.meta.env.VITE_PUSHER_HOST ? import.meta.env.VITE_PUSHER_HOST : `ws-${import.meta.env.VITE_PUSHER_APP_CLUSTER}.pusher.com`,
// // //     wsPort: import.meta.env.VITE_PUSHER_PORT ?? 80,
// // //     wssPort: import.meta.env.VITE_PUSHER_PORT ?? 443,
// // //     forceTLS: (import.meta.env.VITE_PUSHER_SCHEME ?? 'https') === 'https',
// // //     enabledTransports: ['ws', 'wss'],
// // // });
