// **************Seccion noticias *******************//

// Fetch de JSON y renderizado de noticias
document.addEventListener("DOMContentLoaded", () => {
  const newsContainer = document.getElementById("news-container");

  // Cargar las noticias desde el archivo JSON
  fetch("../news.json")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((news) => {
        const newsItem = document.createElement("div");
        newsItem.classList.add("news-item");

        newsItem.innerHTML = `
        <img src="${news.image}" alt="${news.title}" class="news-image"/>
          <h3>${news.title}</h3>
          <p>${news.description}</p>
          <span>${news.date}</span>
          <a href="${news.link}" target="_blank">Leer más</a>
        `;

        newsContainer.appendChild(newsItem);
      });
    })
    .catch((error) => {
      console.error("Error al cargar las noticias:", error);
    });
});
