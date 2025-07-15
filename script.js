// EmailJS Configuration
emailjs.init("YOUR_PUBLIC_KEY");

// Mobile Menu Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.getElementById('nav-menu');

mobileMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Smooth Scrolling
function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({
        behavior: 'smooth'
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Counter Animation
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const increment = target / 200;
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        element.textContent = Math.floor(current);
        
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        }
    }, 10);
}

// Intersection Observer for counter animation
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.counter');
            counters.forEach(counter => {
                animateCounter(counter);
            });
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe the stats section
const statsSection = document.querySelector('.stats');
if (statsSection) {
    observer.observe(statsSection);
}

// Course Modal
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');

const courseData = {
    'HTML': {
        title: 'Formation HTML Complète',
        description: 'Apprenez les fondamentaux du HTML avec une approche pratique. Ce cours couvre les balises essentielles, la structure sémantique, les formulaires, et les bonnes pratiques d\'accessibilité. Parfait pour débuter dans le développement web.'
    },
    'CSS': {
        title: 'Maîtrisez le CSS Moderne',
        description: 'Découvrez le pouvoir du CSS avec Flexbox, Grid, les animations et le responsive design. Créez des interfaces modernes et attrayantes. Apprenez les techniques avancées utilisées par les professionnels.'
    },
    'JavaScript': {
        title: 'JavaScript de A à Z',
        description: 'Maîtrisez JavaScript depuis les bases jusqu\'aux concepts avancés. DOM, ES6+, APIs, programmation asynchrone et frameworks modernes. Devenez un développeur JavaScript compétent.'
    },
    'Python': {
        title: 'Python pour Tous',
        description: 'Apprenez Python, le langage le plus polyvalent. De la syntaxe de base à Django, en passant par l\'analyse de données. Idéal pour l\'automatisation, le web et la data science.'
    },
    'PHP': {
        title: 'Développement Web avec PHP',
        description: 'Créez des applications web dynamiques avec PHP et MySQL. Apprenez Laravel, la gestion des sessions, la sécurité web et les bonnes pratiques du développement backend.'
    },
    'Java': {
        title: 'Java Professionnel',
        description: 'Maîtrisez Java pour le développement d\'applications robustes. POO, Spring Boot, bases de données, et développement d\'APIs REST. Formation complète pour devenir développeur Java.'
    }
};

// Course button click handlers
document.querySelectorAll('.course-button').forEach(button => {
    button.addEventListener('click', (e) => {
        const courseCard = e.target.closest('.course-card');
        const courseName = courseCard.querySelector('h3').textContent;
        
        modalTitle.textContent = courseData[courseName].title;
        modalDescription.textContent = courseData[courseName].description;
        modal.style.display = 'block';
    });
});

// Modal close function
function closeModal() {
    modal.style.display = 'none';
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// WhatsApp integration function
function sendToWhatsApp(message) {
    const phoneNumber = "5546991117608";
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappURL, '_blank');
}

// Modal inscription button
document.querySelector('.modal-button').addEventListener('click', () => {
    const courseName = modalTitle.textContent;
    const whatsappMessage = `🎓 INTÉRÊT POUR UN COURS - POWER ACADÉMIE\n\n📚 Cours: ${courseName}\n👤 Action: Un visiteur a cliqué sur "S'inscrire maintenant"\n\n💡 Suggestion: Contactez ce visiteur rapidement !`;
    
    // Send to WhatsApp
    sendToWhatsApp(whatsappMessage);
    
    // Close modal and scroll to contact
    closeModal();
    scrollToSection('contact');
    
    // Pre-fill contact form
    const messageField = document.getElementById('message');
    if (messageField) {
        messageField.value = `Bonjour, je suis intéressé(e) par le cours de ${courseName.replace('Formation ', '').replace(' Complète', '').replace('Maîtrisez le ', '').replace(' Moderne', '').replace(' de A à Z', '').replace(' pour Tous', '').replace('Développement Web avec ', '').replace(' Professionnel', '')}. Pouvez-vous me donner plus d'informations sur les modalités d'inscription ?`;
        messageField.focus();
    }
});

// Contact Form Submission
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const nom = document.getElementById('nom').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Prepare template parameters for EmailJS
    const templateParams = {
        from_name: nom,
        from_email: email,
        message: message,
        to_email: 'poweracdemie@gmail.com'
    };
    
    // Send via EmailJS (if configured)
    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
        .then(function(response) {
            alert('Message envoyé avec succès !');
            document.getElementById('contact-form').reset();
        }, function(error) {
            console.log('EmailJS Error:', error);
            // Continue with WhatsApp even if EmailJS fails
        });
    
    // Send to WhatsApp
    const currentDate = new Date().toLocaleString('fr-FR');
    const whatsappMessage = `🎓 NOUVEAU MESSAGE - POWER ACADÉMIE\n\n👤 Nom: ${nom}\n📧 Email: ${email}\n\n💬 Message:\n${message}\n\n---\n📅 Reçu le: ${currentDate}\n🌐 Depuis: Power Académie`;
    
    sendToWhatsApp(whatsappMessage);
    
    // Show success message
    alert('Message envoyé avec succès ! Vous allez être redirigé vers WhatsApp.');
    
    // Reset form
    document.getElementById('contact-form').reset();
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});