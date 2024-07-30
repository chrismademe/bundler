import Fascio from '../Fascio.js';

await Fascio.js('./src/js/script.js', { dest: './dist', minify: true });
await Fascio.react('./src/js/react.js', { dest: './dist', minify: true });
await Fascio.svelte('./src/js/svelte.js', { dest: './dist', minify: true });
await Fascio.vue('./src/js/vue.js', { dest: './dist', minify: true });
await Fascio.scss('./src/css/postcss.css', { dest: './dist', minify: true, glob: true });
await Fascio.postcss('./src/css/postcss.css', { dest: './dist', minify: true });
await Fascio.copy('./src/assets');

console.log('Done!');
