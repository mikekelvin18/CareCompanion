import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function FamilyApp() {
  const [tab, setTab] = useState('meds');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>CareCompanion</Text>
        <Text style={styles.headerSubtitle}>Manage Dorothy</Text>
      </View>

      <View style={styles.tabBar}>
        <TouchableOpacity 
          style={[styles.tab, tab === 'meds' && styles.tabActive]}
          onPress={() => setTab('meds')}
        >
          <Text style={[styles.tabText, tab === 'meds' && styles.tabTextActive]}>Medications</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, tab === 'schedule' && styles.tabActive]}
          onPress={() => setTab('schedule')}
        >
          <Text style={[styles.tabText, tab === 'schedule' && styles.tabTextActive]}>Schedule</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, tab === 'dashboard' && styles.tabActive]}
          onPress={() => setTab('dashboard')}
        >
          <Text style={[styles.tabText, tab === 'dashboard' && styles.tabTextActive]}>Dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, tab === 'contacts' && styles.tabActive]}
          onPress={() => setTab('contacts')}
        >
          <Text style={[styles.tabText, tab === 'contacts' && styles.tabTextActive]}>Contacts</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {tab === 'meds' && <MedsManagement />}
        {tab === 'schedule' && <ScheduleManagement />}
        {tab === 'dashboard' && <Dashboard />}
        {tab === 'contacts' && <CareTeam />}
      </ScrollView>
    </View>
  );
}

function MedsManagement() {
  return (
    <View>
      <Text style={styles.pageTitle}>Manage Medications</Text>
      <Text style={styles.pageSubtitle}>Edit Dorothy's medications</Text>

      <View style={styles.medItemFamily}>
        <View style={styles.medBadge}>💊</View>
        <View style={styles.medDetailsFamily}>
          <Text style={styles.medNameFamily}>Lisinopril 10mg</Text>
          <Text style={styles.medSubtitleFamily}>Daily 8:00 AM</Text>
        </View>
        <TouchableOpacity style={styles.editBtn}>
          <Text style={styles.editBtnText}>Edit</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.medItemFamily}>
        <View style={styles.medBadge}>🔵</View>
        <View style={styles.medDetailsFamily}>
          <Text style={styles.medNameFamily}>Metformin 500mg</Text>
          <Text style={styles.medSubtitleFamily}>Twice daily with meals</Text>
        </View>
        <TouchableOpacity style={styles.editBtn}>
          <Text style={styles.editBtnText}>Edit</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.addBtn}>
        <Text style={styles.addBtnText}>+ Add medication</Text>
      </TouchableOpacity>
    </View>
  );
}

function ScheduleManagement() {
  return (
    <View>
      <Text style={styles.pageTitle}>Manage Schedule</Text>
      <Text style={styles.pageSubtitle}>Add and edit appointments</Text>

      <View style={styles.schedItemFamily}>
        <View style={styles.schedTime}>Today</View>
        <View style={styles.schedDetails}>
          <Text style={styles.schedTitle}>Dr. Reyes — 4:00 PM</Text>
        </View>
        <TouchableOpacity style={styles.editBtn}>
          <Text style={styles.editBtnText}>Edit</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.schedItemFamily}>
        <View style={styles.schedTime}>Tue</View>
        <View style={styles.schedDetails}>
          <Text style={styles.schedTitle}>Lab blood draw — 9:00 AM</Text>
        </View>
        <TouchableOpacity style={styles.editBtn}>
          <Text style={styles.editBtnText}>Edit</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.addBtn}>
        <Text style={styles.addBtnText}>+ Add appointment</Text>
      </TouchableOpacity>
    </View>
  );
}

function Dashboard() {
  return (
    <View>
      <Text style={styles.pageTitle}>Dorothy's Dashboard</Text>
      <Text style={styles.pageSubtitle}>Today's overview</Text>

      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>2/3</Text>
          <Text style={styles.statLabel}>Meds taken</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>152</Text>
          <Text style={styles.statLabel}>Blood sugar</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>😊</Text>
          <Text style={styles.statLabel}>Mood</Text>
        </View>
      </View>

      <View style={styles.activityLog}>
        <Text style={styles.activityTitle}>Activity Log</Text>
        <Text style={styles.activityItem}>8:02 AM - Took Lisinopril ✓</Text>
        <Text style={styles.activityItem}>9:45 AM - Completed chair yoga ✓</Text>
        <Text style={styles.activityItem}>11:00 AM - Logged mood: Good ✓</Text>
      </View>
    </View>
  );
}

function CareTeam() {
  return (
    <View>
      <Text style={styles.pageTitle}>Care Team</Text>
      <Text style={styles.pageSubtitle}>Manage contacts</Text>

      <View style={styles.contactItem}>
        <View style={styles.contactAvatar}>
          <Text style={styles.contactAvatarText}>DR</Text>
        </View>
        <View style={styles.contactDetails}>
          <Text style={styles.contactName}>Dr. Reyes</Text>
          <Text style={styles.contactRole}>Primary physician</Text>
        </View>
        <TouchableOpacity style={styles.contactActionBtn}>
          <Text style={styles.contactActionText}>📞</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.contactItem}>
        <View style={styles.contactAvatar}>
          <Text style={styles.contactAvatarText}>SA</Text>
        </View>
        <View style={styles.contactDetails}>
          <Text style={styles.contactName}>Sarah</Text>
          <Text style={styles.contactRole}>Daughter</Text>
        </View>
        <TouchableOpacity style={styles.contactActionBtn}>
          <Text style={styles.contactActionText}>📞</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.addBtn}>
        <Text style={styles.addBtnText}>+ Add contact</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingTop: 20,
    paddingHorizontal: 16,
    paddingBottom: 10,
    backgroundColor: '#f5f5f5',
    borderBottomWidth: 0.5,
    borderBottomColor: '#ddd',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#999',
    marginTop: 2,
  },
  tabBar: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: '#ddd',
    backgroundColor: '#f5f5f5',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabActive: {
    borderBottomColor: '#185FA5',
    backgroundColor: '#fff',
  },
  tabText: {
    fontSize: 11,
    fontWeight: '500',
    color: '#999',
  },
  tabTextActive: {
    color: '#185FA5',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 4,
  },
  pageSubtitle: {
    fontSize: 13,
    color: '#999',
    marginBottom: 16,
  },
  medItemFamily: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  medBadge: {
    fontSize: 24,
    marginRight: 12,
  },
  medDetailsFamily: {
    flex: 1,
  },
  medNameFamily: {
    fontSize: 14,
    fontWeight: '600',
  },
  medSubtitleFamily: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  editBtn: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: '#fff',
    borderRadius: 6,
    borderWidth: 0.5,
    borderColor: '#ddd',
  },
  editBtnText: {
    fontSize: 12,
    color: '#185FA5',
    fontWeight: '500',
  },
  schedItemFamily: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  schedTime: {
    fontSize: 12,
    color: '#999',
    fontWeight: '500',
    minWidth: 40,
  },
  schedDetails: {
    flex: 1,
    marginLeft: 12,
  },
  schedTitle: {
    fontSize: 14,
    fontWeight: '500',
  },
  addBtn: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#ddd',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  addBtnText: {
    fontSize: 13,
    color: '#999',
    fontWeight: '500',
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#999',
  },
  activityLog: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 12,
  },
  activityTitle: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 8,
  },
  activityItem: {
    fontSize: 12,
    color: '#666',
    marginBottom: 6,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  contactAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E6F1FB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  contactAvatarText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#185FA5',
  },
  contactDetails: {
    flex: 1,
  },
  contactName: {
    fontSize: 14,
    fontWeight: '600',
  },
  contactRole: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  contactActionBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#E6F1FB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactActionText: {
    fontSize: 18,
  },
});