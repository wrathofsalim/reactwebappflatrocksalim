import Task from "./Task";
import React, { useEffect, useState } from "react";
import { useTaskContext } from "./TaskContext";

export default function TaskItems(prop) {
    const { completedTasks } = useTaskContext();
    const [checkbox, SetCheckBox] = useState(prop.isDone);

    const handleChangeIsDone = (e) => {
        if (e.target.checked) {
            SetCheckBox(false);
            completedTasks(prop.id, true)
        }
        else {
            SetCheckBox(true);
            completedTasks(prop.id, false)
        }
    };

    return (
        <>
            <br /><br />
            {
                !prop.isDone
                &&
                <div className="row  justify-content-center">
                    <div style={{ width: 600, height: 40 }} className="row d-flex justify-content-begin">
                        <input style={{ width: 40, height: 40, margin: 10 }} type="checkbox" onClick={handleChangeIsDone} />
                        <h1 style={{ height: 40, margin: 10 }}>{prop.counter}</h1>
                        <h1 style={{ height: 40, margin: 10 }}>{prop.text}</h1>
                    </div>
                </div>}{
                prop.isDone
                &&
                <div style={{ textDecorationLine: "line-through" }} className="row d-flex justify-content-center">
                    <div style={{ width: 600, height: 60 }} className="row d-flex justify-content-begin">
                        <input style={{ width: 40, height: 40, margin: 10 }} type="checkbox" onClick={handleChangeIsDone} checked />
                        <h1 style={{ height: 40, margin: 10 }}>{prop.counter}</h1>
                        <h1 style={{ height: 40, margin: 10 }}>{prop.text}</h1>
                    </div>
                </div>
            }
        </>

    )
}
