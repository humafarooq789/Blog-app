const grid = document.querySelector('#dash-grid');

if (grid) {
  let posts = loadPosts();

  function render() {
    if (posts.length === 0) {
      grid.innerHTML = '<p class="empty-state">You haven\'t published anything yet. Click "New post" to write your first one.</p>';
      return;
    }

    grid.innerHTML = posts.map(function (post) {
      return `
        <article class="dash-card">
          <img src="${post.image}" alt="" class="dash-thumb">
          <div class="dash-card-body">
            <h3>${post.title}</h3>
            <p>${post.date}</p>
            <div class="dash-actions">
              <a href="create-blog.html" class="btn btn-sm">Edit</a>
              <button class="btn btn-sm btn-danger" data-delete-id="${post.id}">Delete</button>
            </div>
          </div>
        </article>
      `;
    }).join('');
  }

  grid.addEventListener('click', function (event) {
    const deleteBtn = event.target.closest('[data-delete-id]');
    if (!deleteBtn) return;

    const confirmed = confirm('Delete this post? This cannot be undone.');
    if (!confirmed) return;

    const idToRemove = Number(deleteBtn.dataset.deleteId);
    posts = posts.filter(function (post) {
      return post.id !== idToRemove;
    });

    savePosts(posts);
    render();
  });

  render();
}