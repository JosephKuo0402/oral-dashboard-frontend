import { useState } from 'react'
import type { AssessmentRecord } from '../../store/types'

const eat10Items = [
  '吞嚥問題讓我的體重減輕',
  '因為吞嚥問題不能在外用餐',
  '我喝飲料/水很費力',
  '我吃固體食物很費力',
  '我吞藥丸很費力',
  '吞嚥會感覺到痛',
  '因為吞嚥問題不能享受用餐',
  '吞嚥後感覺喉嚨有食物卡著',
  '當我進食的時候會咳嗽',
  '吞嚥讓我感覺緊張有壓力',
] as const

const scoreLabels = ['沒有（0 分）', '很少（1 分）', '偶爾（2 分）', '經常（3 分）', '嚴重（4 分）'] as const

export function SwallowScreenForm({
  onSubmit,
  defaultValue,
}: {
  defaultValue?: AssessmentRecord['swallowScreen']
  onSubmit: (data: { swallowScreen?: AssessmentRecord['swallowScreen'] }) => void
}) {
  const [items, setItems] = useState<number[]>(defaultValue?.items ?? Array.from({ length: eat10Items.length }, () => 0))
  const total = items.reduce((s, x) => s + x, 0)

  return (
    <div className="form">
      <p className="muted">吞嚥能力篩檢（EAT-10）：過去 3 個月每題 0-4 分。</p>
      <div className="scorelist">
        {eat10Items.map((item, idx) => (
          <div className="scoreitem" key={item}>
            <div>
              <span className="muted">{idx + 1}.</span> {item}
            </div>
            <select
              value={items[idx]}
              onChange={(e) => {
                const next = [...items]
                next[idx] = Number(e.target.value)
                setItems(next)
              }}
            >
              {scoreLabels.map((label, score) => (
                <option key={label} value={score}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>

      <div className="hint">
        <b>總分：{total} 分</b>
        <div className="muted">注意：若分數 ≥ 3 分，即「可能」有吞嚥障礙風險。</div>
      </div>

      <button className="btn" onClick={() => onSubmit({ swallowScreen: { items, total } })}>
        儲存本次吞嚥篩檢
      </button>
    </div>
  )
}
