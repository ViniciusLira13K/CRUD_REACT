import './App.css';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import axios from 'axios';

const URL = 'http://localhost:3333/todos';
const arraysTodos = [
    { name: 'dar banho dog', status: false },
    { name: 'lavar carro', status: true },
];
function App() {
    const [todos, setTodos] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [inputVisibility, setInputVisibility] = useState(false);
    const [selectedTodo, setSelectedTodo] = useState();

    async function createTodo() {
        const response = await axios.post(URL, { name: inputValue });
        getTodos();
        setInputVisibility(!inputVisibility);
        setInputValue('');
    }
    async function deleteTodo(todo) {
        const response = await axios.delete(URL + `/${todo.id}`);
        getTodos();
    }
    async function modifyStatusTodo(todo) {
        const { id, status } = todo;
        const response = await axios.put(URL, { id, status: !status });
        getTodos();
    }
    async function handleWithEditButtonClick(todo) {
        setSelectedTodo(todo);
        setInputValue(todo.name)
        setInputVisibility(true);
    }
    async function updateTodo() {
        const { id } = selectedTodo;
        console.log(`alterar ${id}  ${inputValue}`  )
        const response = await axios.put(URL, { id, name: inputValue});
        setSelectedTodo()
        setInputVisibility(false)
        getTodos();
    }
    async function handleWithNewButton() {
        setInputVisibility(!inputVisibility);
    }
    async function getTodos() {
        const response = await axios.get(URL);
        console.log('response === ', response);
        setTodos(response.data);
    }

    useEffect(() => {
        getTodos();
    }, []);
    const Todos = ({ todos }) => {
        return (
            <div className="todos">
                {todos.map((todo) => {
                    return (
                        <div className="todo">
                            <button
                                className="checkbox"
                                style={{
                                    backgroundColor: todo.status
                                        ? '#A879E6'
                                        : 'white',
                                }}
                                onClick={() => modifyStatusTodo(todo)}
                            ></button>
                            <p>{todo.name}</p>
                            <button
                                onClick={() => handleWithEditButtonClick(todo)}
                            >
                                <AiOutlineEdit
                                    size={20}
                                    color={'#64697b'}
                                ></AiOutlineEdit>
                            </button>
                            <button onClick={() => deleteTodo(todo)}>
                                <AiOutlineDelete
                                    size={20}
                                    color={'#64697b'}
                                ></AiOutlineDelete>
                            </button>
                        </div>
                    );
                })}
            </div>
        );
    };
    return (
        <div className="App">
            <header className="container">
                <div className="header">
                    <h1>Dont be lazzy</h1>
                </div>
                <Todos todos={todos}></Todos>
                <input
                    className="inputName"
                    style={{ display: inputVisibility ? 'block' : 'none' }}
                    value={inputValue}
                    onChange={(event) => {
                        setInputValue(event.target.value);
                    }}
                />
                <button
                    className="newTaskButton"
                    onClick={
                        inputVisibility
                            ? selectedTodo
                                ? updateTodo
                                : createTodo
                            : handleWithNewButton
                    }
                >
                    {inputVisibility ? 'confirm' : '+ New task'}
                </button>
            </header>
        </div>
    );
}

export default App;
