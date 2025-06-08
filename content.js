const replacementImages = [
  chrome.runtime.getURL("images/img1.jpg"),
  chrome.runtime.getURL("images/img2.jpg"),
  chrome.runtime.getURL("images/18-47-50.png"),
  chrome.runtime.getURL("images/18-47-55.png"),
  chrome.runtime.getURL("images/18-48-00.png"),
  chrome.runtime.getURL("images/18-48-05.png"),
  chrome.runtime.getURL("images/18-48-11.png"),
  chrome.runtime.getURL("images/18-48-13.png"),
  chrome.runtime.getURL("images/18-48-17.png"),
  chrome.runtime.getURL("images/18-48-23.png"),
  chrome.runtime.getURL("images/18-48-28.png"),
  chrome.runtime.getURL("images/18-48-32.png"),
  chrome.runtime.getURL("images/18-48-37.png"),
  chrome.runtime.getURL("images/18-48-41.png"),
  chrome.runtime.getURL("images/18-48-44.png"),
  chrome.runtime.getURL("images/18-48-46.png"),
  chrome.runtime.getURL("images/18-48-49.png"),
  chrome.runtime.getURL("images/18-48-51.png"),
  chrome.runtime.getURL("images/18-48-54.png"),
  chrome.runtime.getURL("images/18-48-56.png"),
  chrome.runtime.getURL("images/18-48-58.png"),
  chrome.runtime.getURL("images/18-49-01.png"),
  chrome.runtime.getURL("images/18-49-03.png"),
  chrome.runtime.getURL("images/18-49-09.png"),
  chrome.runtime.getURL("images/18-49-12.png"),
  chrome.runtime.getURL("images/18-49-15.png"),
  chrome.runtime.getURL("images/18-49-18.png"),
  chrome.runtime.getURL("images/18-49-20.png"),
  chrome.runtime.getURL("images/18-49-23.png"),
  chrome.runtime.getURL("images/18-49-25.png"),
  chrome.runtime.getURL("images/18-49-29.png"),
  chrome.runtime.getURL("images/18-49-32.png"),
  chrome.runtime.getURL("images/18-49-37.png"),
  chrome.runtime.getURL("images/18-49-40.png"),
  chrome.runtime.getURL("images/18-49-43.png"),
  chrome.runtime.getURL("images/18-49-45.png"),
  chrome.runtime.getURL("images/18-49-51.png"),
  chrome.runtime.getURL("images/18-49-54.png"),
  chrome.runtime.getURL("images/18-49-56.png"),
  chrome.runtime.getURL("images/18-50-02.png"),
  chrome.runtime.getURL("images/18-50-11.png"),
  chrome.runtime.getURL("images/18-50-19.png"),
  chrome.runtime.getURL("images/18-50-23.png"),
  chrome.runtime.getURL("images/18-50-26.png"),
  chrome.runtime.getURL("images/18-50-28.png"),
  chrome.runtime.getURL("images/18-50-33.png"),
  chrome.runtime.getURL("images/18-50-40.png"),
  chrome.runtime.getURL("images/18-51-00.png"),
  chrome.runtime.getURL("images/18-51-18.png"),
  chrome.runtime.getURL("images/18-51-25.png"),
  chrome.runtime.getURL("images/18-51-32.png"),
  chrome.runtime.getURL("images/18-51-34.png"),
  chrome.runtime.getURL("images/18-51-36.png"),
  chrome.runtime.getURL("images/18-51-38.png"),
  chrome.runtime.getURL("images/18-51-40.png"),
  chrome.runtime.getURL("images/18-51-42.png"),
  chrome.runtime.getURL("images/18-51-45.png")
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

