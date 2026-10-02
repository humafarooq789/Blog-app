const CURRENT_USER_KEY   = 'inkwell-current-user';
const REGISTERED_USER_KEY = 'inkwell-user';

function getCurrentUser() {
  const raw = localStorage.getItem(CURRENT_USER_KEY);
  return raw ? JSON.parse(raw) : null;
}

function setCurrentUser(user) {
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
}

function clearCurrentUser() {
  localStorage.removeItem(CURRENT_USER_KEY);
}

function getRegisteredUser() {
  const raw = localStorage.getItem(REGISTERED_USER_KEY);
  return raw ? JSON.parse(raw) : null;
}

function setRegisteredUser(user) {
  localStorage.setItem(REGISTERED_USER_KEY, JSON.stringify(user));
}

function clearRegisteredUser() {
  localStorage.removeItem(REGISTERED_USER_KEY);
}

const PROTECTED_PAGES = ['dashboard.html', 'profile.html', 'create-blog.html'];

(function guardAndWireHeader() {
  const currentUser = getCurrentUser();
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  if (PROTECTED_PAGES.includes(currentPage) && !currentUser) {
    window.location.href = 'login.html';
    return;
  }

  if (currentUser) {
    document.body.classList.add('is-logged-in');
  }

  const profileToggle = document.querySelector('.profile-toggle');
  const profileMenu = document.querySelector('.profile-menu');

  if (profileToggle && profileMenu) {
    profileToggle.addEventListener('click', function (event) {
      event.stopPropagation();
      profileMenu.classList.toggle('open');
    });

    document.addEventListener('click', function () {
      profileMenu.classList.remove('open');
    });
  }

  const logoutBtn = document.querySelector('#logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function () {
      clearCurrentUser();
      window.location.href = 'index.html';
    });
  }
})();