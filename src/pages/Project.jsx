import React, {useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
import {Button} from "react-bootstrap";

export const Project = () => {
    const {id} = useParams();

    const [project, setProject] = useState({
        // Example project data
        current_task_prefix_id: 0,
        gid: "",
        name: "",
        state: "",
        sync_enabled: false,
        task_prefix: "",
        user_id: "",
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

        axios
            .post(`${import.meta.env.VITE_API_URL}/projects/${id}`,
                {
                    task_prefix: project.task_prefix,
                    sync_enabled: project.sync_enabled,
                },
                {
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

        window.location.href = `/projects/${id}` // TODO я хуй знает как отключить обновление страницы после нажатия на кнопку, она тупо пропадает, пока сделал так.
    };

    const handleCancelButtonClick = () => {
        window.location.href = "/projects";
    };

    return (
        <div>
            {err && <p>Error: {err}</p>}
            {project && (
                <div className="project">
                    <h1>{project.name}</h1>
                    <ul>
                        <li>Sync state: {project.state}</li>
                        <li>
                            <label>Task prefix:</label>
                            <input
                                type="text"
                                value={project.task_prefix}
                                onChange={(e) =>
                                    setProject({...project, task_prefix: e.target.value})
                                }
                            />
                        </li>
                        <li>
                            <label>Sync enabled:</label>
                            <input
                                type="checkbox"
                                checked={project.sync_enabled}
                                onChange={(e) =>
                                    setProject({...project, sync_enabled: e.target.checked})
                                }
                            />
                        </li>
                    </ul>
                    <Button variant="primary" onClick={handleSyncButtonClick}>Sync</Button>
                    <Button variant="danger" onClick={handleCancelButtonClick}>Cancel</Button>
                </div>
            )}
        </div>
    );
};

export default Project;
