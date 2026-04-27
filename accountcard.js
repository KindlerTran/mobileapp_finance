// ============================================================
// AccountCard.js — Component thẻ ngân hàng
//
// "Component" là khối UI tái sử dụng được.
// Component này nhận "props" (dữ liệu) từ màn hình cha
// và hiển thị thành một thẻ ngân hàng đẹp.
// ============================================================

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

// Lấy chiều rộng màn hình để tính kích thước card
const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.78;

// Props là dữ liệu được truyền vào component từ bên ngoài
export default function AccountCard({ account, onPress, formatCurrency }) {
  return (
    // TouchableOpacity: View có thể nhấn được, có hiệu ứng mờ khi chạm
    <TouchableOpacity onPress={onPress} activeOpacity={0.9} style={styles.wrapper}>
      {/* LinearGradient: tạo nền gradient 2 màu */}
      <LinearGradient
        colors={account.color}
        start={{ x: 0, y: 0 }}    // Gradient bắt đầu từ góc trên trái
        end={{ x: 1, y: 1 }}      // Kết thúc ở góc dưới phải
        style={styles.card}
      >
        {/* Hàng trên: logo + tên ngân hàng + loại tài khoản */}
        <View style={styles.topRow}>
          <View>
            <Text style={styles.bankName}>{account.bankName}</Text>
            <Text style={styles.accountType}>{account.type}</Text>
          </View>
          <Text style={styles.logo}>{account.logo}</Text>
        </View>

        {/* Số tài khoản */}
        <Text style={styles.accountNumber}>{account.accountNumber}</Text>

        {/* Số dư */}
        <View style={styles.balanceRow}>
          <Text style={styles.balanceLabel}>Số dư khả dụng</Text>
          <Text style={styles.balance}>{formatCurrency(account.balance)}</Text>
        </View>

        {/* Chip trang trí giống thẻ vật lý */}
        <View style={styles.chip}>
          <View style={styles.chipInner} />
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}

// StyleSheet.create: định nghĩa style giống CSS nhưng cho React Native
// Chú ý: RN không dùng px, chỉ dùng số (tự scale theo màn hình)
const styles = StyleSheet.create({
  wrapper: {
    marginRight: 16,  // Khoảng cách giữa các card khi scroll ngang
  },
  card: {
    width: CARD_WIDTH,
    height: 190,
    borderRadius: 20,
    padding: 24,
    justifyContent: 'space-between',
  },
  topRow: {
    flexDirection: 'row',           // Xếp ngang
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  bankName: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  accountType: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
    marginTop: 2,
  },
  logo: {
    fontSize: 28,
  },
  accountNumber: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
    letterSpacing: 3,     // Giãn chữ kiểu số thẻ
    fontFamily: 'monospace',
  },
  balanceRow: {
    // không cần thêm gì
  },
  balanceLabel: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 11,
    marginBottom: 4,
  },
  balance: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '700',
  },
  chip: {
    position: 'absolute',  // Đặt tuyệt đối trong card
    right: 24,
    bottom: 28,
    width: 36,
    height: 28,
    borderRadius: 5,
    backgroundColor: 'rgba(255,255,255,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  chipInner: {
    width: 24,
    height: 18,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.4)',
  },
});