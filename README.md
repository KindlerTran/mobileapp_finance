# FinBank - Super App Tài Chính Cá Nhân

## Cấu trúc project

```
finapp/
├── App.js                          ← Điểm khởi đầu của app
├── package.json                    ← Danh sách thư viện cần cài
├── src/
│   ├── navigation/
│   │   └── AppNavigator.js         ← Cấu hình điều hướng giữa các màn hình
│   ├── screens/
│   │   ├── DashboardScreen.js      ← Màn hình tổng quan tài chính
│   │   ├── TransactionsScreen.js   ← Lịch sử giao dịch
│   │   ├── AICoachScreen.js        ← Chat với AI tư vấn tài chính
│   │   └── ConnectBankScreen.js    ← Kết nối ngân hàng
│   ├── components/
│   │   ├── AccountCard.js          ← Card hiển thị tài khoản ngân hàng
│   │   ├── TransactionItem.js      ← Một dòng giao dịch
│   │   └── SpendingRing.js         ← Vòng tròn chi tiêu theo danh mục
│   ├── data/
│   │   └── mockData.js             ← Dữ liệu mẫu (sau thay bằng API thật)
│   └── hooks/
│       └── useFinanceData.js       ← Logic xử lý dữ liệu tài chính
```

## Cài đặt (làm theo từng bước)

### Bước 1: Cài Node.js
Tải tại: https://nodejs.org (chọn LTS)

### Bước 2: Cài Expo CLI
```bash
npm install -g expo-cli
```

### Bước 3: Copy project này vào máy, rồi chạy:
```bash
cd finapp
npm install
```

### Bước 4: Chạy app
```bash
npx expo start
```

Sau đó:
- Quét QR code bằng **Expo Go** app trên điện thoại (iOS/Android)
- Hoặc nhấn `w` để chạy trên trình duyệt web

## Thư viện sử dụng

| Thư viện | Dùng để làm gì |
|----------|----------------|
| `@react-navigation/native` | Điều hướng giữa các màn hình |
| `@react-navigation/bottom-tabs` | Thanh tab phía dưới |
| `@react-navigation/stack` | Chuyển màn hình dạng stack |
| `react-native-safe-area-context` | Tránh bị che bởi notch/home bar |
| `react-native-screens` | Tối ưu hiệu suất navigation |
| `react-native-svg` | Vẽ đồ thị SVG |
| `expo-linear-gradient` | Gradient màu đẹp |
| `@expo/vector-icons` | Icon bộ Ionicons |

## Lộ trình phát triển tiếp theo

- [ ] Kết nối API ngân hàng thật (Vietcombank Open API)
- [ ] Đăng nhập bằng Face ID / Touch ID
- [ ] Tích hợp Claude API cho AI Coach
- [ ] Push notification cảnh báo chi tiêu
- [ ] Biểu đồ phân tích chi tiêu theo tháng
