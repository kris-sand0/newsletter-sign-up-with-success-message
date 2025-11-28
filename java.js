// Form handling for newsletter signup
const formEl = document.getElementById('signup-form');
const emailEl = document.getElementById('email-input');
const errorEl = document.getElementById('error-msg');
const successPanel = document.getElementById('success-panel');
const successEmail = document.getElementById('success-email');
const dismissBtn = document.getElementById('dismiss-success');

function showError(msg) {
    if (!errorEl) return;
    errorEl.textContent = msg;
    emailEl?.setAttribute('aria-invalid', 'true');
    // Associate the input with the visible error message for screen readers
    emailEl?.setAttribute('aria-describedby', 'error-msg');
    // Move focus to the input so keyboard users notice the problem immediately
    try { emailEl?.focus(); } catch (e) { /* ignore focus errors */ }
    // Small animation: add a shaking class to draw attention
    errorEl.classList.remove('animate-shake');
    // trigger reflow to restart animation
    // eslint-disable-next-line no-unused-expressions
    errorEl.offsetWidth;
    errorEl.classList.add('animate-shake');
}

function clearError() {
    if (!errorEl) return;
    errorEl.textContent = '';
    emailEl?.removeAttribute('aria-invalid');
    emailEl?.removeAttribute('aria-describedby');
    errorEl.classList.remove('animate-shake');
}

function showSuccess(addr) {
    if (!successPanel) return;
    // Ensure any error state is cleared before showing success
    clearError();
    successEmail.textContent = addr;
    // Reveal with a subtle animation
    successPanel.hidden = false;
    successPanel.classList.remove('animate-exit');
    // trigger reflow
    // eslint-disable-next-line no-unused-expressions
    successPanel.offsetWidth;
    successPanel.classList.add('animate-enter');
    formEl.hidden = true;
    // remove the enter class after animation completes
    setTimeout(() => successPanel.classList.remove('animate-enter'), 350);
    dismissBtn?.focus();
}

formEl?.addEventListener('submit', (e) => {
    e.preventDefault();
    clearError();
    const value = emailEl.value.trim();
    if (!value) return showError('This field is required');
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(value)) return showError('Please provide a valid email');
    showSuccess(value);
});

dismissBtn?.addEventListener('click', () => {
    // play exit animation then hide
    successPanel.classList.remove('animate-enter');
    successPanel.classList.add('animate-exit');
    setTimeout(() => {
        successPanel.hidden = true;
        successPanel.classList.remove('animate-exit');
        formEl.hidden = false;
        formEl.reset();
        emailEl.focus();
        clearError();
    }, 300);
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && successPanel && !successPanel.hidden) {
        dismissBtn?.click();
    }
});