import React, { useState, useEffect } from "react";


const Todolist = () => {
    const [inputValue, setInputValue] = useState("")
    const [tasks, setTasks] = useState([])
    const [activeIndex, setActiveIndex] = useState(true);

    const user = "Nuno15"

    useEffect(() => {
        fetch(`https://playground.4geeks.com/apis/fake/todos/user/${user}`, {
            method: "PUT",
            body: JSON.stringify(tasks),
            headers: {
                "Content-Type": "application/json"
            }
        });
    }, [tasks])

    useEffect(() => {
        const fetchTaskList = async () => {
            try {
                const response = await fetch(`https://playground.4geeks.com/apis/fake/todos/user/${user}`)

                if (!response.ok) {
                    alert(`The error status code is ${response.status} ${response.status === 404 ? `: User "${user}" does not exist!` : ""}`)
                    throw new Error(`The error status code is ${response.status} ${response.status === 404 ? `: User "${user}" does not exist!` : ""}`);
                }
                const taskItemsJson = await response.json();
                setTasks(taskItemsJson);

            } catch (error) {

                fetch(`https://playground.4geeks.com/apis/fake/todos/user/${user}`, {
                    method: "POST",
                    body: JSON.stringify([]),
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
            }

        };

        fetchTaskList()

    }, [])


    useEffect(() => {
        fetch(`https://playground.4geeks.com/apis/fake/todos/user/${user}`, {
            method: "PUT",
            body: JSON.stringify(tasks),
            headers: {
                "Content-Type": "application/json"
            }
        });
    }, [tasks])

    const deleteAllTasks = () => {
        const deleteMethod = {
            method: "DELETE",
            body: JSON.stringify([]),
            headers: {
                "Content-Type": "application/json"
            }
        };
    
        fetch(`https://playground.4geeks.com/apis/fake/todos/user/${user}`, deleteMethod)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                window.location.reload();
            })
            .then(() => {
                fetch(`https://playground.4geeks.com/apis/fake/todos/user/${user}`, {
                    method: "POST",
                    body: JSON.stringify([]),
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
            })
            .catch(err => console.log(err));
    };


return (
    <>
        <div className="container border-rounded">
            <ul className="list-unstyled border rounded border-dark border-3 p-2">
                <li><input
                    type="text" className="w-100 p-2 bg-light" placeholder={tasks == 0 ? "No Task! Shall we add one?" : "Enter a task"}
                    onChange={(e) => setInputValue(e.target.value)}
                    value={inputValue}
                    onKeyUp={(e) => {
                        if (e.key === "Enter" && inputValue) {
                            setTasks([...tasks, { "label": inputValue, "done": false }])
                            setInputValue("")
                        }
                    }
                    } /></li>
                <div>
                    {tasks.map((task, index) => (
                        <li key={index} className="w-100 p-2 border-top border-dark border-1 d-flex p-2 justify-content-between"
                            onMouseOver={() => {
                                setActiveIndex(index)
                            }}
                        >{task.label}{" "}
                            <i class={index == activeIndex ? 'fas fa-times' : 'fas fa-times xHidden'}
                                onClick={
                                    () => setTasks(tasks.filter((t, currentIndex) => index != currentIndex))}
                            ></i></li>
                    ))}
                </div>
            </ul>
            <div className="container">
                <p>{tasks.length} items left</p>
            </div>
        </div>
        <div className="d-flex justify-content-center">
            <button type="button" onClick={deleteAllTasks} className="btn btn-danger btn-lg">Clear the list</button>
        </div>
    </>
);
};



export default Todolist;