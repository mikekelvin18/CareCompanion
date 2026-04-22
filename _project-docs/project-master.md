# CareCompanion — Master Project Document

## What this app is
A dual-interface care app for elderly patients and their families.
Built by an Occupational Therapist.

## Two sides
- PATIENT APP: Simple, large text, tablet/phone. Patient sees only what they need.
- FAMILY/CAREGIVER APP: Full control panel. Manages everything for the patient.

## Core Features
1. Medications — photo of pill, name, dose, time, side effects notes
2. Schedule — daily and weekly, reminders for important appointments
3. Photo gallery — family sends photos, patient views them
4. Video calls — one tap to call family or doctor
5. Home exercise program — pops up on schedule, AR overlay planned for future
6. Mood check-in — daily emoji tap + voice prompt "How are you feeling today?"
7. Pain tracking — 0-10 scale, location of pain, daily log
8. Vitals tracking — blood pressure, heart rate, oxygen, blood sugar, sleep
9. Emergency SOS button — always visible on patient side

## Tech Stack
- Frontend: React Native (works on iPhone and Android)
- Backend/Database: Supabase (free)
- Photo storage: Supabase Storage (free)
- Video calls: Daily.co (free tier)
- Voice prompts: Web Speech API (free)
- Hosting: Vercel (free)
- AR (future): TensorFlow.js (free)

## Project Status
- [x] Project folder created
- [x] Tools installed (Homebrew, Node.js, Git, Claude Code)
- [x] GitHub account created
- [x] Supabase account created
- [x] Vercel account created
- [x] Daily.co account created
- [ ] App started

## Decisions made
- Android first, iOS later
- Patient app = maximum simplicity
- Family app = full control
- All free tools until app has paying users

## Builder
Occupational Therapist, Filipino, non-programmer.
Claude codes, builder directs.
