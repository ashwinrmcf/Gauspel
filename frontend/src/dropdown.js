// Plus button dropdown functionality
document.addEventListener('DOMContentLoaded', function() {
    const plusBtn = document.getElementById('plusBtn');
    const plusDropdown = document.getElementById('plusDropdown');
    const selectFilesOption = document.getElementById('selectFiles');
    const takeScreenshotOption = document.getElementById('takeScreenshot');

    // Toggle dropdown
    plusBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        plusDropdown.classList.toggle('show');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!plusBtn.contains(e.target) && !plusDropdown.contains(e.target)) {
            plusDropdown.classList.remove('show');
        }
    });

    // Handle file selection
    selectFilesOption.addEventListener('click', function() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*,text/*,.pdf,.doc,.docx';
        input.multiple = true;
        
        input.onchange = function(e) {
            const files = Array.from(e.target.files);
            console.log('Selected files:', files);
            // Handle file processing here
            handleFileSelection(files);
        };
        
        input.click();
        plusDropdown.classList.remove('show');
    });

    // Handle screenshot
    takeScreenshotOption.addEventListener('click', function() {
        console.log('Taking screenshot...');
        // Handle screenshot functionality here
        handleScreenshot();
        plusDropdown.classList.remove('show');
    });

    function handleFileSelection(files) {
        const messageInput = document.getElementById('messageInput');
        if (files.length === 1) {
            messageInput.placeholder = `File selected: ${files[0].name}`;
        } else {
            messageInput.placeholder = `${files.length} files selected`;
        }
        
        // Add visual indicator
        messageInput.style.borderColor = 'rgba(34, 197, 94, 0.5)';
        setTimeout(() => {
            messageInput.style.borderColor = 'rgba(147, 51, 234, 0.3)';
        }, 2000);
    }

    function handleScreenshot() {
        const messageInput = document.getElementById('messageInput');
        messageInput.placeholder = 'Screenshot mode activated - Click to capture';
        messageInput.style.borderColor = 'rgba(251, 146, 60, 0.5)';
        
        setTimeout(() => {
            messageInput.placeholder = 'Enter text, paste URL, or describe an image to verify...';
            messageInput.style.borderColor = 'rgba(147, 51, 234, 0.3)';
        }, 3000);
    }
});
