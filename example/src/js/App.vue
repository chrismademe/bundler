<script setup>
import { ref } from 'vue';

const count = ref(0);
</script>

<template>
	<div class="space-y-2">
		<img class="mx-auto w-12 h-12" src="dist/assets/vue.svg" alt="Vue Logo" />
		<p>
			Vue count is <code>`{{ count }}`</code>
		</p>
		<button class="bg-blue-700 px-4 py-1 rounded font-bold text-blue-50 text-sm" @click="count++">
			Incremement
		</button>
	</div>
</template>
