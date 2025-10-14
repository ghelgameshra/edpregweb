<script lang="ts">
	import CalendarIcon from '@lucide/svelte/icons/calendar';
	import HouseIcon from '@lucide/svelte/icons/house';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import { ChevronDown, ClipboardList, DatabaseIcon, FileText, List, Monitor } from '@lucide/svelte';
	import { Collapsible } from 'bits-ui';

	// Menu items.
	const items = [
		{title: 'Dashboard',url: '/app',icon: HouseIcon},
		{title: 'Stores',url: '/app/stores',icon: DatabaseIcon},
		{title: 'Schedule',url: '/app/schedule',icon: CalendarIcon},
	];

    const subMenu = [
    { title: 'List', url: '/app/complaint', icon: List },
    { title: 'Dispend', url: '/app/complaint/dispend', icon: ClipboardList },
    { title: 'Monitoring', url: '/app/complaint/monitoring', icon: Monitor }
  ];
</script>

<Sidebar.Root collapsible="icon">
	<Sidebar.Content>
		<Sidebar.Group> 
            <Sidebar.GroupLabel>EDP REG 4</Sidebar.GroupLabel>
			<Sidebar.GroupContent>
                <Sidebar.Menu>
					{#each items as item (item.title)}
						<Sidebar.MenuItem>
							<Sidebar.MenuButton>
								{#snippet child({ props })}
									<a href={item.url} {...props}>
										<item.icon />
										<span>{item.title}</span>
									</a>
								{/snippet}
							</Sidebar.MenuButton>
						</Sidebar.MenuItem>
					{/each}
				</Sidebar.Menu>
                <Sidebar.Menu>
                    <Collapsible.Root class="group/collapsible">
                        <!-- Trigger (menu utama Complaint) -->
                        <Collapsible.Trigger class="w-full">
                            <Sidebar.MenuButton class="flex items-center gap-2 hover:cursor-pointer">
                                <FileText class="size-4" />
                                <span>Complaint</span>
                                <ChevronDown class="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180"/>
                            </Sidebar.MenuButton>
                        </Collapsible.Trigger>
            
                        <!-- Submenu content -->
                        <Collapsible.Content>
                            <Sidebar.MenuSub>
                                {#each subMenu as item (item.title)}
                                    <Sidebar.MenuSubItem>
                                        <Sidebar.MenuButton>
                                            <a href={item.url} class="flex items-center gap-2 w-full py-2">
                                                <svelte:component this={item.icon} class="size-4" />
                                                <span>{item.title}</span>
                                            </a>
                                        </Sidebar.MenuButton>
                                    </Sidebar.MenuSubItem>
                                {/each}
                            </Sidebar.MenuSub>
                        </Collapsible.Content>
                    </Collapsible.Root>
                </Sidebar.Menu>
			</Sidebar.GroupContent>
		</Sidebar.Group>
	</Sidebar.Content>
</Sidebar.Root>
