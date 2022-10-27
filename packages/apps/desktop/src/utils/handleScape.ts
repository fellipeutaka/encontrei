export function handleScape() {
  document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
}
