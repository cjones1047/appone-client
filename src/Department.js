import React from 'react';
import { useState, useEffect } from 'react';

import { Spinner, Table, Button, ButtonToolbar } from 'react-bootstrap';

import AddDepModal from './AddDepModal';
import EditDepModal from './EditDepModal';

const Department = () => {

    const [refresh, setRefresh] = useState(null)
    const [deps, setDeps] = useState([])
    const [addModalShow, setAddModalShow] = useState(false)
    const [editModalShow, setEditModalShow] = useState(false)
    const [depid, setDepid] = useState(null)
    const [depname, setDepname] = useState(null)

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
                                <td>
                                    <ButtonToolbar>
                                        <Button className='mr-2' variant='info'
                                        onClick={() => {
                                            setEditModalShow(true);
                                            setDepid(dep.DepartmentId);
                                            setDepname(dep.DepartmentName)
                                        }}
                                        >
                                            Edit
                                        </Button>

                                        <EditDepModal
                                            show={editModalShow}
                                            onHide={() => setEditModalShow(false)}
                                            setRefresh={setRefresh}
                                            depid={depid}
                                            depname={depname}
                                        />
                                    </ButtonToolbar>
                                </td>
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