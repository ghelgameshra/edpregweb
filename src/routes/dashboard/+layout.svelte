<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar';
	import AppSidebar from '$lib/components/app-sidebar.svelte';
	import { getContext } from 'svelte';
	import { onMount } from 'svelte';

	let isCollapsed = false;

	// Sidebar context
	const sidebar = Sidebar.useSidebar();

	$: isCollapsed = sidebar?.collapsed ?? false;
</script>

<Sidebar.Provider>
	<div class="flex h-screen w-screen overflow-hidden">
		<!-- Sidebar -->
		<aside>
			<AppSidebar />
		</aside>

		<!-- Main content -->
		<main class="flex-1 overflow-auto bg-white transition-all duration-300 ">
			<slot />
		</main>
	</div>
</Sidebar.Provider>
