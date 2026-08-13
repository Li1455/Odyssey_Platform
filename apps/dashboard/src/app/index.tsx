import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

interface Order {
  id: string;
  customerId: string;
  status: string;
  totalAmount: string;
  createdAt: string;
}

export default function DashboardScreen() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8787/api/orders');
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 3000); // Poll every 3s
    return () => clearInterval(interval);
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Restaurant Operations Overview</Text>
      <Text style={styles.subtitle}>Live Backend Connected</Text>

      <View style={styles.section}>
        <Text style={styles.header}>Recent Orders ({orders.length})</Text>
        {loading ? (
          <Text>Loading live orders...</Text>
        ) : (
          orders.map((order) => (
            <View key={order.id} style={styles.orderCard}>
              <View>
                <Text style={styles.customer}>{order.customerId}</Text>
                <Text style={styles.meta}>{order.id} • {new Date(order.createdAt).toLocaleTimeString()}</Text>
              </View>
              <View style={styles.right}>
                <Text style={styles.price}>${order.totalAmount}</Text>
                <Text style={[styles.status, styles[order.status as keyof typeof styles]]}>
                  {order.status}
                </Text>
              </View>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#f9fafb' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#111827' },
  subtitle: { fontSize: 14, color: '#059669', marginBottom: 24 },
  section: { backgroundColor: '#fff', borderRadius: 12, padding: 16, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 4 },
  header: { fontSize: 18, fontWeight: '600', marginBottom: 16 },
  orderCard: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#f3f4f6' },
  customer: { fontWeight: '600', color: '#1f2937' },
  meta: { fontSize: 12, color: '#6b7280', marginTop: 2 },
  right: { alignItems: 'flex-end' },
  price: { fontWeight: '600', color: '#111827' },
  status: { fontSize: 12, paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4, overflow: 'hidden', marginTop: 4, textTransform: 'capitalize' },
  pending: { backgroundColor: '#fef3c7', color: '#d97706' },
  preparing: { backgroundColor: '#e0e7ff', color: '#4f46e5' },
  ready: { backgroundColor: '#d1fae5', color: '#059669' },
  completed: { backgroundColor: '#f3f4f6', color: '#374151' },
  cancelled: { backgroundColor: '#fee2e2', color: '#dc2626' },
});