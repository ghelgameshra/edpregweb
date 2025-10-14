<script lang="ts">
	import AppSidebar from '$lib/components/app-sidebar.svelte';
	import * as Sidebar from '$lib/components/ui/sidebar';
	import { onMount } from 'svelte';
	import SunIcon from '@lucide/svelte/icons/sun';
	import MoonIcon from '@lucide/svelte/icons/moon';
	import { resetMode, setMode } from 'mode-watcher';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index';
	import { buttonVariants } from '$lib/components/ui/button/index';

	const sidebar = Sidebar.useSidebar();
	let isSidebarOpen = true;

	onMount(() => {
		const saved = localStorage.getItem('sidebar_open');
		if (saved !== null) isSidebarOpen = saved === 'true';
	});

	function toggleSidebar() {
		isSidebarOpen = !isSidebarOpen;
		localStorage.setItem('sidebar_open', String(isSidebarOpen));
	}
</script>

<Sidebar.Provider>
	<div class="flex h-screen overflow-hidden">
		<!-- Sidebar -->
		<aside>
			<AppSidebar />
		</aside>

		<!-- Main Content -->
		<main class="flex-1 overflow-auto">
			<div>
				<Sidebar.Trigger class="mt-2 ml-4 px-4 py-4 border hover:cursor-pointer hover:bg-slate-50" on:click={toggleSidebar} />
				<DropdownMenu.Root>
					<DropdownMenu.Trigger class={buttonVariants({ variant: 'outline', size: 'icon-lg' })}>
						<SunIcon class="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 !transition-all dark:scale-0 dark:-rotate-90" />
						<MoonIcon class="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 !transition-all dark:scale-100 dark:rotate-0" />
						<span class="sr-only">Toggle theme</span>
					</DropdownMenu.Trigger>
					<DropdownMenu.Content align="end">
						<DropdownMenu.Item onclick={() => setMode('light')}>Light</DropdownMenu.Item>
						<DropdownMenu.Item onclick={() => setMode('dark')}>Dark</DropdownMenu.Item>
						<DropdownMenu.Item onclick={() => resetMode()}>System</DropdownMenu.Item>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			</div>
			<div class="px-8 py-4">
				<slot />
			</div>
		</main>
	</div>
</Sidebar.Provider>
