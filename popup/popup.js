// popup/popup.js

document.addEventListener("DOMContentLoaded", () => {
  const status = document.getElementById("status");
  const downloadLinkDiv = document.getElementById("download-link");
  const downloadLink = document.getElementById("download");

  // Get the active tab
  browser.tabs
    .query({ active: true, currentWindow: true })
    .then((tabs) => {
      const tab = tabs[0];
      const url = tab.url;

      // Check if the URL matches the Nest video pattern
      const nestRegex =
        /^https?:\/\/video\.nest\.com\/clip\/([a-fA-F0-9]{32})\.mp4$/;
      const match = url.match(nestRegex);

      if (match) {
        const videoId = match[1];
        const downloadUrl = `https://clips.dropcam.com/${videoId}.mp4`;

        // Update the download link
        downloadLink.href = downloadUrl;
        downloadLinkDiv.style.display = "block";
        status.textContent = "Download link is ready!";
      } else {
        status.textContent = "This is not a Nest video URL.";
      }
    })
    .catch((error) => {
      console.error(`Error: ${error}`);
      status.textContent = "An error occurred.";
    });
});
