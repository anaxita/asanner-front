import React, { useEffect, useState } from 'react';
import { Alert, Table } from 'react-bootstrap';
import { PencilSquare } from 'react-bootstrap-icons';

import { fetchEventSource } from '@microsoft/fetch-event-source';
import { EventSourcePolyfill } from 'event-source-polyfill';

import { makeHttpRequest } from '../api/make_http_request';
import { Header } from './Header';

export const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [err, setErr] = useState('');

  useEffect(() => {
    makeHttpRequest('GET', '/projects').then((r) => {
      const { data, err } = r;
      if (err) {
        setErr(err);
      } else {
        setProjects(data);
      }
    });

    const res = new EventSourcePolyfill(`${import.meta.env.VITE_API_URL}/sse`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    // res.onerror =
    //   res.onopen =
    res.onmessage = function (e) {
      console.log('e: ', e);
      const { project_id, project_state } = JSON.parse(e.data);
      const updatedProjects = [...projects];
      console.log('updatedProjects: ', updatedProjects);

      updatedProjects.forEach((project, i) => {
        console.log('project.gid: ', project.gid);
        console.log('project_id: ', project_id);

        if (project.gid === project_id) {
          console.log('project: ', project);
          project.state = project_state;

          updatedProjects[i] = {
            ...updatedProjects[i],
            ...project,
          };

          setProjects(updatedProjects);
        }
      });
    };
  }, []);

  const projectList = projects.map((project, index) => {
    return (
      <tr key={project.gid}>
        <td>{index + 1}</td>
        <td>{project.name}</td>
        <td>{project.task_prefix}</td>
        <td>{project.state}</td>
        <td>
          <a href={`/projects/${project.gid}`}>
            <PencilSquare className="me-2" />
            Редактировать
          </a>
        </td>
      </tr>
    );
  });

  if (err) {
    return <Alert variant="danger">{err}</Alert>;
  }

  return (
    <div className="bg-light vh-100">
      <Header />
      <div className="container">
        <div className="vh-100 d-flex align-items-center flex-column">
          <h1 className="projects__title title">Projects</h1>
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
