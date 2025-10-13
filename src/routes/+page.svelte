<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import { Lock, Eye, EyeOff, User, AlertTriangle, X } from '@lucide/svelte';
	import { writable } from 'svelte/store';
	import authController from '$lib/controller/authController';
	import CircleAlertIcon from '@lucide/svelte/icons/circle-alert';
	import * as Alert from '$lib/components/ui/alert/index.js';
	import { fly } from 'svelte/transition';
	import { onMount } from 'svelte';

	let username: string = '';
	let password: string = '';
	let showPassword = writable(false);
	let loginError = '';

	function togglePassword() {
		showPassword.update((v) => !v);
	}

    function closeError() {
        loginError = '';
    }

	async function handleSubmit(e: Event) {
		e.preventDefault();
		const response = await authController.login(username, password);
		if (response.code === 403) {
			loginError = response.message;

            setTimeout(() => {
                loginError = '';
            }, 5000);
		}
	}

    onMount(async () => {
        await authController.checkToken();
    })
</script>

<div class="flex min-h-screen items-center justify-center bg-gray-100 px-4 dark:bg-gray-900">
	<div class="w-full max-w-md rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
        {#if loginError}
		<div class="fixed top-4 right-4 z-50 w-full max-w-sm" transition:fly="{{ x: 100, duration: 300 }}">
			<Alert.Root variant="destructive">
				<CircleAlertIcon class="size-4" />
				<Alert.Title>Login Error</Alert.Title>
				<button on:click={closeError} class="absolute top-4 right-2 text-muted-foreground hover:text-foreground" aria-label="Close">
                    <X class="h-4 w-4" />
				</button>
                <Alert.Description>{loginError}</Alert.Description>
			</Alert.Root>
		</div>
        {/if}

		<h2 class="mb-6 text-center text-2xl font-semibold text-gray-800 dark:text-gray-100">Login</h2>

		<form on:submit|preventDefault={handleSubmit} class="space-y-4">
			<!-- Email -->
			<div class="relative">
				<Input type="text" placeholder="NIK" bind:value={username} required class="pl-10" />
				<User class="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
			</div>

			<!-- Password -->
			<div class="relative">
				<Input type={$showPassword ? 'text' : 'password'} placeholder="Password" bind:value={password} required class="pr-10 pl-10" />
				<Lock class="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
				<button type="button" on:click={togglePassword} class="absolute top-1/2 right-3 -translate-y-1/2 transform text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
					{#if $showPassword}
						<EyeOff class="h-5 w-5" />
					{:else}
						<Eye class="h-5 w-5" />
					{/if}
				</button>
			</div>

			<!-- Submit -->
			<Button type="submit" class="w-full">Masuk</Button>
		</form>
	</div>
</div>
