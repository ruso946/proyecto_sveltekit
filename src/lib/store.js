import { writable } from 'svelte/store';

// Creamos un store writable para el estado de autenticación
export const authenticatedUser = writable(null);
