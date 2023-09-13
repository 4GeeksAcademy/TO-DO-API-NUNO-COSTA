import React, { useState, useEffect } from "react";


const Todolist = () => {
    const [inputValue, setInputValue] = useState("")
    const [toDos, setToDos] = useState([])
    const [activeIndex, setActiveIndex] = useState(true);

    const url = 'https://playground.4geeks.com/apis/fake/todos/user/Nuno1';




    useEffect(() => {

        fetch(url)
            .then(res => {
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }

                return res.json();
            }).then(data => {
                console.log(data)
            }).catch(error => {
                if (error.message.includes("404")) {
                    fetch(url, {
                        method: 'POST',
                        body: JSON.stringify([]),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                        .then(res => res.json())
                        .then(data => {
                            console.log(data)
                        })
                }
            });

    }, [])


    // const getToDos = async () => {
    //     const response = await fetch(url)
    //     const data = await response.json;
    //     return data;
    // };

    // getToDos()
    //     .then(data => console.log('resolved', data));

    const updateTask = (e) => {
        if (e.key === "Enter") {
            const putRequest = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify([...toDos, e.target.value])
            };
            fetch(url, putRequest)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error ${response.status}`);
                    }
                    return response.json();
                })
                .then(updatedData => {
                    setToDos([...toDos, e.target.value]);
                    setInputValue("");
                    console.log('Data updated:', updatedData);
                })
                .catch(error => {
                    console.error('Error updating data:', error);
                });
        }
    };


    const deleteTasks =() =>{
        const deleteRequest = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify([])
        };
        fetch(url, deleteRequest)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error ${response.status}`);
                }
                return response.json();
            })
            .then(deletedData => {
                setToDos([]);
                setInputValue("");
                console.log('Deleted Successfully', deletedData);
            })
            .then(
                fetch(url)
                    .then(res => {
                        if (!res.ok) {
                            throw new Error(`HTTP error! Status: ${res.status}`);
                        }

                        return res.json();
                    }).then(data => {
                        console.log(data)
                    }).catch(error => {
                        if (error.message.includes("404")) {
                            fetch(url, {
                                method: 'POST',
                                body: JSON.stringify([]),
                                headers: {
                                    'Content-Type': 'application/json'
                                }
                            })
                                .then(res => res.json())
                                .then(data => {
                                    console.log(data)
                                })
                        }
                    }))
    };


    return (
        <>
            <div className="container border-rounded">
                <ul className="list-unstyled border rounded border-dark border-3 p-2">
                    <li><input
                        type="text" className="w-100 p-2 bg-light" placeholder={toDos == 0 ? "No Task! Shall we add one?" : "Enter a task"}
                        onChange={(e) => setInputValue(e.target.value)}
                        value={inputValue}
                        onKeyUp={updateTask
                        } /></li>
                    <div>
                        {toDos.map((item, index) => (
                            <li key={index} className="w-100 p-2 border-top border-dark border-1 d-flex p-2 justify-content-between"
                                onMouseOver={() => {
                                    setActiveIndex(index)
                                }}
                            >{item}{" "}
                                <i class={index == activeIndex ? 'fas fa-times' : 'fas fa-times xHidden'}
                                    onClick={
                                        () => setToDos(toDos.filter((t, currentIndex) => index != currentIndex))}
                                ></i></li>
                        ))}
                    </div>
                </ul>
                <div className="container">
                    <p>{toDos.length} items left</p>
                </div>
            </div>
            <div className="d-flex justify-content-center">
                <button type="button" onClick={deleteTasks} className="btn btn-danger btn-lg">Clear the list</button>
            </div>
        </>
    );
};



export default Todolist;