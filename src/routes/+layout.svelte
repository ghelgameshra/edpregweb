<script lang="ts">
	import { APP_NAME } from './../lib/config/api';
	import '../app.css';
	import favicon from '$lib/assets/sql.png';
	import { ModeWatcher } from "mode-watcher";

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>{APP_NAME}</title>
</svelte:head>

<ModeWatcher />
{@render children?.()}
