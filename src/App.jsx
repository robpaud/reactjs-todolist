import { useState, useEffect } from "react"
import TodoInput from "./components/TodoInput"
import TodoList from "./components/TodoList"

function App() {
  const [todos, setTodos] = useState([])
  const [todoValue, setTodoValue] = useState('')

  //this function ensures the new data is always used
  //even when the page is refreshed
  function persistData(newList) {
    localStorage.setItem('todos', JSON.stringify({ todos: 
    newList }))
  }

  //this function will add new todos when inputted
  function handleAddTodos(newTodo) {
    const newTodoList = [...todos, newTodo]
    persistData(newTodoList)
    setTodos(newTodoList)
  }

  //this function will delete todos in the todoList
  function handleDeleteTodo(index) {
    const newTodoList = todos.filter((todo, todoIndex) => {
      return todoIndex !== index
    })
    persistData(newTodoList)
    setTodos(newTodoList)
  }

  //this function allows to edit todos in the todoList
  function handleEditTodo(index){
    const valueToBeEdited = todos[index]
    setTodoValue(valueToBeEdited)
    handleDeleteTodo(index)
  }

  //this function will read all of the todos
  useEffect(() => {
    if(!localStorage) { //if local storage does not exists
      return
    }

    let localTodos = localStorage.getItem('todos')
    if(!localTodos) { //if localTodos does not exist
      return
    }
    localTodos = JSON.parse(localTodos).todos
    setTodos(localTodos)

  }, [])

  return (
    <>
      <TodoInput todoValue={todoValue} setTodoValue={setTodoValue} 
      handleAddTodos={handleAddTodos}/>
      <TodoList handleEditTodo={handleEditTodo} 
      handleDeleteTodo={handleDeleteTodo} todos={todos}/>
    </>
  )
}

export default App
