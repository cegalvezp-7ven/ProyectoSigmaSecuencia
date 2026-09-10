// Catálogo completo de Productos y Boxes Gamer
const PRODUCTS = [
  // --- 1. BOMBONES INDIVIDUALES ---
  [1, "PokéBall Surprise", "POKÉMON", "pokeball.jpg", 12990, "Esfera de chocolate de leche con centro cremoso de maracuyá y trufas de avellana.", "individual"],
  [2, "Bloque Redstone", "MINECRAFT", "redstone.jpg", 8990, "Cubo artesanal de chocolate blanco con menta suave y corazón crujiente de frambuesa.", "individual"],
  [3, "Fatality Skull", "MORTAL KOMBAT", "skull.jpg", 14990, "Cráneo de chocolate 70% cacao con relleno líquido de mermelada artesanal de frutos rojos.", "individual"],
  [4, "Ghost Bite 8-Bits", "ARCADE CLASSICS", "ghost.jpg", 6990, "Figura retro de chocolate amargo con trozos crujientes de caramelo salado.", "individual"],
  [5, "Choco-Kart Super Mario", "MARIO KART", "kart.jpg", 14990, "Chocolate de leche suizo con praliné de avellanas tostadas y centro de galleta crujiente.", "individual"],
  [6, "Cristal Hextech", "LEAGUE OF LEGENDS", "hextech.jpg", 13990, "Bombón de chocolate blanco artesanal con crema suave de arándanos y perlas crujientes.", "individual"],
  [7, "Trifuerza de Hyrule", "ZELDA", "triforce.jpg", 15990, "Chocolate rubio caramelizado con polvo dorado, manjar suave y caramelo a la sal de mar.", "individual"],
  [8, "Poción de Escudo 100", "FORTNITE", "shield.jpg", 11990, "Frasco de chocolate 70% cacao con ganache cremoso de frutos del bosque y chispas efervescentes.", "individual"],

  // --- 2. BOXES Y PROMOCIONES ---
  [9, "Ultra Ball Master Box", "POKÉMON SPECIAL", "box-pokemon.jpg", 29990, "Caja metálica coleccionable con 1 PokéBall de chocolate, 3 Piedras Evolutivas y sticker holográfico.", "box"],
  [10, "Cofre Legendario de Hyrule", "ZELDA COLLECTION", "box-zelda.jpg", 32990, "Edición de lujo con 3 Trifuerzas doradas, 5 Rubíes comestibles y réplica Master Sword de chocolate.", "box"],
  [11, "Cyberpunk Overclock Pack", "CYBERPUNK 2077", "box-cyberpunk.jpg", 24990, "Caja neón con chocolates efervescentes, chispas de caramelo ácido y centro energizante.", "box"],
  [12, "Nintendo All-Stars Retro Box", "NINTENDO CLASSICS", "box-nintendo.jpg", 28990, "Caja coleccionable con barriles de chocolate de Donkey Kong, champiñones Mario y estrellas doradas.", "box"],
  [13, "Minecraft Crafter Diamond Chest", "MINECRAFT SPECIAL", "box-minecraft.jpg", 26990, "Cofre con chocolates cúbicos de Diamante, Esmeralda y lingotes de oro comestibles con relleno de avellana.", "box"],
  [14, "Roblox Blox Prize Box", "ROBLOX WORLD", "box-roblox.jpg", 22990, "Caja sorpresa con chocolates en forma de Robux, bloques de colores y centro crujiente efervescente.", "box"],
  [15, "Grand Theft Heist Box", "GTA / ACTION", "box-gta.jpg", 29990, "Maletín de atraco cargado con lingotes de oro de chocolate, billetes de praliné y diamantes comestibles.", "box"],
  [16, "Victory Royale Loot Box", "FORTNITE BATTLE", "box-fortnite.jpg", 25990, "Caja con botellitas de poción de escudo en chocolate blanco, llamas de praliné y chispas efervescentes.", "box"]
];

// --- GESTIÓN DE CARRITO (localStorage) ---
function getCart() {
  return JSON.parse(localStorage.getItem('gamebites_cart') || '[]');
}

function saveCart(cart) {
  localStorage.setItem('gamebites_cart', JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  const cart = getCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.querySelectorAll('.cart-count').forEach(el => {
    el.textContent = totalItems;
  });
}

// --- LOGICA DE RENDERIZADO DOM ---
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();

  const productsContainer = document.getElementById("products-grid");
  const promoContainer = document.getElementById("promotions-grid");
  const detailContainer = document.getElementById("product-detail");

  const isPagesDir = window.location.pathname.toLowerCase().includes("pages");

  if (productsContainer) {
    productsContainer.innerHTML = PRODUCTS.map(p => renderCard(p, isPagesDir)).join("");
  }

  if (promoContainer) {
    const boxes = PRODUCTS.filter(p => p[6] === "box");
    promoContainer.innerHTML = boxes.map(p => renderCard(p, isPagesDir)).join("");
  }

  if (detailContainer) {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get("id"));
    const product = PRODUCTS.find(p => p[0] === productId);

    if (product) {
      renderDetailView(product, detailContainer, isPagesDir);
    } else {
      detailContainer.style.opacity = "1";
      detailContainer.innerHTML = `
        <div style="text-align:center; padding: 50px 20px; width: 100%; color: #fff;">
          <h2>Producto no encontrado</h2>
          <p>El producto seleccionado no existe en nuestro catálogo.</p>
          <a href="productos.html" style="display:inline-block; margin-top:15px; padding:10px 20px; background:#ff0055; color:#fff; text-decoration:none; border-radius:6px; font-weight:bold;">Volver al Catálogo</a>
        </div>
      `;
    }
  }
});

function renderCard(product, isPagesDir) {
  const [id, title, category, img, price, desc] = product;
  const imagePath = isPagesDir ? `../images/${img}` : `images/${img}`;
  const detailPath = isPagesDir ? `producto.html?id=${id}` : `pages/producto.html?id=${id}`;

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

function renderDetailView(product, container, isPagesDir) {
  const [id, title, category, img, price, desc] = product;
  const imagePath = isPagesDir ? `../images/${img}` : `images/${img}`;
  const backPath = isPagesDir ? `productos.html` : `pages/productos.html`;

  // Forzar visibilidad inmediata
  container.style.opacity = "1";
  container.style.visibility = "visible";

  container.innerHTML = `
    <div style="display: flex; flex-wrap: wrap; gap: 40px; align-items: center; width: 100%; padding: 35px; background: #161224; border-radius: 16px; border: 1px solid rgba(255, 0, 85, 0.4); color: #ffffff; box-shadow: 0 0 25px rgba(255, 0, 85, 0.15);">
      <div style="flex: 1; min-width: 280px; text-align: center;">
        <img src="${imagePath}" alt="${title}" style="width: 100%; max-width: 420px; border-radius: 14px; box-shadow: 0 10px 30px rgba(0,0,0,0.8); border: 2px solid rgba(255, 255, 255, 0.1);">
      </div>
      <div style="flex: 1; min-width: 280px; display: flex; flex-direction: column; gap: 15px;">
        <div>
          <span style="background: #00f2fe; color: #000; padding: 6px 14px; border-radius: 20px; font-size: 0.85rem; font-weight: 800; text-transform: uppercase; letter-spacing: 1px;">${category}</span>
        </div>
        <h1 style="font-size: 2.2rem; font-weight: 800; color: #ffffff; margin: 5px 0;">${title}</h1>
        <p style="font-size: 1.8rem; font-weight: 800; color: #ff0055; margin: 0;">$${price.toLocaleString("es-CL")}</p>
        <p style="font-size: 1.05rem; line-height: 1.7; color: #d0d0d0; margin: 10px 0;">${desc}</p>
        
        <div style="display: flex; gap: 15px; align-items: center; flex-wrap: wrap; margin-top: 10px;">
          <!-- Selector de Cantidad - / + -->
          <div style="display: flex; align-items: center; background: #0b0813; border: 1px solid rgba(255,255,255,0.2); border-radius: 8px; overflow: hidden;">
            <button type="button" onclick="changeQty(-1)" style="width: 40px; height: 45px; background: rgba(255,255,255,0.08); color: #fff; border: none; font-size: 1.3rem; font-weight: bold; cursor: pointer;">-</button>
            <input type="number" id="product-qty" value="1" min="1" max="99" readonly style="width: 50px; height: 45px; background: transparent; color: #fff; border: none; text-align: center; font-size: 1.1rem; font-weight: bold;">
            <button type="button" onclick="changeQty(1)" style="width: 40px; height: 45px; background: rgba(255,255,255,0.08); color: #fff; border: none; font-size: 1.3rem; font-weight: bold; cursor: pointer;">+</button>
          </div>

          <!-- Botón de Compra -->
          <button onclick="addToCartFromDetail(${id})" style="background: linear-gradient(135deg, #ff0055, #e63946); color: white; border: none; padding: 14px 28px; font-size: 1rem; font-weight: 800; border-radius: 8px; cursor: pointer; box-shadow: 0 4px 15px rgba(255, 0, 85, 0.4);">
            🛒 Agregar al Carrito
          </button>
        </div>

        <div id="cart-msg" style="display: none; color: #00f2fe; font-weight: bold; margin-top: 10px;">
          ✔ ¡Producto agregado al carrito exitosamente!
        </div>

        <div style="margin-top: 25px;">
          <a href="${backPath}" style="color: #00f2fe; text-decoration: none; font-size: 0.95rem; font-weight: 600;">← Volver al Catálogo</a>
        </div>
      </div>
    </div>
  `;
}

// Interacciones globales para la vista de detalle
window.changeQty = function(delta) {
  const input = document.getElementById("product-qty");
  if (!input) return;
  let val = parseInt(input.value) || 1;
  val += delta;
  if (val < 1) val = 1;
  if (val > 99) val = 99;
  input.value = val;
};

window.addToCartFromDetail = function(productId) {
  const input = document.getElementById("product-qty");
  const qty = input ? parseInt(input.value) || 1 : 1;

  const cart = getCart();
  const existingIndex = cart.findIndex(item => item.id === productId);

  if (existingIndex > -1) {
    cart[existingIndex].quantity += qty;
  } else {
    cart.push({ id: productId, quantity: qty });
  }

  saveCart(cart);

  const msg = document.getElementById("cart-msg");
  if (msg) {
    msg.style.display = "block";
    setTimeout(() => { msg.style.display = "none"; }, 3000);
  }
};