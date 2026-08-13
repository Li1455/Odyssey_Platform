import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { tokens } from '../theme/tokens';

export default function DesignSystemScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.pageTitle}>Design System Library</Text>
      <Text style={styles.pageSubtitle}>Centralized tokens, typography, and reusable primitives.</Text>

      {/* Colors Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Color Tokens</Text>
        <View style={styles.row}>
          {Object.entries(tokens.colors).map(([name, hex]) => (
            <View key={name} style={styles.colorCard}>
              <View style={[styles.colorBox, { backgroundColor: hex }]} />
              <Text style={styles.colorName}>{name}</Text>
              <Text style={styles.colorHex}>{hex}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Typography Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Typography</Text>
        <Text style={{ fontSize: 28, fontWeight: 'bold', color: tokens.colors.textPrimary }}>Heading 1 (28px Bold)</Text>
        <Text style={{ fontSize: 22, fontWeight: 'bold', color: tokens.colors.textPrimary, marginTop: 8 }}>Heading 2 (22px Bold)</Text>
        <Text style={{ fontSize: 16, fontWeight: '600', color: tokens.colors.textPrimary, marginTop: 8 }}>Body Lead (16px SemiBold)</Text>
        <Text style={{ fontSize: 14, color: tokens.colors.textSecondary, marginTop: 8 }}>Body Regular (14px Secondary)</Text>
      </View>

      {/* Semantic States & Badges */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Semantic States & Badges</Text>
        <View style={styles.row}>
          <View style={[styles.badge, { backgroundColor: '#FEF3C7' }]}><Text style={{ color: '#92400E', fontWeight: '600' }}>Warning / Pending</Text></View>
          <View style={[styles.badge, { backgroundColor: '#DBEAFE' }]}><Text style={{ color: '#1E40AF', fontWeight: '600' }}>Info / Preparing</Text></View>
          <View style={[styles.badge, { backgroundColor: '#DCFCE7' }]}><Text style={{ color: '#166534', fontWeight: '600' }}>Success / Ready</Text></View>
          <View style={[styles.badge, { backgroundColor: '#FEE2E2' }]}><Text style={{ color: '#991B1B', fontWeight: '600' }}>Error / Cancelled</Text></View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: tokens.spacing.xl,
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: tokens.colors.textPrimary,
  },
  pageSubtitle: {
    fontSize: 16,
    color: tokens.colors.textSecondary,
    marginBottom: tokens.spacing.xl,
  },
  section: {
    marginBottom: tokens.spacing.xl,
    backgroundColor: tokens.colors.surface,
    padding: tokens.spacing.lg,
    borderRadius: tokens.radius.lg,
    borderWidth: 1,
    borderColor: tokens.colors.border,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: tokens.colors.textPrimary,
    marginBottom: tokens.spacing.md,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: tokens.spacing.md,
  },
  colorCard: {
    width: 100,
  },
  colorBox: {
    height: 50,
    borderRadius: tokens.radius.sm,
    borderWidth: 1,
    borderColor: tokens.colors.border,
    marginBottom: 4,
  },
  colorName: {
    fontSize: 12,
    fontWeight: '600',
    color: tokens.colors.textPrimary,
  },
  colorHex: {
    fontSize: 11,
    color: tokens.colors.textSecondary,
  },
  badge: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: tokens.radius.full,
  },
});