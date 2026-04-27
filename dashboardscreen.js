// ============================================================
// DashboardScreen.js — Màn hình Tổng Quan
//
// Đây là màn hình đầu tiên user thấy khi mở app.
// Hiển thị: tổng tài sản, danh sách tài khoản, chi tiêu tháng
// ============================================================

import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  FlatList, TouchableOpacity, StatusBar
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import AccountCard from '../components/AccountCard';
import SpendingRing from '../components/SpendingRing';
import TransactionItem from '../components/TransactionItem';
import { useFinanceData } from '../hooks/useFinanceData';

export default function DashboardScreen({ navigation }) {
  // Lấy dữ liệu và hàm tiện ích từ custom hook
  const {
    accounts,
    recentTransactions,
    totalBalance,
    totalSpendingThisMonth,
    totalIncomeThisMonth,
    spendingByCategory,
    formatCurrency,
    formatDate,
  } = useFinanceData();

  // State ẩn/hiện số dư (privacy mode)
  const [hideBalance, setHideBalance] = useState(false);

  return (
    // SafeAreaView: tự tránh notch và home indicator
    <SafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar barStyle="dark-content" />

      {/* ScrollView: cho phép scroll toàn bộ màn hình */}
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* ── HEADER ── */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Xin chào 👋</Text>
            <Text style={styles.name}>Nguyễn Văn An</Text>
          </View>
          <TouchableOpacity style={styles.notifBtn}>
            <Ionicons name="notifications-outline" size={24} color="#1A1A2E" />
            {/* Chấm đỏ thông báo */}
            <View style={styles.badge} />
          </TouchableOpacity>
        </View>

        {/* ── TỔNG TÀI SẢN ── */}
        <LinearGradient
          colors={['#1A1A2E', '#16213E']}
          style={styles.totalCard}
        >
          <Text style={styles.totalLabel}>Tổng tài sản</Text>

          {/* Hiện/ẩn số dư */}
          <TouchableOpacity
            style={styles.totalRow}
            onPress={() => setHideBalance(!hideBalance)}
          >
            <Text style={styles.totalAmount}>
              {hideBalance ? '••••••••' : formatCurrency(totalBalance)}
            </Text>
            <Ionicons
              name={hideBalance ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              color="rgba(255,255,255,0.6)"
            />
          </TouchableOpacity>

          {/* Thu nhập và chi tiêu tháng này */}
          <View style={styles.incExpRow}>
            <View style={styles.incExpItem}>
              <View style={styles.incExpIcon}>
                <Ionicons name="arrow-down" size={14} color="#2ED573" />
              </View>
              <View>
                <Text style={styles.incExpLabel}>Thu nhập</Text>
                <Text style={styles.incExpAmount}>{formatCurrency(totalIncomeThisMonth)}</Text>
              </View>
            </View>
            <View style={styles.divider} />
            <View style={styles.incExpItem}>
              <View style={[styles.incExpIcon, { backgroundColor: 'rgba(255,71,87,0.2)' }]}>
                <Ionicons name="arrow-up" size={14} color="#FF4757" />
              </View>
              <View>
                <Text style={styles.incExpLabel}>Chi tiêu</Text>
                <Text style={styles.incExpAmount}>{formatCurrency(totalSpendingThisMonth)}</Text>
              </View>
            </View>
          </View>
        </LinearGradient>

        {/* ── DANH SÁCH TÀI KHOẢN ── */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Tài khoản</Text>
            <TouchableOpacity onPress={() => navigation.navigate('ConnectBank')}>
              <Text style={styles.seeAll}>+ Thêm ngân hàng</Text>
            </TouchableOpacity>
          </View>

          {/* FlatList ngang: scroll trái-phải để xem các thẻ */}
          <FlatList
            data={accounts}
            horizontal                          // Scroll theo chiều ngang
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.cardList}
            renderItem={({ item }) => (
              <AccountCard
                account={item}
                formatCurrency={formatCurrency}
                onPress={() => {
                  // TODO: navigate to account detail
                }}
              />
            )}
          />
        </View>

        {/* ── BIỂU ĐỒ CHI TIÊU THÁNG ── */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Chi tiêu tháng 4</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>Chi tiết</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.card}>
            <SpendingRing
              data={spendingByCategory}
              totalAmount={totalSpendingThisMonth}
              formatCurrency={formatCurrency}
            />
          </View>
        </View>

        {/* ── AI INSIGHT ── */}
        <TouchableOpacity
          style={styles.aiCard}
          onPress={() => navigation.navigate('AICoach')}
          activeOpacity={0.85}
        >
          <LinearGradient
            colors={['#6C63FF', '#3F3D56']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.aiGradient}
          >
            <Ionicons name="sparkles" size={22} color="#FFD700" />
            <View style={styles.aiText}>
              <Text style={styles.aiTitle}>AI Coach tài chính</Text>
              <Text style={styles.aiSub}>
                "Bạn chi cho ăn uống nhiều hơn 15% so với tháng trước 🍜"
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="rgba(255,255,255,0.7)" />
          </LinearGradient>
        </TouchableOpacity>

        {/* ── GIAO DỊCH GẦN ĐÂY ── */}
        <View style={[styles.section, { marginBottom: 30 }]}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Giao dịch gần đây</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Transactions')}>
              <Text style={styles.seeAll}>Xem tất cả</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.card}>
            {recentTransactions.slice(0, 5).map((t) => (
              <TransactionItem
                key={t.id}
                transaction={t}
                formatCurrency={formatCurrency}
                formatDate={formatDate}
              />
            ))}
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F8F9FC',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 16,
  },
  greeting: {
    fontSize: 14,
    color: '#888',
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A2E',
  },
  notifBtn: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF4757',
  },
  totalCard: {
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 22,
    marginBottom: 24,
  },
  totalLabel: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.6)',
    marginBottom: 6,
  },
  totalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 20,
  },
  totalAmount: {
    fontSize: 30,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },
  incExpRow: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 12,
    padding: 14,
  },
  incExpItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  divider: {
    width: 1,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginHorizontal: 14,
  },
  incExpIcon: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: 'rgba(46,213,115,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  incExpLabel: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.5)',
  },
  incExpAmount: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1A1A2E',
  },
  seeAll: {
    fontSize: 13,
    color: '#6C63FF',
    fontWeight: '500',
  },
  cardList: {
    paddingLeft: 20,
    paddingRight: 4,
  },
  card: {
    marginHorizontal: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    // Shadow cho iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    // Shadow cho Android
    elevation: 3,
  },
  aiCard: {
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 16,
    overflow: 'hidden',
  },
  aiGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
  },
  aiText: {
    flex: 1,
  },
  aiTitle: {
    color: '#FFD700',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 3,
  },
  aiSub: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 12,
    lineHeight: 17,
  },
});