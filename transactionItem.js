// ============================================================
// TransactionItem.js — Một dòng giao dịch
// ============================================================

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { CATEGORIES } from '../data/mockData';

export default function TransactionItem({ transaction, formatCurrency, formatDate }) {
  const category = CATEGORIES[transaction.category] || { icon: '💳', color: '#888' };
  const isExpense = transaction.amount < 0;  // Chi tiêu hay thu nhập?

  return (
    <TouchableOpacity style={styles.row} activeOpacity={0.7}>
      {/* Icon danh mục */}
      <View style={[styles.iconBox, { backgroundColor: category.color + '20' }]}>
        <Text style={styles.icon}>{category.icon}</Text>
      </View>

      {/* Thông tin giao dịch */}
      <View style={styles.info}>
        <Text style={styles.desc} numberOfLines={1}>{transaction.description}</Text>
        <Text style={styles.meta}>{transaction.merchant} · {formatDate(transaction.date)} {transaction.time}</Text>
      </View>

      {/* Số tiền: đỏ nếu chi, xanh nếu thu */}
      <Text style={[styles.amount, { color: isExpense ? '#FF4757' : '#2ED573' }]}>
        {isExpense ? '-' : '+'}{formatCurrency(transaction.amount)}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(0,0,0,0.06)',
  },
  iconBox: {
    width: 42,
    height: 42,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  icon: {
    fontSize: 20,
  },
  info: {
    flex: 1,  // Chiếm phần còn lại, đẩy số tiền sang phải
    marginRight: 8,
  },
  desc: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1A1A2E',
    marginBottom: 3,
  },
  meta: {
    fontSize: 12,
    color: '#888',
  },
  amount: {
    fontSize: 14,
    fontWeight: '700',
    minWidth: 90,         // Đảm bảo căn phải đều nhau
    textAlign: 'right',
  },
});