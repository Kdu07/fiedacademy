document.addEventListener("DOMContentLoaded", function () {
  const articleContainer = document.getElementById("article-container");
  
  // The selector was incorrect - this is the correct one that matches your HTML
  const topicsSidebar = document.getElementById("topicsSidebar");
  
  // This line was correct
  const mobileTopicToggle = document.getElementById("mobileTopicToggle");

  function adjustHeight() {
    if (articleContainer && topicsSidebar && window.innerWidth >= 768) {
      const articleHeight = articleContainer.offsetHeight - 75;
      
      // Select the scrollable div inside the sidebar
      const scrollableArea = topicsSidebar.querySelector(".p-4.overflow-y-auto");
      if (scrollableArea) {
        scrollableArea.style.maxHeight = `${articleHeight}px`;
      }
    }
  }

  // Initial adjustment
  adjustHeight();

  // Adjust on window resize
  window.addEventListener("resize", adjustHeight);

  if (mobileTopicToggle && topicsSidebar) {
    mobileTopicToggle.addEventListener("click", function () {
      topicsSidebar.classList.toggle("hidden");

      // Change the arrow icon
      const svg = this.querySelector("svg");
      if (topicsSidebar.classList.contains("hidden")) {
        svg.innerHTML =
          '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />';
      } else {
        svg.innerHTML =
          '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />';
      }
    });
  }
});