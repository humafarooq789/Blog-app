const createForm = document.querySelector('#create-post-form');

if (createForm) {
  const title = document.querySelector('#title');
  const body = document.querySelector('#body');
  const charCount = document.querySelector('#char-count');
  const message = document.querySelector('#form-message');

  body.addEventListener('input', function () {
    charCount.textContent = body.value.length;
  });

  function showError(input, msg) {
    const slot = document.querySelector('[data-error-for="' + input.id + '"]');
    if (slot) slot.textContent = msg;
    input.style.borderColor = '#b3261e';
  }

  function clearError(input) {
    const slot = document.querySelector('[data-error-for="' + input.id + '"]');
    if (slot) slot.textContent = '';
    input.style.borderColor = '';
  }

  createForm.addEventListener('submit', function (event) {
    event.preventDefault();
    let valid = true;
    message.textContent = '';

    if (title.value.trim() === '') {
      showError(title, 'Give your post a title.');
      valid = false;
    } else {
      clearError(title);
    }

    if (body.value.trim().length < 20) {
      showError(body, 'Write at least 20 characters.');
      valid = false;
    } else {
      clearError(body);
    }

    if (!valid) return;

    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-GB', {
      day: 'numeric', month: 'short', year: 'numeric'
    });

    const newPost = {
      id: Date.now(),
      title: title.value.trim(),
      date: formattedDate,
      image: 'https://picsum.photos/seed/inkwell-' + Date.now() + '/200/200'
    };

    const posts = loadPosts();
    posts.unshift(newPost);
    savePosts(posts);

    window.location.href = 'dashboard.html';
  });
}