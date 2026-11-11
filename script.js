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

  var back = document.querySelector('[data-back]');
  if (back) {
    var pageUrl = function (url) {
      return String(url).split('#')[0];
    };

    back.addEventListener('click', function () {
      var here = pageUrl(window.location.href);
      var navigation = window.navigation;
      var steps = 1;

      // With the Navigation API, skip this page's own anchor entries and go to
      // the last page of this site visited before it.
      if (navigation && navigation.currentEntry && typeof navigation.entries === 'function') {
        var entries = navigation.entries();
        var index = navigation.currentEntry.index;
        for (var i = index - 1; i >= 0; i--) {
          if (entries[i].url && pageUrl(entries[i].url) !== here) {
            navigation.traverseTo(entries[i].key);
            return;
          }
        }
        // Only this page so far: step over it to whatever came before, if anything.
        steps = index + 1;
      }

      // The previous entry may be another site, or there may be none (a new
      // tab). If this page is still shown shortly after going back, nothing
      // left it, so go to the referrer or the home page instead.
      var leaving = false;
      var markLeaving = function () {
        leaving = true;
      };
      window.addEventListener('beforeunload', markLeaving, { once: true });
      window.addEventListener('pagehide', markLeaving, { once: true });
      window.history.go(-steps);
      window.setTimeout(function () {
        if (!leaving && pageUrl(window.location.href) === here) {
          window.location.href = document.referrer || '/';
        }
      }, 400);
    });
  }

  var year = document.getElementById('year');
  if (year) {
    year.textContent = new Date().getFullYear();
  }
})();
