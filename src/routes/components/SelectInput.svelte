<script>
	export let label;
	export let value;
	export let options;
</script>

<div class="flex flex-col gap-2 lg:gap-0 lg:flex-row lg:items-center justify-between">
	<label for={label} class="lg:w-2/5 text-wrap shrink-0 pe-3">{label}</label>
	<select id={label} {value} on:change class="text-slate-900 p-1.5 lg:w-3/5 grow rounded-md">
		{#each options as option}
			<option value={option}>{option}</option>
		{/each}
	</select>
</div>
