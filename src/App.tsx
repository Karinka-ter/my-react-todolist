import './App.css'
import {useState} from "react";
import {TaskProps, Todolist} from "./components/Todolist.tsx";
import {v1} from "uuid";

export type FilterTask = 'all'| 'active'| 'complited'|''

function App() {
    const [tasks, setTasks] = useState<TaskProps[]>([
        {id: v1(), title: 'HTML&CSS', isDone: false},
        {id: v1(), title: 'React', isDone: false},
        {id: v1(), title: 'JS', isDone: false}
    ])


    const [filter,setFilter]=useState<FilterTask>('')


    const deleteTask = (taskId: string) => {
        setTasks(tasks.filter(task => task.id !== taskId))
    }

    const addTask = (taskTitle: string) => {
        setTasks([{id: v1(), title: taskTitle, isDone: false}, ...tasks])
    }

    const chekedTask = (taskId:string,cheked:boolean)=>{
        setTasks(tasks.map(task=> task.id===taskId? {...task,isDone:cheked}:task))
    }

    const filteredTask = (filter:FilterTask)=>{
        setFilter(filter)
    }

    const taskFileredSwich=()=>{
        switch (filter) {
            case 'active':
                return tasks.filter(task => !task.isDone);
            case 'complited':
                return tasks.filter(task => task.isDone);
            default:
                return tasks;
        }
    }

     const filterTask = taskFileredSwich()


    return (
        <Todolist
            title={'My todolist tasks'}
            tasks={filterTask}
            addTask={addTask}
            deleteTask={deleteTask}
            chekedTask={chekedTask}
            filteredTask={filteredTask}
            filter={filter}
        />
    )
}

export default App
