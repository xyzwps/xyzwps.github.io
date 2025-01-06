import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { EduStage } from './types'

interface CVData {
  title: string,
  setTitle: (t: string) => void,
  intention: string,
  setIntention: (t: string) => void,
  personalInfomation: {
    birthYear: string,
    setBirthYear: (t: string) => void,
    gender: string,
    setGender: (t: string) => void,
    xueli: string,
    setXueli: (t: string) => void,
    email: string,
    setEmail: (t: string) => void,
    phone: string,
    setPhone: (t: string) => void,
  },
  eduExp: EduStage[],
  setEduExp: (it: EduStage[]) => void
}

export const useCVData = create<CVData>()(persist((set) => ({
  title: 'XX的简历',
  setTitle: (title) => set((state) => ({ title })),
  intention: 'XX工程师',
  setIntention: (intention) => set(() => ({ intention })),
  personalInfomation: {
    birthYear: '1995',
    setBirthYear: (birthYear) => set((state) => ({ personalInfomation: { birthYear, ...state.personalInfomation } })),
    gender: '男',
    setGender: (gender) => set((state) => ({ personalInfomation: { gender, ...state.personalInfomation } })),
    xueli: '本科',
    setXueli: (xueli) => set((state) => ({ personalInfomation: { xueli, ...state.personalInfomation } })),
    email: 'awe@xyzwps.com',
    setEmail: (email) => set((state) => ({ personalInfomation: { email, ...state.personalInfomation } })),
    phone: '18812345678',
    setPhone: (phone) => set((state) => ({ personalInfomation: { phone, ...state.personalInfomation } })),
  },
  eduExp: [
    { start: '2018.12.13', end: '2019.12.12', desc: 'xxxxx', key: '123' },
  ],
  setEduExp: (eduExp) => set((state) => ({ eduExp })),
}), {
  name: 'app-cv-tpl'
}))