<script>
	import { onMount, onDestroy } from 'svelte';
	import { collection, query, orderBy } from 'firebase/firestore';
	import { db } from '$lib/firebasePacientes';
	import { subscribeToPacientes } from '$lib/suscripciones/suscripcionPacientes';
	import { auth } from '$lib/firebasePacientes.js';
	import {authenticatedUser} from "$lib/store.js";

	let pacientes = [];
	let unsubscribe;

	onMount(() => {
		console.log(auth);
		if ($authenticatedUser) {
			try {
				const pacientesRef = collection(db, 'Pacientes');
				const qp = query(pacientesRef, orderBy('apellido'));

				unsubscribe = subscribeToPacientes(qp, (data) => {
					pacientes = data;
				});
			} catch (error) {
				console.error(error);
			}
		} else {
			console.log('user no autenticado');
		}
	});

	onDestroy(() => {
		if (unsubscribe) {
			unsubscribe();
		}
	});

	const actualiza = (e) => {
		console.log('hacer la logica para que actualice el registro en la db');
	};
</script>

<h1>listado pacientes</h1>

{#if $authenticatedUser}
	{#each pacientes as paciente}
		<ul>
			<li>
				{`${paciente.id}- ${paciente.apellido}, ${paciente.nombre}`}
				<input on:change={(e) => actualiza(e)} bind:value={paciente.nombre} type="text" />
			</li>
		</ul>
	{/each}
{:else}
		<p>inicie sesion primero</p>
{/if}
