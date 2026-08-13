import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Slot } from 'expo-router';
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import Sidebar from '../components/layout/Sidebar';
import { tokens } from '../theme/tokens';

export default function RootLayout() {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView style={styles.container}>
        <View style={styles.layout}>
          <Sidebar />
          <View style={styles.content}>
            <Slot />
          </View>
        </View>
      </SafeAreaView>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: tokens.colors.background,
  },
  layout: {
    flex: 1,
    flexDirection: 'row',
  },
  content: {
    flex: 1,
    backgroundColor: tokens.colors.background,
  },
});