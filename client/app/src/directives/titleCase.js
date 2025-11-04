export default {
  mounted(el) {
    el.addEventListener('input', () => {
      const value = el.value;
      if (!value) return;

      const titleCased = value
        .toLowerCase()
        .replace(/\b\w/g, char => char.toUpperCase());

      el.value = titleCased;
      el.dispatchEvent(new Event('input'));
    });
  }
}