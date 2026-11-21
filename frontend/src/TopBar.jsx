import { Logo, PlusIcon } from './icons'

const VIEWS = [
  { id: 'open', label: 'Open' },
  { id: 'completed', label: 'Completed' },
]

export default function TopBar({ view, counts, onViewChange, onAdd }) {
  return (
    <header className="topbar">
      <div className="topbar-inner">
        <div className="brand">
          <Logo className="brand-logo" />
          <span className="brand-name">EndList</span>
        </div>

        <nav className="tabs" aria-label="Task lists">
          {VIEWS.map(({ id, label }) => (
            <button
              key={id}
              className="tab"
              aria-pressed={view === id}
              onClick={() => onViewChange(id)}
            >
              {label}
              {/* "Tasks" is hidden on small screens to save space */}
              <span className="tab-suffix">&nbsp;Tasks</span>
              <span className="count">{counts[id]}</span>
            </button>
          ))}
        </nav>

        <button className="add-button" onClick={onAdd} aria-label="Add task" title="Add task">
          <PlusIcon />
        </button>
      </div>
    </header>
  )
}
