import {useEffect, useState} from "react";
import axios from "axios";

export const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [err, setErr] = useState("");

    useEffect(() => {
        // Make HTTP request to example.com with the 'code' query parameter
        axios
            .get(`${import.meta.env.VITE_API_URL}/projects`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                }
            })
            .then((response) => {
                // Check if the response contains an error
                if (response.data.error) {
                    setErr(response.data.error);
                    return;
                }

                setProjects(response.data);
            })
            .catch(error => {
                setErr("Server is not available. Try again later.");
            });
    }, []);

    const projectList = projects.map(project => {
        return (
            <option value={project.gid} key={project.gid} className="project-select__option">
                {project.name}
            </option>
        );
    });

    const handleSelectChange = (event) => {
        window.location.href = `/projects/${event.target.value}`;
    }

    return (
        <div>
            {err && <p>Error: {err}</p>}
            {projects.length > 0 ? (
                <div className="projects">
                    <div className="vh-100 d-flex justify-content-center align-items-center flex-column">
                        <h1 className="projects__title title">Projects</h1>
                        <select name="projects" id="projects" className="form-select project-select" onChange={handleSelectChange}>
                            <option value="value" className="project-select__option">Select project</option>
                            {projectList}
                        </select>
                    </div>
                </div>
            ) : null}
        </div>
    );
};