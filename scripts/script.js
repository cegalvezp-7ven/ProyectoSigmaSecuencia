const DEFAULT_PRODUCTS = [
  [1, "PokéBall Surprise", "POKÉMON", "pokeball.jpg", 12990, "Esfera de chocolate de leche con centro cremoso de maracuyá y trufas de avellana.", "individual"],
  [2, "Bloque Redstone", "MINECRAFT", "redstone.jpg", 8990, "Cubo artesanal de chocolate blanco con menta suave y corazón crujiente de frambuesa.", "individual"],
  [3, "Fatality Skull", "MORTAL KOMBAT", "skull.jpg", 14990, "Cráneo de chocolate 70% cacao con relleno líquido de mermelada artesanal de frutos rojos.", "individual"],
  [4, "Ghost Bite 8-Bits", "ARCADE CLASSICS", "ghost.jpg", 6990, "Figura retro de chocolate amargo con trozos crujientes de caramelo salado.", "individual"],
  [5, "Choco-Kart Super Mario", "MARIO KART", "kart.jpg", 14990, "Chocolate de leche suizo con praliné de avellanas tostadas y centro de galleta crujiente.", "individual"],
  [6, "Cristal Hextech", "LEAGUE OF LEGENDS", "hextech.jpg", 13990, "Bombón de chocolate blanco artesanal con crema suave de arándanos y perlas crujientes.", "individual"],
  [7, "Trifuerza de Hyrule", "ZELDA", "triforce.jpg", 15990, "Chocolate rubio caramelizado con polvo dorado, manjar suave y caramelo a la sal de mar.", "individual"],
  [8, "Poción de Escudo 100", "FORTNITE", "shield.jpg", 11990, "Frasco de chocolate 70% cacao con ganache cremoso de frutos del bosque y chispas efervescentes.", "individual"],
  [9, "Ultra Ball Master Box", "POKÉMON SPECIAL", "box-pokemon.jpg", 29990, "Caja metálica coleccionable con 1 PokéBall de chocolate, 3 Piedras Evolutivas y sticker holográfico.", "box"],
  [10, "Cofre Legendario de Hyrule", "ZELDA COLLECTION", "box-zelda.jpg", 32990, "Edición de lujo con 3 Trifuerzas doradas, 5 Rubíes comestibles y réplica Master Sword de chocolate.", "box"],
  [11, "Cyberpunk Overclock Pack", "CYBERPUNK 2077", "box-cyberpunk.jpg", 24990, "Caja neón con chocolates efervescentes, chispas de caramelo ácido y centro energizante.", "box"],
  [12, "Nintendo All-Stars Retro Box", "NINTENDO CLASSICS", "box-nintendo.jpg", 28990, "Caja coleccionable con barriles de chocolate de Donkey Kong, champiñones Mario y estrellas doradas.", "box"],
  [13, "Minecraft Crafter Diamond Chest", "MINECRAFT SPECIAL", "box-minecraft.jpg", 26990, "Cofre con chocolates cúbicos de Diamante, Esmeralda y lingotes de oro comestibles con relleno de avellana.", "box"],
  [14, "Roblox Blox Prize Box", "ROBLOX WORLD", "box-roblox.jpg", 22990, "Caja sorpresa con chocolates en forma de Robux, bloques de colores y centro crujiente efervescente.", "box"],
  [15, "Grand Theft Heist Box", "GTA / ACTION", "box-gta.jpg", 29990, "Maletín de atraco cargado con lingotes de oro de chocolate, billetes de praliné y diamantes comestibles.", "box"],
  [16, "Victory Royale Loot Box", "FORTNITE BATTLE", "box-fortnite.jpg", 25990, "Caja con botellitas de poción de escudo en chocolate blanco, llamas de praliné y chispas efervescentes.", "box"]
];

function getProducts() {
  const stored = localStorage.getItem('gamebites_products');
  if (!stored) {
    localStorage.setItem('gamebites_products', JSON.stringify(DEFAULT_PRODUCTS));
    return DEFAULT_PRODUCTS;
  }
  return JSON.parse(stored);
}

function saveProducts(products) {
  localStorage.setItem('gamebites_products', JSON.stringify(products));
}

let PRODUCTS = getProducts();


function getCurrentUser() {
  try {
    return JSON.parse(localStorage.getItem('gamebites_user'));
  } catch(e) {
    return null;
  }
}

function setCurrentUser(user) {
  if (user) {
    localStorage.setItem('gamebites_user', JSON.stringify(user));
  } else {
    localStorage.removeItem('gamebites_user');
  }
}

function getCart() {
  try {
    return JSON.parse(localStorage.getItem('gamebites_cart') || '[]');
  } catch (e) {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem('gamebites_cart', JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  const cart = getCart();
  const totalItems = cart.reduce((sum, item) => sum + (parseInt(item.quantity) || 0), 0);
  document.querySelectorAll('.cart-count').forEach(el => {
    el.textContent = totalItems;
  });
}

function getOrders() {
  try {
    return JSON.parse(localStorage.getItem('gamebites_orders') || '[]');
  } catch (e) {
    return [];
  }
}


function renderUserHeader(isPagesDir) {
  const userContainer = document.getElementById('user-nav-container');
  if (!userContainer) return;

  const user = getCurrentUser();
  const loginPath = isPagesDir ? 'login.html' : 'pages/login.html';
  const accountPath = isPagesDir ? 'cuenta.html' : 'pages/cuenta.html';
  const adminPath = isPagesDir ? 'admin.html' : 'pages/admin.html';

  if (user) {
    if (user.role === 'admin') {
      userContainer.innerHTML = `
        <a href="${adminPath}" class="user-name-btn admin" title="Panel de Administración">
           <span>${user.name || 'Admin'}</span>
        </a>
        <button onclick="logoutUser()" class="logout-btn">Salir</button>
      `;
    } else {
      userContainer.innerHTML = `
        <a href="${accountPath}" class="user-name-btn client" title="Mi cuenta">
           <span>${user.name || 'Gamer'}</span>
        </a>
        <button onclick="logoutUser()" class="logout-btn">Salir</button>
      `;
    }
  } else {
    userContainer.innerHTML = `<a href="${loginPath}" class="btn-login">Iniciar Sesión</a>`;
  }
}
window.logoutUser = function() {
  setCurrentUser(null);
  window.location.reload();
};


document.addEventListener("DOMContentLoaded", () => {
  PRODUCTS = getProducts();
  updateCartCount();

  const isPagesDir = window.location.pathname.toLowerCase().includes("pages");
  renderUserHeader(isPagesDir);

  
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.querySelector(".nav-links-section");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("menu-open");
      menuToggle.classList.toggle("active", isOpen);
      menuToggle.textContent = isOpen ? "" : "";
      menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      menuToggle.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
    });

    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("menu-open");
        menuToggle.classList.remove("active");
        menuToggle.textContent = "";
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  const productsContainer = document.getElementById("products-grid");
  const promoContainer = document.getElementById("promotions-grid");
  const detailContainer = document.getElementById("product-detail");
  const cartItemsContainer = document.getElementById("cart-items");
  const cartTotalContainer = document.getElementById("cart-total");
  const adminTableBody = document.getElementById("admin-table-body");
  const ordersTableBody = document.getElementById("orders-table-body");
  const addProductForm = document.getElementById("add-product-form");
  const loginForm = document.getElementById("login-form");
  const contactForm = document.getElementById("contact-form");

  
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const msg = document.getElementById("contact-msg");
      if (msg) {
        msg.style.display = "block";
        contactForm.reset();
        setTimeout(() => { msg.style.display = "none"; }, 4000);
      }
    });
  }

  
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("login-email").value.trim().toLowerCase();
      const pass = document.getElementById("login-password").value;

      if (email === "admin@gamebites.cl" && (pass === "admin123" || pass === "admin")) {
        setCurrentUser({ email: email, name: "Admin", role: "admin" });
        alert("¡Bienvenido al Panel de Administración!");
        window.location.href = isPagesDir ? "admin.html" : "pages/admin.html";
      } else {
        const namePart = email.split('@')[0];
        setCurrentUser({ email: email, name: namePart, role: "client" });
        alert(`¡Bienvenido de nuevo, ${namePart}!`);
        window.location.href = isPagesDir ? "carrito.html" : "pages/carrito.html";
      }
    });
  }

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
    if (product) renderDetailView(product, detailContainer, isPagesDir);
  }

  if (cartItemsContainer) {
    renderCartView(cartItemsContainer, cartTotalContainer, isPagesDir);
  }

  if (adminTableBody) {
    renderAdminTable(adminTableBody);
    renderOrdersTable(ordersTableBody);
  }

  if (addProductForm) {
    addProductForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const newId = PRODUCTS.length > 0 ? Math.max(...PRODUCTS.map(p => p[0])) + 1 : 1;
      const title = document.getElementById("admin-title").value;
      const category = document.getElementById("admin-category").value;
      const img = document.getElementById("admin-img").value;
      const price = parseInt(document.getElementById("admin-price").value);
      const desc = document.getElementById("admin-desc").value;
      const type = document.getElementById("admin-type").value;

      PRODUCTS.push([newId, title, category, img, price, desc, type]);
      saveProducts(PRODUCTS);
      renderAdminTable(adminTableBody);
      addProductForm.reset();
      alert("¡Producto agregado con éxito al catálogo!");
    });
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

  container.style.opacity = "1";
  container.style.visibility = "visible";

  container.innerHTML = `
    <div style="display: flex; flex-wrap: wrap; gap: 40px; align-items: center; width: 100%; padding: 35px; background: #161224; border-radius: 16px; border: 1px solid rgba(255, 0, 85, 0.4); color: #ffffff;">
      <div style="flex: 1; min-width: 280px; text-align: center;">
        <img src="${imagePath}" alt="${title}" style="width: 100%; max-width: 420px; border-radius: 14px; box-shadow: 0 10px 30px rgba(0,0,0,0.8); border: 2px solid rgba(255, 255, 255, 0.1);">
      </div>
      <div style="flex: 1; min-width: 280px; display: flex; flex-direction: column; gap: 15px;">
        <div>
          <span style="background: #00f2fe; color: #000; padding: 6px 14px; border-radius: 20px; font-size: 0.85rem; font-weight: 800; text-transform: uppercase;">${category}</span>
        </div>
        <h1 style="font-size: 2.2rem; font-weight: 800; color: #ffffff; margin: 5px 0;">${title}</h1>
        <p style="font-size: 1.8rem; font-weight: 800; color: #ff0055; margin: 0;">$${price.toLocaleString("es-CL")}</p>
        <p style="font-size: 1.05rem; line-height: 1.7; color: #d0d0d0; margin: 10px 0;">${desc}</p>
        
        <div style="display: flex; gap: 15px; align-items: center; flex-wrap: wrap;">
          <div style="display: flex; align-items: center; background: #0b0813; border: 1px solid rgba(255,255,255,0.2); border-radius: 8px; overflow: hidden;">
            <button type="button" onclick="changeQty(-1)" style="width: 40px; height: 45px; background: rgba(255,255,255,0.08); color: #fff; border: none; font-size: 1.3rem; font-weight: bold; cursor: pointer;">-</button>
            <input type="number" id="product-qty" value="1" min="1" max="99" readonly style="width: 50px; height: 45px; background: transparent; color: #fff; border: none; text-align: center; font-size: 1.1rem; font-weight: bold;">
            <button type="button" onclick="changeQty(1)" style="width: 40px; height: 45px; background: rgba(255,255,255,0.08); color: #fff; border: none; font-size: 1.3rem; font-weight: bold; cursor: pointer;">+</button>
          </div>

          <button onclick="addToCartFromDetail(${id})" style="background: linear-gradient(135deg, #ff0055, #e63946); color: white; border: none; padding: 14px 28px; font-size: 1rem; font-weight: 800; border-radius: 8px; cursor: pointer;">
             Agregar al Carrito
          </button>
        </div>

        <div id="cart-msg" style="display: none; color: #00f2fe; font-weight: bold; margin-top: 10px;">
           ¡Producto agregado al carrito exitosamente!
        </div>

        <div style="margin-top: 25px;">
          <a href="${backPath}" style="color: #00f2fe; text-decoration: none; font-size: 0.95rem; font-weight: 600;">← Volver al Catálogo</a>
        </div>
      </div>
    </div>
  `;
}

function renderCartView(cartContainer, totalContainer, isPagesDir) {
  const cart = getCart();

  if (!cart || cart.length === 0) {
    cartContainer.innerHTML = `
      <div style="text-align:center; padding: 40px 20px; color: #fff; background: #161224; border-radius: 12px; border: 1px solid rgba(255,255,255,0.1);">
        <p style="font-size: 1.2rem; margin-bottom: 15px;">Tu carrito está vacío </p>
        <a href="productos.html" style="background: #ff0055; color:#fff; padding:10px 20px; text-decoration:none; border-radius:6px; font-weight:bold; display:inline-block;">Explorar Catálogo</a>
      </div>
    `;
    if (totalContainer) totalContainer.textContent = "$0";
    return;
  }

  let grandTotal = 0;

  const itemsHTML = cart.map(item => {
    const product = PRODUCTS.find(p => p[0] == item.id);
    if (!product) return "";

    const [id, title, category, img, price] = product;
    const qty = parseInt(item.quantity) || 1;
    const subtotal = price * qty;
    grandTotal += subtotal;
    const imagePath = isPagesDir ? `../images/${img}` : `images/${img}`;

    return `
      <div style="display: flex; align-items: center; justify-content: space-between; gap: 20px; background: #161224; padding: 15px 25px; border-radius: 12px; border: 1px solid rgba(255, 0, 85, 0.3); flex-wrap: wrap;">
        <div style="display: flex; align-items: center; gap: 20px;">
          <img src="${imagePath}" alt="${title}" style="width: 70px; height: 70px; object-fit: cover; border-radius: 8px;">
          <div>
            <h4 style="margin: 0; color: #fff; font-size: 1.1rem;">${title}</h4>
            <p style="margin: 5px 0 0 0; color: #ff0055; font-weight: bold;">$${price.toLocaleString("es-CL")} c/u</p>
          </div>
        </div>

        <div style="display: flex; align-items: center; gap: 20px;">
          <div style="display: flex; align-items: center; background: #0b0813; border: 1px solid rgba(255,255,255,0.2); border-radius: 6px; overflow: hidden;">
            <button onclick="updateCartItemQty(${id}, -1)" style="width:32px; height:35px; background:rgba(255,255,255,0.08); color:#fff; border:none; font-weight:bold; cursor:pointer;">-</button>
            <span style="width:35px; text-align:center; color:#fff; font-weight:bold;">${qty}</span>
            <button onclick="updateCartItemQty(${id}, 1)" style="width:32px; height:35px; background:rgba(255,255,255,0.08); color:#fff; border:none; font-weight:bold; cursor:pointer;">+</button>
          </div>
          <span style="color: #00f2fe; font-weight: bold; font-size: 1.1rem; min-width: 100px; text-align: right;">$${subtotal.toLocaleString("es-CL")}</span>
          <button onclick="removeCartItem(${id})" style="background: transparent; color: #ff0055; border: none; font-size: 1.3rem; cursor: pointer; padding: 5px;"></button>
        </div>
      </div>
    `;
  }).join("");

  cartContainer.innerHTML = itemsHTML;
  if (totalContainer) totalContainer.textContent = `$${grandTotal.toLocaleString("es-CL")}`;
}

function renderAdminTable(tbody) {
  if (!tbody) return;
  tbody.innerHTML = PRODUCTS.map(p => {
    const [id, title, category, img, price, desc, type] = p;
    return `
      <tr style="border-bottom: 1px solid rgba(255,255,255,0.1);">
        <td style="padding: 12px 10px;">${id}</td>
        <td style="padding: 12px 10px; font-weight: bold;">${title}</td>
        <td style="padding: 12px 10px; color: #00f2fe;">${category}</td>
        <td style="padding: 12px 10px;">${type === 'box' ? ' Box' : ' Individual'}</td>
        <td style="padding: 12px 10px; color: #ff0055; font-weight: bold;">$${price.toLocaleString("es-CL")}</td>
        <td style="padding: 12px 10px; text-align: center;">
          <button onclick="deleteProductFromAdmin(${id})" style="background: transparent; color: #ff0055; border: 1px solid #ff0055; padding: 5px 10px; border-radius: 4px; cursor: pointer; font-weight: bold;">Eliminar</button>
        </td>
      </tr>
    `;
  }).join("");
}

function renderOrdersTable(tbody) {
  if (!tbody) return;
  const orders = getOrders();

  let totalSales = 0;
  orders.forEach(o => totalSales += o.total);

  const salesEl = document.getElementById("metric-total-sales");
  const countEl = document.getElementById("metric-orders-count");

  if (salesEl) salesEl.textContent = `$${totalSales.toLocaleString("es-CL")}`;
  if (countEl) countEl.textContent = orders.length;

  if (orders.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; padding: 20px; color:#aaa;">Aún no se han registrado ventas.</td></tr>`;
    return;
  }

  tbody.innerHTML = orders.map(o => `
    <tr style="border-bottom: 1px solid rgba(255,255,255,0.1);">
      <td style="padding: 12px 10px; font-weight: bold; color: #00f2fe;">#${o.id}</td>
      <td style="padding: 12px 10px; color: #aaa;">${o.date}</td>
      <td style="padding: 12px 10px; color: #ff0055; font-weight: bold;">${o.client || 'Cliente'}</td>
      <td style="padding: 12px 10px;">${o.itemsSummary}</td>
      <td style="padding: 12px 10px; text-align: right; color: #00f2fe; font-weight: bold;">$${o.total.toLocaleString("es-CL")}</td>
    </tr>
  `).join("");
}


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
  const existingIndex = cart.findIndex(item => item.id == productId);

  if (existingIndex > -1) {
    cart[existingIndex].quantity = (parseInt(cart[existingIndex].quantity) || 0) + qty;
  } else {
    cart.push({ id: parseInt(productId), quantity: qty });
  }

  saveCart(cart);

  const msg = document.getElementById("cart-msg");
  if (msg) {
    msg.style.display = "block";
    setTimeout(() => { msg.style.display = "none"; }, 3000);
  }
};

window.updateCartItemQty = function(productId, delta) {
  let cart = getCart();
  const item = cart.find(i => i.id == productId);
  if (item) {
    item.quantity = (parseInt(item.quantity) || 1) + delta;
    if (item.quantity <= 0) {
      cart = cart.filter(i => i.id != productId);
    }
  }
  saveCart(cart);
  const cartItemsContainer = document.getElementById("cart-items");
  const cartTotalContainer = document.getElementById("cart-total");
  const isPagesDir = window.location.pathname.toLowerCase().includes("pages");
  if (cartItemsContainer) renderCartView(cartItemsContainer, cartTotalContainer, isPagesDir);
};

window.removeCartItem = function(productId) {
  let cart = getCart();
  cart = cart.filter(i => i.id != productId);
  saveCart(cart);
  const cartItemsContainer = document.getElementById("cart-items");
  const cartTotalContainer = document.getElementById("cart-total");
  const isPagesDir = window.location.pathname.toLowerCase().includes("pages");
  if (cartItemsContainer) renderCartView(cartItemsContainer, cartTotalContainer, isPagesDir);
};

window.deleteProductFromAdmin = function(productId) {
  if (confirm("¿Estás seguro de que deseas eliminar este producto del catálogo?")) {
    PRODUCTS = PRODUCTS.filter(p => p[0] != productId);
    saveProducts(PRODUCTS);
    const adminTableBody = document.getElementById("admin-table-body");
    if (adminTableBody) renderAdminTable(adminTableBody);
  }
};

window.processCheckout = function() {
  const isPagesDir = window.location.pathname.toLowerCase().includes("pages");
  const currentUser = getCurrentUser();

  if (!currentUser) {
    alert(" Debes iniciar sesión para realizar la compra.");
    window.location.href = isPagesDir ? "login.html" : "pages/login.html";
    return;
  }

  const cart = getCart();
  if (cart.length === 0) {
    alert("Tu carrito está vacío.");
    return;
  }

  let total = 0;
  const itemsList = [];

  cart.forEach(item => {
    const product = PRODUCTS.find(p => p[0] == item.id);
    if (product) {
      const subtotal = product[4] * item.quantity;
      total += subtotal;
      itemsList.push(`${product[1]} (${item.quantity}x)`);
    }
  });

  const orders = getOrders();
  const newOrder = {
    id: Math.floor(1000 + Math.random() * 9000),
    date: new Date().toLocaleDateString('es-CL'),
    client: currentUser.email,
    itemsSummary: itemsList.join(", "),
    total: total
  };

  orders.unshift(newOrder);
  localStorage.setItem('gamebites_orders', JSON.stringify(orders));

  saveCart([]);
  alert(`¡Gracias por tu compra, ${currentUser.name}! Se ha registrado tu pedido correctamente.`);
  window.location.reload();
};