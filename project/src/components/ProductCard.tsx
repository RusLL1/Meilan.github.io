import { Heart, Plus, Check, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { Product } from '../data';

export interface ProductCardProps {
  product: Product;
  isFavorite: boolean;
  onToggleFav: () => void;
  onAddToCart: () => void;
  addedFlash: boolean;
}

export function ProductCard({ product, isFavorite, onToggleFav, onAddToCart, addedFlash }: ProductCardProps) {
  const navigate = useNavigate();
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col cursor-pointer"
    >
      <div className="relative overflow-hidden bg-gray-50 aspect-square">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {product.tag && (
          <span className={`absolute top-3 left-3 text-white text-[10px] font-bold px-2 py-0.5 rounded-full ${product.tagColor}`}>
            {product.tag}
          </span>
        )}
        {discount && (
          <span className="absolute top-3 right-3 bg-[#FACA00] text-gray-900 text-[10px] font-black px-2 py-0.5 rounded-full">
            -{discount}%
          </span>
        )}
        <button
          onClick={(e) => { e.stopPropagation(); onToggleFav(); }}
          className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md hover:scale-110 transition-all duration-200"
        >
          <Heart
            className={`w-4 h-4 transition-colors duration-200 ${
              isFavorite ? 'fill-[#E4005A] text-[#E4005A]' : 'text-gray-400'
            }`}
          />
        </button>
      </div>

      <div className="p-3 flex flex-col flex-1">
        <div className="flex items-center gap-1 mb-1.5">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-2.5 h-2.5 ${
                i < Math.floor(product.rating)
                  ? 'fill-[#FACA00] text-[#FACA00]'
                  : 'text-gray-200'
              }`}
            />
          ))}
          <span className="text-[10px] text-gray-400 ml-0.5">({product.reviewCount.toLocaleString()})</span>
        </div>

        <h3 className="text-sm font-bold text-gray-900 leading-snug line-clamp-1">{product.name}</h3>
        <p className="text-xs text-gray-500 mt-0.5 line-clamp-1 flex-1">{product.subtitle}</p>

        <div className="flex items-end justify-between mt-3">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-[11px] text-gray-500 font-medium">¥</span>
              <span className="text-lg font-black text-gray-900">{product.price.toLocaleString()}</span>
              <span className="text-[10px] text-gray-400">.00</span>
            </div>
            {product.originalPrice && (
              <span className="text-[10px] text-gray-400 line-through">
                ¥{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); onAddToCart(); }}
            className={`w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-all duration-200 active:scale-90 ${
              addedFlash
                ? 'bg-emerald-500 scale-90'
                : 'bg-[#242784] hover:bg-[#1a1e6a] hover:scale-105'
            }`}
          >
            {addedFlash ? (
              <Check className="w-4 h-4 text-white" />
            ) : (
              <Plus className="w-4 h-4 text-white" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
