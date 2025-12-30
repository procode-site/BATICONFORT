// Gestion de la navigation mobile
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
    
    // Fermer le menu au clic sur un lien
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });
}

// Gestion du formulaire de contact améliorée
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Validation des champs
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const city = document.getElementById('city').value.trim();
        const service = document.getElementById('service').value;
        const message = document.getElementById('message').value.trim();
        const surface = document.querySelector('input[name="surface"]:checked');
        
        // Validation
        let isValid = true;
        const errors = [];
        
        if (!name) {
            errors.push("Le nom est obligatoire");
            isValid = false;
        }
        
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            errors.push("L'email est invalide");
            isValid = false;
        }
        
        if (!phone || !/^[0-9]{10}$/.test(phone.replace(/\s/g, ''))) {
            errors.push("Le téléphone doit contenir 10 chiffres");
            isValid = false;
        }
        
        if (!city) {
            errors.push("La ville est obligatoire");
            isValid = false;
        }
        
        if (!service) {
            errors.push("Veuillez sélectionner un type de travaux");
            isValid = false;
        }
        
        if (!message) {
            errors.push("La description du projet est obligatoire");
            isValid = false;
        }
        
        if (!surface) {
            errors.push("Veuillez estimer la surface");
            isValid = false;
        }
        
        if (!isValid) {
            const errorMessage = "Veuillez corriger les erreurs suivantes :\n\n" + errors.join("\n• ");
            showNotification(errorMessage, 'error');
            return;
        }
        
        // Simulation d'envoi
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        const originalHTML = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
        submitBtn.disabled = true;
        
        // Simulation d'attente
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Succès
        showNotification(
            `Merci ${name} pour votre demande de devis !\n\nNous vous contacterons dans les 24h au ${phone} pour discuter de votre projet à ${city}.`,
            'success'
        );
        
        // Réinitialisation
        contactForm.reset();
        submitBtn.innerHTML = originalHTML;
        submitBtn.disabled = false;
        
        // Scroll vers le haut
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Gestion des filtres portfolio
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

if (filterButtons.length > 0 && portfolioItems.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Retirer la classe active de tous les boutons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Ajouter la classe active au bouton cliqué
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Gestion de la modal d'images
const modal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const modalClose = document.getElementById('modalClose');
const portfolioImages = document.querySelectorAll('.portfolio-image');

if (modal && modalImage && modalClose) {
    // Ouvrir la modal au clic sur une image
    portfolioImages.forEach(img => {
        img.addEventListener('click', () => {
            modalImage.src = img.src;
            modalImage.alt = img.alt;
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Fermer la modal
    modalClose.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    // Fermer la modal en cliquant en dehors
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Fermer avec la touche Échap
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}

// Animation des points sur la carte
document.addEventListener('DOMContentLoaded', () => {
    const mapPoints = document.querySelectorAll('.map-point');
    
    if (mapPoints.length > 0) {
        mapPoints.forEach(point => {
            point.addEventListener('click', function() {
                const city = this.querySelector('.city').textContent;
                showNotification(
                    `BATICONFORT intervient à ${city} et ses environs !\n\nContactez-nous pour un devis gratuit : 07 71 61 46 57`,
                    'info'
                );
            });
        });
        
        // Animation d'apparition des points
        setTimeout(() => {
            mapPoints.forEach((point, index) => {
                setTimeout(() => {
                    point.style.opacity = '0';
                    point.style.transform = 'translate(-50%, -50%) scale(0)';
                    point.style.transition = 'all 0.5s ease';
                    
                    setTimeout(() => {
                        point.style.opacity = '1';
                        point.style.transform = 'translate(-50%, -50%) scale(1)';
                    }, 100);
                }, index * 200);
            });
        }, 1000);
    }
    
    // Animation au défilement
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.service-card, .team-member, .value-card, .testimonial-card');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('fade-in');
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Exécuter au chargement
});

// Fonction de notification
function showNotification(message, type = 'info') {
    // Supprimer les notifications existantes
    const existingNotification = document.querySelector('.custom-notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Créer la notification
    const notification = document.createElement('div');
    notification.className = `custom-notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <p>${message}</p>
        </div>
        <button class="notification-close"><i class="fas fa-times"></i></button>
    `;
    
    // Styles de la notification
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        z-index: 9999;
        max-width: 400px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 15px;
        animation: slideIn 0.3s ease;
        font-family: 'Roboto', sans-serif;
    `;
    
    // Styles pour le contenu
    const contentStyle = document.createElement('style');
    contentStyle.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        .notification-content {
            display: flex;
            align-items: flex-start;
            gap: 15px;
        }
        
        .notification-content i {
            font-size: 1.5rem;
            margin-top: 2px;
        }
        
        .notification-content p {
            margin: 0;
            font-size: 0.95rem;
            line-height: 1.4;
            white-space: pre-line;
        }
        
        .notification-close {
            background: none;
            border: none;
            color: white;
            cursor: pointer;
            font-size: 1rem;
            padding: 5px;
            margin-left: 10px;
        }
    `;
    document.head.appendChild(contentStyle);
    
    // Ajouter la notification au body
    document.body.appendChild(notification);
    
    // Fermer la notification
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Fermer automatiquement après 5 secondes
    setTimeout(() => {
        if (document.body.contains(notification)) {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Ajout du style pour la notification
const notificationStyle = document.createElement('style');
notificationStyle.textContent = `
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(notificationStyle);

// Gestion des images manquantes
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        // Prévenir les images cassées
        img.addEventListener('error', function() {
            this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI2Y4ZjlmYSIvPgogIDx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiNjY2MiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5JbWFnZSBub24gZGlzcG9uaWJsZTwvdGV4dD4KPC9zdmc+';
            this.alt = 'Image non disponible';
        });
    });
});