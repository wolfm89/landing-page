(function () {
  var root = document.documentElement;
  var button = document.querySelector('.theme-toggle');
  var media = window.matchMedia('(prefers-color-scheme: dark)');
  var themeColors = { light: '#efece0', dark: '#10150f' };
  var themeMetas = document.querySelectorAll('meta[name="theme-color"]');

  function effectiveTheme() {
    var theme = root.dataset.theme;
    if (theme === 'light' || theme === 'dark') return theme;
    return media.matches ? 'dark' : 'light';
  }

  function updateThemeColor() {
    var color = themeColors[effectiveTheme()];
    for (var i = 0; i < themeMetas.length; i++) {
      themeMetas[i].setAttribute('content', color);
    }
  }

  function updateTheme() {
    if (button) {
      var next = effectiveTheme() === 'dark' ? 'light' : 'dark';
      button.setAttribute('aria-label', 'Switch to ' + next + ' theme');
      button.title = 'Switch to ' + next + ' theme';
    }
    updateThemeColor();
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
      updateTheme();
    });
  }

  media.addEventListener('change', updateTheme);
  updateTheme();

  var reduceMedia = window.matchMedia('(prefers-reduced-motion: reduce)');
  var motionButton = document.querySelector('[data-motion-toggle]');

  function motionOff() {
    return root.dataset.motion === 'off' || reduceMedia.matches;
  }

  function updateMotion() {
    if (!motionButton) return;
    motionButton.setAttribute('aria-pressed', String(motionOff()));
  }

  if (motionButton) {
    motionButton.addEventListener('click', function () {
      var next = motionOff() ? 'auto' : 'off';
      root.dataset.motion = next;
      try {
        localStorage.setItem('motion', next);
      } catch (error) {
        /* storage may be unavailable; the setting still applies for this page */
      }
      updateMotion();
    });

    reduceMedia.addEventListener('change', updateMotion);
    updateMotion();
  }

  var back = document.querySelector('[data-back]');
  if (back) {
    var pageUrl = function (url) {
      return String(url).split('#')[0];
    };

    back.addEventListener('click', function (event) {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      // With the Navigation API, skip this page's own anchor entries and go to
      // the last page of this site visited before it. Otherwise the link's
      // href takes over and returns home.
      var navigation = window.navigation;
      if (
        !navigation ||
        !navigation.currentEntry ||
        typeof navigation.entries !== 'function' ||
        typeof navigation.traverseTo !== 'function'
      ) {
        return;
      }

      var here = pageUrl(window.location.href);
      var entries = navigation.entries();
      var index = navigation.currentEntry.index;
      for (var i = index - 1; i >= 0; i--) {
        if (entries[i].url && pageUrl(entries[i].url) !== here) {
          event.preventDefault();
          var traversal = navigation.traverseTo(entries[i].key);
          if (traversal && typeof traversal.catch === 'function') {
            traversal.catch(function () {
              window.location.href = '/';
            });
          }
          return;
        }
      }
    });
  }

  var year = document.getElementById('year');
  if (year) {
    year.textContent = new Date().getFullYear();
  }
})();
