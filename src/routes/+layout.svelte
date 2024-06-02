<script>
	import Header from './Header.svelte';
	import './styles.css';
</script>

<div class="flex flex-col h-[100vh]">
	<Header />

	<main class="grow flex flex-col md:overflow-hidden">
		<slot />
	</main>
	<!-- 
	<footer>
		<p>visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to learn SvelteKit</p>
	</footer> -->
</div>
