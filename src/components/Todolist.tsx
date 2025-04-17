import {ChangeEvent, useState} from "react";
import {FilterTask} from "../App.tsx";
import './../App.css'

export type TaskProps = {
    id: string,
    title: string,
    isDone: boolean
}

type Props = {
    title: string
    tasks: TaskProps[]
    addTask: (taskTitle: string) => void
    deleteTask: (taskId: string) => void
    chekedTask: (taskId: string, cheked: boolean) => void
    filteredTask:(filter:FilterTask)=>void
    filter:string
};

export const Todolist = (props: Props) => {
    const {title, tasks, addTask, deleteTask, chekedTask,filteredTask,filter} = props

    const [taskTitle, setTaskTitle] = useState<string>('')
    const [erorr,setErorr]= useState('')

    const addTaskOnClick = () => {
        const taskTitleTrim = taskTitle.trim()
        if(taskTitleTrim === ''){
            setErorr('Пожалуйста напишите что нибудь')
        } if(taskTitleTrim.length>20){
            setErorr('Не более 20символов')
            setTaskTitle('')
        } else{
            addTask(taskTitle.trim())
            setTaskTitle('')
        }

    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        if(event.currentTarget.value !== ''){
            setErorr('')
        }
        setTaskTitle(event.currentTarget.value);
    }

    const onKeyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>)=>{
        if(event.key === 'Enter'){
            addTaskOnClick()
        }
    }

    const mapedTask = tasks.map(task => {
        return (
            <li>
                <input type="checkbox" checked={task.isDone}
                       onChange={(event) => chekedTask(task.id, event.currentTarget.checked)}/>
                <span>{task.title}</span>
                <button onClick={() => deleteTask(task.id)}>X</button>
            </li>
        )
    })

    return (
        <div>
            <h2>{title}</h2>
            <input className={erorr?'erorrInput':''} onKeyDown={onKeyDownHandler} type="text" value={taskTitle} onChange={onChangeHandler}/>
            <button  onClick={addTaskOnClick}>+</button>
            <div className={'erorrText'}>{erorr}</div>
            <ul>
                {mapedTask}
            </ul>
            <button className={filter === 'all'? 'activeButton' :''} onClick={()=>filteredTask('all')}>All</button>
            <button className={filter === 'active'? 'activeButton' :''} onClick={()=>filteredTask('active')}>Action</button>
            <button  className={filter === 'complited'? 'activeButton' :''} onClick={()=>filteredTask('complited')}>Complited</button>
        </div>
    );
};