import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { CATEGORIES, PRODUCTS, getProductsForCategory } from '../data';
import type { Product } from '../data';
import { ProductCard } from '../components/ProductCard';

interface CategoriesPageProps {
  favorites: Set<number>;
  onToggleFav: (id: number) => void;
  onAddToCart: (product: Product) => void;
  flashMap: Record<number, boolean>;
}

export function CategoriesPage({ favorites, onToggleFav, onAddToCart, flashMap }: CategoriesPageProps) {
  const [activeCatId, setActiveCatId] = useState(CATEGORIES[0].id);
  const activeCat = CATEGORIES.find((c) => c.id === activeCatId)!;
  const categoryProducts = getProductsForCategory(activeCatId);

  return (
    <div className="flex min-h-screen bg-gray-50 pt-16 pb-20 md:pb-0">
      {/* ── Desktop left sidebar ─────────────────────────── */}
      <aside className="hidden md:flex flex-col w-44 flex-shrink-0 bg-white border-r border-gray-100 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
        <div className="px-3 py-4">
          <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase px-3 mb-2">
            全部分类
          </p>
          {CATEGORIES.map((cat) => {
            const isActive = cat.id === activeCatId;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCatId(cat.id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left transition-all duration-150 mb-0.5 ${
                  isActive
                    ? 'bg-[#242784] text-white shadow-sm shadow-[#242784]/20'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span className="text-base leading-none">{cat.icon}</span>
                <span className="text-sm font-medium leading-none">{cat.name}</span>
              </button>
            );
          })}
        </div>
      </aside>

      {/* ── Main content ────────────────────────────────── */}
      <div className="flex-1 min-w-0 flex flex-col">

        {/* ── Mobile horizontal category tabs ─────────── */}
        <div className="md:hidden bg-white border-b border-gray-100 sticky top-16 z-10">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide px-4 py-3">
            {CATEGORIES.map((cat) => {
              const isActive = cat.id === activeCatId;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCatId(cat.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-medium flex-shrink-0 transition-all duration-150 ${
                    isActive
                      ? 'bg-[#242784] text-white shadow-sm'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Scrollable content area ───────────────────── */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-4xl px-4 sm:px-6 py-6 space-y-8">

            {/* Category header */}
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-2xl ${activeCat.color} flex items-center justify-center text-2xl flex-shrink-0`}>
                {activeCat.icon}
              </div>
              <div>
                <h1 className="text-xl font-black text-gray-900">{activeCat.name}</h1>
                <p className="text-sm text-gray-500">{activeCat.subs.length} 个子分类</p>
              </div>
            </div>

            {/* Subcategory circles */}
            <section>
              <h2 className="text-sm font-bold text-gray-700 mb-4">子分类</h2>
              <div className="grid grid-cols-5 gap-3">
                {activeCat.subs.map((sub, idx) => (
                  <button
                    key={sub}
                    className="flex flex-col items-center gap-2 group"
                  >
                    <div
                      className={`w-14 h-14 rounded-full ${activeCat.color} flex items-center justify-center text-xl group-hover:scale-105 group-hover:shadow-md transition-all duration-200`}
                    >
                      {activeCat.subIcons[idx]}
                    </div>
                    <span className="text-[11px] font-medium text-gray-600 group-hover:text-[#242784] transition-colors text-center leading-tight">
                      {sub}
                    </span>
                  </button>
                ))}
              </div>
            </section>

            {/* Product grid */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-bold text-gray-700">
                  {activeCat.name} · 热门商品
                </h2>
                <button className="flex items-center gap-1 text-xs text-[#242784] font-semibold hover:underline">
                  查看全部 <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                {categoryProducts.map((product) => (
                  <ProductCard
                    key={`${activeCatId}-${product.id}`}
                    product={product}
                    isFavorite={favorites.has(product.id)}
                    onToggleFav={() => onToggleFav(product.id)}
                    onAddToCart={() => onAddToCart(product)}
                    addedFlash={!!flashMap[product.id]}
                  />
                ))}
              </div>
            </section>

            {/* All categories quick grid (desktop: additional browse links) */}
            <section className="hidden md:block">
              <h2 className="text-sm font-bold text-gray-700 mb-4">其他分类</h2>
              <div className="grid grid-cols-3 gap-3">
                {CATEGORIES.filter((c) => c.id !== activeCatId).map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCatId(cat.id)}
                    className="flex items-center gap-3 bg-white rounded-2xl px-4 py-3.5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group text-left"
                  >
                    <div className={`w-10 h-10 rounded-full ${cat.color} flex items-center justify-center text-lg flex-shrink-0 group-hover:scale-110 transition-transform duration-200`}>
                      {cat.icon}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{cat.name}</p>
                      <p className="text-[10px] text-gray-400">{cat.subs.length} 子分类</p>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-gray-300 ml-auto flex-shrink-0 group-hover:text-[#242784] transition-colors" />
                  </button>
                ))}
              </div>
            </section>

            {/* All products strip (mobile) */}
            <section className="md:hidden">
              <h2 className="text-sm font-bold text-gray-700 mb-4">全部热销</h2>
              <div className="grid grid-cols-2 gap-3">
                {PRODUCTS.slice(0, 4).map((product) => (
                  <ProductCard
                    key={`all-${product.id}`}
                    product={product}
                    isFavorite={favorites.has(product.id)}
                    onToggleFav={() => onToggleFav(product.id)}
                    onAddToCart={() => onAddToCart(product)}
                    addedFlash={!!flashMap[product.id]}
                  />
                ))}
              </div>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
}
