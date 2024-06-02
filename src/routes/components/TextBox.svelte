<script>
	export let label;
	export let value;
	export let buttonLabel;
	$: disabled = buttonLabel.toLowerCase() === 'edit';
</script>

<div class="flex flex-col flex-wrap gap-3 mt-3">
	<div class="flex flex-row flex-wrap justify-between grow">
		<label for={label}>{label}</label>
		<button class="bg-slate-200 text-sm p-1 text-slate-900" on:click>{buttonLabel}</button>
	</div>
	<div class="overflow-x-auto">
		<textarea
			class="h-36 p-3 w-full {disabled ? 'text-slate-200' : 'text-slate-900'}"
			id={label}
			{disabled}
			bind:value
		/>
	</div>
</div>
