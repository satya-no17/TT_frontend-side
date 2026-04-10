'use client'
import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import retrieveData from "@/utils/retrieveData"
import addTodo from "@/utils/addtodo"
import deleteTodo from "@/utils/deleteTodo"
import { editTodo } from "@/utils/editTodo"
import deleteDailyTask from "@/utils/deleteDailyTask"
import { editDailyTask } from "@/utils/editDailyTask"
import addDailyTask from "@/utils/addDailyTask"
import editGoals from "@/utils/editGoals"
import deleteGoals from "@/utils/deleteGoals"
import addGoals from "@/utils/addGoals"
import LoadingPage from "@/app/components/LoadingPage"
const Tasks = () => {

  const router = useRouter()

  const [loading, setLoading] = useState(false)
  const [todos, setTodos] = useState([])
  const [addtodo, setaddtodo] = useState("")
  const [editTodoModal, setEditTodoModal] = useState(false)
  const [editingTodo, setEditingTodo] = useState(null)
  const [editTitle, setEditTitle] = useState("")
  const [editCompleted, setEditCompleted] = useState(false)

  const [dailyTasks, setDailyTasks] = useState([])
  const [addDailyInput, setAddDailyInput] = useState("")
  const [showDailyModal, setShowDailyModal] = useState(false)
  const [editDailyModal, setEditDailyModal] = useState(false)
  const [editingDaily, setEditingDaily] = useState(null)
  const [editDailyTitle, setEditDailyTitle] = useState("")
  const [editDailyCompleted, setEditDailyCompleted] = useState(false)


  const [goals, setGoals] = useState([])
  const [showGoalModal, setShowGoalModal] = useState(false)
  const [goalTitle, setGoalTitle] = useState("")
  const [goalTarget, setGoalTarget] = useState("")
  const [goalType, setGoalType] = useState("monthly")
  const [editGoalModal, setEditGoalModal] = useState(false)
  const [editingGoal, setEditingGoal] = useState(null)
  const [editGoalValue, setEditGoalValue] = useState("")

  // todos functionssssss
  // adding todo

  const addTodos = async () => {
    setLoading(true)
    try {
      const userId = localStorage.getItem("userId")

      const res = await addTodo(userId, addtodo)
      console.log("ADD TODO:", res)

      // 🔥 REFETCH DATA (BEST WAY)
      const updated = await retrieveData(userId)
      setTodos(updated.todos)

      setaddtodo("")
      setinputboxTodo(false)

    } catch (error) {
      console.error("Error adding todo:", error)
    } setLoading(false)
  }

  // deleteing todo
  const deleteTodos = async (id) => {
    setLoading(true)
    try {
      const userId = localStorage.getItem("userId")
      const res = await deleteTodo(userId, id)
      console.log(res)
      setTodos(prev => prev.filter(todo => todo.id !== id))

    } catch (error) {
      console.error("Error deleting todo:", error)
    } setLoading(false)
  }
  //editing todo
  const openEditModal = (todo) => {
    setEditingTodo(todo)
    setEditTitle(todo.title)
    setEditCompleted(todo.completed || false)
    setEditTodoModal(true)
  }

  const updateTodo = async () => {
    setLoading(true)
    try {
      const userId = localStorage.getItem("userId")
      const res = await editTodo(userId, editingTodo.id, {
        title: editTitle,
        completed: editCompleted
      })
      console.log(res)

      if (res.success) {
        setTodos(prev => prev.map(todo =>
          todo.id === editingTodo.id
            ? { ...todo, title: editTitle, completed: editCompleted }
            : todo
        ))
        setEditTodoModal(false)
        setEditingTodo(null)
      }
    } catch (error) {
      console.error("Error updating todo:", error)
    } setLoading(false)
  }


  // daily task functions

  // adding daily tasks

  const addDailyTasks = async () => {
    setLoading(true)
    try {
      const userId = localStorage.getItem("userId")

      const res = await addDailyTask(userId, addDailyInput)
      console.log("ADD DAILY:", res)

      // 🔥 REFETCH (BEST PRACTICE)
      const updated = await retrieveData(userId)
      setDailyTasks(updated.dailyTasks)

      setAddDailyInput("")
      setShowDailyModal(false)
    } catch (error) {
      console.error("Error adding taskss:", error)
    } setLoading(false)
  }
  // deleting daily tasks 

  const deleteDailyTasks = async (id) => {
    setLoading(true)
    try {
      const userId = localStorage.getItem("userId")
      const res = await deleteDailyTask(userId, id)
      console.log(res)
      setDailyTasks(prev => prev.filter(tasks => tasks.id !== id))
    } catch (error) {
      console.error("Error deleting dailyTask:", error)
    } setLoading(false)
  }

  //edit daily tasks

  const openDailyEdit = (task) => {
    setEditingDaily(task)
    setEditDailyTitle(task.title)
    setEditDailyCompleted(task.completed || false)
    setEditDailyModal(true)
  }

  const updateDailyTasks = async () => {
    setLoading(true)
    try {
      const userId = localStorage.getItem("userId")

      const res = await editDailyTask(userId, editingDaily.id, {
        completed: editDailyCompleted
      })

      if (res.success) {
        setDailyTasks(prev =>
          prev.map(task =>
            task.id === editingDaily.id
              ? res.task
              : task
          )
        )

        setEditDailyModal(false)
        setEditingDaily(null)
        console.log(res.message)
      }
    } catch (err) {
      console.error(err)
    } setLoading(false)
  }

  // goals 
  // adding goals
  const handleAddGoal = async (title, target_value, type) => {
    setLoading(true)
    try {
      const userId = localStorage.getItem("userId")

      const res = await addGoals(userId, title, target_value, type)
      console.log("ADD GOAL RESPONSE:", res)
      console.log("MESSAGE:", res?.message || "No message from backend")

      setGoals(prev => [...prev, res.goal])
    } catch (err) {
      console.error(err)
    } setLoading(false)
  }

  // update goals 
  const openGoalEdit = (goal) => {
    setEditingGoal(goal)
    setEditGoalValue(goal.current_value)
    setEditGoalModal(true)
  }
  const updateGoal = async () => {
    setLoading(true)
    try {
      const userId = localStorage.getItem("userId")

      const res = await editGoals(userId, editingGoal.id, {
        current_value: Number(editGoalValue)
      })

      if (res.success) {
        setGoals(prev =>
          prev.map(g =>
            g.id === editingGoal.id
              ? { ...g, current_value: Number(editGoalValue) }
              : g
          )
        )

        setEditGoalModal(false)
        setEditingGoal(null)
      }
    } catch (err) {
      console.error(err)
    } setLoading(false)
  }
  const handleIncrement = async (goal) => {
    setLoading(true)
    try {
      const userId = localStorage.getItem("userId")
      const updatedValue = goal.current_value + 1

      const res = await editGoals(userId, goal.id, {
        current_value: updatedValue
      })

      if (res.success) {
        console.log("INCREMENT RESPONSE:", res)
        console.log("MESSAGE:", res?.message || "No message from backend")
        setGoals(prev =>
          prev.map(g =>
            g.id === goal.id
              ? { ...g, current_value: updatedValue }
              : g
          )
        )
      }
    } catch (err) {
      console.error(err)
    } setLoading(false)
  }
  // delete goals

  const handleDeleteGoal = async (id) => {
    setLoading(true)
    try {
      const userId = localStorage.getItem("userId")

      const res = await deleteGoals(userId, id)
      console.log(res.message)

      setGoals(prev => prev.filter(g => g.id !== id))
      console.log(res.message || "Goal deleted")
    } catch (err) {
      console.error(err)
    } setLoading(false)
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
      setLoading(true)
      try {
        const res = await retrieveData(userId)
        console.log("dashboard data:", res)
        setDailyTasks(res.dailyTasks)
        setGoals(res.goals)
        setTodos(res.todos)
      } catch (err) {
        console.error(err)
      } setLoading(false)
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

  const Card = ({ title, items, onDelete, onEdit, onAdd }) => {

    return (
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col transition-all duration-300 hover:shadow-md">

        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-slate-800">{title}</h2>

          <Button
            className="bg-[#3B82F6] hover:bg-[#2563EB] text-white"
            size="sm"
            onClick={onAdd}
          >
            Add
          </Button>
        </div>

        <div className="flex flex-col gap-3">

          {items.map(item => {
            const isGoal = item.target_value !== undefined
            const key = `${title}-${item?.id}`

            return (
              <div
                key={key}
                onClick={() => setActiveItem(activeItem === key ? null : key)}
                className="flex items-center justify-between bg-slate-50 p-3 rounded-lg hover:bg-slate-100 transition-all duration-200 cursor-pointer"
              >

                {/* LEFT SIDE */}
                <div className="flex flex-col gap-1 w-full">

                  <div className="flex items-center gap-3">

                    {isGoal ? (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleIncrement(item)
                          }}
                          className="px-2 py-1 bg-green-500 text-white rounded"
                        >
                          +
                        </button>

                        <span className="text-sm">
                          {item.current_value}/{item.target_value}
                        </span>
                      </div>
                    ) : (
                      <input
                        type="checkbox"
                        checked={item?.completed || false}
                        readOnly
                      />
                    )}

                    <p className={`${item?.completed
                      ? 'line-through text-slate-400'
                      : 'text-slate-700'
                      }`}>
                      {item?.title}
                    </p>

                  </div>

                  {/* ✅ PROGRESS BAR */}
                  {isGoal && (
                    <div className="w-full bg-gray-200 h-2 rounded">
                      <div
                        className="bg-blue-500 h-2 rounded"
                        style={{
                          width: `${(item.current_value / item.target_value) * 100}%`
                        }}
                      />
                    </div>
                  )}

                </div>

                {/* RIGHT SIDE ACTIONS */}
                {activeItem === key && (
                  <div className="flex gap-2 transition-all duration-200">

                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={(e) => {
                        e.stopPropagation()
                        if (isGoal) {
                          openGoalEdit(item)
                        } else {
                          onEdit && onEdit(item)
                        }
                      }}
                    >
                      Edit
                    </Button>

                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={(e) => {
                        e.stopPropagation()
                        isGoal
                          ? handleDeleteGoal(item.id)
                          : onDelete(item.id)
                      }}
                    >
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
      {loading && <LoadingPage />}
      {editGoalModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white p-6 rounded-xl w-[400px]">

            <h2 className="text-lg font-semibold mb-4">Edit Goal</h2>

            <input
              type="number"
              value={editGoalValue}
              onChange={(e) => setEditGoalValue(e.target.value)}
              className="w-full border p-2 mb-4"
            />

            <div className="flex justify-end gap-2">
              <Button onClick={() => setEditGoalModal(false)}>Cancel</Button>
              <Button onClick={updateGoal}>Update</Button>
            </div>

          </div>
        </div>
      )}
      {showGoalModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white p-6 rounded-xl w-[400px]">

            <h2 className="text-lg font-semibold mb-4">Add Goal</h2>

            <input
              type="text"
              placeholder="Goal title"
              value={goalTitle}
              onChange={(e) => setGoalTitle(e.target.value)}
              className="w-full border p-2 mb-3"
            />

            <input
              type="number"
              placeholder="Target value"
              value={goalTarget}
              onChange={(e) => setGoalTarget(e.target.value)}
              className="w-full border p-2 mb-3"
            />

            <select
              value={goalType}
              onChange={(e) => setGoalType(e.target.value)}
              className="w-full border p-2 mb-4"
            >
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>

            <div className="flex justify-end gap-2">
              <Button onClick={() => setShowGoalModal(false)}>Cancel</Button>
              <Button
                onClick={async () => {
                  await handleAddGoal(goalTitle, Number(goalTarget), goalType)
                  setShowGoalModal(false)
                  setGoalTitle("")
                  setGoalTarget("")
                }}
              >
                Add
              </Button>
            </div>

          </div>
        </div>
      )}
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
      {editTodoModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">

          <div className="bg-white rounded-xl p-6 w-[400px] shadow-lg">

            <h2 className="text-lg font-semibold mb-4">Edit Todo</h2>

            <input
              type="text"
              placeholder="Enter todo title..."
              className="w-full border rounded-lg p-2 mb-4"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />

            <div className="flex items-center gap-2 mb-4">
              <input
                type="checkbox"
                id="completed"
                checked={editCompleted}
                onChange={(e) => setEditCompleted(e.target.checked)}
              />
              <label htmlFor="completed" className="text-slate-700">
                Mark as completed
              </label>
            </div>

            <div className="flex justify-end gap-2">

              <Button
                variant="secondary"
                onClick={() => setEditTodoModal(false)}
              >
                Cancel
              </Button>

              <Button className="bg-[#3B82F6] text-white" onClick={updateTodo}>
                Update
              </Button>

            </div>

          </div>

        </div>
      )}
      {editDailyModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white p-6 rounded-xl w-[400px]">

            <input
              type="text"
              value={editDailyTitle}
              onChange={(e) => setEditDailyTitle(e.target.value)}
              className="w-full border p-2 mb-4"
            />

            <label>
              <input
                type="checkbox"
                checked={editDailyCompleted}
                onChange={(e) => setEditDailyCompleted(e.target.checked)}
              />
              Completed
            </label>

            <div className="flex justify-end gap-2 mt-4">
              <Button onClick={() => setEditDailyModal(false)}>Cancel</Button>
              <Button onClick={updateDailyTasks}>Update</Button>
            </div>

          </div>
        </div>
      )}
      {showDailyModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white p-6 rounded-xl w-[400px]">

            <input
              type="text"
              placeholder="Enter daily task"
              value={addDailyInput}
              onChange={(e) => setAddDailyInput(e.target.value)}
              className="w-full border p-2 mb-4"
            />

            <div className="flex justify-end gap-2">
              <Button onClick={() => setShowDailyModal(false)}>Cancel</Button>
              <Button onClick={addDailyTasks}>Add</Button>
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

          <Card title="Daily Goals" items={dailyTasks} onDelete={deleteDailyTasks} onEdit={openDailyEdit}
            onAdd={() => setShowDailyModal(true)} />
          <Card
            title="Monthly Goals"
            items={monthlyGoals}
            onAdd={() => setShowGoalModal(true)}
            onDelete={handleDeleteGoal}
          />

          <Card
            title="Yearly Goals"
            items={yearlyGoals}
            onAdd={() => setShowGoalModal(true)}
            onDelete={handleDeleteGoal}
          />

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
                key={todo?.id}
                onClick={() => setActiveTodo(activeTodo === todo.id ? null : todo.id)}
                className="bg-slate-50 p-4 rounded-lg hover:bg-slate-100 transition-all duration-200 cursor-pointer flex justify-between items-center"
              >

                <div className="flex items-center gap-3">
                  {/* <input type="checkbox" checked={todo?.completed || false} readOnly /> */}
                  <p className={`${todo?.completed ? 'line-through text-slate-400' : 'text-slate-700'}`}>{todo?.title || "Untitled"}</p>
                </div>
                {activeTodo === todo?.id && (

                  <div className="flex gap-2 transition-all duration-200">

                    <Button size="sm" variant="secondary" onClick={(e) => {
                      e.stopPropagation()
                      openEditModal(todo)
                    }}>
                      Edit
                    </Button>

                    <Button size="sm" variant="destructive" onClick={(e) => {
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