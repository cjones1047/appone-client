import React from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';

const EditDepModal = (props) => {
    const {
        show,
        onHide,
        setRefresh,
        depid,
        depname
    } = props

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch((process.env.REACT_APP_API+'department/'), {
            method: 'PUT',
            headers: {
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                DepartmentId: e.target.DepartmentId.value,
                DepartmentName: e.target.DepartmentName.value
            })
        })
            .then(res => res.json())
            .then((result) => {
                alert(result);
                },
                (error) => {
                    alert('Failed');
                }
            )
            .then(setRefresh(prev => !prev))
    }

    return (
        <div className='container'>
            <Modal
                size='lg'
                aria-labelledby='
                contained-modal-title-vcenter'
                centered
                show={show}
            >
                <Modal.Header>
                    <Modal.Title
                        id="contained-modal-title-vcenter"
                    >
                        Edit Department
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col sm={6}>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group
                                    controlId='DepartmentId'
                                    style={{marginBottom: '10px'}}
                                >
                                    <Form.Label>
                                        DepartmentId
                                    </Form.Label>
                                    <Form.Control
                                        type='text'
                                        name='DepartmentId'
                                        required
                                        disabled
                                        defaultValue={depid}
                                        placeholder='DepartmentId'
                                    />
                                </Form.Group>
                                <Form.Group
                                    controlId='DepartmentName'
                                    style={{marginBottom: '10px'}}
                                >
                                    <Form.Label>
                                        DepartmentName
                                    </Form.Label>
                                    <Form.Control
                                        type='text'
                                        name='DepartmentName'
                                        required
                                        defaultValue={depname}
                                        placeholder='DepartmentName'
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Button
                                        variant='primary'
                                        type='submit'
                                    >
                                        Update Department
                                    </Button>
                                </Form.Group>
                            </Form>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant='danger'
                        onClick={onHide}
                    >
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default EditDepModal