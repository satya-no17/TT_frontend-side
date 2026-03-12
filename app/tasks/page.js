'use client'
import React, { useState } from "react"
import { Button } from "@/components/ui/button"

const Tasks = () => {

  const [activeItem, setActiveItem] = useState(null)
  const [activeTodo, setActiveTodo] = useState(null)
  const [inputboxtodo, setinputboxTodo] = useState(false)
  const tasks = {
    daily: [
      { id: 1, title: "Study Backend" },
      { id: 2, title: "Workout" },
      { id: 1, title: "Study Backend" },
      { id: 2, title: "Workout" },
      { id: 1, title: "Study Backend" },
      { id: 2, title: "Workout" }
    ],

    monthly: [
      { id: 1, title: "Finish Node Project" },
      { id: 2, title: "Read 2 Books" }
    ],

    yearly: [
      { id: 1, title: "Build 5 Portfolio Projects" },
      { id: 2, title: "Learn System Design" }
    ],

    todo: [
      { id: 1, title: "Buy groceries" },
      { id: 2, title: "Clean desk" },
      { id: 3, title: "Call friend" }
    ]
  }
  const Add_todo = () => {
    setinputboxTodo(true)
  }

  const Card = ({ title, items }) => {

    return (
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col transition-all duration-300 hover:shadow-md">

        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-slate-800">{title}</h2>

          <Button className="bg-[#3B82F6] hover:bg-[#2563EB] text-white" size="sm">
            Add
          </Button>
        </div>

        <div className="flex flex-col gap-3">

          {items.map(item => {

            const key = `${title}-${item.id}`

            return (

              <div
                key={key}
                onClick={() => setActiveItem(activeItem === key ? null : key)}
                className="flex items-center justify-between bg-slate-50 p-3 rounded-lg hover:bg-slate-100 transition-all duration-200 cursor-pointer"
              >

                <div className="flex items-center gap-3">
                  <input type="checkbox" />
                  <p className="text-slate-700">{item.title}</p>
                </div>

                {activeItem === key && (

                  <div className="flex gap-2 transition-all duration-200">

                    <Button size="sm" variant="secondary">
                      Edit
                    </Button>

                    <Button size="sm" variant="destructive">
                      Delete
                    </Button>

                  </div>

                )}

              </div>

            )

          })}

        </div>

      </div>

    )

  }

  return (
    <>
     {inputboxtodo && (
  <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">

    <div className="bg-white rounded-xl p-6 w-[400px] shadow-lg">

      <h2 className="text-lg font-semibold mb-4">Add Todo</h2>

      <input
        type="text"
        placeholder="Enter todo..."
        className="w-full border rounded-lg p-2 mb-4"
      />

      <div className="flex justify-end gap-2">

        <Button
          variant="secondary"
          onClick={() => setinputboxTodo(false)}
        >
          Cancel
        </Button>

        <Button className="bg-[#3B82F6] text-white">
          Add
        </Button>

      </div>

    </div>

  </div>
)}
      <div className="p-8 bg-[#F8FAFC] min-h-screen">

        <h1 className="text-3xl font-semibold text-slate-800 mb-8">
          Dashboard
        </h1>

        {/* Goal Cards */}

        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">

          <Card title="Daily Goals" items={tasks.daily} />
          <Card title="Monthly Goals" items={tasks.monthly} />
          <Card title="Yearly Goals" items={tasks.yearly} />

        </div>


        {/* Todo Section */}

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 mt-8 transition-all duration-300 hover:shadow-md">

          <div className="flex items-center justify-between mb-6">

            <h2 className="text-xl font-semibold text-slate-800">
              Todo List
            </h2>

            <Button className="bg-[#3B82F6] hover:bg-[#2563EB] text-white" onClick={Add_todo}>
              Add Todo
            </Button>

          </div>

          <div className="grid md:grid-cols-2 gap-4">

            {tasks.todo.map(todo => (

              <div
                key={todo.id}
                onClick={() => setActiveTodo(activeTodo === todo.id ? null : todo.id)}
                className="bg-slate-50 p-4 rounded-lg hover:bg-slate-100 transition-all duration-200 cursor-pointer flex justify-between items-center"
              >

                <p className="text-slate-700">{todo.title}</p>

                {activeTodo === todo.id && (

                  <div className="flex gap-2 transition-all duration-200">

                    <Button size="sm" variant="secondary">
                      Edit
                    </Button>

                    <Button size="sm" variant="destructive">
                      Delete
                    </Button>

                  </div>

                )}

              </div>

            ))}

          </div>

        </div>

      </div></>

  )

}

export default Tasks