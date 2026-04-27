// ============================================================
// TransactionsScreen.js — Lịch sử Giao Dịch
// ============================================================

import React, { useState } from 'react';
import {
  View, Text, StyleSheet, FlatList,
  TouchableOpacity, TextInput
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useFinanceData } from '../hooks/useFinanceData';
import TransactionItem from '../components/TransactionItem';
import { CATEGORIES } from '../data/mockData';

// Danh sách filter danh mục
const FILTERS = ['Tất cả', 'Ăn uống', 'Đi lại', 'Mua sắm', 'Giải trí', 'Hóa đơn', 'Thu nhập'];

export default function TransactionsScreen() {
  const { transactions, formatCurrency, formatDate } = useFinanceData();
  const [activeFilter, setActiveFilter] = useState('Tất cả');
  const [searchText, setSearchText] = useState('');

  // Lọc giao dịch theo danh mục + từ khoá tìm kiếm
  const filtered = transactions.filter((t) => {
    const matchCategory = activeFilter === 'Tất cả' || t.category === activeFilter;
    const matchSearch = t.description.toLowerCase().includes(searchText.toLowerCase())
      || t.merchant.toLowerCase().includes(searchText.toLowerCase());
    return matchCategory && matchSearch;
  });

  // Nhóm giao dịch theo ngày (để hiển thị header ngày)
  const grouped = filtered.reduce((groups, t) => {
    const date = t.date;
    if (!groups[date]) groups[date] = [];
    groups[date].push(t);
    return groups;
  }, {});

  // Chuyển object thành mảng [{date, items}]
  const sections = Object.keys(grouped)
    .sort((a, b) => new Date(b) - new Date(a))
    .map((date) => ({ date, items: grouped[date] }));

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Giao dịch</Text>
      </View>

      {/* Thanh tìm kiếm */}
      <View style={styles.searchBar}>
        <Ionicons name="search" size={18} color="#999" style={{ marginRight: 8 }} />
        <TextInput
          placeholder="Tìm kiếm giao dịch..."
          value={searchText}
          onChangeText={setSearchText}
          style={styles.searchInput}
          placeholderTextColor="#BBB"
        />
        {searchText.length > 0 && (
          <TouchableOpacity onPress={() => setSearchText('')}>
            <Ionicons name="close-circle" size={18} color="#CCC" />
          </TouchableOpacity>
        )}
      </View>

      {/* Filter chips - scroll ngang */}
      <FlatList
        horizontal
        data={FILTERS}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item}
        contentContainerStyle={styles.filterList}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => setActiveFilter(item)}
            style={[
              styles.filterChip,
              activeFilter === item && styles.filterChipActive
            ]}
          >
            {item !== 'Tất cả' && CATEGORIES[item] && (
              <Text style={{ fontSize: 13, marginRight: 4 }}>{CATEGORIES[item].icon}</Text>
            )}
            <Text style={[
              styles.filterText,
              activeFilter === item && styles.filterTextActive
            ]}>
              {item}
            </Text>
          </TouchableOpacity>
        )}
      />

      {/* Danh sách giao dịch nhóm theo ngày */}
      <FlatList
        data={sections}
        keyExtractor={(item) => item.date}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item: section }) => (
          <View>
            {/* Header ngày */}
            <View style={styles.dateHeader}>
              <Text style={styles.dateText}>
                {formatDate(section.date) === formatDate(new Date().toISOString().split('T')[0])
                  ? 'Hôm nay'
                  : formatDate(section.date)}
              </Text>
              {/* Tổng ngày hôm đó */}
              <Text style={styles.dateTotalText}>
                {formatCurrency(
                  section.items.reduce((s, t) => s + t.amount, 0)
                )}
              </Text>
            </View>

            {/* Các giao dịch trong ngày */}
            <View style={styles.dayGroup}>
              {section.items.map((t) => (
                <TransactionItem
                  key={t.id}
                  transaction={t}
                  formatCurrency={formatCurrency}
                  formatDate={formatDate}
                />
              ))}
            </View>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyIcon}>🔍</Text>
            <Text style={styles.emptyText}>Không tìm thấy giao dịch nào</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F8F9FC',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 12,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#1A1A2E',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#1A1A2E',
  },
  filterList: {
    paddingHorizontal: 20,
    paddingBottom: 12,
    gap: 8,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 99,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E8E8F0',
    marginRight: 8,
  },
  filterChipActive: {
    backgroundColor: '#6C63FF',
    borderColor: '#6C63FF',
  },
  filterText: {
    fontSize: 13,
    color: '#666',
    fontWeight: '500',
  },
  filterTextActive: {
    color: '#FFFFFF',
  },
  dateHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 6,
  },
  dateText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#888',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  dateTotalText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#888',
  },
  dayGroup: {
    marginHorizontal: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  empty: {
    alignItems: 'center',
    paddingTop: 60,
  },
  emptyIcon: {
    fontSize: 40,
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 15,
    color: '#AAA',
  },
});