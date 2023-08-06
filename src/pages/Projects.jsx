import { useEffect, useState } from 'react';
import { Alert, Button, Spinner, Table } from 'react-bootstrap';
import { ArrowClockwise, PencilSquare } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';

import { EventSourcePolyfill } from 'event-source-polyfill';

import { makeHttpRequest } from '../api/make_http_request';

const fetchSse = (projects, setProjects) => {
  const res = new EventSourcePolyfill(`${import.meta.env.VITE_API_URL}/sse`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  res.onmessage = function (e) {
    const { project_id, project_state } = JSON.parse(e.data);
    const updatedProjects = [...projects];

    updatedProjects.forEach((project, i) => {
      if (project.gid === project_id) {
        project.state = project_state;

        updatedProjects[i] = {
          ...updatedProjects[i],
          ...project,
        };

        setProjects(updatedProjects);
      }
    });
  };
};

export const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [err, setErr] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    makeHttpRequest('GET', '/projects').then((r) => {
      const { data, err } = r;
      if (err) {
        setErr(err);
      } else {
        setProjects(data);
        fetchSse(data, setProjects);
      }
    });
  }, []);

  const refreshProjects = () => {
    setIsLoading(true);

    makeHttpRequest('GET', '/projects/refresh').then((r) => {
      const { data, err } = r;
      if (err) {
        setErr(err);
      } else {
        setProjects(data);
      }
      setIsLoading(false);
    });
  };

  const projectList = projects.map((project, index) => {
    return (
      <tr key={project.gid}>
        <td>{index + 1}</td>
        <td>{project.name}</td>
        <td>{project.task_prefix}</td>
        <td>{project.state}</td>
        <td>
          <Link to={`/projects/${project.gid}`}>
            <PencilSquare className="me-2" />
            Редактировать
          </Link>
        </td>
      </tr>
    );
  });

  if (err) {
    return <Alert variant="danger">{err}</Alert>;
  }

  return (
    <div className="bg-light">
      <div className="container">
        <div className="d-flex align-items-center flex-column">
          <h1 className="title">Projects</h1>
          <Button disabled={isLoading} className="mb-3 align-self-end" onClick={refreshProjects}>
            {isLoading ? (
              <Spinner className="me-2" animation="border" size="sm">
                <span className="visually-hidden">Обновление...</span>
              </Spinner>
            ) : (
              <ArrowClockwise className="me-2" />
            )}
            Обновить проекты
          </Button>
          <Table striped bordered hover className="text-center">
            <thead>
              <tr>
                <th>№</th>
                <th>Название</th>
                <th>Префикс задач</th>
                <th>Статус</th>
                <th>Настройки</th>
              </tr>
            </thead>
            <tbody>{projectList}</tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};
