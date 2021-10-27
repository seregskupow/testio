export const setTheme = () => {
  let theme: string | null = localStorage.getItem('theme');
  if (theme) {
    document.body.classList.add(theme);
  } else {
    if (window.matchMedia) {
      theme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : '';
      document.body.classList.add(theme);
      localStorage.setItem('theme', theme);
    }
  }
};
