const html = `<div class="container mx-auto px-4 mb-4 text-center mt-4">
        <div
          class="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-3 rounded"
        >
          <p class="font-medium">
            Você está offline. Apenas páginas do help já visitadas estão disponíveis.
          </p>
        </div>
      </div>`;

function showOfflineBanner() {
  if (document.getElementById("offline-banner")) return;

  const banner = document.createElement("div");
  banner.id = "offline-banner";
  banner.innerHTML = html;

  // Find the header element
  const header = document.querySelector(".spacing-header");
  console.log(header)
  if (header && header.parentNode) {
    // Insert banner right after the header
    header.parentNode.insertBefore(banner, header.nextSibling);
  } else {
    // Fallback: append to body
    document.body.insertBefore(banner, document.body.firstChild);
  }
}

document.addEventListener("app-offline", showOfflineBanner);
      

