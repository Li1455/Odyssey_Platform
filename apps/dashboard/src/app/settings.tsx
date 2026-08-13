import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Switch } from 'react-native';
import { tokens } from '../theme/tokens';

export default function SettingsScreen() {
  const [prepTime, setPrepTime] = useState('20');
  const [autoAccept, setAutoAccept] = useState(false);
  const [serviceAvailable, setServiceAvailable] = useState(true);
  const [openingHours, setOpeningHours] = useState('11:00 - 23:00');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Restaurant Operations Settings</Text>
        {saved && (
          <View style={styles.toast}>
            <Text style={styles.toastText}>Settings saved successfully!</Text>
          </View>
        )}
      </View>

      <View style={styles.card}>
        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>Service Available</Text>
            <Text style={styles.settingDesc}>Accept incoming orders from customers</Text>
          </View>
          <Switch 
            value={serviceAvailable} 
            onValueChange={setServiceAvailable}
            trackColor={{ true: tokens.colors.accent, false: tokens.colors.border }}
          />
        </View>

        <View style={styles.divider} />

        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>Auto-Accept Orders</Text>
            <Text style={styles.settingDesc}>Automatically transition incoming orders to preparing</Text>
          </View>
          <Switch 
            value={autoAccept} 
            onValueChange={setAutoAccept}
            trackColor={{ true: tokens.colors.accent, false: tokens.colors.border }}
          />
        </View>

        <View style={styles.divider} />

        <View style={styles.inputGroup}>
          <Text style={styles.settingLabel}>Default Preparation Time (Minutes)</Text>
          <TextInput 
            style={styles.input}
            value={prepTime}
            onChangeText={setPrepTime}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.settingLabel}>Opening Hours</Text>
          <TextInput 
            style={styles.input}
            value={openingHours}
            onChangeText={setOpeningHours}
          />
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: tokens.spacing.xl,
    maxWidth: 800,
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
  toast: {
    backgroundColor: '#DCFCE7',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: tokens.radius.md,
    borderWidth: 1,
    borderColor: '#16A34A',
  },
  toastText: {
    color: '#166534',
    fontWeight: '600',
    fontSize: 13,
  },
  card: {
    backgroundColor: tokens.colors.surface,
    borderRadius: tokens.radius.lg,
    borderWidth: 1,
    borderColor: tokens.colors.border,
    padding: tokens.spacing.xl,
    ...tokens.elevation.card,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: tokens.spacing.sm,
  },
  settingInfo: {
    flex: 1,
    paddingRight: tokens.spacing.md,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: tokens.colors.textPrimary,
    marginBottom: 2,
  },
  settingDesc: {
    fontSize: 14,
    color: tokens.colors.textSecondary,
  },
  divider: {
    height: 1,
    backgroundColor: tokens.colors.border,
    marginVertical: tokens.spacing.md,
  },
  inputGroup: {
    marginBottom: tokens.spacing.lg,
  },
  input: {
    borderWidth: 1,
    borderColor: tokens.colors.border,
    borderRadius: tokens.radius.md,
    padding: tokens.spacing.md,
    fontSize: 15,
    color: tokens.colors.textPrimary,
    marginTop: tokens.spacing.xs,
    backgroundColor: tokens.colors.background,
  },
  saveButton: {
    backgroundColor: tokens.colors.accent,
    paddingVertical: tokens.spacing.md,
    borderRadius: tokens.radius.md,
    alignItems: 'center',
    marginTop: tokens.spacing.sm,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
});