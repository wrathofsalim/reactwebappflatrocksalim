import React, { createContext, useContext } from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';

export const TaskContext = createContext([]);

export const useTaskContext = () => {
    return useContext(TaskContext);
}

export const TaskProvider = ({ children }) => {
    const [taskItems, SetTaskItems] = useLocalStorage('Tasks', //{});
        [
            { id: 0, text: "Wake Up", isDone: false },
            { id: 1, text: "Make a coffee", isDone: false },
            { id: 2, text: "Brush your teeth", isDone: false }
        ]
    );

    const getTaskQuantity = () => {
        return Object.values(taskItems).length;
    }

    const getAllTasks = () => {
        return Object.values(taskItems);
    }

    const addItemToTask = (text) => {
        let tempId = Object.values(taskItems).length;
        return SetTaskItems(
            {
                ...taskItems,
                [tempId]: { id: tempId, text: text, isDone: false }
            }
        )
    }

    const completedTasks = (id, isDone) => {
        let tasks = Object.values(taskItems)

        tasks.map(item => {
            if (item.id == id) {
                console.log("hi")
                return SetTaskItems({
                    ...taskItems,
                    [id]: { id: item.id, text: item.text, isDone: isDone }
                })
            }
        })
    }

    const clear = () => {
        SetTaskItems({});
    }

    return (
        <TaskContext.Provider value={{ getAllTasks, getTaskQuantity, addItemToTask, completedTasks, clear }}>
            {children}
        </TaskContext.Provider>
    );

}