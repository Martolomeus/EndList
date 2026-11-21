import { useEffect, useRef, useState } from 'react'

// Add / edit form in a native <dialog>: it gives us the backdrop, focus
// handling and closing with Escape for free.
export default function TaskDialog({ task, onSave, onDelete, onClose }) {
  const dialog = useRef(null)
  const [subject, setSubject] = useState(task.subject ?? '')
  const [description, setDescription] = useState(task.description ?? '')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState(null)
  const isNew = task.id == null

  // This component is only mounted while the dialog should be visible
  useEffect(() => {
    if (!dialog.current.open) dialog.current.showModal()
  }, [])

  // Closing fires the dialog's "close" event, which calls onClose
  const close = () => dialog.current.close()

  async function run(action) {
    setBusy(true)
    setError(null)
    try {
      await action()
      close()
    } catch {
      setError('Something went wrong. Please try again.')
      setBusy(false)
    }
  }

  function handleSubmit(event) {
    event.preventDefault()
    run(() => onSave({ subject: subject.trim(), description: description.trim() || null }))
  }

  return (
    <dialog
      ref={dialog}
      className="dialog"
      onClose={onClose}
      // A click on the <dialog> element itself (not on its content) is a click on the backdrop
      onClick={(event) => event.target === dialog.current && close()}
    >
      <form onSubmit={handleSubmit}>
        <h2>{isNew ? 'New task' : 'Edit task'}</h2>

        <input
          className="field"
          aria-label="Subject"
          placeholder="What needs to be done?"
          value={subject}
          onChange={(event) => setSubject(event.target.value)}
          maxLength={255}
        />
        <textarea
          className="field"
          aria-label="Description"
          placeholder="Add details (optional)"
          rows={4}
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />

        {error && <p className="dialog-error" role="alert">{error}</p>}

        <div className="dialog-actions">
          {!isNew && (
            <button type="button" className="btn btn-danger" disabled={busy} onClick={() => run(() => onDelete(task))}>
              Delete
            </button>
          )}
          <button type="button" className="btn btn-ghost" onClick={close}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary" disabled={busy || !subject.trim()}>
            {isNew ? 'Add task' : 'Save'}
          </button>
        </div>
      </form>
    </dialog>
  )
}
