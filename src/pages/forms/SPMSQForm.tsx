import { useState } from 'react'
import type { AssessmentRecord } from '../../store/types'

const spmsqQuestions = [
  '今天是幾年幾月幾日？',
  '今天是星期幾？',
  '這裡是什麼地方？',
  '你的電話號碼是幾號？',
  '4A. 你住在什麼地方？（個案沒有電話時才回答）',
  '你幾歲了？',
  '你的生日是哪一天？',
  '現任總統是誰？',
  '前任總統是誰？',
  '你媽媽叫什麼名字？',
  '從 20 減 3 開始算，一直減 3。',
] as const

export function SPMSQForm({
  onSubmit,
  defaultValue,
}: {
  defaultValue?: AssessmentRecord
  onSubmit: (data: { spmsqErrors?: number; spmsqDetail?: AssessmentRecord['spmsqDetail'] }) => void
}) {
  const [hasTelephone, setHasTelephone] = useState<boolean>(defaultValue?.spmsqDetail?.hasTelephone ?? true)
  const [answers, setAnswers] = useState<string[]>(
    defaultValue?.spmsqDetail?.answers ?? Array.from({ length: spmsqQuestions.length }, () => ''),
  )
  const [wrong, setWrong] = useState<boolean[]>(
    defaultValue?.spmsqDetail?.wrong ?? Array.from({ length: spmsqQuestions.length }, () => false),
  )

  const errorCount = wrong.reduce((sum, isWrong, idx) => {
    const isQ4 = idx === 3
    const isQ4A = idx === 4
    if (hasTelephone && isQ4A) return sum
    if (!hasTelephone && isQ4) return sum
    return sum + (isWrong ? 1 : 0)
  }, 0)

  return (
    <div className="form">
      <p className="muted">SPMSQ：逐題填答，勾選答錯題目，系統自動統計錯誤題數。</p>
      <label className="check">
        <input type="checkbox" checked={hasTelephone} onChange={(e) => setHasTelephone(e.target.checked)} />
        個案有電話（有電話：計第 4 題；無電話：計第 4A 題）
      </label>

      {spmsqQuestions.map((q, idx) => {
        const isQ4 = idx === 3
        const isQ4A = idx === 4
        const disabled = (hasTelephone && isQ4A) || (!hasTelephone && isQ4)

        return (
          <div key={q} className="itemrow">
            <label className="field">
              <span className="label">
                {idx + 1}. {q}
              </span>
              <input
                type="text"
                placeholder="填入個案作答"
                value={answers[idx] ?? ''}
                disabled={disabled}
                onChange={(e) => {
                  const next = [...answers]
                  next[idx] = e.target.value
                  setAnswers(next)
                }}
              />
            </label>
            <label className="check">
              <input
                type="checkbox"
                checked={Boolean(wrong[idx])}
                disabled={disabled}
                onChange={(e) => {
                  const next = [...wrong]
                  next[idx] = e.target.checked
                  setWrong(next)
                }}
              />
              答錯
            </label>
          </div>
        )
      })}

      <div className="hint">
        <b>錯誤題數：{errorCount} 題</b>
      </div>

      <button className="btn" onClick={() => onSubmit({ spmsqErrors: errorCount, spmsqDetail: { hasTelephone, answers, wrong } })}>
        儲存本次 SPMSQ
      </button>
    </div>
  )
}
