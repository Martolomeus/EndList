import { useEffect, useState } from 'react'
import { api } from './api'
import { CheckIcon } from './icons'
import TopBar from './TopBar'
import TaskItem from './TaskItem'
import TaskDialog from './TaskDialog'

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export default function App() {
  const [tasks, setTasks] = useState([])
  const [status, setStatus] = useState('loading') // 'loading' | 'ready' | 'failed'
  const [view, setView] = useState('open') // 'open' | 'completed'
  const [editing, setEditing] = useState(null) // null = dialog closed, {} = new task, task = edit
  const [error, setError] = useState(null)

  function load() {
    setStatus('loading')
    api.list()
      .then((data) => {
        setTasks(data)
        setStatus('ready')
      })
      .catch(() => setStatus('failed'))
  }

  useEffect(load, [])

  // Swap a task in the list for the version the server returned
  const replace = (updated) => setTasks((all) => all.map((t) => (t.id === updated.id ? updated : t)))

  // Returns true on success, so the row can undo its animation when it fails
  async function toggle(task) {
    setError(null)
    try {
      const request = task.completed ? api.uncomplete(task.id) : api.complete(task.id)
      // Wait a moment so the check animation finishes before the task moves lists
      const [updated] = await Promise.all([request, sleep(300)])
      replace(updated)
      return true
    } catch {
      setError('Could not update the task. Please try again.')
      return false
    }
  }

  // save and remove are called from the dialog, which shows its own error if they throw
  async function save(fields) {
    if (editing.id == null) {
      const created = await api.create(fields)
      setTasks((all) => [...all, created])
      setView('open')
    } else {
      replace(await api.update(editing.id, fields))
    }
  }

  async function remove(task) {
    await api.remove(task.id)
    setTasks((all) => all.filter((t) => t.id !== task.id))
  }

  // Newest open tasks first, most recently completed tasks first
  const open = tasks.filter((t) => !t.completed).sort((a, b) => b.id - a.id)
  const completed = tasks
    .filter((t) => t.completed)
    .sort((a, b) => Date.parse(b.completedAt ?? 0) - Date.parse(a.completedAt ?? 0))
  const visible = view === 'open' ? open : completed

  return (
    <>
      <TopBar
        view={view}
        counts={{ open: open.length, completed: completed.length }}
        onViewChange={setView}
        onAdd={() => setEditing({})}
      />

      <main className="container">
        {error && (
          <div className="banner" role="alert">
            <span>{error}</span>
            <button onClick={() => setError(null)} aria-label="Dismiss">×</button>
          </div>
        )}

        {status === 'loading' && <p className="loading">Loading tasks…</p>}

        {status === 'failed' && (
          <div className="empty">
            <h2>Could not load tasks</h2>
            <p>Check that the backend is running, then try again.</p>
            <button className="btn btn-ghost" onClick={load}>Retry</button>
          </div>
        )}

        {status === 'ready' && visible.length === 0 && (
          <div className="empty">
            <div className="empty-icon"><CheckIcon /></div>
            <h2>{view === 'open' ? 'All clear' : 'Nothing completed yet'}</h2>
            <p>{view === 'open' ? 'Add a task with the + button.' : 'Tasks you check off will show up here.'}</p>
          </div>
        )}

        {status === 'ready' && visible.length > 0 && (
          <ul className="task-list">
            {visible.map((task) => (
              <TaskItem key={task.id} task={task} onToggle={toggle} onOpen={setEditing} />
            ))}
          </ul>
        )}
      </main>

      {editing && (
        <TaskDialog task={editing} onSave={save} onDelete={remove} onClose={() => setEditing(null)} />
      )}
    </>
  )
}
