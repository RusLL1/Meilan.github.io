import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft, ChevronRight, Heart, Share2, Star,
  Plus, Minus, ShoppingBag, Zap, Truck, Check,
  Ruler, Layers, Palette, Settings, ArrowRight,
} from 'lucide-react';
import {
  getProductById, getRecommendedProducts,
} from '../data';
import type { Product } from '../data';
import { ProductCard } from '../components/ProductCard';

// ─── 详情页 Props ─────────────────────────────────────────────────────────────

interface ProductDetailPageProps {
  favorites: Set<number>;
  onToggleFav: (id: number) => void;
  onAddToCart: (product: Product, quantity?: number) => void;
  onBuyNow: (product: Product, quantity: number) => void;
}

// ─── 图片轮播组件 ─────────────────────────────────────────────────────────────

interface ImageCarouselProps {
  images: string[];
  productName: string;
}

function ImageCarousel({ images, productName }: ImageCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  // 切换图片，direction 控制动画方向
  function go(idx: number, dir: number) {
    setDirection(dir);
    setCurrent((idx + images.length) % images.length);
  }

  function next() { go(current + 1, 1); }
  function prev() { go(current - 1, -1); }

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0 }),
  };

  return (
    <div className="relative w-full aspect-square bg-gray-50 rounded-2xl overflow-hidden select-none">
      <AnimatePresence initial={false} custom={direction}>
        <motion.img
          key={current}
          src={images[current]}
          alt={`${productName} - 图片 ${current + 1}`}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>

      {/* 左右切换箭头（桌面端 hover 显示） */}
      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-md hover:bg-white transition-colors"
            aria-label="上一张"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>
          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-md hover:bg-white transition-colors"
            aria-label="下一张"
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>

          {/* 缩略图指示器 */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => go(idx, idx > current ? 1 : -1)}
                className={`h-1.5 rounded-full transition-all duration-200 ${
                  idx === current ? 'w-6 bg-[#242784]' : 'w-1.5 bg-white/70'
                }`}
                aria-label={`跳转到第 ${idx + 1} 张`}
              />
            ))}
          </div>
        </>
      )}

      {/* 图片计数 */}
      <div className="absolute top-3 right-3 bg-black/40 text-white text-xs font-medium px-2.5 py-1 rounded-full backdrop-blur-sm">
        {current + 1} / {images.length}
      </div>
    </div>
  );
}

// ─── 数量选择器组件 ───────────────────────────────────────────────────────────

interface QuantitySelectorProps {
  quantity: number;
  onChange: (q: number) => void;
  max?: number;
}

function QuantitySelector({ quantity, onChange, max = 99 }: QuantitySelectorProps) {
  return (
    <div className="flex items-center gap-1 bg-gray-100 rounded-full p-1">
      <button
        onClick={() => onChange(Math.max(1, quantity - 1))}
        disabled={quantity <= 1}
        className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm hover:bg-gray-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        aria-label="减少数量"
      >
        <Minus className="w-3.5 h-3.5 text-gray-700" />
      </button>
      <span className="w-10 text-center text-sm font-bold text-gray-900 select-none">
        {quantity}
      </span>
      <button
        onClick={() => onChange(Math.min(max, quantity + 1))}
        disabled={quantity >= max}
        className="w-8 h-8 rounded-full bg-[#242784] flex items-center justify-center hover:bg-[#1a1e6a] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        aria-label="增加数量"
      >
        <Plus className="w-3.5 h-3.5 text-white" />
      </button>
    </div>
  );
}

// ─── 商品参数区块 ─────────────────────────────────────────────────────────────

interface SpecBlockProps {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}

function SpecBlock({ icon, title, children }: SpecBlockProps) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 rounded-full bg-[#242784]/10 flex items-center justify-center text-[#242784]">
          {icon}
        </div>
        <h3 className="text-sm font-bold text-gray-900">{title}</h3>
      </div>
      {children}
    </div>
  );
}

// ─── 主页面组件 ───────────────────────────────────────────────────────────────

export function ProductDetailPage({
  favorites, onToggleFav, onAddToCart, onBuyNow,
}: ProductDetailPageProps) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const product = getProductById(Number(id));

  // 进入页面时滚动到顶部
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // ─── 状态 ───────────────────────────────────────────────────────────────────
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(0);
  const [showShareTip, setShowShareTip] = useState(false);
  const [addedFlash, setAddedFlash] = useState(false);

  // 商品不存在时的兜底
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-16 bg-gray-50">
        <p className="text-gray-500 mb-4">商品不存在或已下架</p>
        <button
          onClick={() => navigate('/')}
          className="bg-[#242784] text-white font-semibold px-6 py-2.5 rounded-full hover:bg-[#1a1e6a] transition-colors"
        >
          返回首页
        </button>
      </div>
    );
  }

  const isFavorite = favorites.has(product.id);
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;
  const images = product.images ?? [product.image];
  const recommended = getRecommendedProducts(product.id, 4);

  // ─── 事件处理 ─────────────────────────────────────────────────────────────────
  function handleAddToCart() {
    onAddToCart(product!, quantity);
    setAddedFlash(true);
    setTimeout(() => setAddedFlash(false), 1200);
  }

  function handleBuyNow() {
    onBuyNow(product!, quantity);
  }

  function handleShare() {
    // 模拟分享：复制链接到剪贴板并提示
    const url = window.location.href;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).catch(() => {});
    }
    setShowShareTip(true);
    setTimeout(() => setShowShareTip(false), 2000);
  }

  // ─── 渲染 ─────────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-50 pt-16 pb-20 md:pb-12">
      {/* 面包屑导航 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <nav className="flex items-center gap-1.5 text-xs text-gray-500">
          <button onClick={() => navigate('/')} className="hover:text-[#242784] transition-colors">
            首页
          </button>
          <ChevronRight className="w-3 h-3" />
          <span className="text-gray-700">{product.name}</span>
        </nav>
      </div>

      {/* ── 商品主信息区 ─────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
          {/* 左：轮播图 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            <ImageCarousel images={images} productName={product.name} />

            {/* 移动端缩略图列表 */}
            {images.length > 1 && (
              <div className="flex gap-2 mt-3 overflow-x-auto scrollbar-hide">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    className="flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden bg-gray-100 border-2 border-transparent hover:border-[#242784] transition-colors"
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* 右：商品信息 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1, ease: 'easeOut' }}
            className="flex flex-col"
          >
            {/* 标签 */}
            {product.tag && (
              <span className={`inline-flex items-center self-start text-white text-xs font-bold px-2.5 py-1 rounded-full mb-3 ${product.tagColor ?? 'bg-[#242784]'}`}>
                {product.tag}
              </span>
            )}

            {/* 商品名称 */}
            <h1 className="text-2xl md:text-3xl font-black text-gray-900 leading-tight">
              {product.name}
            </h1>

            {/* 商品简介 */}
            {product.description && (
              <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                {product.description}
              </p>
            )}

            {/* 评分 + 评价数量 */}
            <div className="flex items-center gap-3 mt-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating)
                        ? 'fill-[#FACA00] text-[#FACA00]'
                        : 'text-gray-200'
                    }`}
                  />
                ))}
                <span className="text-sm font-bold text-gray-900 ml-1">{product.rating}</span>
              </div>
              <span className="text-xs text-gray-400">|</span>
              <span className="text-sm text-gray-500">
                {product.reviewCount.toLocaleString()} 条评价
              </span>
            </div>

            {/* 价格区 */}
            <div className="mt-5 bg-gradient-to-r from-[#242784]/5 to-[#E4005A]/5 rounded-2xl p-4">
              <div className="flex items-baseline gap-2">
                <span className="text-sm text-[#E4005A] font-bold">¥</span>
                <span className="text-3xl font-black text-[#E4005A]">
                  {product.price.toLocaleString()}
                </span>
                <span className="text-sm text-[#E4005A] font-medium">.00</span>
                {product.originalPrice && (
                  <span className="text-sm text-gray-400 line-through ml-2">
                    ¥{product.originalPrice.toLocaleString()}
                  </span>
                )}
                {discount && (
                  <span className="bg-[#FACA00] text-gray-900 text-xs font-black px-2 py-0.5 rounded-full ml-1">
                    省 {discount}%
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-400 mt-1.5">含税运费，满 ¥999 全国包邮</p>
            </div>

            {/* 颜色选择 */}
            {product.colors && product.colors.length > 0 && (
              <div className="mt-5">
                <div className="flex items-center gap-2 mb-2.5">
                  <Palette className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-semibold text-gray-700">颜色</span>
                  <span className="text-sm text-gray-500">· {product.colors[selectedColor]?.name}</span>
                </div>
                <div className="flex gap-2.5">
                  {product.colors.map((color, idx) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(idx)}
                      className={`flex flex-col items-center gap-1.5 group`}
                      aria-label={`选择${color.name}`}
                    >
                      <span
                        className={`w-10 h-10 rounded-full border-2 transition-all duration-200 ${
                          selectedColor === idx
                            ? 'border-[#242784] scale-110 shadow-md'
                            : 'border-gray-200 group-hover:border-gray-300'
                        }`}
                        style={{ backgroundColor: color.hex }}
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 数量选择 */}
            <div className="mt-5">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-700">数量</span>
                <QuantitySelector quantity={quantity} onChange={setQuantity} />
              </div>
            </div>

            {/* 操作按钮：收藏 + 分享 + 加购 + 立即购买 */}
            <div className="mt-6 flex items-center gap-3">
              {/* 收藏 */}
              <button
                onClick={() => onToggleFav(product.id)}
                className={`flex flex-col items-center justify-center w-14 h-14 rounded-2xl border-2 transition-all duration-200 ${
                  isFavorite
                    ? 'border-[#E4005A] bg-[#E4005A]/5'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
                aria-label="收藏"
              >
                <Heart
                  className={`w-5 h-5 transition-colors ${
                    isFavorite ? 'fill-[#E4005A] text-[#E4005A]' : 'text-gray-500'
                  }`}
                />
                <span className={`text-[10px] mt-0.5 ${isFavorite ? 'text-[#E4005A]' : 'text-gray-400'}`}>
                  {isFavorite ? '已收藏' : '收藏'}
                </span>
              </button>

              {/* 分享 */}
              <div className="relative">
                <button
                  onClick={handleShare}
                  className="flex flex-col items-center justify-center w-14 h-14 rounded-2xl border-2 border-gray-200 hover:border-gray-300 bg-white transition-all duration-200"
                  aria-label="分享"
                >
                  <Share2 className="w-5 h-5 text-gray-500" />
                  <span className="text-[10px] mt-0.5 text-gray-400">分享</span>
                </button>
                <AnimatePresence>
                  {showShareTip && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap"
                    >
                      链接已复制
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* 加入购物车 */}
              <button
                onClick={handleAddToCart}
                className={`flex-1 h-14 rounded-2xl font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
                  addedFlash
                    ? 'bg-emerald-500 text-white'
                    : 'bg-[#242784] text-white hover:bg-[#1a1e6a] hover:shadow-lg hover:shadow-[#242784]/25'
                }`}
              >
                {addedFlash ? (
                  <>
                    <Check className="w-5 h-5" />
                    已加入
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5" />
                    加入购物车
                  </>
                )}
              </button>

              {/* 立即购买 */}
              <button
                onClick={handleBuyNow}
                className="flex-1 h-14 rounded-2xl bg-[#E4005A] text-white font-bold text-sm hover:bg-[#c4004d] hover:shadow-lg hover:shadow-[#E4005A]/25 transition-all duration-200 flex items-center justify-center gap-2"
              >
                <Zap className="w-5 h-5" />
                立即购买
              </button>
            </div>

            {/* 服务保障条 */}
            <div className="mt-5 flex items-center gap-4 flex-wrap text-xs text-gray-500">
              <span className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-[#242784]" /> 全国包邮
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600" /> 30天退换
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600" /> 正品保证
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── 商品参数 / 尺寸 / 材质 ─────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <h2 className="text-lg font-black text-gray-900 mb-4">商品参数</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* 参数列表 */}
          <SpecBlock icon={<Settings className="w-4 h-4" />} title="规格参数">
            <ul className="space-y-2">
              {product.specs?.map((spec) => (
                <li key={spec.label} className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">{spec.label}</span>
                  <span className="text-gray-800 font-medium">{spec.value}</span>
                </li>
              )) ?? <li className="text-sm text-gray-400">暂无参数信息</li>}
            </ul>
          </SpecBlock>

          {/* 尺寸 */}
          <SpecBlock icon={<Ruler className="w-4 h-4" />} title="商品尺寸">
            <p className="text-sm text-gray-700 leading-relaxed">
              {product.dimensions ?? '暂无尺寸信息'}
            </p>
          </SpecBlock>

          {/* 材质 */}
          <SpecBlock icon={<Layers className="w-4 h-4" />} title="商品材质">
            <p className="text-sm text-gray-700 leading-relaxed">
              {product.material ?? '暂无材质信息'}
            </p>
          </SpecBlock>
        </div>
      </div>

      {/* ── 商品详情图文 ─────────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <h2 className="text-lg font-black text-gray-900 mb-4">商品详情</h2>
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          {product.detailImages && product.detailImages.length > 0 ? (
            <div className="space-y-3">
              {product.detailImages.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`${product.name} 详情图 ${idx + 1}`}
                  className="w-full rounded-xl"
                  loading="lazy"
                />
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-400 text-center py-8">暂无详情图文</p>
          )}
        </div>
      </div>

      {/* ── 推荐商品 ─────────────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-black text-gray-900">为你推荐</h2>
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-1 text-sm text-[#242784] font-semibold hover:underline"
          >
            查看更多 <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {recommended.map((rec) => (
            <ProductCard
              key={rec.id}
              product={rec}
              isFavorite={favorites.has(rec.id)}
              onToggleFav={() => onToggleFav(rec.id)}
              onAddToCart={() => onAddToCart(rec)}
              addedFlash={false}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
