'use client'
import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import retrieveData from "@/utils/retrieveData"
import addTodo from "@/utils/addtodo"
import deleteTodo from "@/utils/deleteTodo"
const Tasks = () => {

  const router = useRouter()
  const [todos, setTodos] = useState([])
  const [dailyTasks, setDailyTasks] = useState([])
  const [goals, setGoals] = useState([])
  const [addtodo, setaddtodo] = useState("")

  // todos functionssssss
  // adding todo

  const addTodos = async () => {
    try {
      const userId = localStorage.getItem("userId")
      const res = await addTodo(userId, addtodo)
      console.log(res)
      setTodos([...todos, res.todo])

      // Clear input and close modal
      setaddtodo("")
      setinputboxTodo(false)
    } catch (error) {
      console.error("Error adding todo:", error)
    }
  }

  // deleteing todo
  const deleteTodos = async (id) => {
    try {
      const userId = localStorage.getItem("userId")
      const res = await deleteTodo(userId, id)
      console.log(res)
   setTodos(prev => prev.filter(todo => todo.id !== id))

    } catch (error) {
      console.error("Error deleting todo:", error)
    }
  }







  useEffect(() => {

    // Check if running on client-side
    if (typeof window === 'undefined') return

    const userId = localStorage.getItem("userId")
    console.log("userId:", userId)

    if (!userId) {
      router.push("/")
      return
    }
    const loadDashboard = async () => {
      try {
        const res = await retrieveData(userId)
        console.log("dashboard data:", res)
        setDailyTasks(res.dailyTasks)
        setGoals(res.goals)
        setTodos(res.todos)
      } catch (err) {
        console.error(err)
      }
    }



    loadDashboard()
  }, [])
  const [activeItem, setActiveItem] = useState(null)
  const [activeTodo, setActiveTodo] = useState(null)
  const [inputboxtodo, setinputboxTodo] = useState(false)

  const Add_todo = () => {
    setinputboxTodo(true)
  }

  const monthlyGoals = goals.filter(goal => goal.type === 'monthly')
  const yearlyGoals = goals.filter(goal => goal.type === 'yearly')

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
              value={addtodo}
              onChange={(e) => { setaddtodo(e.target.value) }}
            />

            <div className="flex justify-end gap-2">

              <Button
                variant="secondary"
                onClick={() => setinputboxTodo(false)}
              >
                Cancel
              </Button>

              <Button className="bg-[#3B82F6] text-white" onClick={addTodos}>
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

          <Card title="Daily Goals" items={dailyTasks} />
          {/* <Card title="Monthly Goals" items={monthlyGoals} />
          <Card title="Yearly Goals" items={yearlyGoals} /> */}


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

            {todos.map(todo => (

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

                    <Button size="sm" variant="destructive"  onClick={(e) => {
    e.stopPropagation()
    deleteTodos(todo.id)
  }}>
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