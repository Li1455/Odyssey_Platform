import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { tokens } from '../theme/tokens';

const mockOrders = [
  { id: 'ord_1092', customer: 'Sarah Jenkins', total: '$37.00', status: 'pending', items: '2x Truffle Burger, 1x Fries' },
  { id: 'ord_1091', customer: 'Alex Rivera', total: '$18.50', status: 'preparing', items: '1x Truffle Burger' },
  { id: 'ord_1090', customer: 'Marcus Chen', total: '$22.50', status: 'ready', items: '1x Smash Burger, 1x Ginger Beer, 1x Fries' },
];

export default function OrdersScreen() {
  const [filter, setFilter] = useState('all');

  const filteredOrders = filter === 'all' 
    ? mockOrders 
    : mockOrders.filter(o => o.status === filter);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Live Orders</Text>
        <View style={styles.filterRow}>
          {['all', 'pending', 'preparing', 'ready'].map((f) => (
            <TouchableOpacity 
              key={f} 
              style={[styles.filterButton, filter === f && styles.filterButtonActive]}
              onPress={() => setFilter(f)}
            >
              <Text style={[styles.filterText, filter === f && styles.filterTextActive]}>
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.tableCard}>
        <View style={styles.tableHeader}>
          <Text style={[styles.th, { flex: 1 }]}>Order ID</Text>
          <Text style={[styles.th, { flex: 2 }]}>Customer</Text>
          <Text style={[styles.th, { flex: 2 }]}>Items</Text>
          <Text style={[styles.th, { flex: 1 }]}>Total</Text>
          <Text style={[styles.th, { flex: 1 }]}>Status</Text>
        </View>

        {filteredOrders.map((order) => (
          <View key={order.id} style={styles.tableRow}>
            <Text style={[styles.td, { flex: 1, fontWeight: 'bold' }]}>{order.id}</Text>
            <Text style={[styles.td, { flex: 2 }]}>{order.customer}</Text>
            <Text style={[styles.td, { flex: 2 }]} numberOfLines={1}>{order.items}</Text>
            <Text style={[styles.td, { flex: 1 }]}>{order.total}</Text>
            <View style={[styles.badge, styles[order.status as keyof typeof styles]]}>
              <Text style={styles.badgeText}>{order.status}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: tokens.spacing.xl,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: tokens.spacing.lg,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: tokens.colors.textPrimary,
  },
  filterRow: {
    flexDirection: 'row',
    gap: tokens.spacing.sm,
  },
  filterButton: {
    paddingVertical: tokens.spacing.xs,
    paddingHorizontal: tokens.spacing.md,
    borderRadius: tokens.radius.md,
    backgroundColor: tokens.colors.surface,
    borderWidth: 1,
    borderColor: tokens.colors.border,
  },
  filterButtonActive: {
    backgroundColor: tokens.colors.accent,
    borderColor: tokens.colors.accent,
  },
  filterText: {
    fontSize: 14,
    color: tokens.colors.textSecondary,
    fontWeight: '500',
  },
  filterTextActive: {
    color: '#FFFFFF',
  },
  tableCard: {
    backgroundColor: tokens.colors.surface,
    borderRadius: tokens.radius.lg,
    borderWidth: 1,
    borderColor: tokens.colors.border,
    overflow: 'hidden',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: tokens.colors.background,
    padding: tokens.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: tokens.colors.border,
  },
  th: {
    fontSize: 13,
    fontWeight: '600',
    color: tokens.colors.textSecondary,
    textTransform: 'uppercase',
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: tokens.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: tokens.colors.border,
  },
  td: {
    fontSize: 15,
    color: tokens.colors.textPrimary,
  },
  badge: {
    flex: 1,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: tokens.radius.full,
    alignItems: 'center',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  pending: { backgroundColor: '#FEF3C7' },
  preparing: { backgroundColor: '#DBEAFE' },
  ready: { backgroundColor: '#DCFCE7' },
});