import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Switch } from 'react-native';
import { tokens } from '../theme/tokens';

const mockMenu = [
  { id: 'item_1', category: 'Burgers', name: 'Truffle Burger', price: '$18.50', available: true, desc: 'Brioche bun, wagyu patty, truffle aioli' },
  { id: 'item_2', category: 'Burgers', name: 'Classic Smash Burger', price: '$14.00', available: true, desc: 'Double beef patty, American cheese, special sauce' },
  { id: 'item_3', category: 'Sides', name: 'Parmesan Truffle Fries', price: '$8.50', available: true, desc: 'Hand-cut fries, aged parmesan, truffle oil' },
  { id: 'item_4', category: 'Drinks', name: 'Craft Ginger Beer', price: '$4.50', available: false, desc: 'Real ginger, cane sugar, brewed locally' },
];

export default function MenuScreen() {
  const [items, setItems] = useState(mockMenu);

  const toggleAvailability = (id: string) => {
    setItems(items.map(item => item.id === id ? { ...item, available: !item.available } : item));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Menu Management</Text>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>+ Add Menu Item</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.grid}>
        {items.map((item) => (
          <View key={item.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <View>
                <Text style={styles.categoryBadge}>{item.category}</Text>
                <Text style={styles.itemName}>{item.name}</Text>
              </View>
              <Text style={styles.itemPrice}>{item.price}</Text>
            </View>
            <Text style={styles.itemDesc}>{item.desc}</Text>
            <View style={styles.cardFooter}>
              <Text style={styles.footerLabel}>Available</Text>
              <Switch 
                value={item.available} 
                onValueChange={() => toggleAvailability(item.id)}
                trackColor={{ true: tokens.colors.accent, false: tokens.colors.border }}
              />
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
  addButton: {
    backgroundColor: tokens.colors.accent,
    paddingVertical: tokens.spacing.sm,
    paddingHorizontal: tokens.spacing.md,
    borderRadius: tokens.radius.md,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: tokens.spacing.md,
  },
  card: {
    width: '31%',
    backgroundColor: tokens.colors.surface,
    borderRadius: tokens.radius.lg,
    borderWidth: 1,
    borderColor: tokens.colors.border,
    padding: tokens.spacing.lg,
    ...tokens.elevation.card,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: tokens.spacing.sm,
  },
  categoryBadge: {
    fontSize: 11,
    fontWeight: '600',
    color: tokens.colors.textSecondary,
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: tokens.colors.textPrimary,
  },
  itemPrice: {
    fontSize: 18,
    fontWeight: '700',
    color: tokens.colors.accent,
  },
  itemDesc: {
    fontSize: 14,
    color: tokens.colors.textSecondary,
    marginBottom: tokens.spacing.lg,
    height: 40,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: tokens.colors.border,
    paddingTop: tokens.spacing.sm,
  },
  footerLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: tokens.colors.textPrimary,
  },
});