import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Link, usePathname } from 'expo-router';
import { tokens } from '../../theme/tokens';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Orders', href: '/orders' },
  { name: 'Menu', href: '/menu' },
  { name: 'CRM', href: '/crm' },
  { name: 'Settings', href: '/settings' },
  { name: 'Design System', href: '/design-system' },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <View style={styles.sidebar}>
      <View style={styles.brandContainer}>
        <Text style={styles.brandTitle}>Odyssey</Text>
        <Text style={styles.brandSubtitle}>Restaurant Ops</Text>
      </View>
      <View style={styles.navLinks}>
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href} asChild>
              <TouchableOpacity style={[styles.navItem, isActive && styles.navItemActive]}>
                <Text style={[styles.navText, isActive && styles.navTextActive]}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            </Link>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sidebar: {
    width: 240,
    backgroundColor: tokens.colors.primary,
    paddingVertical: tokens.spacing.lg,
    paddingHorizontal: tokens.spacing.md,
    justifyContent: 'flex-start',
  },
  brandContainer: {
    marginBottom: tokens.spacing.xl,
    paddingHorizontal: tokens.spacing.sm,
  },
  brandTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: tokens.colors.primaryForeground,
  },
  brandSubtitle: {
    fontSize: 12,
    color: tokens.colors.textSecondary,
    marginTop: 2,
  },
  navLinks: {
    gap: tokens.spacing.xs,
  },
  navItem: {
    paddingVertical: tokens.spacing.sm,
    paddingHorizontal: tokens.spacing.md,
    borderRadius: tokens.radius.md,
  },
  navItemActive: {
    backgroundColor: tokens.colors.accent,
  },
  navText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#94A3B8',
  },
  navTextActive: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});