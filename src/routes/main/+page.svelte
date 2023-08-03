<script>
	import { onMount, onDestroy } from 'svelte';
	import { collection, query, orderBy } from 'firebase/firestore';
	import { db } from '$lib/firebasePacientes';
	import { subscribeToPacientes } from '$lib/suscripciones/suscripcionPacientes';
	import { auth } from '$lib/firebasePacientes.js';
	import { authenticatedUser } from '$lib/store.js';
	import Padre from '$lib/Padre.svelte';
</script>

<main>
	{#if $authenticatedUser}
		<div class="contenedorPadre">
			<Padre />
		</div>
	{:else}
		<p>inicie sesion <a href="/login">aqui</a></p>
    
	{/if}
</main>

<style>
	* {
		margin: 0;
	}

	main {
		margin: auto;
	}

	.contenedorPadre {
		display: flex;
		flex-direction: column;
		max-width: 100vh;
		margin: auto;
	}

	.ingreso {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		border: solid, 1px;
		border-color: #3e5947;
		height: 100vh;
		background-color: #404040;
		color: #8c8c8c;
	}

	h1 {
		color: #eff3f5;
	}

	/* body.dark-theme {
  --main-color       : #404040;
  --title-color      : #EFF3F5;
  --text-color       : #8C8C8C;
  --light-text-color : #A0A7AC;
  --border-color     : #3E5947;
  --container-color  : #368F51;
  --body-color       : #192229;
}   */
</style>
