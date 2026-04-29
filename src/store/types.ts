export type RiskLevel = 'low' | 'medium' | 'high'
export type DietType = 'full' | 'soft' | 'liquid'
export type FeedingMethod = 'oral' | 'ng_tube' | 'gastrostomy'

export type Resident = {
  id: string
  bedNo: string
  name: string
  age: number
  gender?: 'M' | 'F' | 'O'
  photoUrl?: string
  medicalSummary: string
  oralCheckNotes: string
  attachments: { id: string; name: string; addedAt: string }[]
  dietStatus: {
    feedingMethod: FeedingMethod
    dietType: DietType
    slpNotes: string
    dietitianNotes: string
  }
}

export type AssessmentRecord = {
  id: string
  residentId: string
  createdAt: string
  monthKey: string // yyyy-mm (monthly)
  weightKg?: number

  spmsqErrors?: number // 0-10
  spmsqDetail?: {
    hasTelephone?: boolean
    answers?: string[]
    wrong?: boolean[]
  }
  mnaScore?: number // 0-14 simplified
  mnaDetail?: {
    appetite?: number
    weightLoss?: number
    mobility?: number
    stressOrAcuteDisease?: number
    neuropsychologicalProblems?: number
    bmi?: number
    total?: number
  }
  swallowScreen?: {
    // EAT-10
    items?: number[] // 10 items, each 0-4
    total?: number
    // legacy fields
    coughWhenDrinking?: boolean
    wetVoice?: boolean
    chokingHistory?: boolean
    needsAssistFeeding?: boolean
  }
  swallow30s?: {
    preChecks?: {
      uprightSeated?: boolean
      moistenMouth?: boolean
      tongueAndLarynxPositioned?: boolean
      timed30s?: boolean
    }
    swallows?: number
    cough?: boolean
  }

  notes?: string
}

export type StaffAccount = {
  id: string
  name: string
  role: 'admin' | 'nurse' | 'dietitian' | 'caregiver' | 'slp'
  email: string
  active: boolean
}

export type Feedback = {
  id: string
  createdAt: string
  from: string
  message: string
  status: 'new' | 'triaged' | 'done'
}

export type DoctorRecommendation = {
  id: string
  residentId: string
  createdAt: string
  content: string
}

export type AppState = {
  selectedResidentId: string | null
  residents: Resident[]
  assessments: AssessmentRecord[]
  staff: StaffAccount[]
  feedbacks: Feedback[]
  doctorRecs: DoctorRecommendation[]
}
