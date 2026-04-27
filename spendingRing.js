// ============================================================
// SpendingRing.js — Vòng tròn chi tiêu dạng donut chart
//
// Dùng SVG để vẽ biểu đồ donut (vòng tròn trống giữa).
// Mỗi danh mục là một cung tròn màu sắc khác nhau.
// ============================================================

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle, G } from 'react-native-svg';
import { CATEGORIES } from '../data/mockData';

const SIZE = 160;       // Kích thước vòng tròn
const STROKE = 18;      // Độ dày của ring
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;  // Chu vi đường tròn

export default function SpendingRing({ data, totalAmount, formatCurrency }) {
  // Tính vị trí bắt đầu của mỗi cung
  let cumulativePercent = 0;

  const segments = data.map((item) => {
    const category = CATEGORIES[item.name] || { color: '#888' };
    const percent = item.percentage / 100;

    // strokeDasharray: độ dài phần tô / phần không tô
    const dashArray = `${percent * CIRCUMFERENCE} ${(1 - percent) * CIRCUMFERENCE}`;

    // strokeDashoffset: dịch vị trí bắt đầu của cung
    // Trừ thêm để bắt đầu từ đỉnh (12 giờ)
    const dashOffset = CIRCUMFERENCE * (1 - cumulativePercent) - CIRCUMFERENCE * 0.25;

    cumulativePercent += percent;

    return {
      ...item,
      color: category.color,
      dashArray,
      dashOffset,
    };
  });

  return (
    <View style={styles.container}>
      {/* SVG Donut Chart */}
      <View style={styles.chartWrapper}>
        <Svg width={SIZE} height={SIZE}>
          {/* Vòng tròn nền (màu xám nhạt) */}
          <Circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            stroke="#F0F0F5"
            strokeWidth={STROKE}
            fill="none"
          />
          {/* Các cung màu cho từng danh mục */}
          {segments.map((seg, i) => (
            <Circle
              key={i}
              cx={SIZE / 2}
              cy={SIZE / 2}
              r={RADIUS}
              stroke={seg.color}
              strokeWidth={STROKE}
              fill="none"
              strokeDasharray={seg.dashArray}
              strokeDashoffset={seg.dashOffset}
              strokeLinecap="round"
            />
          ))}
        </Svg>

        {/* Text ở giữa vòng tròn */}
        <View style={styles.centerText}>
          <Text style={styles.centerLabel}>Chi tiêu</Text>
          <Text style={styles.centerAmount}>{formatCurrency(totalAmount)}</Text>
        </View>
      </View>

      {/* Legend: danh sách màu + tên danh mục */}
      <View style={styles.legend}>
        {data.slice(0, 6).map((item, i) => {
          const cat = CATEGORIES[item.name] || { color: '#888' };
          return (
            <View key={i} style={styles.legendItem}>
              <View style={[styles.dot, { backgroundColor: cat.color }]} />
              <Text style={styles.legendName}>{item.name}</Text>
              <Text style={styles.legendPercent}>{item.percentage}%</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  chartWrapper: {
    position: 'relative',   // Để đặt text ở giữa tuyệt đối
    width: SIZE,
    height: SIZE,
    marginRight: 20,
  },
  centerText: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerLabel: {
    fontSize: 11,
    color: '#888',
    marginBottom: 2,
  },
  centerAmount: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1A1A2E',
  },
  legend: {
    flex: 1,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  legendName: {
    flex: 1,
    fontSize: 12,
    color: '#444',
  },
  legendPercent: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1A1A2E',
  },
});