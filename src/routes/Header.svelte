<script>
	import LOGO from '../lib/images/elastic-band.webp';
	import SVELTE_LOGO from '../lib/images/svelte-logo.svg';
</script>

<header class="self-stretch flex flex-row justify-between items-center">
	<div class="flex flex-row items-center gap-3 bg-white p-2 lg:p-3 max-h-[10vh]">
		<img src={LOGO} class="h-7 w-7" alt="Rubber band logo" />
		<span class="text-[13px] lg:text-2xl">FLEXBOX PLAYGROUND</span>
	</div>
	<div class="flex flex-row gap-2 items-center me-10 p-1 lg:p-4 sm:p-0">
		<img class="h-5 w-5 lg:h-10 lg:w-10" src={SVELTE_LOGO} alt="Svelte logo" />
		<span class="text-[10px] lg:text-lg">Powered by Svelte</span>
	</div>
</header>