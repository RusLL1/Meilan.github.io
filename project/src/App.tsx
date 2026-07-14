import { useState, useEffect, useRef } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import {
  Search, User, Heart, ShoppingBag, Home, LayoutGrid,
  X, Plus, Minus, ChevronRight, ChevronLeft, ArrowRight,
  Truck, Tag, Gift, MapPin,
  Check, Percent, Zap
} from 'lucide-react';
import { PRODUCTS, CATEGORIES } from './data';
import type { Product, CartItem } from './data';
import { ProductCard } from './components/ProductCard';
import { CategoriesPage } from './pages/CategoriesPage';
import { ProductDetailPage } from './pages/ProductDetailPage';

// ─── Logo Component ───────────────────────────────────────────────────────────

function MeilanLogo({ compact = false }: { compact?: boolean }) {
  const size = compact ? 28 : 36;
  return (
    <div className="flex items-center gap-2">
      <svg
        width={size}
        height={Math.round(size * 0.72)}
        viewBox="0 0 90 65"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5 60V32C5 17 14 8 27 8C40 8 49 17 49 32"
          stroke="#242784"
          strokeWidth="10"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <line x1="5" y1="32" x2="5" y2="60" stroke="#242784" strokeWidth="10" strokeLinecap="round" />
        <path
          d="M49 60V32C49 17 58 8 71 8C84 8 85 17 85 32"
          stroke="#E4005A"
          strokeWidth="10"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <line x1="49" y1="32" x2="49" y2="60" stroke="#E4005A" strokeWidth="10" strokeLinecap="round" />
        <path
          d="M85 32C85 17 84 8 71 8"
          stroke="#FACA00"
          strokeWidth="10"
          strokeLinecap="round"
          fill="none"
        />
        <line x1="85" y1="32" x2="85" y2="60" stroke="#FACA00" strokeWidth="10" strokeLinecap="round" />
      </svg>
      {!compact && (
        <div className="flex flex-col leading-tight">
          <span className="text-[11px] font-semibold tracking-widest text-[#8B6F47]">美兰家居</span>
          <span className="text-[15px] font-black tracking-[0.12em] text-[#8B6F47]">MEILAN</span>
        </div>
      )}
      {compact && (
        <span className="text-base font-black tracking-widest text-[#8B6F47]">MEILAN</span>
      )}
    </div>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────

interface NavbarProps {
  cartCount: number;
  favCount: number;
  onCartOpen: () => void;
  searchQuery: string;
  onSearchChange: (v: string) => void;
  onBack?: () => void;
}

function Navbar({ cartCount, favCount, onCartOpen, searchQuery, onSearchChange, onBack }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md' : 'bg-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 h-16">
          {/* Left: logo or back arrow */}
          {onBack ? (
            <>
              {/* Mobile back arrow */}
              <button
                onClick={onBack}
                className="md:hidden flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors flex-shrink-0"
                aria-label="返回"
              >
                <ChevronLeft className="w-5 h-5 text-gray-700" />
              </button>
              {/* Desktop logo still links back */}
              <a
                href="/"
                onClick={(e) => { e.preventDefault(); onBack(); }}
                className="hidden md:flex flex-shrink-0"
              >
                <MeilanLogo />
              </a>
            </>
          ) : (
            <a href="/" className="flex-shrink-0">
              <MeilanLogo />
            </a>
          )}

          {/* Mobile page title (only when back mode) */}
          {onBack && (
            <span className="md:hidden absolute left-1/2 -translate-x-1/2 text-sm font-bold text-gray-900 pointer-events-none">
              全部分类
            </span>
          )}

          {/* Search Bar */}
          <div className={`flex-1 mx-2 md:mx-6 relative transition-all duration-200 ${searchFocused ? 'scale-[1.01]' : ''}`}>
            <div className={`flex items-center bg-gray-100 rounded-full px-4 py-2.5 gap-2 transition-all duration-200 ${
              searchFocused ? 'bg-white ring-2 ring-[#242784] shadow-sm' : 'hover:bg-gray-200'
            }`}>
              <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <input
                type="text"
                placeholder="搜索家具、装饰品..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                className="flex-1 bg-transparent text-sm text-gray-800 placeholder-gray-400 outline-none min-w-0"
              />
              {searchQuery && (
                <button onClick={() => onSearchChange('')} className="text-gray-400 hover:text-gray-600">
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-1 flex-shrink-0">
            <button className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors relative">
              <Heart className="w-5 h-5 text-gray-700" />
              {favCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#E4005A] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {favCount > 9 ? '9+' : favCount}
                </span>
              )}
            </button>
            <button
              onClick={onCartOpen}
              className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors relative"
            >
              <ShoppingBag className="w-5 h-5 text-gray-700" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#E4005A] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {cartCount > 9 ? '9+' : cartCount}
                </span>
              )}
            </button>
            <button className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors">
              <User className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

// ─── Hero Banner ──────────────────────────────────────────────────────────────

function HeroBanner() {
  return (
    <section className="relative mt-16 overflow-hidden bg-[#1a2060] min-h-[420px] md:min-h-[520px]">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1200')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#1a2060] via-[#1a2060]/80 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20 flex items-center">
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-1.5 bg-[#FACA00] text-[#111827] text-xs font-bold px-3 py-1 rounded-full mb-4">
            <Zap className="w-3 h-3" />
            限时特惠
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-3">
            夏日焕家
            <br />
            <span className="text-[#FACA00]">低至 7.5 折</span>
          </h1>
          <p className="text-white/80 text-base md:text-lg mb-2">
            精选北欧家居，为您的夏天注入清新格调
          </p>
          <p className="text-white/60 text-sm mb-8">
            活动时间：2026.6.15 — 7.15 &nbsp;·&nbsp; 积分兑券，折上再减
          </p>

          <div className="flex items-center gap-3 flex-wrap">
            <button className="group flex items-center gap-2 bg-[#E4005A] hover:bg-[#c4004d] text-white font-bold px-6 py-3.5 rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-[#E4005A]/30 hover:-translate-y-0.5 active:translate-y-0">
              立即抢购
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
            <button className="flex items-center gap-2 border-2 border-white/40 text-white/90 font-semibold px-6 py-3.5 rounded-full hover:border-white hover:text-white transition-all duration-200">
              查看新品
            </button>
          </div>
        </div>

        <div className="hidden lg:flex absolute right-12 bottom-0 items-end">
          <div className="relative">
            <img
              src="https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=420"
              alt="Featured product"
              className="h-72 w-auto object-contain drop-shadow-2xl"
            />
            <div className="absolute -top-4 -left-4 bg-white rounded-2xl shadow-xl p-3 flex items-center gap-2 w-40">
              <div className="w-8 h-8 bg-[#FACA00] rounded-full flex items-center justify-center flex-shrink-0">
                <Tag className="w-4 h-4 text-[#111827]" />
              </div>
              <div>
                <p className="text-[10px] text-gray-500">爆款好物</p>
                <p className="text-xs font-bold text-gray-900">¥ 1,799.00</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white/10 to-transparent" />
    </section>
  );
}

// ─── Promo Strip ──────────────────────────────────────────────────────────────

function PromoStrip() {
  const items = [
    { icon: Truck, text: '满 ¥999 全国包邮', color: 'text-[#242784]' },
    { icon: Gift, text: '会员专享积分返利', color: 'text-[#E4005A]' },
    { icon: Check, text: '30天无忧退换货', color: 'text-emerald-600' },
    { icon: Percent, text: '积分兑券折上折', color: 'text-amber-600' },
  ];
  return (
    <div className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-gray-100">
          {items.map(({ icon: Icon, text, color }) => (
            <div key={text} className="flex items-center gap-2.5 py-3.5 px-4 justify-center">
              <Icon className={`w-4 h-4 flex-shrink-0 ${color}`} />
              <span className="text-xs text-gray-600 font-medium whitespace-nowrap">{text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Category Quick Links ─────────────────────────────────────────────────────

interface CategoryQuickLinksProps {
  onNavigateAll: () => void;
}

function CategoryQuickLinks({ onNavigateAll }: CategoryQuickLinksProps) {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [mobileOpenId, setMobileOpenId] = useState<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  function onMouseEnter(id: number) {
    clearTimeout(timerRef.current);
    setHoveredId(id);
  }
  function onMouseLeave() {
    timerRef.current = setTimeout(() => setHoveredId(null), 130);
  }
  function onPanelMouseEnter() {
    clearTimeout(timerRef.current);
  }

  const desktopCat = CATEGORIES.find((c) => c.id === hoveredId) ?? null;
  const mobileCat = CATEGORIES.find((c) => c.id === mobileOpenId) ?? null;

  return (
    <section className="bg-white py-6 relative z-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 mb-4">
          <h2 className="text-base font-bold text-gray-900">热门分类</h2>
          <button
            onClick={onNavigateAll}
            className="flex items-center gap-1 text-xs text-[#242784] font-semibold hover:underline"
          >
            全部 <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex gap-3 overflow-x-auto scrollbar-hide px-4 sm:px-6 lg:px-8 pb-1">
          {CATEGORIES.map((cat) => {
            const isActive = hoveredId === cat.id || mobileOpenId === cat.id;
            return (
              <button
                key={cat.id}
                onMouseEnter={() => onMouseEnter(cat.id)}
                onMouseLeave={onMouseLeave}
                onClick={() => setMobileOpenId((prev) => (prev === cat.id ? null : cat.id))}
                className="flex flex-col items-center gap-2 flex-shrink-0 group outline-none"
              >
                <div
                  className={`w-14 h-14 rounded-full flex items-center justify-center text-xl transition-all duration-200 ${
                    isActive
                      ? 'bg-[#242784] shadow-lg shadow-[#242784]/25 scale-105'
                      : `${cat.color} group-hover:scale-105 group-hover:shadow-md`
                  }`}
                >
                  {cat.icon}
                </div>
                <span
                  className={`text-[11px] font-medium whitespace-nowrap transition-colors ${
                    isActive ? 'text-[#242784]' : 'text-gray-600'
                  }`}
                >
                  {cat.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* Desktop dropdown */}
        <div
          className={`hidden md:block overflow-hidden transition-all duration-200 ease-out ${
            desktopCat ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
          }`}
          onMouseEnter={onPanelMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          {desktopCat && (
            <div className="mt-3 mx-4 sm:mx-6 lg:mx-8 bg-white border border-gray-100 rounded-2xl shadow-md">
              <div className="flex items-center gap-1 px-4 py-2 border-b border-gray-50">
                <span className="text-base mr-1">{desktopCat.icon}</span>
                <span className="text-xs font-semibold text-gray-500">{desktopCat.name}</span>
                <ChevronRight className="w-3 h-3 text-gray-300" />
                <span className="text-xs text-gray-400">二级分类</span>
              </div>
              <div className="flex flex-wrap gap-0.5 px-3 py-2">
                {desktopCat.subs.map((sub) => (
                  <button
                    key={sub}
                    className="text-sm text-gray-700 px-3 py-1.5 rounded-lg hover:bg-gray-100 hover:text-[#242784] transition-colors duration-150 text-left"
                  >
                    {sub}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Mobile accordion */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-250 ease-out ${
            mobileCat ? 'max-h-72 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
          }`}
        >
          {mobileCat && (
            <div className="mt-3 mx-4 bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
              <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-gray-50 bg-gray-50/60">
                <span className="text-base">{mobileCat.icon}</span>
                <span className="text-xs font-semibold text-[#242784]">{mobileCat.name}</span>
                <span className="text-xs text-gray-400 ml-0.5">· 二级分类</span>
              </div>
              <div className="divide-y divide-gray-50">
                {mobileCat.subs.map((sub) => (
                  <button
                    key={sub}
                    className="w-full text-left text-sm text-gray-700 px-4 py-3 hover:bg-gray-50 hover:text-[#242784] transition-colors duration-150 flex items-center justify-between"
                  >
                    {sub}
                    <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// ─── Product Grid ─────────────────────────────────────────────────────────────

interface ProductGridProps {
  favorites: Set<number>;
  onToggleFav: (id: number) => void;
  onAddToCart: (product: Product) => void;
  flashMap: Record<number, boolean>;
  searchQuery: string;
}

function ProductGrid({ favorites, onToggleFav, onAddToCart, flashMap, searchQuery }: ProductGridProps) {
  const filtered = searchQuery
    ? PRODUCTS.filter(
        (p) => p.name.includes(searchQuery) || p.subtitle.includes(searchQuery)
      )
    : PRODUCTS;

  return (
    <section className="bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-black text-gray-900">
              {searchQuery ? `"${searchQuery}" 的搜索结果` : '当下热销'}
            </h2>
            {!searchQuery && (
              <p className="text-sm text-gray-500 mt-0.5">精选爆款，品质保证</p>
            )}
          </div>
          {!searchQuery && (
            <button className="flex items-center gap-1 text-sm text-[#242784] font-semibold hover:underline">
              查看全部 <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <Search className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">未找到相关商品</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {filtered.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isFavorite={favorites.has(product.id)}
                onToggleFav={() => onToggleFav(product.id)}
                onAddToCart={() => onAddToCart(product)}
                addedFlash={!!flashMap[product.id]}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

// ─── Room Inspiration Banner ───────────────────────────────────────────────────

function InspirationSection() {
  const rooms = [
    {
      title: '客厅灵感',
      subtitle: '北欧简约风',
      image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600',
      color: 'from-[#242784]/70',
    },
    {
      title: '卧室灵感',
      subtitle: '温暖舒适感',
      image: 'https://images.pexels.com/photos/1034584/pexels-photo-1034584.jpeg?auto=compress&cs=tinysrgb&w=600',
      color: 'from-[#8B6F47]/70',
    },
    {
      title: '儿童房',
      subtitle: '安全快乐成长',
      image: 'https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg?auto=compress&cs=tinysrgb&w=600',
      color: 'from-[#E4005A]/60',
    },
  ];

  return (
    <section className="bg-white py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-black text-gray-900">空间灵感</h2>
            <p className="text-sm text-gray-500 mt-0.5">为您的每个角落找到完美搭配</p>
          </div>
          <button className="flex items-center gap-1 text-sm text-[#242784] font-semibold hover:underline">
            更多灵感 <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {rooms.map((room) => (
            <button
              key={room.title}
              className="group relative overflow-hidden rounded-2xl aspect-[4/3] text-left"
            >
              <img
                src={room.image}
                alt={room.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className={`absolute inset-0 bg-gradient-to-t ${room.color} to-transparent`} />
              <div className="absolute bottom-0 left-0 p-4">
                <h3 className="text-white text-lg font-black">{room.title}</h3>
                <p className="text-white/80 text-sm">{room.subtitle}</p>
              </div>
              <div className="absolute top-3 right-3 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <ArrowRight className="w-4 h-4 text-white" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Member Banner ────────────────────────────────────────────────────────────

function MemberBanner() {
  return (
    <section className="py-8 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#242784] to-[#1a5ca8] rounded-2xl overflow-hidden relative">
          <div
            className="absolute inset-0 opacity-10"
            style={{ backgroundImage: 'radial-gradient(circle at 80% 50%, #FACA00 0%, transparent 60%)' }}
          />
          <div className="relative px-6 md:px-10 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <div className="text-[#FACA00] text-xs font-bold tracking-widest uppercase mb-2">
                美兰家居会员俱乐部
              </div>
              <h3 className="text-white text-2xl font-black mb-2">
                成为美兰会员，解锁专属权益
              </h3>
              <p className="text-white/70 text-sm">
                会员享受积分返利 · 生日礼遇 · 新品优先购 · 专属折扣
              </p>
            </div>
            <button className="flex-shrink-0 bg-[#FACA00] text-gray-900 font-black px-7 py-3.5 rounded-full hover:bg-yellow-300 transition-colors duration-200 whitespace-nowrap hover:shadow-lg">
              免费加入会员
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 pb-24 md:pb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          <div className="col-span-2 md:col-span-1">
            <div className="mb-4">
              <MeilanLogo compact />
            </div>
            <p className="text-sm leading-relaxed text-gray-500">
              美兰家居，致力于为每个家庭提供高品质、高颜值的北欧风格家居产品。
            </p>
            <div className="flex items-center gap-1.5 mt-4 text-xs text-gray-500">
              <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
              <span>全国门店 · 100+ 城市</span>
            </div>
          </div>
          {[
            { title: '购物指南', links: ['如何下单', '配送说明', '退换货政策', '安装服务', '价格保护'] },
            { title: '关于美兰', links: ['品牌故事', '设计理念', '可持续发展', '加盟合作', '招聘信息'] },
            { title: '客户服务', links: ['联系客服', '常见问题', '订单追踪', '门店查询', '意见反馈'] },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="text-white text-sm font-semibold mb-4">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-gray-500 hover:text-white transition-colors duration-150">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-600">© 2026 美兰家居 MEILAN. All rights reserved.</p>
          <div className="flex items-center gap-4 text-xs text-gray-600">
            <a href="#" className="hover:text-gray-400 transition-colors">隐私政策</a>
            <a href="#" className="hover:text-gray-400 transition-colors">使用条款</a>
            <a href="#" className="hover:text-gray-400 transition-colors">Cookie 设置</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Cart Drawer ──────────────────────────────────────────────────────────────

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQty: (id: number, delta: number) => void;
  onRemove: (id: number) => void;
}

function CartDrawer({ open, onClose, items, onUpdateQty, onRemove }: CartDrawerProps) {
  const total = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      <div
        className={`fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      <div
        className={`fixed right-0 top-0 bottom-0 z-[70] w-full max-w-sm bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-out ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-gray-700" />
            <h2 className="font-bold text-gray-900">购物袋</h2>
            {items.length > 0 && (
              <span className="bg-[#E4005A] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                {items.reduce((s, i) => s + i.quantity, 0)}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <X className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4 px-5">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-4">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
                <ShoppingBag className="w-9 h-9 text-gray-300" />
              </div>
              <div>
                <p className="font-semibold text-gray-800">购物袋空空如也</p>
                <p className="text-sm text-gray-400 mt-1">需要一点家居灵感吗？</p>
              </div>
              <button
                onClick={onClose}
                className="bg-gray-900 text-white font-semibold px-6 py-2.5 rounded-full hover:bg-gray-700 transition-colors text-sm"
              >
                探索家居灵感
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="flex gap-3 group">
                  <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-gray-900 line-clamp-1">{product.name}</h4>
                    <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">{product.subtitle}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm font-black text-gray-900">
                        ¥{(product.price * quantity).toLocaleString()}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => onUpdateQty(product.id, -1)}
                          className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                        >
                          <Minus className="w-3 h-3 text-gray-700" />
                        </button>
                        <span className="text-sm font-semibold w-5 text-center">{quantity}</span>
                        <button
                          onClick={() => onUpdateQty(product.id, 1)}
                          className="w-6 h-6 rounded-full bg-[#242784] flex items-center justify-center hover:bg-[#1a1e6a] transition-colors"
                        >
                          <Plus className="w-3 h-3 text-white" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => onRemove(product.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 self-start mt-0.5"
                  >
                    <X className="w-3.5 h-3.5 text-gray-400 hover:text-gray-600" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-gray-100 px-5 py-4 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">小计</span>
              <span className="font-bold text-gray-900">¥{total.toLocaleString()}.00</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">运费</span>
              <span className="text-emerald-600 font-medium">
                {total >= 999 ? '免费配送' : `¥${(99).toFixed(2)}`}
              </span>
            </div>
            {total < 999 && (
              <div className="bg-amber-50 text-amber-700 text-xs px-3 py-2 rounded-lg">
                再购 ¥{(999 - total).toLocaleString()} 即可免运费
              </div>
            )}
            <button className="w-full bg-[#E4005A] hover:bg-[#c4004d] text-white font-black py-3.5 rounded-full transition-colors text-sm hover:shadow-lg hover:shadow-[#E4005A]/25">
              结算 · ¥{total.toLocaleString()}.00
            </button>
          </div>
        )}
      </div>
    </>
  );
}

// ─── Mobile Bottom Nav ────────────────────────────────────────────────────────

interface MobileNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  cartCount: number;
  onCartOpen: () => void;
}

function MobileBottomNav({ activeTab, onTabChange, cartCount, onCartOpen }: MobileNavProps) {
  const tabs = [
    { id: 'home', label: '首页', icon: Home },
    { id: 'categories', label: '分类', icon: LayoutGrid },
    { id: 'bag', label: '购物袋', icon: ShoppingBag, badge: cartCount },
    { id: 'profile', label: '我的', icon: User },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-100 safe-bottom shadow-2xl shadow-black/10">
      <div className="flex">
        {tabs.map(({ id, label, icon: Icon, badge }) => {
          const isActive = activeTab === id;
          return (
            <button
              key={id}
              onClick={() => { onTabChange(id); if (id === 'bag') onCartOpen(); }}
              className="flex-1 flex flex-col items-center gap-1 py-3 transition-colors relative"
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-colors ${isActive ? 'text-[#242784]' : 'text-gray-400'}`}
                  strokeWidth={isActive ? 2.5 : 1.8}
                />
                {badge != null && badge > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#E4005A] text-white text-[8px] font-black rounded-full flex items-center justify-center">
                    {badge > 9 ? '9+' : badge}
                  </span>
                )}
              </div>
              <span className={`text-[10px] font-medium transition-colors ${isActive ? 'text-[#242784]' : 'text-gray-400'}`}>
                {label}
              </span>
              {isActive && (
                <div className="absolute bottom-0 w-8 h-0.5 bg-[#242784] rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const [cartOpen, setCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [flashMap, setFlashMap] = useState<Record<number, boolean>>({});

  // 判断当前路由，决定底部导航高亮与是否显示返回箭头
  const isCategories = location.pathname === '/categories';
  const isProductDetail = location.pathname.startsWith('/product/');
  const activeTab = isCategories ? 'categories' : 'home';

  const cartCount = cartItems.reduce((s, i) => s + i.quantity, 0);

  // 加入购物车：已存在则数量+1，否则新增一条
  function handleAddToCart(product: Product, quantity = 1) {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...prev, { product, quantity }];
    });
    setFlashMap((m) => ({ ...m, [product.id]: true }));
    setTimeout(() => setFlashMap((m) => ({ ...m, [product.id]: false })), 800);
  }

  function handleUpdateQty(id: number, delta: number) {
    setCartItems((prev) =>
      prev
        .map((i) => (i.product.id === id ? { ...i, quantity: i.quantity + delta } : i))
        .filter((i) => i.quantity > 0)
    );
  }

  function handleToggleFav(id: number) {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function handleTabChange(tab: string) {
    if (tab === 'categories') {
      navigate('/categories');
    } else if (tab === 'home') {
      navigate('/');
    } else if (tab === 'bag') {
      setCartOpen(true);
    }
  }

  const sharedCartFavProps = {
    favorites,
    onToggleFav: handleToggleFav,
    onAddToCart: handleAddToCart,
    flashMap,
  };

  // 详情页与分类页均显示返回箭头
  const showBack = isCategories || isProductDetail;

  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar
        cartCount={cartCount}
        favCount={favorites.size}
        onCartOpen={() => setCartOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onBack={showBack ? () => navigate(-1) : undefined}
      />

      <Routes>
        <Route
          path="/categories"
          element={<CategoriesPage {...sharedCartFavProps} />}
        />
        <Route
          path="/product/:id"
          element={
            <ProductDetailPage
              favorites={favorites}
              onToggleFav={handleToggleFav}
              onAddToCart={handleAddToCart}
              onBuyNow={(product, quantity) => {
                handleAddToCart(product, quantity);
                setCartOpen(true);
              }}
            />
          }
        />
        <Route
          path="/"
          element={
            <main>
              {!searchQuery && (
                <>
                  <HeroBanner />
                  <PromoStrip />
                  <CategoryQuickLinks onNavigateAll={() => navigate('/categories')} />
                </>
              )}

              <ProductGrid
                favorites={favorites}
                onToggleFav={handleToggleFav}
                onAddToCart={handleAddToCart}
                flashMap={flashMap}
                searchQuery={searchQuery}
              />

              {!searchQuery && (
                <>
                  <InspirationSection />
                  <MemberBanner />
                </>
              )}

              <Footer />
            </main>
          }
        />
      </Routes>

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onUpdateQty={handleUpdateQty}
        onRemove={(id) => setCartItems((prev) => prev.filter((i) => i.product.id !== id))}
      />

      <MobileBottomNav
        activeTab={activeTab}
        onTabChange={handleTabChange}
        cartCount={cartCount}
        onCartOpen={() => setCartOpen(true)}
      />
    </div>
  );
}
