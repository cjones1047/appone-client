import React from 'react';
import { useState, useEffect } from 'react';

import { Spinner, Table, Button, ButtonToolbar } from 'react-bootstrap';

import AddDepModal from './AddDepModal';

const Department = () => {

    const [refresh, setRefresh] = useState(null)
    const [deps, setDeps] = useState([])
    const [addModalShow, setAddModalShow] = useState(false)

    useEffect(() => {
        fetch(process.env.REACT_APP_API+'department')
            .then(response => response.json())
            .then(data => setDeps(data))
    }, [refresh])

    if(!deps) return (
        <Spinner/>
    )

    return(
        <>
            <div className='mt-5 d-flex justify-content-left' >
                <Table
                    className='mt-4'
                    striped
                    bordered
                    hover
                    size='sm'    
                >

                    <thead>
                        <tr>
                            <th>DepartmentId</th>
                            <th>DepartmentName</th>
                            <th>Options</th>
                        </tr>
                    </thead>

                    <tbody>
                        {deps.map(dep => 
                            <tr key={dep.DepartmentId}>
                                <td>{dep.DepartmentId}</td>
                                <td>{dep.DepartmentName}</td>
                                <td>Edit/Delete</td>
                            </tr>
                        )}
                    </tbody>

                </Table>

                
            </div>

            <ButtonToolbar>
                <Button
                    variant='primary'
                    onClick={() => setAddModalShow(true)}
                >
                    Add Department
                </Button>

                <AddDepModal 
                    show={addModalShow}
                    onHide={() => setAddModalShow(false)}
                    setRefresh={setRefresh}
                />
            </ButtonToolbar>
        </>
    )

}

export default Department