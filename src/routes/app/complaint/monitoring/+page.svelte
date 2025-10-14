<script lang="ts">
	import * as Table from '$lib/components/ui/table/index';
	import { loadInitialData } from '$lib/helper/monitoringPage';
	import { onMount } from 'svelte';

	interface Complaint {
		nik: string;
		name: string;
		job: string;
		time: string;
		tanggal: string;
		jumlah_co: number;
		jumlah_inprogress: string;
		jumlah_lewat_sla: string;
		avg_index_co: number;
		avg_after_approve: number;
		avg_after_submission: number;
		start_co: string;
		last_co: string;
	}

	let complaints: Complaint[] = [];
	let headers: string[] = [];
	let updatedTime = '';

	onMount(async () => {
		const data = await loadInitialData();
		complaints = data.complaint;
		headers = data.headers || [];
		updatedTime = data.updatedTime;
	});
</script>

<!-- Outer wrapper -->
<div class="h-screen box-border p-4">
	<!-- Tampilkan waktu update -->
	{#if updatedTime}
		<p class="mb-3 text-sm text-gray-500">Terakhir diperbarui: {updatedTime}</p>
	{/if}

	<!-- Scrollable table wrapper -->
	<div class="w-screen overflow-auto rounded-2xl shadow-lg">
		<Table.Root class="min-w-full border-collapse text-sm">
			<Table.Header>
				<Table.Row>
					{#each headers as header}
						<Table.Head class="whitespace-nowrap capitalize">{header}</Table.Head>
					{/each}
				</Table.Row>
			</Table.Header>

			<Table.Body>
				{#if complaints.length > 0}
					{#each complaints as row}
						<Table.Row>
							{#each headers as key}
								<Table.Cell class="whitespace-nowrap">
									{row[key] ?? '-'}
								</Table.Cell>
							{/each}
						</Table.Row>
					{/each}
				{:else}
					<Table.Row>
						<Table.Cell colspan={headers.length} class="text-center text-gray-400 py-4">
							Tidak ada data
						</Table.Cell>
					</Table.Row>
				{/if}
			</Table.Body>
		</Table.Root>
	</div>
</div>
