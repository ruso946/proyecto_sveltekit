<script>
	import {		
		signInWithEmailAndPassword,
		createUserWithEmailAndPassword
	} from 'firebase/auth';
	import { createEventDispatcher } from 'svelte';
	import { authenticatedUser } from '$lib/store.js';
	import { auth } from '$lib/firebasePacientes.js';
	import { goto } from '$app/navigation';
	
	const createUser = async () =>{
    createUserWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
			// Signed in
			const user = userCredential.user;
			// ...
		})
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
			// ..
		});
  }

	const dispatch = createEventDispatcher();

	let email = '';
	let password = '';

	async function login() {
		try {
			const userCredential = await signInWithEmailAndPassword(auth, email, password);
			$authenticatedUser = userCredential.user; // Actualizamos el estado de autenticación con el usuario autenticado
			console.log(userCredential);
			dispatch('loginSuccess', userCredential.user);
			goto('/');
		} catch (error) {
			console.error('Error al iniciar sesión:', error.message);
		}
	}
</script>

<main>
	<h1>Iniciar sesión</h1>
	<form on:submit|preventDefault={login}>
		<label>
			Correo electrónico:
			<input type="email" bind:value={email} required />
		</label>
		<label>
			Contraseña:
			<input type="password" bind:value={password} required />
		</label>
		<button type="submit">Iniciar sesión</button>
	</form>
</main>
