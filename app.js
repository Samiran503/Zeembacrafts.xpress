const WA="917896160761",$=i=>document.getElementById(i),esc=t=>String(t==null?"":t).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
let D={sub:"",logo:"",cats:[],products:[]},route="/",cart={},sortv="new",fl={r:"",sale:false},art=null,isAdm=false,dirty=false,editing=null,img="",cedit=null,cimg="";
const TL={sale:"SALE",new:"NEW!",custom:"CUSTOMISABLE"};

function go(r){route=r;try{location.hash=r}catch(e){}render(true);if(r.includes("#categories")){setTimeout(()=>{const cg=document.querySelector(".cg");if(cg)cg.scrollIntoView({behavior:"smooth"})},100)}}
window.addEventListener("hashchange",()=>{const h=location.hash.slice(1)||"/";if(h!=route){route=h;render(true)}});

function logo(){$("logo").innerHTML=D.logo?`<img src="${D.logo}" alt="ZEEMBA">`:'<span class="wm">ZEEMBA</span>'}
function srch(){const q=$("q").value;if(q&&!/^\/(c|all)/.test(route)){route="/all";try{location.hash=route}catch(e){}}render(false)}

const PHI='<svg viewBox="0 0 24 24" width="34%" fill="none" stroke="#b4b9c1" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="1.7"/><path d="M4 18l5-5 4 4 3-3 4 4"/></svg>';
function ph(x){return x.img?`<img src="${x.img}" alt="">`:PHI}

function card(x){
  return `<div class="pc"><div onclick="go('/p/${x.id}')"><div class="pi" style="background:var(--soft)"><div class="tg">${(x.t||[]).map(k=>`<span class="t ${k}">${TL[k]}</span>`).join("")}</div><div class="im">${ph(x)}</div>${x.r?`<span class="rt">${x.r} <span style="color:#fbbf24">★</span> ( ${x.rc||0} reviews)</span>`:""}</div><h3>${esc(x.n)}</h3><div class="br">ZEEMBA</div><div class="pr"><b>₹${x.p}</b>${x.m>x.p?`<s>₹${x.m}</s>`:""}</div></div><button class="card-add-btn" onclick="add(${x.id},event)">+ Add to Cart</button></div>`;
}

function about(){
  $("view").innerHTML=`<div style="max-width:760px;margin:30px auto;padding:0 12px;text-align:center;"><h1 class="ttl" style="margin-bottom:10px;color:#4A2E22;">About ZEEMBA</h1><p style="font-family:'Outfit';font-size:18px;color:#6B4636;font-weight:500;margin-bottom:28px;">Handmade with love, crafted for your special moments ❤️</p><div style="background:#FFFDF8;border:1px solid #E6D8C5;border-radius:20px;padding:32px 26px;text-align:left;line-height:1.75;color:#4A2E22;box-shadow:0 4px 20px rgba(74,46,34,0.06);"><h3 style="font-family:'Outfit';font-size:22px;margin-top:0;color:#6B4636;border-bottom:2px solid #F7F0E3;padding-bottom:10px;">Our Story</h3><p>Welcome to <b>ZEEMBA</b>, your destination for unique, handcrafted gifts and personalised keepsakes. Every miniature frame, gift hamper, and resin art piece is thoughtfully handmade to preserve your cherished memories.</p><p>Whether you are looking for a romantic anniversary gift, a personalized name frame, or a custom birthday surprise hamper, we bring heart, honesty, and artistic attention to detail into every creation.</p><h3 style="font-family:'Outfit';font-size:20px;margin-top:26px;color:#6B4636;">Why Choose ZEEMBA?</h3><ul style="padding-left:20px;margin-bottom:20px;"><li><b>100% Handcrafted:</b> Made with genuine passion and dedication.</li><li><b>Customisable Designs:</b> Tailored to your exact photos, names, and preferences.</li><li><b>Direct Friendly Ordering:</b> Simple order process directly with the maker via WhatsApp.</li></ul></div><div style="background:#F7F0E3;border:1px solid #E6D8C5;border-radius:20px;padding:28px 24px;margin-top:28px;text-align:center;"><h3 style="font-family:'Outfit';font-size:22px;margin:0 0 8px;color:#4A2E22;">Follow Our Journey 💕</h3><p style="font-size:15px;color:#6B4636;max-width:540px;margin:0 auto 20px;line-height:1.6;">Discover our latest creations, explore our handmade collections, and be a part of the ZEEMBA journey.</p><a href="https://www.instagram.com/zeemba01" target="_blank" rel="noopener" class="bn" style="display:inline-flex;align-items:center;justify-content:center;gap:8px;max-width:280px;background:#6B4636;color:#FFFFFF;border-radius:12px;padding:14px 24px;font-weight:600;text-decoration:none;transition:background-color 0.2s;"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg> Follow Us on Instagram</a></div></div>`;
}

function updateNavActive(){
  ["nl-home","nl-shop","nl-cats","nl-about"].forEach(i=>{const e=$(i);if(e)e.classList.remove("active")});
  const r=route.split("/")[1]||"";
  if(r=="") { if(route.includes("#categories")) {$("nl-cats")&&$("nl-cats").classList.add("active");} else {$("nl-home")&&$("nl-home").classList.add("active");} }
  else if(r=="all") {$("nl-shop")&&$("nl-shop").classList.add("active");}
  else if(r=="c") {$("nl-cats")&&$("nl-cats").classList.add("active");}
  else if(r=="about") {$("nl-about")&&$("nl-about").classList.add("active");}
}

function render(top){
  const r=route.split("/"),v=$("view");
  closeAll();
  if(r[1]=="c")list(decodeURIComponent(r[2]||""));
  else if(r[1]=="all")list("");
  else if(r[1]=="p")detail(+r[2]);
  else if(r[1]=="about")about();
  else home();
  if(top)window.scrollTo(0,0);
  updateNavActive();
}

function home(){
  const q=$("q").value;if(q){list("");return}
  let h=`<h1 class="ttl">All Categories</h1><p class="sub">${esc(D.sub)}</p><div class="cg">`+D.cats.map(c=>`<div class="cc" onclick="go('/c/${encodeURIComponent(c.n)}')"><div class="ci">${c.img?`<img src="${c.img}" alt="">`:PHI}</div><span>${esc(c.n)}</span></div>`).join("")+(D.cats.length%2?'<div class="cc"></div>':"")+`</div>`;
  h+=`<button class="lk" onclick="go('/all')">View all products →</button>`;
  $("view").innerHTML=h;
}

function list(c){
  const q=$("q").value.toLowerCase(),cat=D.cats.find(x=>x.n==c);
  let L=D.products.filter(x=>(!c||x.c==c)&&x.n.toLowerCase().includes(q));
  if(fl.sale)L=L.filter(x=>x.m>x.p||(x.t||[]).includes("sale"));
  if(fl.r=="1")L=L.filter(x=>x.p<300);
  if(fl.r=="2")L=L.filter(x=>x.p>=300&&x.p<=600);
  if(fl.r=="3")L=L.filter(x=>x.p>600);
  L.sort((a,b)=>sortv=="lo"?a.p-b.p:sortv=="hi"?b.p-a.p:b.id-a.id);
  $("view").innerHTML=`<h1 class="ttl">${esc(c||"All Products")}</h1><p class="sub" style="min-height:24px">${esc(cat?cat.d:"")}</p><div class="tb"><button class="fb" onclick="flt()"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 7h9M16 7h5M3 17h5M12 17h9"/><circle cx="14" cy="7" r="2"/><circle cx="10" cy="17" r="2"/></svg> Filter</button><select class="sel" onchange="sortv=this.value;list('${esc(c).replace(/'/g,"\\'")}')"><option value="new" ${sortv=="new"?"selected":""}>Newest First</option><option value="lo" ${sortv=="lo"?"selected":""}>Price: Low to High</option><option value="hi" ${sortv=="hi"?"selected":""}>Price: High to Low</option></select></div><div class="pg">${L.map(card).join("")||'<p style="grid-column:1/-1;text-align:center;color:var(--mute);padding:40px 0">No products found.</p>'}</div>`;
}

function flt(){
  $("modal").innerHTML=`<h2 class="hd" style="margin:0 0 8px">Filter</h2><b>Price</b>${[["","All prices"],["1","Under ₹300"],["2","₹300 – ₹600"],["3","Above ₹600"]].map(([v,t])=>`<label class="chk" style="display:flex"><input type="radio" name="pr" value="${v}" ${fl.r==v?"checked":""}> ${t}</label>`).join("")}<label class="chk" style="display:flex;margin-top:14px"><input type="checkbox" id="fsale" ${fl.sale?"checked":""}> Sale items only</label><button class="bn" onclick="fl.r=document.querySelector('input[name=pr]:checked').value;fl.sale=$('fsale').checked;render()">Apply</button><button class="bn o" onclick="fl={r:'',sale:false};render()">Clear</button>`;
  $("ov").classList.add("show");
  $("modal").classList.add("show");
  document.body.style.overflow="hidden";
}

function detail(i){
  const x=D.products.find(y=>y.id==i);
  if(!x){home();return}
  $("view").innerHTML=`<button class="lk" style="margin:20px 0 0" onclick="history.length>1?history.back():go('/')">← Back</button><div class="dt"><div class="pi" style="background:var(--soft)"><div class="tg">${(x.t||[]).map(k=>`<span class="t ${k}">${TL[k]}</span>`).join("")}</div><div class="im">${ph(x)}</div></div><div><h1 class="hd">${esc(x.n)}</h1><div class="br">ZEEMBA · ${esc(x.c)}</div>${x.r?`<p style="margin:8px 0 0">${x.r} <span style="color:#f59e0b">★</span> (${x.rc||0} reviews)</p>`:""}<div class="pr" style="margin:14px 0"><b>₹${x.p}</b>${x.m>x.p?`<s>₹${x.m}</s>`:""}</div><p style="color:var(--mute);line-height:1.6;white-space:pre-line">${esc(x.d)}</p><button class="bn" onclick="add(${x.id})">Add to cart</button><a class="bn g" target="_blank" rel="noopener" href="https://wa.me/${WA}?text=${encodeURIComponent('Hi ZEEMBA, I want to order: '+x.n+' (₹'+x.p+')')}">Buy now on WhatsApp</a></div></div>`;
}

function openM(){
  closeAll();
  const curr=route;
  let h=`<div class="m-header"><span class="m-title">ZEEMBA</span><button class="m-close" onclick="closeAll()" aria-label="Close menu">✕</button></div>`;
  h+=`<div id="menuL">`;
  h+=`<a class="m-link ${curr=='/'||curr==''?'active':''}" onclick="go('/')">Home</a>`;
  h+=`<a class="m-link ${curr=='/all'?'active':''}" onclick="go('/all')">Shop / Products</a>`;
  h+=`<div class="m-cat-title">Categories</div>`;
  h+=D.cats.map(c=>{
    const cRoute='/c/'+encodeURIComponent(c.n);
    const isAct=curr==cRoute||curr=='/#categories';
    return `<a class="m-link m-cat-link ${isAct?'active':''}" onclick="go('${cRoute}')">${esc(c.n)}</a>`;
  }).join("");
  h+=`<a class="m-link ${curr=='/about'?'active':''}" onclick="go('/about')">About Us</a>`;
  h+=`<a class="m-link" href="https://wa.me/${WA}" target="_blank" rel="noopener">Contact on WhatsApp 💬</a>`;
  h+=`</div>`;
  $("menu").innerHTML=h;
  $("ov").classList.add("show");
  $("menu").classList.add("show");
  document.body.style.overflow="hidden";
}

try{cart=JSON.parse(localStorage.getItem("zeemba_cart")||"{}")}catch(e){cart={}}
function saveCart(){try{localStorage.setItem("zeemba_cart",JSON.stringify(cart))}catch(e){}}

let toastTimer;
function showToast(msg){
  const t=$("toast");
  if(t){
    t.innerHTML=`<span>${msg||"✓ Added to cart"}</span>`;
    t.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer=setTimeout(()=>t.classList.remove("show"),2200);
  }
}

function add(i,e){
  if(e&&e.stopPropagation)e.stopPropagation();
  cart[i]=(cart[i]||0)+1;
  saveCart();
  draw();
  const item=D.products&&D.products.find(x=>x.id==i);
  showToast(item?`✓ "${esc(item.n)}" added to cart`:"✓ Added to cart");
}

function chg(i,d){cart[i]+=d;if(cart[i]<1)delete cart[i];saveCart();draw()}
function openCart(){closeAll();$("ov").classList.add("show");$("drawer").classList.add("show");document.body.style.overflow="hidden"}

function closeAll(){
  ["ov","modal","drawer","menu","adm"].forEach(i=>{const e=$(i);if(e)e.classList.remove("show")});
  document.body.style.overflow="";
}

function draw(){
  let t=0,q=0,m="Hi ZEEMBA, I want to order:\n";
  const h=Object.keys(cart).map(i=>{
    const x=D.products.find(y=>y.id==i);
    if(!x){delete cart[i];return""}
    const k=cart[i];t+=x.p*k;q+=k;
    m+=`- ${x.n} x${k} = ₹${x.p*k}\n`;
    return `<div class="row"><span>${esc(x.n)}<br><small style="color:var(--mute)">₹${x.p}</small></span><span class="qty"><button onclick="chg(${i},-1)">−</button> ${k} <button onclick="chg(${i},1)">+</button></span></div>`;
  }).join("");
  $("items").innerHTML=h||'<p style="color:var(--mute)">Your cart is empty.</p>';
  $("n").textContent=q;
  $("n").style.display=q?"block":"none";
  $("tot").textContent="₹"+t;
  m+=`Total: ₹${t}`;
  const nm=$("nm").value,ad=$("ad").value;
  if(nm)m+=`\nName: ${nm}`;
  if(ad)m+=`\nAddress: ${ad}`;
  $("wa").href=`https://wa.me/${WA}?text=${encodeURIComponent(m)}`;
  $("wa").style.display=q?"block":"none";
}

$("nm").oninput=$("ad").oninput=draw;

fetch("products.json?v="+Date.now()).then(r=>r.json()).then(j=>{
  D=j;logo();route=location.hash.slice(1)||"/";render();draw();
}).catch(()=>{$("view").innerHTML='<p style="text-align:center;padding:60px 16px">Products load nahi ho paaye. Page refresh karein.</p>'});
