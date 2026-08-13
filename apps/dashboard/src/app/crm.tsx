import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { tokens } from '../theme/tokens';

const mockCustomers = [
  { id: 'cust_1', name: 'Sarah Jenkins', email: 'sarah.j@example.com', phone: '555-0192', orders: 2, spend: '$37.00' },
  { id: 'cust_2', name: 'Alex Rivera', email: 'arivera@example.com', phone: '555-8491', orders: 1, spend: '$18.50' },
  { id: 'cust_3', name: 'Marcus Chen', email: 'mchen@example.com', phone: '555-3829', orders: 4, spend: '$89.00' },
];

export default function CrmScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Customer Relationship Management (CRM)</Text>
      </View>

      <View style={styles.tableCard}>
        <View style={styles.tableHeader}>
          <Text style={[styles.th, { flex: 2 }]}>Customer Name</Text>
          <Text style={[styles.th, { flex: 2 }]}>Email</Text>
          <Text style={[styles.th, { flex: 1 }]}>Phone</Text>
          <Text style={[styles.th, { flex: 1 }]}>Orders</Text>
          <Text style={[styles.th, { flex: 1 }]}>Total Spend</Text>
        </View>

        {mockCustomers.map((cust) => (
          <View key={cust.id} style={styles.tableRow}>
            <Text style={[styles.td, { flex: 2, fontWeight: 'bold' }]}>{cust.name}</Text>
            <Text style={[styles.td, { flex: 2 }]}>{cust.email}</Text>
            <Text style={[styles.td, { flex: 1 }]}>{cust.phone}</Text>
            <Text style={[styles.td, { flex: 1 }]}>{cust.orders}</Text>
            <Text style={[styles.td, { flex: 1, color: tokens.colors.accent, fontWeight: '600' }]}>{cust.spend}</Text>
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
    marginBottom: tokens.spacing.lg,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: tokens.colors.textPrimary,
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
});