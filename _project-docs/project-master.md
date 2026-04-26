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
## Session 1 Complete
- [x] All tools installed
- [x] All accounts created
- [x] Project folder created
- [x] GitHub repository created
- [x] Project backed up to GitHub

## Next: Session 2 — Build the app
Start date: [DATE]
## Session 2 — Build Patient App
- [x] Expo project created
- [x] App running in browser
- [ ] Patient app screens built
- [ ] Medications tab complete
- [ ] Wellness tab complete
- [ ] Backend connected to Supabase
git add .
git commit -m "session 2 started"
git push
## Session 2 Complete
- [x] Patient app UI built (Medications, Wellness, Schedule)
- [x] Family app UI built (Manage Meds, Schedule, Dashboard, Contacts)
- [x] Both apps running and functional
- [ ] Backend database (Supabase) connected
- [ ] Photo upload implemented
- [ ] Video calling integrated
- [ ] Pain and mood tracking saved to database
## Session 3 Complete
- [x] Supabase project created
- [x] Medications table created
- [x] Patient app connected to Supabase
- [x] Env variables configured
- [ ] Family app connected to Supabase
- [ ] Data persisting and syncing

## Session 4 Complete
- [x] Photo upload for medications added
- [x] Video call tab added with contact list
- [x] Emergency 911 button added
- [x] Patient app now has all 4 tabs working

## Session 5 Complete
- [x] Family app connected to Supabase
- [x] Environment variables configured
- [ ] Medication editing fully functional
- [ ] Data syncing between apps

## Current Status
- Patient app: 4 tabs, photo upload, video calls ✓
- Family app: Basic structure, Supabase connected ✓
- Database: Medications table created ✓
- Backup: All code on GitHub ✓

## Next: Session 6 — Full medication management sync

