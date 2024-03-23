<script>
	let count = 0;

	function handleClick() {
		count += 1;
	}
</script>

<div class="space-y-2">
	<img class="mx-auto w-12 h-12" src="dist/assets/svelte.svg" alt="Svelte Logo" />
	<p>Svelte count is <code>`{count}`</code></p>
	<button class="bg-blue-700 px-4 py-1 rounded font-bold text-blue-50 text-sm" on:click={handleClick}
		>Increment</button
	>
</div>
