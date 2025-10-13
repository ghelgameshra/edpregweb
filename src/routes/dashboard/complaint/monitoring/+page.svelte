<script lang="ts">
	import * as Table from '$lib/components/ui/table/index';
	import * as Card from '$lib/components/ui/card/index';
	import { Button } from '$lib/components/ui/button/index.js';
</script>

<!-- Outer wrapper (padding/layout) -->
<div class="p-6 h-screen box-border">
	
	<!-- Scroll wrapper -->
	<div class="h-full w-full overflow-auto rounded-2xl bg-slate-50 p-4">
		
		<!-- Force table to be wider than screen to trigger horizontal scroll -->
		<Table.Root class="min-w-[1200px] w-max border-collapse text-sm">
			<Table.Caption>A list of your recent invoices.</Table.Caption>

			<Table.Header>
				<Table.Row>
					<Table.Head class="w-[100px]">Invoice</Table.Head>
					<Table.Head>Status</Table.Head>
					<Table.Head>Method</Table.Head>
					{#each Array(12) as _, i}
						<Table.Head class="text-right">Amount {i + 1}</Table.Head>
					{/each}
				</Table.Row>
			</Table.Header>

			<Table.Body>
				{#each Array(20) as _, rowIndex}
					<Table.Row>
						<Table.Cell class="font-medium">INV{rowIndex.toString().padStart(3, '0')}</Table.Cell>
						<Table.Cell>Paid</Table.Cell>
						<Table.Cell>Credit Card</Table.Cell>
						{#each Array(12) as _, i}
							<Table.Cell class="text-right">${(250 + i).toFixed(2)}</Table.Cell>
						{/each}
					</Table.Row>
				{/each}
			</Table.Body>
		</Table.Root>
	</div>
</div>
