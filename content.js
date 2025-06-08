const replacementImages = [
  chrome.runtime.getURL("images/img1.jpg"),
  chrome.runtime.getURL("images/img2.jpg"),
];

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomImage() {
  if (replacementImages.length === 0) return "";
  const idx = randInt(0, replacementImages.length - 1);
  return replacementImages[idx];
}

function replaceImage(img) {
  if (img.dataset.replaced === "true") return;

  const newSrc = getRandomImage();
  img.src = newSrc;
  img.srcset = "";
  img.dataset.replaced = "true";

  // Continuously override src for ~2 seconds
  const interval = setInterval(() => {
    if (!document.body.contains(img)) {
      clearInterval(interval);
      return;
    }
    img.src = newSrc;
    img.srcset = "";
  }, 100);

  setTimeout(() => clearInterval(interval), 2000); // Stop after 2 seconds
}

// Replace all current images
document.querySelectorAll("img").forEach(replaceImage);

// Watch for future images added to the DOM
const observer = new MutationObserver(mutations => {
  for (const mutation of mutations) {
    for (const node of mutation.addedNodes) {
      if (node.tagName === "IMG") {
        replaceImage(node);
      } else if (node.querySelectorAll) {
        node.querySelectorAll("img").forEach(replaceImage);
      }
    }
  }
});

observer.observe(document.body, { childList: true, subtree: true });

