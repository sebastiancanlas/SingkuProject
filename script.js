// Scroll effect for navigation
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.scroll-animation').forEach(el => {
    observer.observe(el);
});

// Coffee bean animation
function createCoffeeBeans() {
    const hero = document.querySelector('.hero');
    for (let i = 0; i < 20; i++) {
        const bean = document.createElement('div');
        bean.innerHTML = '☕';
        bean.style.position = 'absolute';
        bean.style.left = Math.random() * 100 + '%';
        bean.style.top = Math.random() * 100 + '%';
        bean.style.fontSize = Math.random() * 20 + 10 + 'px';
        bean.style.opacity = Math.random() * 0.3 + 0.1;
        bean.style.animation = `float ${Math.random() * 10 + 10}s infinite linear`;
        bean.style.animationDelay = Math.random() * 10 + 's';
        hero.appendChild(bean);
    }
}

// Initialize coffee beans animation when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    createCoffeeBeans();

    // Products: data, rendering, filters, sorting, and cart
    const productsGrid = document.getElementById('productsGrid');
    const searchInput = document.getElementById('productSearch');
    const categoryFilter = document.getElementById('categoryFilter');
    const sortFilter = document.getElementById('sortFilter');
    const cartCountEl = document.getElementById('cartCount');
    const viewCartBtn = document.getElementById('viewCart');

    if (!productsGrid) {
        return;
    }

    const products = [
        // Specialty Beverages - Espresso Classics
        { id: 1, name: 'Latte', description: 'Smooth espresso with steamed milk.', price: 180, rating: 4.7, category: 'beverages', image: 'media/latte.webp', attrs: { size: '12oz', milk: 'Whole' }, quantityApplicable: true },
        { id: 2, name: 'Cappuccino', description: 'Perfect balance of espresso, steamed milk, and foam.', price: 170, rating: 4.6, category: 'beverages', image: 'media/cappu.jpg', attrs: { size: '8oz', foam: 'Extra' }, quantityApplicable: true },
        { id: 3, name: 'Americano', description: 'Espresso with hot water for a clean taste.', price: 160, rating: 4.5, category: 'beverages', image: 'media/americano.jpeg', attrs: { size: '12oz', strength: 'Medium' }, quantityApplicable: true },

        // Specialty Beverages - Manual Brews
        { id: 4, name: 'V60', description: 'Hand-poured coffee using V60 method.', price: 190, rating: 4.8, category: 'beverages', image: 'media/v60.webp', attrs: { size: '12oz', method: 'Pour Over' }, quantityApplicable: true },
        { id: 5, name: 'Chemex', description: 'Clean, bright coffee from Chemex brewing.', price: 200, rating: 4.7, category: 'beverages', image: 'media/chemex.webp', attrs: { size: '16oz', method: 'Chemex' }, quantityApplicable: true },
        { id: 6, name: 'Cold Brew', description: 'Slow-steeped, smooth, low-acid coffee.', price: 180, rating: 4.6, category: 'beverages', image: 'media/coldbrew.jpg', attrs: { size: '16oz', roast: 'Medium' }, quantityApplicable: true },

        // Specialty Beverages - Signature Drinks
        { id: 7, name: 'Sea Salt Latte', description: 'Balanced salt-sweet profile over espresso.', price: 200, rating: 4.7, category: 'beverages', image: 'media/salt.webp', attrs: { size: '16oz', milk: 'Whole' }, quantityApplicable: true },
        { id: 8, name: 'Spanish Latte', description: 'Sweet, smooth, and creamy favorite.', price: 190, rating: 4.9, category: 'beverages', image: 'media/spanish.jpg', attrs: { size: '12oz', sweetness: 'Medium' }, quantityApplicable: true },

        // Specialty Beverages - Specialty Concoctions
        { id: 9, name: 'Turtle Mocha', description: 'Rich mocha with caramel and chocolate.', price: 220, rating: 4.8, category: 'beverages', image: 'media/turtle.webp', attrs: { size: '16oz', sweetness: 'High' }, quantityApplicable: true },
        { id: 10, name: 'Dirty Horchata', description: 'Espresso mixed with creamy horchata.', price: 210, rating: 4.6, category: 'beverages', image: 'media/horchata.jpg', attrs: { size: '16oz', spice: 'Cinnamon' }, quantityApplicable: true },

        // Specialty Beverages - Flavored Lattes & Oreo Foam
        { id: 11, name: 'Flavored Lattes', description: 'Custom flavored latte with your choice of syrup.', price: 200, rating: 4.5, category: 'beverages', image: 'media/flavor.jpg', attrs: { size: '12oz', flavor: 'Vanilla' }, quantityApplicable: true },
        { id: 12, name: 'Oreo Foam', description: 'Creamy latte topped with Oreo foam.', price: 210, rating: 4.7, category: 'beverages', image: 'media/oreo.jpg', attrs: { size: '16oz', topping: 'Oreo' }, quantityApplicable: true },

        // Specialty Beverages - Non-Coffee
        { id: 13, name: 'Premium Teas', description: 'High-quality loose leaf tea selection.', price: 150, rating: 4.4, category: 'beverages', image: 'media/teas.jpg', attrs: { size: '12oz', type: 'Green' }, quantityApplicable: true },
        { id: 14, name: 'Fruit Refreshers', description: 'Fresh fruit-based refreshing drink.', price: 170, rating: 4.3, category: 'beverages', image: 'media/ref.jpg', attrs: { size: '16oz', fruit: 'Mixed' }, quantityApplicable: true },

        // Rice Meals
        { id: 15, name: 'Fried Chicken Cutlet Rice', description: 'Crispy chicken cutlet served with perfectly steamed jasmine rice and fresh vegetables.', price: 420, rating: 4.6, category: 'food', image: 'media/chick.jpg', attrs: { serves: '1', rice: 'Jasmine Rice' }, quantityApplicable: true },
        { id: 16, name: 'Pork Sisig Rice', description: 'Traditional Filipino sisig with perfectly steamed jasmine rice and fresh vegetables.', price: 380, rating: 4.7, category: 'food', image: 'media/sisig.jpg', attrs: { serves: '1', rice: 'Jasmine Rice' }, quantityApplicable: true },

        // Pasta Dishes
        { id: 17, name: 'Chicken Pesto Pasta', description: 'Herby pesto with tender chicken, made with premium ingredients and freshly prepared to order.', price: 380, rating: 4.6, category: 'food', image: 'media/pesto.webp', attrs: { serves: '1', ingredients: 'Premium' }, quantityApplicable: true },
        { id: 18, name: 'Penne Alfredo', description: 'Creamy Alfredo, made with premium ingredients and freshly prepared to order.', price: 360, rating: 4.5, category: 'food', image: 'media/alfredo.webp', attrs: { serves: '1', ingredients: 'Premium' }, quantityApplicable: true },

        // Quick Bites
        { id: 19, name: 'Artisan Sandwiches', description: 'Toasted sourdough with choice fillings.', price: 280, rating: 4.4, category: 'food', image: 'media/artisan.jpg', attrs: { bread: 'Sourdough', option: 'Chicken' }, quantityApplicable: true },
        { id: 20, name: 'Crispy Quesadillas', description: 'Golden tortillas filled with cheese and choice protein.', price: 310, rating: 4.5, category: 'food', image: 'media/crispy.jpg', attrs: { size: 'Large', filling: 'Chicken' }, quantityApplicable: true },
        { id: 21, name: 'Golden Fries', description: 'Crispy golden fries with sea salt.', price: 190, rating: 4.3, category: 'food', image: 'media/fries.jpg', attrs: { size: 'Regular', seasoning: 'Sea Salt' }, quantityApplicable: true },
        { id: 22, name: 'Fish & Chips', description: 'Beer-battered fish with crispy fries.', price: 370, rating: 4.6, category: 'food', image: 'media/fishchips.jpg', attrs: { fish: 'Cod', batter: 'Beer' }, quantityApplicable: true },
        { id: 23, name: 'Mozzarella Sticks', description: 'Breaded mozzarella sticks with marinara sauce.', price: 250, rating: 4.4, category: 'food', image: 'media/moz.jpg', attrs: { count: '6 pieces', sauce: 'Marinara' }, quantityApplicable: true },

        // Merchandise
       
        { id: 25, name: 'Ceramic Coffee Mug', description: 'Handcrafted ceramic mug perfect for your morning coffee.', price: 400, rating: 4.3, category: 'merchandise', image: 'media/ceramic.jpg', attrs: { color: 'Charcoal', capacity: '12oz' }, quantityApplicable: true },
        { id: 26, name: 'Coffee Beans (250g)', description: 'Premium roasted coffee beans for home brewing.', price: 630, rating: 4.7, category: 'merchandise', image: 'media/beans.webp', attrs: { weight: '250g', roast: 'Medium' }, quantityApplicable: true },
        { id: 28, name: 'Coffee Grinder', description: 'Manual burr grinder for the perfect grind at home.', price: 1900, rating: 4.6, category: 'merchandise', image: 'media/grinder.jpg', attrs: { type: 'Manual', material: 'Ceramic' }, quantityApplicable: true },

        // Services
        { id: 29, name: 'Private Brew Session', description: 'Learn coffee brewing techniques with our expert barista.', price: 1050, rating: 4.9, category: 'services', image: 'media/priv.jpg', attrs: { duration: '45 min', level: 'Beginner' }, quantityApplicable: false },
        { id: 30, name: 'Latte Art Workshop', description: 'Hands-on workshop to master latte art techniques.', price: 1470, rating: 4.8, category: 'services', image: 'media/work.webp', attrs: { duration: '60 min', group: 'Up to 6' }, quantityApplicable: false },
        { id: 31, name: 'Coffee Tasting Experience', description: 'Guided tasting of different coffee origins and brewing methods.', price: 840, rating: 4.7, category: 'services', image: 'media/exp.jpg', attrs: { duration: '30 min', samples: '5 coffees' }, quantityApplicable: false },
        { id: 32, name: 'Private Event Catering', description: 'Full-service catering for your private events and gatherings.', price: 6300, rating: 4.8, category: 'services', image: 'media/cater.jpg', attrs: { minGuests: '10', includes: 'Coffee & Pastries' }, quantityApplicable: false },
        { id: 33, name: 'Coffee Subscription', description: 'Monthly delivery of freshly roasted coffee beans.', price: 1260, rating: 4.6, category: 'services', image: 'media/sub.webp', attrs: { frequency: 'Monthly', weight: '500g' }, quantityApplicable: false }
    ];

    // Cart state
    const cart = new Map(); // productId -> quantity

    function updateCartCount() {
        if (!cartCountEl) return;
        const total = Array.from(cart.values()).reduce((a,b)=>a+b,0);
        cartCountEl.textContent = `Cart: ${total} item${total === 1 ? '' : 's'}`;
    }

    function addToCart(productId, quantity) {
        const existing = cart.get(productId) || 0;
        cart.set(productId, existing + quantity);
        updateCartCount();
        saveCart();
    }

    function removeFromCart(productId) {
        cart.delete(productId);
        updateCartCount();
        saveCart();
    }

    function setCartQty(productId, quantity) {
        if (quantity <= 0) {
            removeFromCart(productId);
        } else {
            cart.set(productId, quantity);
            updateCartCount();
            saveCart();
        }
    }

    function loadCart() {
        try {
            const raw = localStorage.getItem('cart');
            if (!raw) return;
            const obj = JSON.parse(raw);
            Object.entries(obj).forEach(([id, qty]) => cart.set(Number(id), Number(qty)));
        } catch {}
    }

    function saveCart() {
        const obj = {};
        cart.forEach((qty, id) => { obj[id] = qty; });
        localStorage.setItem('cart', JSON.stringify(obj));
    }

    // Compare selection bar and modal
    const compareState = new Set();

    function ensureCompareUI() {
        if (document.getElementById('compareBar')) return;
        const bar = document.createElement('div');
        bar.id = 'compareBar';
        bar.className = 'compare-bar';
        const count = document.createElement('span');
        count.id = 'compareCount';
        count.textContent = 'Compare: 0 selected';
        const btn = document.createElement('button');
        btn.id = 'openCompare';
        btn.className = 'compare-btn';
        btn.textContent = 'Open Compare';
        btn.disabled = true;
        btn.addEventListener('click', openCompareModal);
        bar.appendChild(count);
        bar.appendChild(btn);
        document.body.appendChild(bar);

        const overlay = document.createElement('div');
        overlay.id = 'compareOverlay';
        overlay.className = 'modal-overlay';
        overlay.style.display = 'none';
        const modal = document.createElement('div');
        modal.className = 'modal';
        const header = document.createElement('div');
        header.className = 'modal-header';
        const title = document.createElement('h3');
        title.textContent = 'Compare Products';
        const close = document.createElement('button');
        close.className = 'modal-close';
        close.textContent = '×';
        close.addEventListener('click', () => (overlay.style.display = 'none'));
        header.appendChild(title);
        header.appendChild(close);
        const body = document.createElement('div');
        body.id = 'compareBody';
        body.className = 'modal-body';
        modal.appendChild(header);
        modal.appendChild(body);
        overlay.appendChild(modal);
        document.body.appendChild(overlay);
    }

    function updateCompareBar() {
        const countEl = document.getElementById('compareCount');
        const btn = document.getElementById('openCompare');
        if (!countEl || !btn) return;
        const n = compareState.size;
        countEl.textContent = `Compare: ${n} selected`;
        btn.disabled = n < 2;
    }

    function openCompareModal() {
        const overlay = document.getElementById('compareOverlay');
        const body = document.getElementById('compareBody');
        if (!overlay || !body) return;
        body.innerHTML = '';
        const selected = products.filter(p => compareState.has(p.id));
        const table = document.createElement('table');
        table.className = 'compare-table';
        const rows = [
            { label: 'Name', render: p => p.name },
            { label: 'Price', render: p => `₱${p.price.toFixed(0)}` },
            { label: 'Rating', render: p => `${getStoredRating(p.id) ?? p.rating}/5` },
            { label: 'Category', render: p => capitalize(p.category) },
            { label: 'Key Attributes', render: p => Object.entries(p.attrs || {}).map(([k,v]) => `${capitalize(k)}: ${v}`).join(', ') }
        ];
        rows.forEach(r => {
            const tr = document.createElement('tr');
            const th = document.createElement('th');
            th.textContent = r.label;
            tr.appendChild(th);
            selected.forEach(p => {
                const td = document.createElement('td');
                td.textContent = r.render(p);
                tr.appendChild(td);
            });
            table.appendChild(tr);
        });
        body.appendChild(table);
        overlay.style.display = 'flex';
    }

    function capitalize(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

    function getStoredRating(id) {
        const raw = localStorage.getItem('ratings');
        if (!raw) return null;
        try {
            const map = JSON.parse(raw);
            return map[id] ?? null;
        } catch { return null; }
    }

    function setStoredRating(id, value) {
        const raw = localStorage.getItem('ratings');
        let map = {};
        try { map = raw ? JSON.parse(raw) : {}; } catch { map = {}; }
        map[id] = value;
        localStorage.setItem('ratings', JSON.stringify(map));
    }

    function createQuantityControl(initial = 1) {
        const wrap = document.createElement('div');
        wrap.className = 'quantity-control';
        const minus = document.createElement('button'); minus.type = 'button'; minus.className = 'qty-btn'; minus.textContent = '−';
        const input = document.createElement('input'); input.type = 'number'; input.min = '1'; input.value = String(initial); input.className = 'qty-input';
        const plus = document.createElement('button'); plus.type = 'button'; plus.className = 'qty-btn'; plus.textContent = '+';
        minus.addEventListener('click', () => { input.value = String(Math.max(1, parseInt(input.value || '1') - 1)); });
        plus.addEventListener('click', () => { input.value = String(Math.max(1, parseInt(input.value || '1') + 1)); });
        input.addEventListener('input', () => { if (parseInt(input.value || '1') < 1) input.value = '1'; });
        wrap.appendChild(minus); wrap.appendChild(input); wrap.appendChild(plus);
        return { wrap, getQuantity: () => parseInt(input.value || '1') };
    }

    function createRatingWidget(productId, baseRating) {
        const wrap = document.createElement('div');
        wrap.className = 'rating-widget';
        const track = document.createElement('div'); track.className = 'rating-track';
        const fill = document.createElement('div'); fill.className = 'rating-fill';
        const beans = document.createElement('div'); beans.className = 'rating-beans';
        for (let i = 0; i < 5; i++) {
            const b = document.createElement('span'); b.className = 'bean'; b.textContent = '☕'; beans.appendChild(b);
        }
        const valueEl = document.createElement('div'); valueEl.className = 'rating-value';
        let current = getStoredRating(productId) ?? baseRating;
        valueEl.textContent = `${current.toFixed(1)}/5`;
        fill.style.width = `${(current/5)*100}%`;

        let dragging = false;
        function setByClientX(x) {
            const rect = track.getBoundingClientRect();
            const ratio = Math.min(1, Math.max(0, (x - rect.left) / rect.width));
            const val = Math.round((ratio * 5) * 10) / 10; // 0.1 steps
            current = Math.max(0.5, Math.min(5, val || 0.5));
            fill.style.width = `${(current/5)*100}%`;
            valueEl.textContent = `${current.toFixed(1)}/5`;
        }
        track.addEventListener('pointerdown', (e) => { dragging = true; setByClientX(e.clientX); track.setPointerCapture(e.pointerId); });
        track.addEventListener('pointermove', (e) => { if (dragging) setByClientX(e.clientX); });
        track.addEventListener('pointerup', (e) => { dragging = false; setStoredRating(productId, current); });
        track.addEventListener('pointerleave', () => { dragging = false; });

        track.appendChild(fill); track.appendChild(beans);
        wrap.appendChild(track); wrap.appendChild(valueEl);
        return wrap;
    }

    function createAttributesList(attrs) {
        const ul = document.createElement('ul');
        ul.className = 'product-attributes';
        Object.entries(attrs || {}).forEach(([k, v]) => {
            const li = document.createElement('li');
            li.textContent = `${capitalize(k)}: ${v}`;
            ul.appendChild(li);
        });
        return ul;
    }

    function ensureCartUI() {
        if (document.getElementById('cartOverlay')) return;
        const overlay = document.createElement('div');
        overlay.id = 'cartOverlay';
        overlay.className = 'modal-overlay';
        overlay.style.display = 'none';
        const modal = document.createElement('div');
        modal.className = 'modal';
        const header = document.createElement('div'); header.className = 'modal-header';
        const title = document.createElement('h3'); title.textContent = 'Your Cart';
        const close = document.createElement('button'); close.className = 'modal-close'; close.textContent = '×';
        close.addEventListener('click', () => (overlay.style.display = 'none'));
        header.appendChild(title); header.appendChild(close);
        const body = document.createElement('div'); body.id = 'cartBody'; body.className = 'modal-body';
        const footer = document.createElement('div'); footer.className = 'modal-footer';
        const totalEl = document.createElement('div'); totalEl.id = 'cartTotal'; totalEl.className = 'cart-total';
        const clearBtn = document.createElement('button'); clearBtn.className = 'compare-btn'; clearBtn.textContent = 'Clear Cart';
        clearBtn.addEventListener('click', () => { cart.clear(); saveCart(); updateCartCount(); renderCart(); });
        footer.appendChild(totalEl); footer.appendChild(clearBtn);
        modal.appendChild(header); modal.appendChild(body); modal.appendChild(footer);
        overlay.appendChild(modal);
        document.body.appendChild(overlay);
    }

    function renderCart() {
        const overlay = document.getElementById('cartOverlay');
        const body = document.getElementById('cartBody');
        const totalEl = document.getElementById('cartTotal');
        if (!overlay || !body || !totalEl) return;
        body.innerHTML = '';
        let total = 0;
        if (cart.size === 0) {
            const empty = document.createElement('div');
            empty.textContent = 'Your cart is empty.';
            body.appendChild(empty);
        } else {
            cart.forEach((qty, id) => {
                const p = products.find(x => x.id === id);
                if (!p) return;
                const line = document.createElement('div'); line.className = 'cart-line';
                const name = document.createElement('div'); name.className = 'cart-name'; name.textContent = p.name;
                const qtyCtl = document.createElement('div'); qtyCtl.className = 'cart-qty';
                const minus = document.createElement('button'); minus.type = 'button'; minus.className = 'qty-btn'; minus.textContent = '−';
                const inp = document.createElement('input'); inp.type = 'number'; inp.min = '1'; inp.value = String(qty); inp.className = 'qty-input';
                const plus = document.createElement('button'); plus.type = 'button'; plus.className = 'qty-btn'; plus.textContent = '+';
                minus.addEventListener('click', () => { const v = Math.max(1, (parseInt(inp.value)||1)-1); inp.value = String(v); setCartQty(id, v); renderCart(); });
                plus.addEventListener('click', () => { const v = Math.max(1, (parseInt(inp.value)||1)+1); inp.value = String(v); setCartQty(id, v); renderCart(); });
                inp.addEventListener('input', () => { const v = Math.max(1, parseInt(inp.value||'1')); setCartQty(id, v); });
                qtyCtl.appendChild(minus); qtyCtl.appendChild(inp); qtyCtl.appendChild(plus);
                const price = document.createElement('div'); price.className = 'cart-price'; price.textContent = `₱${(p.price*qty).toFixed(0)}`;
                const rm = document.createElement('button'); rm.className = 'cart-remove'; rm.textContent = 'Remove';
                rm.addEventListener('click', () => { removeFromCart(id); renderCart(); });
                line.appendChild(name); line.appendChild(qtyCtl); line.appendChild(price); line.appendChild(rm);
                body.appendChild(line);
                total += p.price * qty;
            });
        }
        totalEl.textContent = `Total: ₱${total.toFixed(0)}`;
        overlay.style.display = 'flex';
    }

    function createProductCard(product) {
        const card = document.createElement('div');
        card.className = 'product-card scroll-animation';
        card.setAttribute('role', 'listitem');

        const img = document.createElement('img');
        img.className = 'product-image';
        img.src = product.image;
        img.alt = product.name;

        const name = document.createElement('h3');
        name.className = 'product-name';
        name.textContent = product.name;

        const desc = document.createElement('p');
        desc.className = 'product-description';
        desc.textContent = product.description;

        const price = document.createElement('div');
        price.className = 'product-price';
        price.textContent = `₱${product.price.toFixed(0)}`;

        const attrs = createAttributesList(product.attrs || {});

        const action = document.createElement('button');
        action.className = 'add-to-cart-btn';
        const isService = product.category === 'services';
        action.setAttribute('aria-label', `${isService ? 'Avail' : 'Add'} ${product.name}`);
        action.textContent = isService ? 'Avail Service' : 'Add to Cart';

        let qtyApi = null;
        if (product.quantityApplicable) {
            const qty = createQuantityControl(1);
            qtyApi = qty;
            const qtyWrap = document.createElement('div');
            qtyWrap.className = 'product-qty-wrap';
            const qtyLabel = document.createElement('div');
            qtyLabel.className = 'qty-label';
            qtyLabel.textContent = 'Quantity';
            qtyWrap.appendChild(qtyLabel);
            qtyWrap.appendChild(qty.wrap);
            card.appendChild(qtyWrap);
        }

        const rating = createRatingWidget(product.id, product.rating);

        const compareWrap = document.createElement('label');
        compareWrap.className = 'compare-toggle';
        const compareInput = document.createElement('input'); compareInput.type = 'checkbox';
        const compareSpan = document.createElement('span'); compareSpan.textContent = 'Compare';
        compareInput.addEventListener('change', () => {
            if (compareInput.checked) compareState.add(product.id); else compareState.delete(product.id);
            updateCompareBar();
        });
        compareWrap.appendChild(compareInput); compareWrap.appendChild(compareSpan);

        action.addEventListener('click', (e) => {
            e.stopPropagation();
            if (isService) {
                // For services, just acknowledge selection
                alert(`Service selected: ${product.name}`);
            } else {
                const addQty = qtyApi ? Math.max(1, qtyApi.getQuantity()) : 1;
                addToCart(product.id, addQty);
            }
        });

        card.appendChild(img);
        card.appendChild(name);
        card.appendChild(desc);
        card.appendChild(attrs);
        card.appendChild(price);
        card.appendChild(rating);
        card.appendChild(action);
        card.appendChild(compareWrap);
        return card;
    }

    function renderProducts(list) {
        productsGrid.innerHTML = '';
        list.forEach(p => productsGrid.appendChild(createProductCard(p)));
        document.querySelectorAll('#products .scroll-animation').forEach(el => observer.observe(el));
    }

    function getFilteredAndSortedProducts() {
        const q = (searchInput?.value || '').trim().toLowerCase();
        const cat = (categoryFilter?.value || 'all');
        const sort = (sortFilter?.value || 'name');

        let result = products.filter(p => {
            const matchesQuery = !q || p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q);
            const matchesCat = cat === 'all' || p.category === cat;
            return matchesQuery && matchesCat;
        });

        if (sort === 'name') {
            result.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sort === 'price-low') {
            result.sort((a, b) => a.price - b.price);
        } else if (sort === 'price-high') {
            result.sort((a, b) => b.price - a.price);
        } else if (sort === 'rating') {
            result.sort((a, b) => b.rating - a.rating);
        }

        return result;
    }

    function refresh() {
        renderProducts(getFilteredAndSortedProducts());
    }

    searchInput?.addEventListener('input', refresh);
    categoryFilter?.addEventListener('change', refresh);
    sortFilter?.addEventListener('change', refresh);

    ensureCompareUI();
    ensureCartUI();
    loadCart();
    updateCartCount();
    refresh();

    // View Cart button
    viewCartBtn?.addEventListener('click', renderCart);

    // Contact form validation and submit (no backend)
    const contactForm = document.getElementById('contactForm');
    const contactStatus = document.getElementById('contactStatus');
    function setFieldError(input, msg) {
        const field = input.closest('.form-field');
        const err = field?.querySelector('.field-error');
        if (err) err.textContent = msg || '';
        if (msg) input.setAttribute('aria-invalid', 'true'); else input.removeAttribute('aria-invalid');
    }
    function validEmail(v) { return /.+@.+\..+/.test(v); }
    function validPhone(v) { return /^[0-9+()\-\s]{7,}$/.test(v); }
    contactForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!contactForm) return;
        contactStatus.textContent = '';
        const name = contactForm.querySelector('#customerName');
        const phone = contactForm.querySelector('#customerPhone');
        const email = contactForm.querySelector('#customerEmail');
        const message = contactForm.querySelector('#customerMessage');
        let ok = true;
        if (!name.value.trim()) { setFieldError(name, 'Please enter your name'); ok = false; } else setFieldError(name, '');
        if (!validPhone(phone.value.trim())) { setFieldError(phone, 'Please enter a valid contact number'); ok = false; } else setFieldError(phone, '');
        if (!validEmail(email.value.trim())) { setFieldError(email, 'Please enter a valid email'); ok = false; } else setFieldError(email, '');
        if (!message.value.trim()) { setFieldError(message, 'Please enter a message'); ok = false; } else setFieldError(message, '');
        if (!ok) return;
        // Simulate submission
        contactStatus.textContent = 'Sending...';
        setTimeout(() => {
            contactStatus.textContent = 'Thanks! Your message has been sent.';
            contactForm.reset();
        }, 700);
    });
});