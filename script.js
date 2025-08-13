document.addEventListener("DOMContentLoaded", () => {
  const timeline = document.getElementById("timeline");
  const modal = document.getElementById("modal");
  const closeModal = document.getElementById("close-modal");
  const modalTitle = document.getElementById("modal-title");
  const modalDate = document.getElementById("modal-date");
  const modalImage = document.getElementById("modal-image");
  const modalDescription = document.getElementById("modal-description");

  // Helper to format date (removes hour and minutes)
  function formatDate(dateStr) {
    // Example: "5 August 2025, 18:30 IST" -> "5 August 2025"
    return dateStr.split(',')[0].trim();
  }

  // Helper to show modal
  function showModal(event) {
    modalTitle.textContent = event.title;
    modalDate.textContent = formatDate(event.date);
    modalImage.src = event.imageURL || "";
    modalImage.alt = event.title;
    modalImage.onerror = () => {
      modalImage.src = "https://via.placeholder.com/600x300?text=No+Image";
    };
    modalDescription.textContent = event.description;
    modal.classList.remove("hidden");
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

        item.innerHTML = `
          <div class="content">
            <h3>${formatDate(event.date)}</h3>
            <h2>${event.title}</h2>
          </div>
        `;

        // Only open modal when clicking the .content
        item.querySelector('.content').addEventListener("click", (e) => {
          e.stopPropagation();
          showModal(event);
        });

        // Keyboard accessibility for the whole item
        item.addEventListener("keydown", (e) => {
          if (e.key === "Enter" || e.key === " ") {
            showModal(event);
          }
        });

        timeline.appendChild(item);
      });
    })
    .catch(err => console.error("Error loading events:", err));

  // Close modal
  function hideModal() {
    modal.classList.add("hidden");
  }

  closeModal.addEventListener("click", hideModal);

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
