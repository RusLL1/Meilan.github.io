// ─── Types ────────────────────────────────────────────────────────────────────

export interface Product {
  id: number;
  name: string;
  subtitle: string;
  price: number;
  originalPrice?: number;
  tag?: string;
  tagColor?: string;
  image: string;
  rating: number;
  reviewCount: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

// ─── Products ─────────────────────────────────────────────────────────────────

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: '北欧布艺三人沙发',
    subtitle: '亚麻米白色，可拆洗',
    price: 3299,
    originalPrice: 4199,
    tag: '热销',
    tagColor: 'bg-[#E4005A]',
    image: 'https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&cs=tinysrgb&w=600',
    rating: 4.8,
    reviewCount: 2341,
  },
  {
    id: 2,
    name: '实木餐桌',
    subtitle: '橡木原色，4-6人座',
    price: 2199,
    originalPrice: 2899,
    tag: '新品',
    tagColor: 'bg-[#242784]',
    image: 'https://images.pexels.com/photos/1395967/pexels-photo-1395967.jpeg?auto=compress&cs=tinysrgb&w=600',
    rating: 4.7,
    reviewCount: 892,
  },
  {
    id: 3,
    name: '北欧电视柜',
    subtitle: '白蜡木腿，两抽屉',
    price: 1099,
    image: 'https://images.pexels.com/photos/4352247/pexels-photo-4352247.jpeg?auto=compress&cs=tinysrgb&w=600',
    rating: 4.6,
    reviewCount: 1204,
  },
  {
    id: 4,
    name: '儿童收纳柜',
    subtitle: '安全圆角，多色可选',
    price: 599,
    tag: '促销',
    tagColor: 'bg-amber-500',
    image: 'https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg?auto=compress&cs=tinysrgb&w=600',
    rating: 4.9,
    reviewCount: 3672,
  },
  {
    id: 5,
    name: '简约双人床架',
    subtitle: '胡桃木色，1.8m',
    price: 2899,
    originalPrice: 3599,
    tag: '热销',
    tagColor: 'bg-[#E4005A]',
    image: 'https://images.pexels.com/photos/1034584/pexels-photo-1034584.jpeg?auto=compress&cs=tinysrgb&w=600',
    rating: 4.8,
    reviewCount: 1587,
  },
  {
    id: 6,
    name: '竹制书架',
    subtitle: '五层开放式，环保材料',
    price: 899,
    image: 'https://images.pexels.com/photos/1090638/pexels-photo-1090638.jpeg?auto=compress&cs=tinysrgb&w=600',
    rating: 4.5,
    reviewCount: 734,
  },
  {
    id: 7,
    name: '亚麻单人扶手椅',
    subtitle: '深灰色，实木脚',
    price: 1599,
    originalPrice: 1999,
    tag: '新品',
    tagColor: 'bg-[#242784]',
    image: 'https://images.pexels.com/photos/2082090/pexels-photo-2082090.jpeg?auto=compress&cs=tinysrgb&w=600',
    rating: 4.7,
    reviewCount: 456,
  },
  {
    id: 8,
    name: '壁挂搁板组合',
    subtitle: '白橡木，三件套',
    price: 499,
    image: 'https://images.pexels.com/photos/1005058/pexels-photo-1005058.jpeg?auto=compress&cs=tinysrgb&w=600',
    rating: 4.6,
    reviewCount: 2108,
  },
];

// ─── Categories ───────────────────────────────────────────────────────────────

export const CATEGORIES = [
  {
    id: 1,
    name: '沙发',
    icon: '🛋',
    color: 'bg-blue-50',
    subs: ['三人沙发', '单人沙发', '沙发床', '懒人沙发', '沙发椅'],
    subIcons: ['🛋', '💺', '🛌', '🛋', '🪑'],
  },
  {
    id: 2,
    name: '床具',
    icon: '🛏',
    color: 'bg-pink-50',
    subs: ['双人床', '单人床', '儿童床', '床垫', '床架'],
    subIcons: ['🛏', '🛏', '👶', '🪵', '🪵'],
  },
  {
    id: 3,
    name: '收纳',
    icon: '📦',
    color: 'bg-yellow-50',
    subs: ['衣柜', '置物架', '收纳盒', '抽屉柜', '储物凳'],
    subIcons: ['🗄', '📚', '📦', '🗄', '🪑'],
  },
  {
    id: 4,
    name: '儿童',
    icon: '🧸',
    color: 'bg-green-50',
    subs: ['儿童桌椅', '儿童收纳', '儿童床品', '益智玩具', '儿童装饰'],
    subIcons: ['🪑', '📦', '🛏', '🧸', '🎨'],
  },
  {
    id: 5,
    name: '厨房',
    icon: '🍳',
    color: 'bg-orange-50',
    subs: ['餐具', '厨具', '收纳架', '餐桌椅', '小家电'],
    subIcons: ['🍽', '🍳', '📚', '🪑', '⚡'],
  },
  {
    id: 6,
    name: '灯具',
    icon: '💡',
    color: 'bg-amber-50',
    subs: ['吊灯', '台灯', '落地灯', '壁灯', '氛围灯'],
    subIcons: ['💡', '🕯', '🕯', '💡', '✨'],
  },
  {
    id: 7,
    name: '户外',
    icon: '🌿',
    color: 'bg-emerald-50',
    subs: ['户外桌椅', '遮阳伞', '户外收纳', '花园装饰', '躺椅'],
    subIcons: ['🪑', '☂', '📦', '🌸', '🛌'],
  },
  {
    id: 8,
    name: '装饰',
    icon: '🖼',
    color: 'bg-purple-50',
    subs: ['装饰画', '花瓶摆件', '地毯', '窗帘', '墙面装饰'],
    subIcons: ['🖼', '🏺', '🪣', '🪟', '🎨'],
  },
  {
    id: 9,
    name: '桌椅',
    icon: '🪑',
    color: 'bg-indigo-50',
    subs: ['餐桌', '餐椅', '书桌', '办公椅', '边几'],
    subIcons: ['🪵', '🪑', '💻', '🪑', '🪵'],
  },
  {
    id: 10,
    name: '纺织品',
    icon: '🧣',
    color: 'bg-rose-50',
    subs: ['床上四件套', '抱枕', '毛毯', '窗帘', '桌布'],
    subIcons: ['🛏', '💤', '🧣', '🪟', '🍽'],
  },
];

export type Category = typeof CATEGORIES[number];

// Returns 4 products cycling through PRODUCTS for the given category id
export function getProductsForCategory(catId: number): Product[] {
  const offset = (catId - 1) * 2;
  return Array.from({ length: 4 }, (_, i) => PRODUCTS[(offset + i) % PRODUCTS.length]);
}
