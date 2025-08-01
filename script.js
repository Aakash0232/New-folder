// This script simulates user authentication using the browser's local storage.
// This is for demonstration only and is NOT secure for a live website.

// Function to show a custom message box
const showMessage = (message, type = 'success') => {
    const messageBox = document.getElementById('message-box');
    if (messageBox) {
        messageBox.textContent = message;
        messageBox.className = `message-box show ${type}`;
        setTimeout(() => {
            messageBox.classList.remove('show');
        }, 5000); // Message disappears after 5 seconds
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // Set current year in footer
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Smooth Scroll for header links on index page
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId && targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    const headerHeight = document.querySelector('.main-header').offsetHeight || 0;
                    window.scrollTo({
                        top: targetElement.offsetTop - headerHeight,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Mobile Menu Toggle logic
    const mobileMenu = document.getElementById('mobile-menu');
    const navList = document.querySelector('.nav-list');
    if (mobileMenu && navList) {
        mobileMenu.addEventListener('click', () => {
            navList.classList.toggle('active');
            mobileMenu.classList.toggle('is-active');
        });
        navList.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navList.classList.remove('active');
                mobileMenu.classList.remove('is-active');
            });
        });
    }

    // --- Signup Form Handler ---
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = signupForm['signup-username'].value;
            const mobileno = signupForm['signup-mobileno'].value;
            const password = signupForm['signup-password'].value;

            // Get existing users from local storage or initialize an empty array
            const storedUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];

            // Check if username already exists
            const userExists = storedUsers.some(user => user.username === username);

            if (userExists) {
                showMessage("Error: User with this username already exists.", "error");
            } else {
                // If not, create a new user object and add it to the array
                const newUser = {
                    username: username,
                    mobileno: mobileno,
                    password: password
                };
                storedUsers.push(newUser);
                localStorage.setItem('registeredUsers', JSON.stringify(storedUsers));
                
                showMessage("Account created successfully! Redirecting to login...", "success");
                // Wait for a second before redirecting
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 2000);
            }
        });
    }

    // --- Login Form Handler ---
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = loginForm['login-username'].value;
            const password = loginForm['login-password'].value;

            // Get existing users from local storage
            const storedUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];

            // Find the user with the matching username and password
            const user = storedUsers.find(u => u.username === username && u.password === password);

            if (user) {
                showMessage("Login successful! Redirecting to home page...", "success");
                // Wait for a second before redirecting
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 2000);
            } else {
                showMessage("Invalid username or password. Please try again.", "error");
            }
        });
    }
});
