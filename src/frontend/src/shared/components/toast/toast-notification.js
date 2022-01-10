import React from 'react'
import toast from 'react-hot-toast'

function ToastNotification (success, message) {
  return toast(
    (t) => (
      <div
        style={{
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <span>{message}</span>
        <div
          onClick={() => toast.dismiss(t.id)}
          style={{
            marginLeft: '10px',
            cursor: 'pointer'
          }}>
            <b>X</b>
        </div>
      </div>
    ),
    {
      duration: Infinity,
      position: 'top-center',
      style: {
        border: `3px solid ${success ? 'green' : 'red'}`
      }
    }
  )
}

export default ToastNotification
