import axios from 'axios';
import Cookies from 'js-cookie';

// Add a request interceptor
axios.interceptors.request.use(
    (config) => {
        // Get cookies from the browser
        const accessToken = Cookies.get('accessToken');
        const refreshToken = Cookies.get('refreshToken');

        // Add cookies to the request headers
        if (accessToken && refreshToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
            config.headers['x-refresh-token'] = refreshToken;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axios;
