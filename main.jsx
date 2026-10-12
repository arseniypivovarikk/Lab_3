import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Search, ShoppingBasket, Leaf, MapPin, SlidersHorizontal, Heart, Plus, Minus, Sprout, Truck, ShieldCheck, Menu, X } from 'lucide-react';
import './style.css';

const products = [
  { id: 1, name: 'Свежая морковь', category: 'Овощи', price: 450, unit: 'кг', place: 'Акмолинская область', emoji: '🥕', color: 'peach', tag: 'С фермы', rating: '4.9' },
  { id: 2, name: 'Яблоки «Апорт»', category: 'Фрукты', price: 700, unit: 'кг', place: 'Алматинская область', emoji: '🍎', color: 'pink', tag: 'Популярное', rating: '5.0' },
  { id: 3, name: 'Мёд натуральный', category: 'Молочное и мёд', price: 2800, unit: 'банка', place: 'Карагандинская область', emoji: '🍯', color: 'yellow', tag: 'Эко', rating: '4.8' },
  { id: 4, name: 'Картофель молодой', category: 'Овощи', price: 380, unit: 'кг', place: 'Северо-Казахстанская область', emoji: '🥔', color: 'sand', tag: 'Сезонное', rating: '4.9' },
  { id: 5, name: 'Молоко домашнее', category: 'Молочное и мёд', price: 600, unit: 'л', place: 'Костанайская область', emoji: '🥛', color: 'blue', tag: 'Свежее', rating: '4.7' },
  { id: 6, name: 'Помидоры грунтовые', category: 'Овощи', price: 900, unit: 'кг', place: 'Туркестанская область', emoji: '🍅', color: 'red', tag: 'С фермы', rating: '4.8' },
  { id: 7, name: 'Клубника', category: 'Фрукты', price: 1600, unit: 'корзина', place: 'Алматинская область', emoji: '🍓', color: 'pink', tag: 'Сезонное', rating: '4.9' },
  { id: 8, name: 'Зелень свежая', category: 'Зелень', price: 250, unit: 'пучок', place: 'Астана', emoji: '🥬', color: 'green', tag: 'Срезано сегодня', rating: '4.8' },
];

const categories = ['Все товары', 'Овощи', 'Фрукты', 'Молочное и мёд', 'Зелень'];

function App() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Все товары');
  const [cart, setCart] = useState({});
  const [favorites, setFavorites] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [sort, setSort] = useState('popular');
  const [notice, setNotice] = useState('');

  const visibleProducts = useMemo(() => {
    let list = products.filter(p =>
      (category === 'Все товары' || p.category === category) &&
      (p.name.toLowerCase().includes(search.toLowerCase()) || p.place.toLowerCase().includes(search.toLowerCase()))
    );
    if (sort === 'cheap') list = [...list].sort((a, b) => a.price - b.price);
    if (sort === 'expensive') list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [search, category, sort]);

  const cartCount = Object.values(cart).reduce((sum, qty) => sum + qty, 0);
  const total = products.reduce((sum, p) => sum + p.price * (cart[p.id] || 0), 0);
  const updateCart = (id, delta) => setCart(prev => {
    const next = { ...prev, [id]: Math.max(0, (prev[id] || 0) + delta) };
    if (!next[id]) delete next[id];
    return next;
  });
  const toggleFavorite = id => setFavorites(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  return (
    <div className="app-shell">
      <div className="topline"><div className="container top-inner"><span><MapPin size={14}/> Доставляем по Казахстану</span><span>Свежие продукты напрямую от фермеров</span></div></div>
      <header className="header">
        <div className="container header-inner">
          <a className="brand" href="#" aria-label="AgroMarket — главная"><span className="brand-icon"><Leaf size={25}/></span><span>Agro<span>Market</span><small>Ближе к природе</small></span></a>
          <div className="searchbox"><Search size={19}/><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Найти продукты или регион..." aria-label="Поиск продуктов"/><kbd>⌘ K</kbd></div>
          <div className="header-actions">
            <button className="icon-btn favorite-head" onClick={() => { setCategory('Все товары'); setSearch(''); setNotice('Избранное отмечается сердечком на карточке товара.'); }} aria-label="Избранное"><Heart size={20}/></button>
            <button className="cart-btn" onClick={() => setShowCart(true)}><ShoppingBasket size={20}/><span>Корзина</span><b>{cartCount}</b></button>
            <button className="menu-btn" onClick={() => setMobileMenu(!mobileMenu)} aria-label="Открыть меню">{mobileMenu ? <X/> : <Menu/>}</button>
          </div>
        </div>
        <nav className={`nav ${mobileMenu ? 'nav-open' : ''}`}><div className="container nav-inner">
          <a href="#catalog" onClick={() => setMobileMenu(false)}>Каталог</a><a href="#farmers" onClick={() => setMobileMenu(false)}>Наши фермеры</a><a href="#how" onClick={() => setMobileMenu(false)}>Как это работает</a><a href="#footer" onClick={() => setMobileMenu(false)}>О проекте</a>
          <span className="nav-promo"><Sprout size={15}/> Поддерживаем местных производителей</span>
        </div></nav>
      </header>

      <main>
        <section className="hero"><div className="container hero-grid">
          <div className="hero-copy"><div className="eyebrow"><span className="eyebrow-dot"></span> ФЕРМЕРСКИЙ МАРКЕТПЛЕЙС</div>
            <h1>Еда с заботой.<br/><em>Прямо от фермы.</em></h1>
            <p>Покупайте свежие продукты у местных фермеров. Честные цены, понятное происхождение и вкус настоящей еды.</p>
            <div className="hero-buttons"><a className="primary-btn" href="#catalog">Смотреть каталог <span>↗</span></a><a className="text-btn" href="#farmers">Стать продавцом <span>→</span></a></div>
            <div className="hero-proof"><div className="avatar-stack"><i>👩🏻‍🌾</i><i>👨🏽‍🌾</i><i>👩🏽‍🌾</i></div><div><strong>1 200+ фермеров</strong><small>уже продают с нами</small></div><div className="proof-divider"></div><div><strong>100% натурально</strong><small>знаете, что покупаете</small></div></div>
          </div>
          <div className="hero-art"><div className="sun-disc"></div><div className="hero-label label-top"><span>🌱</span><div><b>С заботой о земле</b><small>Выращено с любовью</small></div></div><div className="produce-bowl"><div className="leaf-art leaf-one">🌿</div><div className="fruit fruit-apple">🍎</div><div className="fruit fruit-carrot">🥕</div><div className="fruit fruit-corn">🌽</div><div className="fruit fruit-greens">🥬</div><div className="fruit fruit-tomato">🍅</div><div className="basket-base"></div></div><div className="hero-label label-bottom"><span>🚚</span><div><b>Свежесть до двери</b><small>Доставка по региону</small></div></div><span className="sparkle sparkle-one">✳</span><span className="sparkle sparkle-two">✦</span></div>
        </div></section>

        <section className="benefits"><div className="container benefit-grid">
          <div className="benefit"><span className="benefit-icon"><Sprout/></span><div><b>От местных фермеров</b><small>Поддерживаем своё</small></div></div>
          <div className="benefit"><span className="benefit-icon"><ShieldCheck/></span><div><b>Проверенное качество</b><small>Знаем каждого продавца</small></div></div>
          <div className="benefit"><span className="benefit-icon"><Truck/></span><div><b>Бережная доставка</b><small>В удобное для вас время</small></div></div>
          <div className="benefit"><span className="benefit-icon"><Heart/></span><div><b>Покупать с пользой</b><small>Для вас и для региона</small></div></div>
        </div></section>

        <section className="catalog-section container" id="catalog">
          <div className="section-heading"><div><div className="eyebrow">НАШ ВЫБОР</div><h2>Свежие продукты</h2><p>Хорошие продукты начинаются с хороших людей.</p></div><div className="sort-control"><SlidersHorizontal size={17}/><select value={sort} onChange={e => setSort(e.target.value)} aria-label="Сортировка"><option value="popular">Сначала популярные</option><option value="cheap">Сначала дешевле</option><option value="expensive">Сначала дороже</option></select></div></div>
          <div className="category-tabs">{categories.map(c => <button key={c} className={category === c ? 'active' : ''} onClick={() => setCategory(c)}>{c}</button>)}</div>
          {notice && <div className="notice">{notice}<button onClick={() => setNotice('')}>×</button></div>}
          <div className="product-grid">{visibleProducts.map(p => <article className="product-card" key={p.id}>
            <div className={`product-image ${p.color}`}><span className="product-tag">{p.tag}</span><button className={`heart-btn ${favorites.includes(p.id) ? 'selected' : ''}`} onClick={() => toggleFavorite(p.id)} aria-label="Добавить в избранное"><Heart size={18} fill={favorites.includes(p.id) ? 'currentColor' : 'none'}/></button><span className="product-emoji">{p.emoji}</span><span className="image-leaf">✳</span></div>
            <div className="product-info"><div className="product-meta"><span><MapPin size={12}/>{p.place}</span><span className="rating">★ {p.rating}</span></div><h3>{p.name}</h3><div className="product-bottom"><div className="price">{p.price.toLocaleString('ru-RU')} ₸ <small>/ {p.unit}</small></div>{cart[p.id] ? <div className="quantity"><button onClick={() => updateCart(p.id, -1)} aria-label="Уменьшить"><Minus size={14}/></button><b>{cart[p.id]}</b><button onClick={() => updateCart(p.id, 1)} aria-label="Увеличить"><Plus size={14}/></button></div> : <button className="add-btn" onClick={() => updateCart(p.id, 1)} aria-label={`Добавить ${p.name} в корзину`}><Plus size={18}/></button>}</div></div>
          </article>)}</div>
          {visibleProducts.length === 0 && <div className="empty-state"><span>🔎</span><h3>Ничего не найдено</h3><p>Попробуйте изменить запрос или выбрать другую категорию.</p><button className="primary-btn" onClick={() => {setSearch('');setCategory('Все товары')}}>Сбросить фильтры</button></div>}
          <div className="catalog-foot"><span>Показано {visibleProducts.length} из {products.length} продуктов</span><button onClick={() => {setCategory('Все товары');setSearch('')}}>Показать все товары <span>→</span></button></div>
        </section>

        <section className="farmer-banner" id="farmers"><div className="container farmer-inner"><div className="farmer-icon">👩🏻‍🌾</div><div><div className="eyebrow">ДЛЯ ПРОИЗВОДИТЕЛЕЙ</div><h2>Выращиваете с любовью?<br/><em>Давайте знакомиться.</em></h2><p>Продавайте урожай напрямую покупателям и развивайте своё дело вместе с AgroMarket.</p></div><button className="light-btn" onClick={() => setNotice('Спасибо за интерес! Для учебного проекта форма продавца демонстрационная.')}>Стать фермером <span>↗</span></button></div></section>
        <section className="how-section container" id="how"><div className="eyebrow">ПРОСТО И ПОНЯТНО</div><h2>От фермы к вашему столу</h2><div className="steps"><div><span>01</span><h3>Выбирайте</h3><p>Находите свежие продукты от проверенных фермеров.</p></div><div><span>02</span><h3>Заказывайте</h3><p>Добавляйте любимые товары в корзину в пару кликов.</p></div><div><span>03</span><h3>Наслаждайтесь</h3><p>Получайте свежие продукты и поддерживайте местных.</p></div></div></section>
      </main>

      <footer id="footer"><div className="container footer-inner"><a className="brand footer-brand" href="#"><span className="brand-icon"><Leaf size={23}/></span><span>Agro<span>Market</span><small>Ближе к природе</small></span></a><p>Хорошая еда. Честные отношения. Сильные регионы.</p><small>© 2026 AgroMarket. Учебный React-проект.</small></div></footer>

      {showCart && <div className="modal-backdrop" onClick={() => setShowCart(false)}><aside className="cart-drawer" onClick={e => e.stopPropagation()}><div className="drawer-head"><div><span className="eyebrow">ВАШ ЗАКАЗ</span><h2>Корзина <small>({cartCount})</small></h2></div><button className="icon-btn" onClick={() => setShowCart(false)} aria-label="Закрыть"><X/></button></div>{cartCount === 0 ? <div className="cart-empty"><span>🧺</span><h3>Корзина пока пуста</h3><p>Добавьте что-нибудь вкусное из каталога.</p><button className="primary-btn" onClick={() => setShowCart(false)}>Перейти к покупкам</button></div> : <><div className="cart-items">{products.filter(p => cart[p.id]).map(p => <div className="cart-item" key={p.id}><span className={`mini-emoji ${p.color}`}>{p.emoji}</span><div className="cart-item-main"><b>{p.name}</b><small>{p.price.toLocaleString('ru-RU')} ₸ / {p.unit}</small><div className="quantity"><button onClick={() => updateCart(p.id, -1)}><Minus size={13}/></button><b>{cart[p.id]}</b><button onClick={() => updateCart(p.id, 1)}><Plus size={13}/></button></div></div><strong>{(p.price * cart[p.id]).toLocaleString('ru-RU')} ₸</strong></div>)}</div><div className="cart-total"><span>Итого</span><strong>{total.toLocaleString('ru-RU')} ₸</strong></div><button className="primary-btn checkout-btn" onClick={() => {setShowCart(false);setNotice('Заказ оформлен в демонстрационном режиме — оплата не производится.')}}>Оформить заказ <span>→</span></button><p className="demo-note">Демо-проект: реальные платежи не выполняются.</p></>}</aside></div>}
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);