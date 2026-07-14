// ─── Types ────────────────────────────────────────────────────────────────────

export interface ProductColor {
  name: string;
  hex: string;
}

export interface ProductSpec {
  label: string;
  value: string;
}

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
  // 详情页扩展字段（均为可选，保证与现有结构兼容）
  images?: string[];          // 商品轮播图
  description?: string;       // 商品简介
  colors?: ProductColor[];     // 商品颜色
  specs?: ProductSpec[];       // 商品参数
  dimensions?: string;         // 商品尺寸
  material?: string;           // 商品材质
  detailImages?: string[];     // 商品详情图文
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
    images: [
      'https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/276583/pexels-photo-276583.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2082090/pexels-photo-2082090.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    description: '采用高密度回弹海绵与天然亚麻面料，坐感柔软而不塌陷。可拆洗设计，日常清洁更省心。北欧简约造型，适配多种家居风格。',
    colors: [
      { name: '米白', hex: '#F5F0E6' },
      { name: '雾灰', hex: '#C9C9C4' },
      { name: '墨绿', hex: '#4A5D4F' },
    ],
    specs: [
      { label: '风格', value: '北欧简约' },
      { label: '填充物', value: '高密度回弹海绵' },
      { label: '可拆洗', value: '是' },
      { label: '承重', value: '≤300kg' },
      { label: '产地', value: '中国佛山' },
    ],
    dimensions: '长 210cm × 宽 90cm × 高 85cm',
    material: '实木框架 + 亚麻面料 + 高密度海绵',
    detailImages: [
      'https://images.pexels.com/photos/276583/pexels-photo-276583.jpeg?auto=compress&cs=tinysrgb&w=900',
      'https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&cs=tinysrgb&w=900',
      'https://images.pexels.com/photos/2082090/pexels-photo-2082090.jpeg?auto=compress&cs=tinysrgb&w=900',
    ],
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
    images: [
      'https://images.pexels.com/photos/1395967/pexels-photo-1395967.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1148955/pexels-photo-1148955.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/279608/pexels-photo-279608.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    description: '精选优质橡木，纹理自然清晰。环保水性漆涂装，安全无异味。稳固桌腿结构，承重强劲，适合 4-6 人家庭用餐。',
    colors: [
      { name: '原木色', hex: '#D9B380' },
      { name: '胡桃色', hex: '#7A5A3A' },
    ],
    specs: [
      { label: '风格', value: '北欧简约' },
      { label: '可容纳', value: '4-6人' },
      { label: '涂装', value: '环保水性漆' },
      { label: '承重', value: '≤150kg' },
      { label: '产地', value: '中国' },
    ],
    dimensions: '长 140cm × 宽 80cm × 高 75cm',
    material: '北美白橡木实木',
    detailImages: [
      'https://images.pexels.com/photos/1148955/pexels-photo-1148955.jpeg?auto=compress&cs=tinysrgb&w=900',
      'https://images.pexels.com/photos/279608/pexels-photo-279608.jpeg?auto=compress&cs=tinysrgb&w=900',
    ],
  },
  {
    id: 3,
    name: '北欧电视柜',
    subtitle: '白蜡木腿，两抽屉',
    price: 1099,
    image: 'https://images.pexels.com/photos/4352247/pexels-photo-4352247.jpeg?auto=compress&cs=tinysrgb&w=600',
    rating: 4.6,
    reviewCount: 1204,
    images: [
      'https://images.pexels.com/photos/4352247/pexels-photo-4352247.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1005058/pexels-photo-1005058.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    description: '白蜡木实木腿搭配哑光饰面，两抽屉大容量收纳，告别客厅杂乱。低矮造型，适配各类电视尺寸。',
    colors: [
      { name: '白色', hex: '#F2F2F0' },
      { name: '橡木色', hex: '#D9B380' },
    ],
    specs: [
      { label: '风格', value: '北欧简约' },
      { label: '抽屉数', value: '2' },
      { label: '可承重', value: '≤80kg' },
      { label: '产地', value: '中国' },
    ],
    dimensions: '长 160cm × 宽 40cm × 高 45cm',
    material: 'E1级环保板材 + 白蜡木实木腿',
    detailImages: [
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=900',
      'https://images.pexels.com/photos/1005058/pexels-photo-1005058.jpeg?auto=compress&cs=tinysrgb&w=900',
    ],
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
    images: [
      'https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1090638/pexels-photo-1090638.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    description: '专为儿童设计，全柜圆角处理，防磕碰。环保材质，无甲醛 worries。多层分区收纳，培养孩子整理好习惯。',
    colors: [
      { name: '粉色', hex: '#F4C2C2' },
      { name: '蓝色', hex: '#A8C8E8' },
      { name: '薄荷绿', hex: '#B8D8C0' },
    ],
    specs: [
      { label: '风格', value: '儿童趣味' },
      { label: '层数', value: '4层' },
      { label: '安全设计', value: '全圆角 + 防倾倒' },
      { label: '产地', value: '中国' },
    ],
    dimensions: '长 80cm × 宽 35cm × 高 100cm',
    material: '环保PP材质 + ABS连接件',
    detailImages: [
      'https://images.pexels.com/photos/1090638/pexels-photo-1090638.jpeg?auto=compress&cs=tinysrgb&w=900',
    ],
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
    images: [
      'https://images.pexels.com/photos/1034584/pexels-photo-1034584.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/90317/pexels-photo-90317.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    description: '1.8米大床架，胡桃木色质感温润。高承重排骨架，无需床板。床头软包设计，靠背阅读更舒适。',
    colors: [
      { name: '胡桃色', hex: '#7A5A3A' },
      { name: '白色', hex: '#F2F2F0' },
      { name: '黑色', hex: '#3A3A3A' },
    ],
    specs: [
      { label: '尺寸规格', value: '1.8m × 2.0m' },
      { label: '排骨架', value: '高承重弓形' },
      { label: '床头软包', value: '是' },
      { label: '产地', value: '中国' },
    ],
    dimensions: '长 200cm × 宽 180cm × 高 100cm',
    material: '胡桃木饰面 + 实木骨架 + 高密度软包',
    detailImages: [
      'https://images.pexels.com/photos/90317/pexels-photo-90317.jpeg?auto=compress&cs=tinysrgb&w=900',
      'https://images.pexels.com/photos/1034584/pexels-photo-1034584.jpeg?auto=compress&cs=tinysrgb&w=900',
    ],
  },
  {
    id: 6,
    name: '竹制书架',
    subtitle: '五层开放式，环保材料',
    price: 899,
    image: 'https://images.pexels.com/photos/1090638/pexels-photo-1090638.jpeg?auto=compress&cs=tinysrgb&w=600',
    rating: 4.5,
    reviewCount: 734,
    images: [
      'https://images.pexels.com/photos/1090638/pexels-photo-1090638.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1005058/pexels-photo-1005058.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    description: '天然竹材制作，坚韧防虫。五层开放式设计，书籍摆件一目了然。防倾倒配件，使用更安心。',
    colors: [
      { name: '竹本色', hex: '#E8D5B0' },
    ],
    specs: [
      { label: '层数', value: '5层' },
      { label: '材质', value: '天然竹' },
      { label: '防倾倒', value: '含配件' },
      { label: '产地', value: '中国' },
    ],
    dimensions: '长 60cm × 宽 28cm × 高 180cm',
    material: '天然竹材 + 碳钢连接件',
    detailImages: [
      'https://images.pexels.com/photos/1005058/pexels-photo-1005058.jpeg?auto=compress&cs=tinysrgb&w=900',
    ],
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
    images: [
      'https://images.pexels.com/photos/2082090/pexels-photo-2082090.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/276583/pexels-photo-276583.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    description: '深灰亚麻面料搭配实木椅脚，沉稳百搭。人体工学弧度，久坐不累。适合阅读角、阳台、卧室角落。',
    colors: [
      { name: '深灰', hex: '#6B6B6B' },
      { name: '米白', hex: '#F5F0E6' },
      { name: '雾霾蓝', hex: '#A8B8C4' },
    ],
    specs: [
      { label: '风格', value: '北欧简约' },
      { label: '椅脚', value: '实木' },
      { label: '承重', value: '≤120kg' },
      { label: '产地', value: '中国' },
    ],
    dimensions: '长 75cm × 宽 80cm × 高 90cm',
    material: '亚麻面料 + 实木椅脚 + 高密度海绵',
    detailImages: [
      'https://images.pexels.com/photos/276583/pexels-photo-276583.jpeg?auto=compress&cs=tinysrgb&w=900',
      'https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&cs=tinysrgb&w=900',
    ],
  },
  {
    id: 8,
    name: '壁挂搁板组合',
    subtitle: '白橡木，三件套',
    price: 499,
    image: 'https://images.pexels.com/photos/1005058/pexels-photo-1005058.jpeg?auto=compress&cs=tinysrgb&w=600',
    rating: 4.6,
    reviewCount: 2108,
    images: [
      'https://images.pexels.com/photos/1005058/pexels-photo-1005058.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/4352247/pexels-photo-4352247.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    description: '白橡木壁挂搁板三件套，自由组合墙面空间。隐形安装配件，美观不伤墙。展示书籍、绿植、相框皆宜。',
    colors: [
      { name: '白橡木', hex: '#E8D5B0' },
      { name: '白色', hex: '#F2F2F0' },
    ],
    specs: [
      { label: '件数', value: '3件套' },
      { label: '安装', value: '壁挂式' },
      { label: '承重/件', value: '≤15kg' },
      { label: '产地', value: '中国' },
    ],
    dimensions: '每件 长 40cm × 宽 15cm × 高 4cm',
    material: '白橡木实木',
    detailImages: [
      'https://images.pexels.com/photos/4352247/pexels-photo-4352247.jpeg?auto=compress&cs=tinysrgb&w=900',
    ],
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

// 根据 id 查询商品，找不到时返回 undefined
export function getProductById(id: number): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

// 获取推荐商品（排除当前商品，最多 count 个）
export function getRecommendedProducts(currentId: number, count = 4): Product[] {
  return PRODUCTS.filter((p) => p.id !== currentId).slice(0, count);
}
