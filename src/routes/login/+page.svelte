<script>
	import Auth from '$lib/Auth.svelte';
	import { createEventDispatcher } from 'svelte';
	import { authenticatedUser } from '$lib/store.js';
	import { auth } from '$lib/firebasePacientes.js';
	let user = null;

	const dispatch = createEventDispatcher();

	$: user = $authenticatedUser;

	function handleLoginSuccess(event) {
		user = event.detail;
		$authenticatedUser = user; // Actualizamos el estado de autenticación con el usuario autenticado
		dispatch('loginSuccess', user);
	}

	function handleLogout() {
		user = null;
		$authenticatedUser = null; // Actualizamos el estado de autenticación para cerrar sesión
		signOut(auth)
			.then(() => {
				// El usuario ha cerrado sesión exitosamente.
				console.log('Se ha cerrado sesión correctamente.');
			})
			.catch((error) => {
				// Ha ocurrido un error al cerrar sesión.
				console.error('Error al cerrar sesión:', error.message);
			});
		console.log(authenticatedUser);
	}
</script>

{#if user}
	<p>Bienvenido, {user.email}!</p>
	<button on:click={handleLogout}>Cerrar sesión</button>
	<!-- Aquí puedes mostrar contenido específico para usuarios autenticados -->
{:else}
	<Auth on:loginSuccess={handleLoginSuccess} />
	<!-- Aquí puedes mostrar contenido específico para usuarios no autenticados -->
{/if}
