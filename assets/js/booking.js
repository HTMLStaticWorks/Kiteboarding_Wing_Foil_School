// f:\MAY_WEBSITES\letskite\assets\js\booking.js
document.addEventListener('DOMContentLoaded', () => {
  const bookingForm = document.getElementById('bookingForm');
  const dateInput = document.getElementById('date');
  
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
  }

  if (bookingForm) {
    const typeSelect = document.getElementById('lessonType');
    const participantsInput = document.getElementById('participants');
    const priceDisplay = document.getElementById('totalPrice');

    const prices = {
      'beginner': 150,
      'intermediate': 120,
      'advanced': 200,
      'wingfoil': 180
    };

    function updatePrice() {
      if (typeSelect && participantsInput && priceDisplay) {
        const basePrice = prices[typeSelect.value] || 0;
        const count = parseInt(participantsInput.value) || 1;
        const total = basePrice * count;
        priceDisplay.textContent = `€${total}`;
      }
    }

    if (typeSelect) typeSelect.addEventListener('change', updatePrice);
    if (participantsInput) participantsInput.addEventListener('input', updatePrice);
  }
});
