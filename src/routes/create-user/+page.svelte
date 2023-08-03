<script>
	import { auth } from '$lib/firebasePacientes.js';
	import {createUserWithEmailAndPassword} from "firebase/auth";
	let email = '';
	let password = '';
	const createUser = async () => {
		console.log(`creando user ${email}`);
		try {
			const userCredential = await createUserWithEmailAndPassword(auth, email, password);
				// Signed in
				const user = userCredential.user;
				console.log(`${user.name}`);
				// ...
		} catch (error) {
			(error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				console.log(error)
				// ..
			};
		}
	};
	//     const createUser = async () =>{
	//     createUserWithEmailAndPassword(auth, email, password)
	// 		.then((userCredential) => {
	// 			// Signed in
	// 			const user = userCredential.user;
	// 			// ...
	// 		})
	// 		.catch((error) => {
	// 			const errorCode = error.code;
	// 			const errorMessage = error.message;
	// 			// ..
	// 		});
	//   }
</script>

<h1>Crear cuenta</h1>
<form on:submit|preventDefault={createUser}>
	<label>
		Correo electrónico:
		<input type="email" bind:value={email} required />
	</label>
	<label>
		Contraseña:
		<input type="password" bind:value={password} required />
	</label>
	<button type="submit">Create User</button>
</form>
