import { writable } from 'svelte/store';

export const editStatus = writable(false); //maneja la visibilidad del boton>dice Update

export const pacienteSeleccionado = writable({
    nombre: "nombreDefault",
    apellido: "apellidoDefault",
    id: "idDefault",
    plan: "planDefault",
    nroSocio: 9876543210,
});

export const apellidoSeleccionado = writable("");
export const nombreSeleccionado = writable("");
export const idPacienteSeleccionado = writable("");
export const sesionSeleccionada = writable({
    diaSesion:"",
    fechaPago:"",
    valorSesion:0,
    valorPago:0
});

export const selectedSessionId = writable("");