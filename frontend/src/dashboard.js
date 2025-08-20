document.addEventListener('DOMContentLoaded', () => {


// Optional: Add a "Back to Welcome" button or link in your existing pages

    const logoutBtn = document.getElementById('logoutBtn');

    logoutBtn.addEventListener('click', async () => {
        await window.electronAPI.navigateToLogin();
    });
});
