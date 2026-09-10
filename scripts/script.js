// Catálogo completo de Productos y Boxes
const PRODUCTS = [
  // --- 1. BOMBONES INDIVIDUALES (productos.html) ---
  [1, "PokéBall Surprise", "POKÉMON", "pokeball.jpg", 12990, "Esfera de chocolate de leche con centro cremoso de maracuyá y trufas de avellana.", "individual"],
  [2, "Bloque Redstone", "MINECRAFT", "redstone.jpg", 8990, "Cubo artesanal de chocolate blanco con menta suave y corazón crujiente de frambuesa.", "individual"],
  [3, "Fatality Skull", "MORTAL KOMBAT", "skull.jpg", 14990, "Cráneo de chocolate 70% cacao con relleno líquido de mermelada artesanal de frutos rojos.", "individual"],
  [4, "Ghost Bite 8-Bits", "ARCADE CLASSICS", "ghost.jpg", 6990, "Figura retro de chocolate amargo con trozos crujientes de caramelo salado.", "individual"],
  [5, "Choco-Kart Super Mario", "MARIO KART", "kart.jpg", 14990, "Chocolate de leche suizo con praliné de avellanas tostadas y centro de galleta crujiente.", "individual"],
  [6, "Cristal Hextech", "LEAGUE OF LEGENDS", "hextech.jpg", 13990, "Bombón de chocolate blanco artesanal con crema suave de arándanos y perlas crujientes.", "individual"],
  [7, "Trifuerza de Hyrule", "ZELDA", "triforce.jpg", 15990, "Chocolate rubio caramelizado con polvo dorado, manjar suave y caramelo a la sal de mar.", "individual"],
  [8, "Poción de Escudo 100", "FORTNITE", "shield.jpg", 11990, "Frasco de chocolate 70% cacao con ganache cremoso de frutos del bosque y chispas efervescentes.", "individual"],

  // --- 2. BOXES Y PROMOCIONES (promociones.html) ---
  [9, "Ultra Ball Master Box", "POKÉMON SPECIAL", "box-pokemon.jpg", 29990, "Caja metálica coleccionable con 1 PokéBall de chocolate, 3 Piedras Evolutivas y sticker holográfico.", "box"],
  [10, "Cofre Legendario de Hyrule", "ZELDA COLLECTION", "box-zelda.jpg", 32990, "Edición de lujo con 3 Trifuerzas doradas, 5 Rubíes comestibles y réplica Master Sword de chocolate.", "box"],
  [11, "Cyberpunk Overclock Pack", "CYBERPUNK 2077", "box-cyberpunk.jpg", 24990, "Caja neón con chocolates efervescentes, chispas de caramelo ácido y centro energizante.", "box"],
  [12, "Nintendo All-Stars Retro Box", "NINTENDO CLASSICS", "box-nintendo.jpg", 28990, "Caja coleccionable con barriles de chocolate de Donkey Kong, champiñones Mario y estrellas doradas.", "box"],
  [13, "Minecraft Crafter Diamond Chest", "MINECRAFT SPECIAL", "box-minecraft.jpg", 26990, "Cofre con chocolates cúbicos de Diamante, Esmeralda y lingotes de oro comestibles con relleno de avellana.", "box"],
  [14, "Roblox Blox Prize Box", "ROBLOX WORLD", "box-roblox.jpg", 22990, "Caja sorpresa con chocolates en forma de Robux, bloques de colores y centro crujiente efervescente.", "box"],
  [15, "Grand Theft Heist Box", "GTA / ACTION", "box-gta.jpg", 29990, "Maletín de atraco cargado con lingotes de oro de chocolate, billetes de praliné y diamantes comestibles.", "box"],
  [16, "Victory Royale Loot Box", "FORTNITE BATTLE", "box-fortnite.jpg", 25990, "Caja con botellitas de poción de escudo en chocolate blanco, llamas de praliné y chispas efervescentes.", "box"]
];

document.addEventListener("DOMContentLoaded", () => {
  const productsContainer = document.getElementById("products-grid");
  const promoContainer = document.getElementById("promotions-grid");
  const detailContainer = document.getElementById("product-detail");

  // Carga de bombones individuales
  if (productsContainer) {
    const individuales = PRODUCTS.filter(p => p[6] === "individual");
    productsContainer.innerHTML = individuales.map(renderCard).join("");
  }

  // Carga de Boxes
  if (promoContainer) {
    const boxes = PRODUCTS.filter(p => p[6] === "box");
    promoContainer.innerHTML = boxes.map(renderCard).join("");
  }

  // Carga de la vista de detalle
  if (detailContainer) {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get("id"));
    const product = PRODUCTS.find(p => p[0] === productId);

    if (product) {
      renderDetailView(product, detailContainer);
    } else {
      detailContainer.innerHTML = `
        <div style="text-align:center; padding: 40px; width: 100%;">
          <h2>Producto no encontrado</h2>
          <p>El producto o box seleccionado no existe en nuestro catálogo.</p>
          <a href="productos.html" class="btn-buy" style="display:inline-block; margin-top:15px; padding:10px 20px; background:#e63946; color:#fff; text-decoration:none; border-radius:5px;">Volver al Catálogo</a>
        </div>
      `;
    }
  }
});

function renderCard(product) {
  const [id, title, category, img, price, desc] = product;
  const imagePath = window.location.pathname.includes("/pages/") ? `../images/${img}` : `images/${img}`;
  const detailPath = window.location.pathname.includes("/pages/") ? `producto.html?id=${id}` : `pages/producto.html?id=${id}`;

  return `
    <a href="${detailPath}" class="caluga-card">
      <div class="card-badge">${category}</div>
      <div class="card-img-wrapper">
        <img src="${imagePath}" alt="${title}" class="card-img">
      </div>
      <div class="card-content">
        <h3>${title}</h3>
        <p class="card-desc">${desc}</p>
        <div class="card-footer">
          <span class="price">$${price.toLocaleString("es-CL")}</span>
          <span class="btn-buy">Ver Detalle</span>
        </div>
      </div>
    </a>
  `;
}

function renderDetailView(product, container) {
  const [id, title, category, img, price, desc] = product;
  const imagePath = `../images/${img}`;

  container.innerHTML = `
    <div style="display: flex; flex-wrap: wrap; gap: 40px; align-items: center; width: 100%; padding: 20px;">
      <div style="flex: 1; min-width: 280px; text-align: center;">
        <img src="${imagePath}" alt="${title}" style="width: 100%; max-width: 400px; border-radius: 12px; box-shadow: 0 8px 16px rgba(0,0,0,0.4);">
      </div>
      <div style="flex: 1; min-width: 280px;">
        <span style="background: #e63946; color: white; padding: 4px 12px; border-radius: 20px; font-size: 0.85rem; font-weight: bold; text-transform: uppercase;">${category}</span>
        <h1 style="font-size: 2rem; margin: 15px 0 10px 0;">${title}</h1>
        <p style="font-size: 1.6rem; font-weight: bold; color: #2a9d8f; margin-bottom: 20px;">$${price.toLocaleString("es-CL")}</p>
        <p style="font-size: 1rem; line-height: 1.6; margin-bottom: 25px; opacity: 0.9;">${desc}</p>
        
        <div style="display: flex; gap: 15px; align-items: center;">
          <input type="number" value="1" min="1" style="width: 60px; padding: 10px; font-size: 1rem; text-align: center; border-radius: 6px; border: 1px solid #ccc;">
          <button style="background: #e63946; color: white; border: none; padding: 12px 25px; font-size: 1rem; font-weight: bold; border-radius: 6px; cursor: pointer;">Agregar al Carrito</button>
        </div>
      </div>
    </div>
  `;
}