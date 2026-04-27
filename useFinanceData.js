// ============================================================
// useFinanceData.js — Custom Hook
//
// "Hook" trong React là hàm đặc biệt giúp bạn tái sử dụng logic.
// Hook này tổng hợp tất cả các phép tính tài chính ở một chỗ,
// thay vì viết lặp lại ở nhiều màn hình khác nhau.
// ============================================================

import { useState, useMemo } from 'react';
import { ACCOUNTS, TRANSACTIONS, MONTHLY_SPENDING } from '../data/mockData';

export function useFinanceData() {
  // useState: lưu trạng thái, khi thay đổi app tự render lại
  const [selectedAccount, setSelectedAccount] = useState(null);

  // useMemo: chỉ tính lại khi dữ liệu thay đổi (tối ưu hiệu suất)
  const totalBalance = useMemo(() => {
    // Cộng số dư tất cả tài khoản lại
    return ACCOUNTS.reduce((sum, acc) => sum + acc.balance, 0);
  }, []);

  const totalSpendingThisMonth = useMemo(() => {
    // Tính tổng chi tiêu tháng này (các giao dịch có amount âm)
    return Object.values(MONTHLY_SPENDING).reduce((sum, val) => sum + val, 0);
  }, []);

  const totalIncomeThisMonth = useMemo(() => {
    // Tính tổng thu nhập (các giao dịch có amount dương)
    return TRANSACTIONS
      .filter(t => t.amount > 0)
      .reduce((sum, t) => sum + t.amount, 0);
  }, []);

  const recentTransactions = useMemo(() => {
    // Sắp xếp giao dịch mới nhất lên đầu, lấy 10 cái
    return [...TRANSACTIONS]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 10);
  }, []);

  const spendingByCategory = useMemo(() => {
    // Chuyển object MONTHLY_SPENDING thành mảng có % phần trăm
    const total = totalSpendingThisMonth;
    return Object.entries(MONTHLY_SPENDING).map(([name, amount]) => ({
      name,
      amount,
      percentage: Math.round((amount / total) * 100),
    }));
  }, [totalSpendingThisMonth]);

  // Hàm format tiền VND: 24500000 → "24.500.000đ"
  const formatCurrency = (amount) => {
    const abs = Math.abs(amount);
    return abs.toLocaleString('vi-VN') + 'đ';
  };

  // Hàm format ngày: "2025-04-27" → "27/04"
  const formatDate = (dateStr) => {
    const [year, month, day] = dateStr.split('-');
    return `${day}/${month}`;
  };

  return {
    accounts: ACCOUNTS,
    transactions: TRANSACTIONS,
    recentTransactions,
    totalBalance,
    totalSpendingThisMonth,
    totalIncomeThisMonth,
    spendingByCategory,
    selectedAccount,
    setSelectedAccount,
    formatCurrency,
    formatDate,
  };
}