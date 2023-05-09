import React from 'react'

export default function Container({className, children}) {
  return (
    <div className={`mx-auto max-w-screen-xl ${className}`}>{children}</div>
  )
}
