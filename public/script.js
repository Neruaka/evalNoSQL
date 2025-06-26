class CarnetAdresses {
    constructor() {
        this.contactForm = document.getElementById('contactForm');
        this.contactsContainer = document.getElementById('contactsContainer');
        this.cancelBtn = document.getElementById('cancelBtn');
        this.editingContactId = null;
        
        this.init();
    }

    init() {
        this.loadContacts();
        this.bindEvents();
    }

    bindEvents() {
        this.contactForm.addEventListener('submit', (e) => this.handleSubmit(e));
        this.cancelBtn.addEventListener('click', () => this.cancelEdit());
    }

    async loadContacts() {
        try {
            this.showLoading();
            const response = await fetch('/api/contacts');
            
            if (!response.ok) {
                throw new Error('Erreur lors du chargement des contacts');
            }
            
            const contacts = await response.json();
            this.displayContacts(contacts);
        } catch (error) {
            this.showError('Erreur de connexion √† la base de donn√©es. V√©rifiez votre configuration MongoDB.');
        }
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(this.contactForm);
        const contactData = Object.fromEntries(formData);
        
        try {
            let response;
            if (this.editingContactId) {
                response = await fetch(`/api/contacts/${this.editingContactId}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(contactData)
                });
            } else {
                response = await fetch('/api/contacts', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(contactData)
                });
            }

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Erreur lors de la sauvegarde');
            }

            this.contactForm.reset();
            this.cancelEdit();
            this.loadContacts();
            this.showSuccess(this.editingContactId ? 'Contact modifi√©!' : 'Contact ajout√©!');
        } catch (error) {
            this.showError(error.message);
        }
    }

    async deleteContact(contactId) {
        if (!confirm('√ätes-vous s√ªr de vouloir supprimer ce contact ?')) {
            return;
        }

        try {
            const response = await fetch(`/api/contacts/${contactId}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la suppression');
            }

            this.loadContacts();
            this.showSuccess('Contact supprim√©!');
        } catch (error) {
            this.showError(error.message);
        }
    }

    editContact(contact) {
        this.editingContactId = contact._id;
        
        document.getElementById('nom').value = contact.nom;
        document.getElementById('prenom').value = contact.prenom;
        document.getElementById('telephone').value = contact.telephone;
        document.getElementById('email').value = contact.email;
        document.getElementById('adresse').value = contact.adresse || '';
        
        this.cancelBtn.style.display = 'inline-block';
        document.querySelector('.btn-primary').textContent = 'Modifier le contact';
        
        document.querySelector('.form-section h2').textContent = 'Modifier le contact';
    }

    cancelEdit() {
        this.editingContactId = null;
        this.contactForm.reset();
        this.cancelBtn.style.display = 'none';
        document.querySelector('.btn-primary').textContent = 'Ajouter le contact';
        document.querySelector('.form-section h2').textContent = 'Ajouter un contact';
    }

    displayContacts(contacts) {
        if (contacts.length === 0) {
            this.contactsContainer.innerHTML = '<div class="loading">Aucun contact trouv√©. Ajoutez votre premier contact!</div>';
            return;
        }

        const contactsHTML = contacts.map(contact => `
            <div class="contact-card">
                <div class="contact-header">
                    <div class="contact-name">${contact.prenom} ${contact.nom}</div>
                    <div class="contact-actions">
                        <button class="btn-edit" onclick="app.editContact(${JSON.stringify(contact).replace(/"/g, '&quot;')})">Modifier</button>
                        <button class="btn-delete" onclick="app.deleteContact('${contact._id}')">Supprimer</button>
                    </div>
                </div>
                <div class="contact-info">
                    <div><strong>Ì≥û</strong> ${contact.telephone}</div>
                    <div><strong>Ì≥ß</strong> ${contact.email}</div>
                    ${contact.adresse ? `<div><strong>Ìø†</strong> ${contact.adresse}</div>` : ''}
                </div>
            </div>
        `).join('');

        this.contactsContainer.innerHTML = contactsHTML;
    }

    showLoading() {
        this.contactsContainer.innerHTML = '<div class="loading">Chargement des contacts...</div>';
    }

    showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error';
        errorDiv.textContent = message;
        
        document.querySelector('.container').insertBefore(errorDiv, document.querySelector('main'));
        
        setTimeout(() => errorDiv.remove(), 5000);
    }

    showSuccess(message) {
        const successDiv = document.createElement('div');
        successDiv.className = 'success';
        successDiv.textContent = message;
        
        document.querySelector('.container').insertBefore(successDiv, document.querySelector('main'));
        
        setTimeout(() => successDiv.remove(), 3000);
    }
}

// Initialisation de l'application
const app = new CarnetAdresses();
