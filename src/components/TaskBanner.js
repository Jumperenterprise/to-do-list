import React from 'react'

export const TaskBanner = (props) => {
  return (
    <h4 className="bg-primary bg-gradient text-white text-center p-4">
      {props.userName}'s Task App 
      ({props.taskItems.filter(t => !t.done).length} task to do)
    </h4>
  )
}
