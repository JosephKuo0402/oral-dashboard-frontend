import { useState } from 'react'
import type { AssessmentRecord } from '../../store/types'

type MnaDetailState = {
  appetite: number
  weightLoss: number
  mobility: number
  stressOrAcuteDisease: number
  neuropsychologicalProblems: number
  bmi: number
}

const mnaItems = [
  {
    key: 'appetite',
    label: '三個月內有沒有因為食慾不振、消化問題、咀嚼或吞嚥困難而減少食量',
    options: [
      { score: 0, text: '食量嚴重減少' },
      { score: 1, text: '食量中度減少' },
      { score: 2, text: '食量沒有改變' },
    ],
  },
  {
    key: 'weightLoss',
    label: '三個月內體重下降的情況',
    options: [
      { score: 0, text: '體重下降超過 3 公斤' },
      { score: 1, text: '不知道' },
      { score: 2, text: '體重下降 1-3 公斤' },
      { score: 3, text: '體重沒有下降' },
    ],
  },
  {
    key: 'mobility',
    label: '活動能力',
    options: [
      { score: 0, text: '需長期臥床或坐輪椅' },
      { score: 1, text: '可以下床或離開輪椅，但不能外出' },
      { score: 2, text: '可以外出' },
    ],
  },
  {
    key: 'stressOrAcuteDisease',
    label: '三個月內有沒有受到心理創傷或患上急性疾病',
    options: [
      { score: 0, text: '有' },
      { score: 2, text: '沒有' },
    ],
  },
  {
    key: 'neuropsychologicalProblems',
    label: '精神心理問題',
    options: [
      { score: 0, text: '嚴重癡呆或抑鬱' },
      { score: 1, text: '輕度癡呆' },
      { score: 2, text: '沒有精神心理問題' },
    ],
  },
  {
    key: 'bmi',
    label: '身體質量指數（BMI）',
    options: [
      { score: 0, text: 'BMI < 19' },
      { score: 1, text: 'BMI 19 至 < 21' },
      { score: 2, text: 'BMI 21 至 < 23' },
      { score: 3, text: 'BMI >= 23' },
    ],
  },
] as const

export function MNAForm({
  onSubmit,
  defaultValue,
}: {
  defaultValue?: AssessmentRecord
  onSubmit: (data: { mnaScore?: number; mnaDetail?: AssessmentRecord['mnaDetail'] }) => void
}) {
  const [v, setV] = useState<MnaDetailState>({
    appetite: defaultValue?.mnaDetail?.appetite ?? 2,
    weightLoss: defaultValue?.mnaDetail?.weightLoss ?? 3,
    mobility: defaultValue?.mnaDetail?.mobility ?? 2,
    stressOrAcuteDisease: defaultValue?.mnaDetail?.stressOrAcuteDisease ?? 2,
    neuropsychologicalProblems: defaultValue?.mnaDetail?.neuropsychologicalProblems ?? 2,
    bmi: defaultValue?.mnaDetail?.bmi ?? 3,
  })

  const total =
    v.appetite + v.weightLoss + v.mobility + v.stressOrAcuteDisease + v.neuropsychologicalProblems + v.bmi

  return (
    <div className="form">
      <p className="muted">MNA-SF（0-14 分）：依下列 6 項填答，系統自動加總。</p>
      {mnaItems.map((item) => (
        <fieldset key={item.key} className="itembox">
          <legend>{item.label}</legend>
          <div className="optiongrid">
            {item.options.map((opt) => (
              <label className="check" key={`${item.key}-${opt.score}-${opt.text}`}>
                <input
                  type="radio"
                  name={item.key}
                  checked={v[item.key] === opt.score}
                  onChange={() => setV((p) => ({ ...p, [item.key]: opt.score }))}
                />
                {opt.score} 分：{opt.text}
              </label>
            ))}
          </div>
        </fieldset>
      ))}

      <div className="hint">
        <b>總計：{total} 分</b>
        <div className="muted">注意：若分數 ≤ 11，即「可能」有營養不良風險。</div>
      </div>

      <button className="btn" onClick={() => onSubmit({ mnaScore: total, mnaDetail: { ...v, total } })}>
        儲存本次 MNA
      </button>
    </div>
  )
}
