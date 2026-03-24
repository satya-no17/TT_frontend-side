'use client'
import addTodo from "@/utils/addtodo"
import deleteTodo from "@/utils/deleteTodo"
import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
const Todo = () => {

    const [todos, setTodos] = useState([])
    const [addtodo, setaddtodo] = useState("")

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

    return (
        <div>
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
        </div>
    )
}

export default Todo