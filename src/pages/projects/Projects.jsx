import { useEffect, useState } from 'react';
import { Alert, Button, Spinner, Table } from 'react-bootstrap';
import { ArrowClockwise, PencilSquare } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';

import { EventSourcePolyfill } from 'event-source-polyfill';

import { makeHttpRequest } from '../../api/makeHttpRequest';
import { ProjectStateFromAPI } from '../../utils/mappers';
import '../index.css';
import './projects.css';

const fetchSse = (projects, setProjects) => {
  const res = new EventSourcePolyfill(`${import.meta.env.VITE_API_URL}/sse`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('access_token')}`,
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
  const [searchValue, setSearchValue] = useState('');
  const [searchProjects, setSearchProjects] = useState([]);

  useEffect(() => {
    makeHttpRequest('GET', '/projects').then((r) => {
      const { data, error } = r;
      if (error) {
        setErr(error);
      } else {
        setProjects(data);
        setSearchProjects(data);
        fetchSse(data, setProjects);
      }
    });
  }, []);

  const refreshProjects = () => {
    setIsLoading(true);

    makeHttpRequest('GET', '/projects/refresh').then((r) => {
      const { data, error } = r;
      if (error) {
        setErr(error);
      } else {
        setProjects(data);
      }
      setIsLoading(false);
    });
  };

  const searchHandler = (event) => {
    setSearchValue(event.target.value);
    if (!event.target.value) {
      setSearchProjects(projects);
    } else {
      const fiteredProjects = projects.filter((project) => {
        return project.name.toLowerCase().includes(event.target.value.toLowerCase());
      });
      setSearchProjects(fiteredProjects);
    }
  };

  const projectList = searchProjects.map((project, index) => {
    return (
      <tr key={project.gid}>
        <td>{index + 1}</td>
        <td>{project.name}</td>
        <td>{project.task_prefix}</td>
        <td>{ProjectStateFromAPI(project.state)}</td>
        <td>
          <Link to={`/projects/${project.gid}`} className="btn btn-sm btn-outline-dark">
            <PencilSquare className="me-2" />
            Настроить
          </Link>
        </td>
      </tr>
    );
  });

  if (err) {
    return <Alert variant="danger">{err}</Alert>;
  }

  return (
    <div className="">
      <div className="container">
        <div className="d-flex align-items-center flex-column">
          <h1 className="title">Проекты</h1>
          <div className="d-flex justify-content-between w-100 gap-3  mb-3 mt-3">
            <div className="input-group w-25">
              <input
                type="text"
                className="form-control"
                placeholder="Поиск проектов"
                value={searchValue}
                onChange={searchHandler}
              />
            </div>
            <Button disabled={isLoading} className="" variant="outline-warning" onClick={refreshProjects}>
              {isLoading ? (
                <Spinner className="me-2" animation="border" size="sm">
                  <span className="visually-hidden">Обновление...</span>
                </Spinner>
              ) : (
                <ArrowClockwise className="me-2" />
              )}
              Обновить проекты
            </Button>
          </div>
          <div className="rounded-4 w-100">
            <Table striped bordered hover className="text-center align-middle border-secondary ">
              <thead>
                <tr>
                  <th>№</th>
                  <th>Проект</th>
                  <th>Префикс задач</th>
                  <th>Статус синхронизации</th>
                  <th>Настройки</th>
                </tr>
              </thead>
              <tbody>{projectList}</tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};
