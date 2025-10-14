<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { cn } from '$lib/utils.js';
	import PanelLeftIcon from '@lucide/svelte/icons/panel-left';
	import type { ComponentProps } from 'svelte';
	import { useSidebar } from './context.svelte.js';
	import { createEventDispatcher } from 'svelte';

	// 🟢 Dispatcher agar event "click" bisa dipancarkan ke parent
	const dispatch = createEventDispatcher();

	// 🟢 Ambil context sidebar
	const sidebar = useSidebar();

	// 🟢 Props dari Button bawaan
	let { ref = $bindable(null), class: className, ...restProps }: ComponentProps<typeof Button> = $props();
</script>

<!-- Tombol Trigger -->
<Button
	data-sidebar="trigger"
	data-slot="sidebar-trigger"
	variant="ghost"
	size="icon"
	class={cn('size-10', className)}
	type="button"
	onclick={(e) => {
		dispatch('click', e); // 🔥 kirim event ke luar
		sidebar.toggle(); // 🔄 toggle sidebar
	}} {...restProps}>
	<PanelLeftIcon />
	<span class="sr-only">Toggle Sidebar</span>
</Button>
