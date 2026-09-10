const PRODUCTS = [
  [1,"PokéBall Surprise","POKÉMON","pokeball.jpg",12990,"Esfera de chocolate de leche con centro cremoso de maracuyá y trufas de avellana."],
  [2,"Bloque Redstone","MINECRAFT","redstone.jpg",8990,"Cubo artesanal de chocolate blanco con menta suave y corazón crujiente de frambuesa."],
  [3,"Fatality Skull","MORTAL KOMBAT","skull.jpg",14990,"Cráneo de chocolate 70% cacao con relleno líquido de mermelada artesanal de frutos rojos."],
  [4,"Ghost Bite 8-Bits","ARCADE CLASSICS","ghost.jpg",6990,"Figura retro de chocolate amargo con trozos crujientes de caramelo salado."],
  [5,"Choco-Kart Super Mario","MARIO KART","kart.jpg",14990,"Chocolate de leche suizo con praliné de avellanas tostadas y centro de galleta crujiente."],
  [6,"Cristal Hextech","LEAGUE OF LEGENDS","hextech.jpg",13990,"Bombón de chocolate blanco artesanal con crema suave de arándanos y perlas crujientes."],
  [7,"Trifuerza de Hyrule","ZELDA","triforce.jpg",15990,"Chocolate rubio caramelizado con polvo dorado, manjar suave y caramelo a la sal de mar."],
  [8,"Poción de Escudo 100","FORTNITE","shield.jpg",11990,"Frasco de chocolate 70% cacao con ganache cremoso de frutos del bosque y chispas efervescentes."]
];

const money = value => new Intl.NumberFormat("es-CL",{style:"currency",currency:"CLP",maximumFractionDigits:0}).format(value);

function getCart(){ return JSON.parse(localStorage.getItem("gamebitesCart") || "[]"); }
function saveCart(cart){ localStorage.setItem("gamebitesCart", JSON.stringify(cart)); updateCartCount(); }

function addToCart(id){
  const product=PRODUCTS.find(p=>p[0]===Number(id));
  if(!product) return;
  const cart=getCart();
  const item=cart.find(i=>i.id===product[0]);
  if(item) item.qty++;
  else cart.push({id:product[0],qty:1});
  saveCart(cart);
  showToast(`${product[1]} agregado al carrito`);
}

function updateCartCount(){
  const total=getCart().reduce((sum,i)=>sum+i.qty,0);
  document.querySelectorAll(".cart-count").forEach(el=>el.textContent=total);
}

function showToast(message){
  let toast=document.querySelector(".toast");
  if(!toast){ toast=document.createElement("div"); toast.className="toast"; document.body.appendChild(toast); }
  toast.textContent=message; toast.classList.add("show");
  clearTimeout(window.toastTimer); window.toastTimer=setTimeout(()=>toast.classList.remove("show"),2200);
}

function renderProducts(){
  const grid=document.querySelector("#products-grid");
  if(!grid) return;
  grid.innerHTML=PRODUCTS.map(p=>`
    <article class="caluga-card reveal">
      <div class="card-badge">${p[2]}</div>
      <a href="producto.html?id=${p[0]}" class="card-img-wrapper"><img src="../images/${p[3]}" alt="${p[1]}" class="card-img"></a>
      <div class="card-content">
        <h3>${p[1]}</h3><p class="card-desc">${p[5]}</p>
        <div class="card-footer"><span class="price">${money(p[4])}</span>
        <button class="btn-buy" onclick="addToCart(${p[0]})">Agregar</button></div>
      </div>
    </article>`).join("");
}

function renderDetail(){
  const el=document.querySelector("#product-detail"); if(!el) return;
  const id=new URLSearchParams(location.search).get("id");
  const p=PRODUCTS.find(x=>x[0]===Number(id)) || PRODUCTS[0];
  el.innerHTML=`
    <div class="detail-image"><img src="../images/${p[3]}" alt="${p[1]}"></div>
    <div class="detail-info"><span class="card-badge static">${p[2]}</span><h1>${p[1]}</h1>
    <p>${p[5]}</p><div class="detail-price">${money(p[4])}</div>
    <button class="btn-primary" onclick="addToCart(${p[0]})">🛒 Agregar al carrito</button>
    <a class="back-link" href="productos.html">← Volver a productos</a></div>`;
}

function renderCart(){
  const list=document.querySelector("#cart-items"); if(!list) return;
  const cart=getCart();
  if(!cart.length){ list.innerHTML='<div class="empty-cart"><h2>Tu carrito está vacío</h2><p>Agrega algunos chocolates gamer para comenzar.</p><a class="btn-primary" href="productos.html">Ver productos</a></div>'; document.querySelector("#cart-total").textContent=money(0); return; }
  let total=0;
  list.innerHTML=cart.map(item=>{
    const p=PRODUCTS.find(x=>x[0]===item.id); const subtotal=p[4]*item.qty; total+=subtotal;
    return `<div class="cart-item"><img src="../images/${p[3]}" alt="${p[1]}"><div class="cart-item-info"><h3>${p[1]}</h3><span>${money(p[4])}</span></div>
    <div class="quantity"><button onclick="changeQty(${p[0]},-1)">−</button><b>${item.qty}</b><button onclick="changeQty(${p[0]},1)">+</button></div>
    <strong>${money(subtotal)}</strong><button class="remove" onclick="removeFromCart(${p[0]})">Eliminar</button></div>`;
  }).join("");
  document.querySelector("#cart-total").textContent=money(total);
}

function changeQty(id,delta){ const cart=getCart(); const item=cart.find(i=>i.id===id); if(!item)return; item.qty+=delta; if(item.qty<=0) return removeFromCart(id); saveCart(cart); renderCart(); }
function removeFromCart(id){ saveCart(getCart().filter(i=>i.id!==id)); renderCart(); }

function initAnimations(){
  const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");observer.unobserve(e.target)}}),{threshold:.12});
  document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));
}
document.addEventListener("DOMContentLoaded",()=>{ updateCartCount(); renderProducts(); renderDetail(); renderCart(); initAnimations(); });
