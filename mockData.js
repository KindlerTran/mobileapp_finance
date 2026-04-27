// ============================================================
// mockData.js — Dữ liệu mẫu cho app
// Sau này bạn sẽ thay thế bằng dữ liệu thật từ API ngân hàng
// ============================================================

// Danh sách tài khoản ngân hàng
export const ACCOUNTS = [
  {
    id: '1',
    bankName: 'Vietcombank',
    accountNumber: '****4521',
    balance: 24500000,        // Số dư: 24.5 triệu
    type: 'Tài khoản thanh toán',
    color: ['#00509D', '#003F7F'],  // Màu gradient của card
    logo: '🏦',
  },
  {
    id: '2',
    bankName: 'Techcombank',
    accountNumber: '****8834',
    balance: 8750000,
    type: 'Tài khoản tiết kiệm',
    color: ['#E31837', '#A50F2A'],
    logo: '🏧',
  },
  {
    id: '3',
    bankName: 'MB Bank',
    accountNumber: '****2290',
    balance: 3200000,
    type: 'Tài khoản thanh toán',
    color: ['#6B46C1', '#553C9A'],
    logo: '💳',
  },
];

// Danh mục chi tiêu và màu sắc
export const CATEGORIES = {
  'Ăn uống':     { icon: '🍜', color: '#FF6B6B' },
  'Đi lại':      { icon: '🛵', color: '#4ECDC4' },
  'Mua sắm':     { icon: '🛍️', color: '#45B7D1' },
  'Giải trí':    { icon: '🎬', color: '#96CEB4' },
  'Hóa đơn':     { icon: '💡', color: '#FFEAA7' },
  'Sức khỏe':    { icon: '💊', color: '#DDA0DD' },
  'Thu nhập':    { icon: '💰', color: '#00B894' },
  'Chuyển tiền': { icon: '↗️', color: '#6C757D' },
};

// Lịch sử giao dịch
export const TRANSACTIONS = [
  {
    id: 't1',
    description: 'Grab Food - Bún bò Huế',
    amount: -85000,           // Âm = chi tiêu, Dương = thu
    category: 'Ăn uống',
    date: '2025-04-27',
    time: '12:30',
    accountId: '1',
    merchant: 'Grab',
  },
  {
    id: 't2',
    description: 'Lương tháng 4/2025',
    amount: 18000000,
    category: 'Thu nhập',
    date: '2025-04-25',
    time: '08:00',
    accountId: '1',
    merchant: 'Công ty ABC',
  },
  {
    id: 't3',
    description: 'Shopee - Áo thun nam',
    amount: -249000,
    category: 'Mua sắm',
    date: '2025-04-24',
    time: '21:15',
    accountId: '1',
    merchant: 'Shopee',
  },
  {
    id: 't4',
    description: 'Grab Bike - Đi làm',
    amount: -32000,
    category: 'Đi lại',
    date: '2025-04-24',
    time: '07:45',
    accountId: '1',
    merchant: 'Grab',
  },
  {
    id: 't5',
    description: 'CGV - Avengers',
    amount: -180000,
    category: 'Giải trí',
    date: '2025-04-22',
    time: '19:00',
    accountId: '3',
    merchant: 'CGV',
  },
  {
    id: 't6',
    description: 'Tiền điện tháng 4',
    amount: -420000,
    category: 'Hóa đơn',
    date: '2025-04-21',
    time: '10:00',
    accountId: '1',
    merchant: 'EVN',
  },
  {
    id: 't7',
    description: 'Phúc Long - Cà phê',
    amount: -65000,
    category: 'Ăn uống',
    date: '2025-04-21',
    time: '08:30',
    accountId: '3',
    merchant: 'Phúc Long',
  },
  {
    id: 't8',
    description: 'Chuyển tiền cho mẹ',
    amount: -2000000,
    category: 'Chuyển tiền',
    date: '2025-04-20',
    time: '20:00',
    accountId: '1',
    merchant: 'Chuyển khoản',
  },
  {
    id: 't9',
    description: 'Circle K - Đồ ăn vặt',
    amount: -45000,
    category: 'Ăn uống',
    date: '2025-04-19',
    time: '22:00',
    accountId: '3',
    merchant: 'Circle K',
  },
  {
    id: 't10',
    description: 'Thưởng KPI Q1',
    amount: 3000000,
    category: 'Thu nhập',
    date: '2025-04-18',
    time: '08:00',
    accountId: '1',
    merchant: 'Công ty ABC',
  },
];

// Dữ liệu chi tiêu theo tháng (cho biểu đồ)
export const MONTHLY_SPENDING = {
  'Ăn uống': 2850000,
  'Đi lại':  980000,
  'Mua sắm': 1540000,
  'Giải trí': 620000,
  'Hóa đơn': 890000,
  'Sức khỏe': 300000,
};

// Mẫu tin nhắn AI Coach
export const AI_SUGGESTIONS = [
  'Tháng này bạn chi cho ăn uống bao nhiêu?',
  'Tôi có thể tiết kiệm thêm không?',
  'So sánh lãi suất tiết kiệm hiện tại',
  'Gợi ý thẻ tín dụng phù hợp với tôi',
  'Dự báo tài chính tháng tới',
];