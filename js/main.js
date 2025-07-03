/**
 * Main JavaScript for portfolio website
 * Implements theme toggle, project loading, and scroll reveal
 */

document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();
    
    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const htmlEl = document.documentElement;
    
    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem('theme') || 
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    if (savedTheme === 'dark') {
        htmlEl.classList.add('dark-theme');
        themeToggle.textContent = '🌙';
    } else {
        htmlEl.classList.remove('dark-theme');
        themeToggle.textContent = '☀️';
    }
    
    themeToggle.addEventListener('click', () => {
        if (htmlEl.classList.contains('dark-theme')) {
            htmlEl.classList.remove('dark-theme');
            localStorage.setItem('theme', 'light');
            themeToggle.textContent = '☀️';
        } else {
            htmlEl.classList.add('dark-theme');
            localStorage.setItem('theme', 'dark');
            themeToggle.textContent = '🌙';
        }
    });
    
    // Load Projects from JSON
    fetch('/data/projects.json')
        .then(response => response.json())
        .then(projects => {
            const container = document.getElementById('projects-container');
            
            projects.forEach(project => {
                const projectCard = document.createElement('article');
                projectCard.className = 'project-card bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md';
                projectCard.innerHTML = `
                    <img src="${project.image}" alt="${project.title}" class="w-full h-48 object-cover">
                    <div class="p-6">
                        <h3 class="text-xl font-serif font-bold mb-2">${project.title}</h3>
                        <p class="mb-4">${project.description}</p>
                        <a href="${project.link}" class="text-accent hover:underline">View Project</a>
                    </div>
                `;
                container.appendChild(projectCard);
            });
        })
        .catch(error => console.error('Error loading projects:', error));
    
    // Simple scroll reveal
    const animateOnScroll = () => {
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight * 0.75) {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial styles for animation
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load
});