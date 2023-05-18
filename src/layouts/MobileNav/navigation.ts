const get = (selector: string): Element => {
  const el = document.querySelector(`[data-nav="${selector}"]`);

  if (import.meta.env.DEV) {
    if (!el) {
      throw new Error(`No element found for selector: ${selector}`);
    }
  }

  return el as Element;
};

const navButton = get("open");
const navMenu = get("container");
const closeButton = get("close");
const backdrop = get("backdrop");

navButton.addEventListener("click", () => {
  navMenu.classList.remove("hidden");
});
closeButton.addEventListener("click", () => {
  navMenu.classList.add("hidden");
});
backdrop.addEventListener("click", () => {
  navMenu.classList.add("hidden");
});
