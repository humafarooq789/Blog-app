function showError(input, message) {
  const slot = document.querySelector('[data-error-for="' + input.id + '"]');
  if (slot) slot.textContent = message;
  input.style.borderColor = '#b3261e';
}

function clearError(input) {
  const slot = document.querySelector('[data-error-for="' + input.id + '"]');
  if (slot) slot.textContent = '';
  input.style.borderColor = '';
}

function looksLikeEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function valueOf(input) {
  return input.value.trim();
}


const loginForm = document.querySelector('#login-form');

if (loginForm) {
  const email = document.querySelector('#email');
  const password = document.querySelector('#password');
  const message = document.querySelector('#form-message');

  loginForm.addEventListener('submit', function (event) {
    event.preventDefault();

    let valid = true;
    message.textContent = '';

    if (valueOf(email) === '') {
      showError(email, 'Enter your email address.');
      valid = false;
    } else if (!looksLikeEmail(valueOf(email))) {
      showError(email, 'That does not look like an email address.');
      valid = false;
    } else {
      clearError(email);
    }

    if (valueOf(password) === '') {
      showError(password, 'Enter your password.');
      valid = false;
    } else {
      clearError(password);
    }

    if (!valid) return;

    const account = getRegisteredUser();

    if (!account) {
      message.textContent = 'No account found on this browser yet. Please register first.';
      return;
    }

    if (account.email !== valueOf(email) || account.password !== valueOf(password)) {
      message.textContent = 'Incorrect email or password.';
      return;
    }

    setCurrentUser(account);
    window.location.href = 'dashboard.html';
  });

  [email, password].forEach(function (input) {
    input.addEventListener('input', function () { clearError(input); });
  });
}


const registerFormWrap = document.querySelector('#register-form-wrap');
const alreadyRegisteredWrap = document.querySelector('#already-registered');
const registerForm = document.querySelector('#register-form');

if (registerFormWrap && alreadyRegisteredWrap) {

  if (getRegisteredUser()) {
    registerFormWrap.style.display = 'none';
    alreadyRegisteredWrap.style.display = 'block';
  } else {
    registerFormWrap.style.display = 'block';
    alreadyRegisteredWrap.style.display = 'none';
  }

  const switchLink = document.querySelector('#switch-account-link');
  if (switchLink) {
    switchLink.addEventListener('click', function (event) {
      event.preventDefault();
      clearRegisteredUser();
      clearCurrentUser();
      window.location.reload();
    });
  }
}

if (registerForm) {
  const name = document.querySelector('#name');
  const email = document.querySelector('#email');
  const phone = document.querySelector('#phone');
  const password = document.querySelector('#password');
  const confirm = document.querySelector('#confirm');
  const message = document.querySelector('#form-message');

  registerForm.addEventListener('submit', function (event) {
    event.preventDefault();

    let valid = true;
    message.textContent = '';

    if (valueOf(name).length < 2) {
      showError(name, 'Enter your name.');
      valid = false;
    } else {
      clearError(name);
    }

    if (!looksLikeEmail(valueOf(email))) {
      showError(email, 'Enter a valid email address.');
      valid = false;
    } else {
      clearError(email);
    }

    if (valueOf(phone).length < 7) {
      showError(phone, 'Enter a valid phone number.');
      valid = false;
    } else {
      clearError(phone);
    }

    if (valueOf(password).length < 8) {
      showError(password, 'Use at least 8 characters.');
      valid = false;
    } else {
      clearError(password);
    }

    if (valueOf(confirm) === '') {
      showError(confirm, 'Type your password again.');
      valid = false;
    } else if (valueOf(confirm) !== valueOf(password)) {
      showError(confirm, 'The two passwords do not match.');
      valid = false;
    } else {
      clearError(confirm);
    }

    if (!valid) return;

    const newAccount = {
      name: valueOf(name),
      email: valueOf(email),
      phone: valueOf(phone),
      password: valueOf(password)
    };

    setRegisteredUser(newAccount);
    setCurrentUser(newAccount);

    window.location.href = 'dashboard.html';
  });

  [name, email, phone, password, confirm].forEach(function (input) {
    input.addEventListener('input', function () { clearError(input); });
  });
}