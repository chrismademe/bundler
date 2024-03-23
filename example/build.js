import Fascio from '../Fascio.js';

Fascio.js('./src/js/script.js', { dest: './dist', minify: true });
Fascio.react('./src/js/react.js', { dest: './dist', minify: true });
Fascio.svelte('./src/js/svelte.js', { dest: './dist', minify: true });
Fascio.vue('./src/js/vue.js', { dest: './dist', minify: true });
Fascio.scss('./src/css/postcss.css', { dest: './dist', minify: true, glob: true });
Fascio.postcss('./src/css/postcss.css', { dest: './dist', minify: true });
Fascio.copy('./src/assets');
