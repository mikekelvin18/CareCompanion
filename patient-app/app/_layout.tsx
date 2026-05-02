import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { createClient } from '@supabase/supabase-js';
import * as ImagePicker from 'expo-image-picker';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function Layout() {
  const [tab, setTab] = useState('meds');
  const [medications, setMedications] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [medsResult, schedsResult] = await Promise.all([
        supabase.from('medications').select('*').eq('patient_id', 'dorothy-001'),
        supabase.from('schedules').select('*').eq('patient_id', 'dorothy-001'),
      ]);

      setMedications(medsResult.data || []);
      setSchedules(schedsResult.data || []);
    } catch (err) {
      console.log('Error fetching data:', err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Good morning, Dorothy</Text>
        <Text style={styles.time}>Sun 8:02 AM</Text>
      </View>

      <View style={styles.tabBar}>
        <TouchableOpacity 
          style={[styles.tab, tab === 'meds' && styles.tabActive]}
          onPress={() => setTab('meds')}
        >
          <Text style={[styles.tabText, tab === 'meds' && styles.tabTextActive]}>Medications</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, tab === 'wellness' && styles.tabActive]}
          onPress={() => setTab('wellness')}
        >
          <Text style={[styles.tabText, tab === 'wellness' && styles.tabTextActive]}>Wellness</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, tab === 'schedule' && styles.tabActive]}
          onPress={() => setTab('schedule')}
        >
          <Text style={[styles.tabText, tab === 'schedule' && styles.tabTextActive]}>Schedule</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, tab === 'call' && styles.tabActive]}
          onPress={() => setTab('call')}
        >
          <Text style={[styles.tabText, tab === 'call' && styles.tabTextActive]}>Call</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {tab === 'meds' && <MedicationsTab medications={medications} loading={loading} />}
        {tab === 'wellness' && <WellnessTab />}
        {tab === 'schedule' && <ScheduleTab schedules={schedules} />}
        {tab === 'call' && <CallTab />}
      </ScrollView>
    </View>
  );
}

function MedicationsTab({ medications, loading }) {
  if (loading) {
    return <Text style={styles.pageTitle}>Loading medications...</Text>;
  }

  if (medications.length === 0) {
    return (
      <View>
        <Text style={styles.pageTitle}>My Medications</Text>
        <Text style={styles.pageSubtitle}>No medications yet</Text>
      </View>
    );
  }

  return (
    <View>
      <Text style={styles.pageTitle}>My Medications</Text>
      <Text style={styles.pageSubtitle}>{medications.length} medications</Text>
      {medications.map((med, i) => (
        <MedicationCard 
          key={i}
          name={med.name}
          dose={med.dose}
          time={med.time}
          sideEffect={med.side_effects}
        />
      ))}
    </View>
  );
}

function MedicationCard({ name, dose, time, sideEffect }) {
  const [photoUri, setPhotoUri] = useState(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setPhotoUri(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.medCard}>
      <TouchableOpacity style={styles.medPhoto} onPress={pickImage}>
        {photoUri ? (
          <Image source={{ uri: photoUri }} style={{ width: '100%', height: '100%' }} />
        ) : (
          <Text style={styles.medPhotoText}>📷</Text>
        )}
      </TouchableOpacity>
      <View style={styles.medInfo}>
        <Text style={styles.medName}>{name}</Text>
        <Text style={styles.medDose}>{dose}</Text>
        <Text style={styles.medTime}>{time}</Text>
        <TouchableOpacity style={styles.takeBtn}>
          <Text style={styles.takeBtnText}>I took this medication</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.sideEffectStrip}>
        <Text style={styles.sideEffectLabel}>Watch for:</Text>
        <Text style={styles.sideEffectText}>{sideEffect}</Text>
      </View>
    </View>
  );
}

function WellnessTab() {
  const [mood, setMood] = useState(null);
  const [pain, setPain] = useState(null);

  return (
    <View>
      <Text style={styles.pageTitle}>How are you feeling?</Text>
      <View style={styles.voiceBanner}>
        <Text style={styles.voiceText}>🔊 How are you feeling today, Dorothy?</Text>
      </View>
      <Text style={styles.sectionLabel}>Mood</Text>
      <View style={styles.moodGrid}>
        {['😄', '🙂', '😐', '😔', '😰'].map((emoji, i) => (
          <TouchableOpacity 
            key={i}
            style={[styles.moodBtn, mood === i && styles.moodBtnActive]}
            onPress={() => setMood(i)}
          >
            <Text style={styles.moodEmoji}>{emoji}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.sectionLabel}>Pain Level</Text>
      <View style={styles.painGrid}>
        {['0–1', '2–3', '4–5', '6–7', '8–10'].map((label, i) => (
          <TouchableOpacity 
            key={i}
            style={[styles.painBtn, pain === i && styles.painBtnActive]}
            onPress={() => setPain(i)}
          >
            <Text style={styles.painBtnText}>{label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

function ScheduleTab({ schedules }) {
  if (schedules.length === 0) {
    return (
      <View>
        <Text style={styles.pageTitle}>Today's Schedule</Text>
        <Text style={styles.pageSubtitle}>No schedules</Text>
      </View>
    );
  }

  return (
    <View>
      <Text style={styles.pageTitle}>Today's Schedule</Text>
      {schedules.map((sched, i) => (
        <View key={i} style={[styles.schedItem, sched.type === 'appointment' && styles.schedItemUrgent]}>
          <Text style={styles.schedTime}>{sched.time}</Text>
          <Text style={styles.schedTask}>{sched.title}</Text>
          <Text style={styles.schedDone}>{sched.type}</Text>
        </View>
      ))}
    </View>
  );
}

function CallTab() {
  return (
    <View>
      <Text style={styles.pageTitle}>Call Family</Text>
      <Text style={styles.pageSubtitle}>Video or phone call</Text>

      <View style={styles.contactCard}>
        <View style={styles.contactAvatar}>
          <Text style={styles.contactAvatarText}>SA</Text>
        </View>
        <View style={styles.contactDetails}>
          <Text style={styles.contactName}>Sarah</Text>
          <Text style={styles.contactRole}>Daughter</Text>
        </View>
        <TouchableOpacity style={styles.callButton}>
          <Text style={styles.callButtonText}>📞</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.contactCard}>
        <View style={styles.contactAvatar}>
          <Text style={styles.contactAvatarText}>DR</Text>
        </View>
        <View style={styles.contactDetails}>
          <Text style={styles.contactName}>Dr. Reyes</Text>
          <Text style={styles.contactRole}>Doctor</Text>
        </View>
        <TouchableOpacity style={styles.callButton}>
          <Text style={styles.callButtonText}>📞</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.emergencyCard}>
        <Text style={styles.emergencyText}>Emergency</Text>
        <TouchableOpacity style={styles.emergencyButton}>
          <Text style={styles.emergencyButtonText}>Call 911</Text>
        </TouchableOpacity>
      </View>
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
  greeting: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  time: {
    fontSize: 13,
    color: '#999',
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
    fontSize: 12,
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
  medCard: {
    borderWidth: 0.5,
    borderColor: '#ddd',
    borderRadius: 12,
    marginBottom: 14,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  medPhoto: {
    height: 160,
    backgroundColor: '#E6F1FB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  medPhotoText: {
    fontSize: 60,
  },
  medInfo: {
    padding: 14,
  },
  medName: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 2,
  },
  medDose: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  medTime: {
    fontSize: 14,
    color: '#185FA5',
    fontWeight: '500',
    marginBottom: 10,
  },
  takeBtn: {
    paddingVertical: 12,
    backgroundColor: '#E6F1FB',
    borderRadius: 8,
    alignItems: 'center',
  },
  takeBtnText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#185FA5',
  },
  sideEffectStrip: {
    backgroundColor: '#FAEEDA',
    padding: 10,
    borderTopWidth: 0.5,
    borderTopColor: '#ddd',
  },
  sideEffectLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#633806',
    marginBottom: 2,
  },
  sideEffectText: {
    fontSize: 12,
    color: '#633806',
  },
  voiceBanner: {
    backgroundColor: '#E6F1FB',
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
  },
  voiceText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#0C447C',
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#999',
    textTransform: 'uppercase',
    marginBottom: 10,
    marginTop: 18,
    letterSpacing: 0.5,
  },
  moodGrid: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 16,
  },
  moodBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#ddd',
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
  },
  moodBtnActive: {
    borderColor: '#185FA5',
    backgroundColor: '#E6F1FB',
  },
  moodEmoji: {
    fontSize: 24,
  },
  painGrid: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 16,
  },
  painBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#ddd',
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
  },
  painBtnActive: {
    borderColor: '#E24B4A',
    backgroundColor: '#FCEBEB',
  },
  painBtnText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  schedItem: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ddd',
  },
  schedItemUrgent: {
    backgroundColor: '#FAEEDA',
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  schedTime: {
    fontSize: 13,
    color: '#999',
    minWidth: 60,
  },
  schedTask: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
  },
  schedDone: {
    fontSize: 13,
    color: '#27500A',
    fontWeight: '500',
  },
  contactCard: {
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
  callButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E6F1FB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  callButtonText: {
    fontSize: 20,
  },
  emergencyCard: {
    backgroundColor: '#FCEBEB',
    borderRadius: 8,
    padding: 16,
    marginTop: 16,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#E24B4A',
  },
  emergencyText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#A32D2D',
    marginBottom: 8,
  },
  emergencyButton: {
    backgroundColor: '#E24B4A',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 6,
  },
  emergencyButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
});