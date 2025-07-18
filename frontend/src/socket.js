import { io } from 'socket.io-client';
// export const socket = io('http://localhost:5000'); // Change for production
export const socket = io(import.meta.env.VITE_API_BASE_URL); // Change for production
