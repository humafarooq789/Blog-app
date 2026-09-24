const STORAGE_KEY = 'inkwell-posts';

const DEFAULT_POSTS = [
  { id: 1, title: 'A short guide to writing shorter sentences', date: '12 Sep 2026', image: 'https://picsum.photos/seed/inkwell-1/200/200' },
  { id: 2, title: 'Why your first draft is allowed to be bad', date: '9 Sep 2026', image: 'https://picsum.photos/seed/inkwell-2/200/200' },
  { id: 3, title: 'Keeping a commonplace book in 2026', date: '5 Sep 2026', image: 'https://picsum.photos/seed/inkwell-3/200/200' },
  { id: 4, title: 'Reading out loud catches what your eyes miss', date: '1 Sep 2026', image: 'https://picsum.photos/seed/inkwell-4/200/200' }
];

function loadPosts() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw) {
    try {
      return JSON.parse(raw);
    } catch (e) {
      return DEFAULT_POSTS;
    }
  }
  savePosts(DEFAULT_POSTS);
  return DEFAULT_POSTS;
}

function savePosts(posts) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
}