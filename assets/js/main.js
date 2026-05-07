// f:\MAY_WEBSITES\letskite\assets\js\main.js
document.addEventListener('DOMContentLoaded', () => {
  // Theme Toggle
  const themeToggles = document.querySelectorAll('.theme-toggle');
  const htmlEl = document.documentElement;
  
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    htmlEl.setAttribute('data-theme', 'dark');
    updateThemeIcons('dark');
  } else {
    updateThemeIcons('light');
  }

  themeToggles.forEach(btn => {
    btn.addEventListener('click', () => {
      const currentTheme = htmlEl.getAttribute('data-theme');
      if (currentTheme === 'dark') {
        htmlEl.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
        updateThemeIcons('light');
      } else {
        htmlEl.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        updateThemeIcons('dark');
      }
    });
  });

  function updateThemeIcons(theme) {
    themeToggles.forEach(btn => {
      if (theme === 'dark') {
        btn.innerHTML = '<i class="ph ph-sun"></i>';
      } else {
        btn.innerHTML = '<i class="ph ph-moon"></i>';
      }
    });
  }

  // RTL Toggle
  const rtlToggles = document.querySelectorAll('.rtl-toggle');
  
  rtlToggles.forEach(btn => {
    btn.innerHTML = '<i class="ph ph-arrows-left-right"></i>';
    btn.addEventListener('click', () => {
      const isRtl = htmlEl.getAttribute('dir') === 'rtl';
      if (isRtl) {
        htmlEl.removeAttribute('dir');
      } else {
        htmlEl.setAttribute('dir', 'rtl');
      }
    });
  });

  // Drawer Menu
  const hamburger = document.querySelector('.hamburger');
  const drawer = document.querySelector('.drawer');
  const drawerClose = document.querySelector('.drawer-close');
  const drawerOverlay = document.querySelector('.drawer-overlay');

  function openDrawer() {
    drawer.classList.add('open');
    drawerOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.classList.remove('open');
    drawerOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (hamburger) hamburger.addEventListener('click', openDrawer);
  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
  if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);

  // Form Validation Generic
  const forms = document.querySelectorAll('.needs-validation');
  
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      const inputs = form.querySelectorAll('.form-control[required]');
      inputs.forEach(input => {
        const errorMsg = input.nextElementSibling;
        if (!input.value.trim()) {
          input.classList.add('error');
          input.classList.remove('success');
          if (errorMsg && errorMsg.classList.contains('error-msg')) {
            errorMsg.style.display = 'block';
            errorMsg.textContent = 'This field is required';
          }
          isValid = false;
        } else if (input.type === 'email') {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(input.value)) {
            input.classList.add('error');
            input.classList.remove('success');
            if (errorMsg && errorMsg.classList.contains('error-msg')) {
              errorMsg.style.display = 'block';
              errorMsg.textContent = 'Please enter a valid email address';
            }
            isValid = false;
          } else {
            setSuccess(input, errorMsg);
          }
        } else {
          setSuccess(input, errorMsg);
        }
      });

      // Terms Checkbox Validation
      const terms = form.querySelector('#terms');
      if (terms && !terms.checked) {
        isValid = false;
        alert('You must accept the Terms & Conditions.');
      }

      // Password Match Validation
      const password = form.querySelector('#password');
      const confirmPassword = form.querySelector('#confirmPassword');
      if (password && password.value.length < 8) {
        password.classList.add('error');
        isValid = false;
      }
      if (password && confirmPassword && password.value !== confirmPassword.value) {
        confirmPassword.classList.add('error');
        const cpError = confirmPassword.nextElementSibling;
        if (cpError) {
          cpError.style.display = 'block';
          cpError.textContent = 'Passwords do not match';
        }
        isValid = false;
      }

      if (isValid) {
        const btn = form.querySelector('button[type="submit"]');
        const ogText = btn.textContent;
        btn.textContent = 'Success!';
        btn.classList.add('success');
        setTimeout(() => {
          btn.textContent = ogText;
          btn.classList.remove('success');
          form.reset();
          inputs.forEach(i => i.classList.remove('success', 'error'));
        }, 3000);
      }
    });
  });

  function setSuccess(input, errorMsg) {
    input.classList.remove('error');
    input.classList.add('success');
    if (errorMsg && errorMsg.classList.contains('error-msg')) {
      errorMsg.style.display = 'none';
    }
  }

  // Password Visibility Toggle
  const toggleButtons = document.querySelectorAll('.password-toggle');
  toggleButtons.forEach(btn => {
    btn.innerHTML = '<i class="ph ph-eye"></i>';
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const input = btn.previousElementSibling;
      const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
      input.setAttribute('type', type);
      btn.innerHTML = type === 'password' ? '<i class="ph ph-eye"></i>' : '<i class="ph ph-eye-slash"></i>';
    });
  });

  // Back to Top
  if (!document.querySelector('.auth-page')) {
    const backToTop = document.createElement('button');
    backToTop.className = 'back-to-top';
    backToTop.innerHTML = '<i class="ph ph-caret-up"></i>';
    backToTop.setAttribute('aria-label', 'Back to Top');
    document.body.appendChild(backToTop);

    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTop.classList.add('show');
      } else {
        backToTop.classList.remove('show');
      }
    });

    backToTop.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
});
