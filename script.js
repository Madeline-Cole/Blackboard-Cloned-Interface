document.addEventListener('DOMContentLoaded', function() {

    const loginPage = document.getElementById('login-page');
    const canelinkLoginPage = document.getElementById('canelink-login-page');
    const mainContentContainer = document.getElementById('main-content');
    const canelinkLoginButton = document.getElementById('canelink-login');
    const navItems = document.querySelectorAll('nav ul li');
    const mainContent = document.querySelector('#main-content main');
    const nav = document.querySelector('nav');
    const loginForm = document.getElementById('secondary-login-form');
    const errorMessageDiv = document.getElementById('error');
    const errorText = document.getElementById('errorText');

    // Show Canelink login page
    canelinkLoginButton.addEventListener('click', function() {
        loginPage.classList.add('hidden');
        canelinkLoginPage.classList.remove('hidden');
    });

    
    // Handle login form submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent default form submission

        const emailInput = document.getElementById('email-input'); // Email input
        const passwordInput = document.getElementById('password-input'); // Password input

        // Clear previous error messages
        errorMessageDiv.style.display = 'none';
        errorText.textContent = '';

        // Validate email
        if (!emailInput.value) {
            errorText.textContent = 'Enter your user ID in the format "domain\\user" or "user@domain".';
            errorMessageDiv.style.display = 'block'; // Show the error message
            return; // Stop the submission
        }

        // Validate password
        if (!passwordInput.value) {
            errorText.textContent = 'Enter your password.';
            errorMessageDiv.style.display = 'block'; // Show the error message
            return; // Stop the submission
        }

        // If validation passes, proceed with form submission
        document.getElementById('login-container').classList.add('hidden');
        mainContentContainer.classList.remove('hidden');
        updateMainContent('institution'); // Show the institution page by default
    });

     // Handle nav scrolling
     nav.addEventListener('wheel', function(e) {
        e.preventDefault();
        nav.scrollTop += e.deltaY;
    });

    // Handle navigation item clicks
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.stopPropagation();
            navItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            const page = this.getAttribute('data-page');
            updateMainContent(page);
        });
    });

    // Update main content based on the selected page
    function updateMainContent(page) {
        let content = '';
        switch(page) {
            case 'institution':
                content = `
                    <header class="institution-header">
                        <div class="header-content">
                            <div class="icon-container">
                                <img src="images/university-icon.png" alt="University Icon" class="university-icon">
                            </div>
                            <h1 class="university-title">University of Miami</h1>
                        </div>
                    </header>
                    <div class="page-content">
                        <p>Welcome to the University of Miami's homepage.</p>
                    </div>
                `;
                break;
            case 'account':
                content = '<h1>Account</h1><p>Manage your account settings here.</p>';
                break;
            case 'activity':
                content = '<h1>Activity</h1><p>View your recent activity.</p>';
                break;
            // Add cases for other pages...
            default:
                content = '<h1>Page Not Found</h1><p>The requested page does not exist.</p>';
        }
        mainContent.innerHTML = content;
    }
});

