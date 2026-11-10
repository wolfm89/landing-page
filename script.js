(function () {
  var root = document.documentElement;
  var button = document.querySelector('.theme-toggle');
  var media = window.matchMedia('(prefers-color-scheme: dark)');

  function effectiveTheme() {
    var theme = root.dataset.theme;
    if (theme === 'light' || theme === 'dark') return theme;
    return media.matches ? 'dark' : 'light';
  }

  function updateLabel() {
    var next = effectiveTheme() === 'dark' ? 'light' : 'dark';
    button.setAttribute('aria-label', 'Switch to ' + next + ' theme');
    button.title = 'Switch to ' + next + ' theme';
  }

  if (button) {
    button.addEventListener('click', function () {
      var next = effectiveTheme() === 'dark' ? 'light' : 'dark';
      root.dataset.theme = next;
      try {
        localStorage.setItem('theme', next);
      } catch (error) {
        /* storage may be unavailable; the theme still switches for this page */
      }
      updateLabel();
    });

    media.addEventListener('change', updateLabel);
    updateLabel();
  }

  var year = document.getElementById('year');
  if (year) {
    year.textContent = new Date().getFullYear();
  }
})();
