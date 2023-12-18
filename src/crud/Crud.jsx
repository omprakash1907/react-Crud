import React, { useEffect, useState } from 'react'
import './crud.css'

function Crud() {
    const intial = {
        name: '',
        email: '',
    }
    const [input, setInput] = useState(intial)
    const [lists, setList] = useState(() => {
        return JSON.parse(localStorage.getItem('users')) || []
    })
    const [error, setError] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const [noRecords, setNoRecords] = useState(false);

    useEffect(() => {
        localStorage.setItem("users", JSON.stringify(lists))
    }, [lists])

    useEffect(() => {
        // Check if there is no data
        if (lists.length === 0) {
            setNoRecords(true);
        } else {
            setNoRecords(false);
        }
    }, [lists]);

    const handleChange = (e) => {
        const key = e.target.name
        const value = e.target.value
        setInput({ ...input, [key]: value })
    }
    // console.log(lists)

    //Errors------------------------------------------------>
    const checkValidation = (input) => {
        let error = {}

        if (input.name === '' || input.name === ' ') {
            error.name = 'Invalid Name*'
        }
        if (input.email === '' || input.email === ' ') {
            error.email = 'Invalid Email*'
        }
        return error
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const validate = checkValidation(input)
        setError(validate)
        const check = Object.keys(validate)
        if (check.length < 1) {
            setList([...lists, input]);
            setInput({
                name: '',
                email: ''
            })
            setEditMode(false)
        }
        if (editMode) {
            lists[editIndex] = input;
            setList(lists);
            setEditMode(false)
        } 
    }

    // delete------------------------------------------------>

    const handleDelete = (id) => {
        const newList = [...lists]
        newList.splice(id, 1)
        setList(newList)
    }

    // Edit------------------------------------------------>

    const handleEdit = (id) => {
        setEditMode(true)
        const editList = [...lists]
        editList.splice(id, 1)
        setInput(lists[id])
        setEditIndex(id);
    }

    return (
        <>
            <div style={{ height: '100px' }} className='w-100'></div>
            <div className="container col-12 d-flex justify-content-center mt-5 position-relative ">
                <div className="col-6 d-flex justify-content-center position-relative mt-5">
                    <form action="" onSubmit={handleSubmit} className=''>
                        <input type="text" onChange={handleChange} name='name' value={input.name} className='d-block my-2' placeholder='Username' />
                        <div className=' text-danger fs-6'>{error && error.name}</div>
                        <input type="email" onChange={handleChange} name='email' value={input.email} className='d-block my-2' placeholder='Email' />
                        <div className=' text-danger fs-6'>{error && error.email}</div>
                        <button>{editMode ? 'Update' : 'Add'}</button>
                    </form>
                </div>
                <table class="table  w-50 border-black ">
                    <thead>
                        <tr>
                            <th scope="col">Sr No.</th>
                            <th scope="col">Name</th>
                            <th scope="col">email</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {noRecords ? (
                            <>
                                <td className='text-center fw-bold  pe-0 py-3' colSpan={4}>No Records</td>
                                <td className='p-0'></td>
                                <td className='p-0'></td>
                                <td className='p-0'></td>
                            </>
                        ) : (
                            lists.map((list, index) => {
                                return (
                                    <tr>
                                        <th scope="row">{index + 1}</th>
                                        <td>{list.name}</td>
                                        <td>{list.email}</td>
                                        <td><button className='btn btn-primary ' onClick={() => handleDelete(index)}>Delete</button>
                                            <button className=' ms-1 btn btn-success' onClick={() => handleEdit(index)}>Edit</button></td>
                                    </tr>
                                )
                            })
                        )
                        }
                    </tbody>
                </table>

            </div>
        </>

    )
}

export default Crud
