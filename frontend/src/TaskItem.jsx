import { useState } from 'react'
import { CheckIcon } from './icons'

function formatDate(iso) {
  return new Date(iso).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })
}

export default function TaskItem({ task, onToggle, onOpen }) {
  // True while the task is moving to the other list: the checkbox flips right
  // away and the row fades out, instead of waiting for the server to answer.
  const [leaving, setLeaving] = useState(false)
  const checked = task.completed !== leaving

  async function handleToggle() {
    setLeaving(true)
    const ok = await onToggle(task)
    if (!ok) setLeaving(false)
  }

  return (
    <li className={`task${checked ? ' done' : ''}${leaving ? ' leaving' : ''}`}>
      <button
        className="check"
        role="checkbox"
        aria-checked={checked}
        aria-label={checked ? 'Mark as open' : 'Mark as completed'}
        onClick={handleToggle}
        disabled={leaving}
      >
        <CheckIcon />
      </button>

      <button className="task-body" onClick={() => onOpen(task)}>
        <span className="task-subject">{task.subject}</span>
        {task.description && <span className="task-description">{task.description}</span>}
        {task.completed && task.completedAt && (
          <span className="task-meta">Completed {formatDate(task.completedAt)}</span>
        )}
      </button>
    </li>
  )
}
