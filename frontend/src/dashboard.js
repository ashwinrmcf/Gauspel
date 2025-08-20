document.addEventListener('DOMContentLoaded', () => {
    const logoutBtn = document.getElementById('logoutBtn');

    logoutBtn.addEventListener('click', async () => {
        await window.electronAPI.navigateToLogin();
    });
});
