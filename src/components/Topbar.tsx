import { ResidentSelector } from './ResidentSelector'

export function Topbar({
  right,
  showResidentSelector = true,
}: {
  right?: React.ReactNode
  showResidentSelector?: boolean
}) {
  return (
    <header className="topbar">
      <div className="topbar__left">{showResidentSelector ? <ResidentSelector /> : null}</div>
      <div className="topbar__right">{right}</div>
    </header>
  )
}
