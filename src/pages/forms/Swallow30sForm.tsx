import { useState } from 'react'
import type { AssessmentRecord } from '../../store/types'

export function Swallow30sForm({
  onSubmit,
  defaultValue,
}: {
  defaultValue?: AssessmentRecord['swallow30s']
  onSubmit: (data: { swallow30s?: AssessmentRecord['swallow30s'] }) => void
}) {
  const [swallows, setSwallows] = useState<number>(defaultValue?.swallows ?? 4)
  const [preChecks, setPreChecks] = useState({
    uprightSeated: defaultValue?.preChecks?.uprightSeated ?? true,
    moistenMouth: defaultValue?.preChecks?.moistenMouth ?? true,
    tongueAndLarynxPositioned: defaultValue?.preChecks?.tongueAndLarynxPositioned ?? true,
    timed30s: defaultValue?.preChecks?.timed30s ?? true,
  })

  return (
    <div className="form">
      <p className="muted">30 秒吞嚥（RSST）：依檢測步驟逐項勾選並填入次數。</p>
      <div className="checkgrid">
        <label className="check">
          <input
            type="checkbox"
            checked={preChecks.uprightSeated}
            onChange={(e) => setPreChecks((p) => ({ ...p, uprightSeated: e.target.checked }))}
          />
          民眾採正坐
        </label>
        <label className="check">
          <input
            type="checkbox"
            checked={preChecks.moistenMouth}
            onChange={(e) => setPreChecks((p) => ({ ...p, moistenMouth: e.target.checked }))}
          />
          濕潤口腔（1 c.c. 水或先吞口水）
        </label>
        <label className="check">
          <input
            type="checkbox"
            checked={preChecks.tongueAndLarynxPositioned}
            onChange={(e) => setPreChecks((p) => ({ ...p, tongueAndLarynxPositioned: e.target.checked }))}
          />
          食指置舌下、中指置喉結上方
        </label>
        <label className="check">
          <input
            type="checkbox"
            checked={preChecks.timed30s}
            onChange={(e) => setPreChecks((p) => ({ ...p, timed30s: e.target.checked }))}
          />
          已計時 30 秒並計次
        </label>
      </div>

      <label className="field" style={{ maxWidth: 280 }}>
        <span className="label">30 秒內喉結上升移動次數</span>
        <input type="number" min={0} max={20} value={swallows} onChange={(e) => setSwallows(Number(e.target.value))} />
      </label>

      <div className="hint">
        <b>共計：{swallows} 次</b>
        <div className="muted">注意：若次數 ≤ 2 次，即「可能」有吞嚥障礙風險。</div>
      </div>

      <button className="btn" onClick={() => onSubmit({ swallow30s: { swallows, preChecks } })}>
        儲存本次 30 秒吞嚥
      </button>
    </div>
  )
}
