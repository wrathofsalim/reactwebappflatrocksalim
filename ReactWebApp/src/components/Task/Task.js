import React, { useEffect, useState } from "react";
import { useTaskContext } from "./TaskContext";
import TaskItems from "./TaskItems";
import TaskCreate from "./TaskCreate";


export default function Task() {
    const [Tasks, SetTasks] = useState([])
    const { getAllTasks } = useTaskContext();
    let counter = 1;

    useEffect(() => {
        SetTasks(getAllTasks())
    }, [])

    return (
        <div className="container-fluid">
            <div className="titlepage">
                <h2>
                    Tasks
                </h2>
            </div>
            <TaskCreate ></TaskCreate>
            <div className="">
                {getAllTasks().map(item =>
                    !item.isDone
                    &&
                    <TaskItems
                        key={item.id}
                        id={item.id}
                        counter={counter++}
                        text={item.text}
                        isDone={item.isDone}
                    />)
                }
                {getAllTasks().map(item =>
                    item.isDone
                    &&
                    <TaskItems
                        key={item.id}
                        id={item.id}
                        counter={counter++}
                        text={item.text}
                        isDone={item.isDone}
                    />)
                }

            </div>
        </div>
    )
}