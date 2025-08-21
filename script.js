document.addEventListener("DOMContentLoaded", () => {
  const timeline = document.getElementById("timeline");
  const modal = document.getElementById("modal");
  const closeModal = document.getElementById("close-modal");
  const modalTitle = document.getElementById("modal-title");
  const modalDate = document.getElementById("modal-date");
  const modalImage = document.getElementById("modal-image");
  const modalDescription = document.getElementById("modal-description");
  const modalContent = document.querySelector('.modal-content');
  
  let lastFocusedElement = null;
  let currentActiveEvent = null;

  // Helper to format date (removes hour and minutes)
  function formatDate(dateStr) {
    // Example: "5 August 2025, 18:30 IST" -> "5 August 2025"
    return dateStr.split(',')[0].trim();
  }

  // Focus trap for modal
  function trapFocus(e) {
    if (!modal.classList.contains('hidden')) {
      const focusableElements = modalContent.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstFocusableElement = focusableElements[0];
      const lastFocusableElement = focusableElements[focusableElements.length - 1];

      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstFocusableElement) {
            e.preventDefault();
            lastFocusableElement.focus();
          }
        } else {
          if (document.activeElement === lastFocusableElement) {
            e.preventDefault();
            firstFocusableElement.focus();
          }
        }
      }
    }
  }

  // Helper to show modal
  function showModal(event, triggerElement) {
    modalTitle.textContent = event.title;
    modalDate.textContent = formatDate(event.date);
    modalImage.src = event.imageURL || "";
    modalImage.alt = event.title;
    modalImage.onerror = () => {
      modalImage.src = "https://via.placeholder.com/600x300?text=No+Image";
    };
    modalDescription.textContent = event.description;
    
    // Set ARIA attributes
    modal.setAttribute('aria-labelledby', 'modal-title');
    modal.setAttribute('aria-describedby', 'modal-description');
    
    // Store last focused element and current active event
    lastFocusedElement = triggerElement;
    currentActiveEvent = event;
    
    // Update aria-current on timeline items
    document.querySelectorAll('.timeline-item').forEach(item => {
      item.removeAttribute('aria-current');
    });
    if (triggerElement.closest('.timeline-item')) {
      triggerElement.closest('.timeline-item').setAttribute('aria-current', 'true');
    }
    
    modal.classList.remove("hidden");
    
    // Focus the close button when modal opens
    setTimeout(() => {
      closeModal.focus();
    }, 100);
    
    // Add focus trap event listener
    document.addEventListener('keydown', trapFocus);
  }

  // Fetch events
  fetch("events.json")
    .then(res => res.json())
    .then(events => {
      events.forEach((event, index) => {
        // Alternate left/right classes
        const side = index % 2 === 0 ? "left" : "right";
        const item = document.createElement("div");
        item.className = `timeline-item ${side}`;
        item.tabIndex = 0; // Make focusable
        item.setAttribute('role', 'listitem');
        item.setAttribute('aria-label', `${formatDate(event.date)}: ${event.title}`);

        item.innerHTML = `
          <div class="content">
            <h3>${formatDate(event.date)}</h3>
            <h2>${event.title}</h2>
          </div>
        `;

        // Only open modal when clicking the .content
        item.querySelector('.content').addEventListener("click", (e) => {
          e.stopPropagation();
          showModal(event, e.currentTarget);
        });

        // Keyboard accessibility for the whole item
        item.addEventListener("keydown", (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            showModal(event, e.currentTarget);
          }
          
          // Arrow key navigation
          if (e.key === "ArrowRight" || e.key === "ArrowDown") {
            e.preventDefault();
            const nextItem = item.nextElementSibling;
            if (nextItem && nextItem.classList.contains('timeline-item')) {
              nextItem.focus();
            }
          }
          
          if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
            e.preventDefault();
            const prevItem = item.previousElementSibling;
            if (prevItem && prevItem.classList.contains('timeline-item')) {
              prevItem.focus();
            }
          }
          
          // Home and End keys
          if (e.key === "Home") {
            e.preventDefault();
            const firstItem = timeline.querySelector('.timeline-item:first-child');
            if (firstItem) firstItem.focus();
          }
          
          if (e.key === "End") {
            e.preventDefault();
            const lastItem = timeline.querySelector('.timeline-item:last-child');
            if (lastItem) lastItem.focus();
          }
        });

        timeline.appendChild(item);
      });
    })
    .catch(err => console.error("Error loading events:", err));

  // Close modal with focus management
  function hideModal() {
    modal.classList.add("hidden");
    
    // Remove focus trap event listener
    document.removeEventListener('keydown', trapFocus);
    
    // Return focus to the element that opened the modal
    if (lastFocusedElement) {
      setTimeout(() => {
        lastFocusedElement.focus();
      }, 100);
    }
    
    // Clear aria-current from all timeline items
    document.querySelectorAll('.timeline-item').forEach(item => {
      item.removeAttribute('aria-current');
    });
    
    lastFocusedElement = null;
    currentActiveEvent = null;
  }

  closeModal.addEventListener("click", hideModal);
  closeModal.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      hideModal();
    }
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      hideModal();
    }
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) {
      hideModal();
    }
  });

  // Hide modal initially
  modal.classList.add("hidden");
});
