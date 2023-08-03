<script>
	export let data;
	export const pacientes = data.Pacientes;
	export const sesiones = data.sesiones;
	export const planes = data.Planes;	
	import { authenticatedUser } from '$lib/store.js';

	let user = null;

	$: user = $authenticatedUser;
</script>

<nav>
	<ul>
		<li>
			<a href="/">home</a>
		</li>
		<li>
			<a href="/main">main</a>
		</li>
		<li>
			<a href="/backup">backup</a>
		</li>
		<li>
			<a href="/listado-pacientes">listado pacientes </a>
		</li>
		{#if $authenticatedUser}
			<li>
				<a href="/login">log out</a>
			</li>
		{:else}
			<li>
				<a href="/login">log in</a>
			</li>
		{/if}
		<li>
			<a href="/create-user">crear user</a>
		</li>
	</ul>
</nav>

<slot />

<style>
	nav {
		display: flex;
	}

	ul {
		display: flex;
		list-style: none;
	}

	li {
		margin-right: 20px;
	}
</style>
