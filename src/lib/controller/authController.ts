import { goto } from "$app/navigation";
import { API_BASE } from "$lib/config/api";

const authController = {
    async login(username: string, password: string) {
        const res = await fetch(`${API_BASE}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });


        if (!res.ok) {
            const text = await res.text();
            return JSON.parse(text);
        }

        const data = await res.json();
        localStorage.setItem('user', JSON.stringify(data));
        goto('/app');

        return {
            code: 200
        }
    },

    async checkToken() {
        const userInfo = localStorage.getItem('user');
        if (!userInfo) {
            goto('/');
            return;
        }

        const user = JSON.parse(userInfo);

        // --- Coba akses endpoint utama ---
        const res = await fetch(`${API_BASE}/auth/getviewlistmenu`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${user.token}`,
                'Content-Type': 'application/json'
            },
        });

        // --- Jika token sudah expired / tidak valid ---
        if (!res.ok) {
            const reLogin = await fetch(`${API_BASE}/refreshtoken`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    access_token: user.token,
                    refresh_token: user.refreshToken,
                    user: user.user
                }),
            });

            if (reLogin.ok) {
                const newData = await reLogin.json();
                localStorage.setItem('user', JSON.stringify(newData));
                goto('/app');
            } else {
                console.error('Refresh token gagal, redirect ke login.');
                localStorage.removeItem('userInfo');
                goto('/');
            }

            return;
        } else {
            goto('/app');
        }

        return await res.json();
    }
}

export default authController