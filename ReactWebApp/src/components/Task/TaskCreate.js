import React, { useEffect, useState } from "react";
import { useTaskContext } from "./TaskContext";

export default function TaskCreate(prop) {
    const { addItemToTask, getTaskQuantity } = useTaskContext();
    const [text, SetText] = useState("")

    const addToTaskHandler = () => {
        addItemToTask(text);
    }

    const handleChangeSetText = (e) => {
        SetText(e.target.value);
    };

    return (
        <div className="row d-flex justify-content-center">
            <input className="col-sm-6" value={text || ""} onChange={e => handleChangeSetText(e)} type="text" id="text" />

            <div className='buttons col-sm-2'>
                <button style={{ fontSize: 60 }} className="btn-primary btn col-sm-12" onClick={addToTaskHandler}>
                    +
                </button>
            </div>
        </div>

    )
}