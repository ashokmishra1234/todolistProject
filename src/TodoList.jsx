
import {useState} from "react";
import { v4 as uuidv4 } from 'uuid';

export default function TodoList() {
    let [todos, setTodos] = useState([]);
    let [newTodo, setNewTodo] = useState("");

    let addNewTask = () => {
        if (newTodo.trim()) { 
            setTodos((prevTodos) => {
                return [...prevTodos, {task: newTodo, id: uuidv4(), isDone: false}]
            });
            setNewTodo("");
        }
    };

    let updateTodoValue = (event) => {
        setNewTodo(event.target.value);
    };

    let deleteTodo = (id) => {
        setTodos((prevTodos) => prevTodos.filter((prevTodos) => prevTodos.id !== id));
    };
    let MarkAsDone = (id) => {
        setTodos((prevTodos) =>
        prevTodos.map((todo) => {
            if (todo.id === id) {
                return {
                    ...todo,
                    isDone: !todo.isDone
                };
            } else {
                return todo;
            }
        }));
    }

    return (
        <div className="container">
            <h2>MY TASK</h2>
            <div className="inputTask">
                <input 
                    placeholder="add a task" 
                    onChange={updateTodoValue} 
                    value={newTodo}
                ></input>
                &nbsp;&nbsp;&nbsp;
                <button onClick={addNewTask} id="AddButton">Add Task</button>
                <br></br>
                <br></br>
            </div>
            {todos.length > 0 && (
                <div className="tasks">
                    
                    <div>
                        {todos.map((todo) => ( 
                            <div key={todo.id} className="taskData">
                                <input 
                                    type="checkbox" 
                                    checked={todo.isDone} 
                                    onChange={() => MarkAsDone(todo.id)} 
                                    id="markDoneCheckbox"
                                />
                                <span style={todo.isDone ? {textDecorationLine: "line-through"} : {}}>
                                    {todo.task}
                                </span>
                                &nbsp;&nbsp;&nbsp;
                                <i onClick={() => deleteTodo(todo.id)} id="deleteIcon" className="fa-solid fa-trash"></i>
                            </div>
                        ))}
                    </div>
                    <br></br>
                </div>
            )}
        </div>
    )
}

