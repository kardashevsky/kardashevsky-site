export function triggerHaptic() {
  if (typeof navigator !== "undefined" && "vibrate" in navigator) {
    navigator.vibrate([12, 18, 12])
  }
}
