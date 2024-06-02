<script>
	import LOGO from '../lib/images/elastic-band.webp';
	import SVELTE_LOGO from '../lib/images/svelte-logo.svg';
</script>

<header class="self-stretch flex flex-col sm:flex-row justify-between items-center">
	<div class="flex flex-row gap-3 bg-white p-3 max-h-[10vh]">
		<img src={LOGO} class="h-7 w-7" alt="Rubber band logo" />
		<span class="text-2xl">FLEXBOX PLAYGROUND</span>
	</div>
	<div class="flex flex-row gap-2 items-center me-10 p-4 sm:p-0">
		<img class="h-10 w-10" src={SVELTE_LOGO} alt="Svelte logo" />
		<span class="text-lg">Powered by Svelte</span>
	</div>
</header>
