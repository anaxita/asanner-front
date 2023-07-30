import React, {useEffect, useState} from "react";
import axios from "axios";
import {Alert, Badge, ButtonGroup, Card, Form} from "react-bootstrap";
import {useParams} from "react-router-dom";
import {Button} from "react-bootstrap";
import {Header} from "./Header";
import {makeHttpRequest} from "../api/make_http_request";

export const Project = () => {
    const {id} = useParams();

    const [project, setProject] = useState({
        // Example project data
        current_task_prefix_id: 0, gid: "", name: "", state: "", sync_enabled: false, task_prefix: "", user_id: "",
    });

    const [err, setErr] = useState("");

    useEffect(() => {
        axios
            .get(`${import.meta.env.VITE_API_URL}/projects/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
            .then((response) => {
                const data = response.data;

                // Check if the response contains an error
                if (data.error) {
                    setErr(data.error);
                } else {
                    setProject(data);
                }
            })
            .catch((error) => {
                setErr("Server is not available. Try again later.");
            });
    }, [id]);

    const handleSyncButtonClick = (e) => {
        e.preventDefault();

        makeHttpRequest('PUT', `/projects/${id}`, {
            task_prefix: project.task_prefix, sync_enabled: project.sync_enabled,
        })
            .then(r => {
                const {data, err} = r;
                if (err) {
                    setErr(err);
                } else {
                    setProject(data);
                }
            })
            .finally(() => {
                window.location.href = `/projects/${id}` // TODO я хуй знает как отключить обновление страницы после нажатия на кнопку, она тупо пропадает, пока сделал так.
            });
    };

    const handleCancelButtonClick = () => {
        window.location.href = "/projects";
    };

    if (err) {
        return <Alert variant="danger">{err}</Alert>;
    }

    return (<div className="bg-light vh-100">
            <Header/>
            <div className="d-flex justify-content-center">
                <Card className="w-25">
                    <Card.Header as="h5">{project.name}</Card.Header>
                    <Card.Body>
                        <Form.Label htmlFor="input_task_prefix">Префикс задачи</Form.Label>
                        <Form.Control
                            value={project.task_prefix}
                            onChange={(e) => setProject({...project, task_prefix: e.target.value})}
                            type="text"
                            placeholder="T- или например Task-"
                            id="input_task_prefix"
                            aria-describedby="task prefixed text"
                        />
                        <Form.Text id="input_task_prefix_help" muted>
                            Пример задачи с текущим
                            префиксом: {project.task_prefix ? `"${project.task_prefix}21 Отправить отчёт"` : '"Отправить отчёт"'}
                        </Form.Text>


                        <div className="mt-3 d-flex gap-2">
                            <Form.Check
                                checked={project.sync_enabled}
                                onChange={(e) => setProject({...project, sync_enabled: e.target.checked})}
                                type="switch"
                                label="Синрхонизировать автоматически"
                                id="input_sync"
                            />
                            <Badge bg="primary">премиум</Badge>
                        </div>

                        <div className="mt-5 d-flex justify-content-around">
                            <Button variant="success" type="button" onClick={handleSyncButtonClick}>Синхронизировать</Button>
                            <Button variant="danger" type="button" onClick={handleCancelButtonClick}>Отмена</Button>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        </div>)
};