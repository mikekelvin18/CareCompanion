import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Tabs } from 'expo-router';

export default function Layout() {
  const [tab, setTab] = useState('meds');

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
      </View>

      <ScrollView style={styles.content}>
        {tab === 'meds' && <MedicationsTab />}
        {tab === 'wellness' && <WellnessTab />}
        {tab === 'schedule' && <ScheduleTab />}
      </ScrollView>
    </View>
  );
}

function MedicationsTab() {
  return (
    <View>
      <Text style={styles.pageTitle}>My Medications</Text>
      <Text style={styles.pageSubtitle}>3 medications today</Text>
      
      <MedicationCard 
        name="Lisinopril 10mg"
        dose="1 tablet with water"
        time="8:00 AM"
        color="#E6F1FB"
        sideEffect="Dry cough, dizziness when standing"
        taken={true}
      />
      <MedicationCard 
        name="Metformin 500mg"
        dose="1 tablet with lunch"
        time="12:00 PM"
        color="#FAEEDA"
        sideEffect="Upset stomach — take with food"
        taken={false}
      />
      <MedicationCard 
        name="Vitamin D 1000 IU"
        dose="1 softgel with dinner"
        time="6:00 PM"
        color="#E1F5EE"
        sideEffect="None known"
        taken={false}
      />
    </View>
  );
}

function MedicationCard({ name, dose, time, color, sideEffect, taken }) {
  return (
    <View style={[styles.medCard, { borderColor: color }]}>
      <View style={[styles.medPhoto, { backgroundColor: color }]}>
        <Text style={styles.medPhotoText}>💊</Text>
      </View>
      <View style={styles.medInfo}>
        <Text style={styles.medName}>{name}</Text>
        <Text style={styles.medDose}>{dose}</Text>
        <Text style={styles.medTime}>{time}</Text>
        <TouchableOpacity style={[styles.takeBtn, taken && styles.takenBtn]}>
          <Text style={[styles.takeBtnText, taken && styles.takenBtnText]}>
            {taken ? '✓ Taken' : 'I took this'}
          </Text>
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

function ScheduleTab() {
  return (
    <View>
      <Text style={styles.pageTitle}>Today's Schedule</Text>
      <ScheduleItem time="8:00 AM" task="Morning medications" done={true} />
      <ScheduleItem time="10:00 AM" task="Chair yoga exercises" done={false} />
      <ScheduleItem time="4:00 PM" task="Dr. Reyes appointment" done={false} urgent={true} />
    </View>
  );
}

function ScheduleItem({ time, task, done, urgent }) {
  return (
    <View style={[styles.schedItem, urgent && styles.schedItemUrgent]}>
      <Text style={styles.schedTime}>{time}</Text>
      <Text style={[styles.schedTask, done && styles.schedTaskDone]}>{task}</Text>
      {done && <Text style={styles.schedDone}>✓ Done</Text>}
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
    borderRadius: 12,
    marginBottom: 14,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  medPhoto: {
    height: 160,
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
  takenBtn: {
    backgroundColor: '#EAF3DE',
  },
  takeBtnText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#185FA5',
  },
  takenBtnText: {
    color: '#27500A',
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
  schedTaskDone: {
    color: '#999',
    textDecorationLine: 'line-through',
  },
  schedDone: {
    fontSize: 13,
    color: '#27500A',
    fontWeight: '500',
  },
});
