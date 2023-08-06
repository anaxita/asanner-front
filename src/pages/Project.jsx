import { useEffect, useState } from 'react';
import { Alert, Badge, Card, Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

import { makeHttpRequest } from '../api/make_http_request';

export const Project = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState({
    // Example project data
    current_task_prefix_id: 0,
    gid: '',
    name: '',
    state: '',
    sync_enabled: false,
    task_prefix: '',
    user_id: '',
  });

  const [err, setErr] = useState('');

  useEffect(() => {
    makeHttpRequest('GET', `/projects/${id}`).then((r) => {
      const { data, err } = r;
      if (err) {
        setErr(err);
      } else {
        setProject(data);
      }
    });
  }, [id]);

  const handleSyncButtonClick = (e) => {
    e.preventDefault();

    makeHttpRequest('PUT', `/projects/${id}`, {
      task_prefix: project.task_prefix,
      sync_enabled: project.sync_enabled,
    })
      .then((r) => {
        const { data, err } = r;
        if (err) {
          setErr(err);
        } else {
          setProject(data);
        }
      })
      .finally(() => {
        navigate('/projects');
      });
  };

  const handleCancelButtonClick = () => {
    navigate('/projects');
  };

  if (err) {
    return <Alert variant="danger">{err}</Alert>;
  }

  return (
    <div className="d-flex justify-content-center">
      <Card className="w-25">
        <Card.Header as="h5">{project.name}</Card.Header>
        <Card.Body>
          <Form.Label htmlFor="input_task_prefix">Префикс задачи</Form.Label>
          <Form.Control
            value={project.task_prefix}
            onChange={(e) => setProject({ ...project, task_prefix: e.target.value })}
            type="text"
            placeholder="T- или например Task-"
            id="input_task_prefix"
            aria-describedby="task prefixed text"
          />
          <Form.Text id="input_task_prefix_help" muted>
            Пример задачи с текущим префиксом:{' '}
            {project.task_prefix ? `"${project.task_prefix}21 Отправить отчёт"` : '"Отправить отчёт"'}
          </Form.Text>

          <div className="mt-3 d-flex gap-2">
            <Form.Check
              checked={project.sync_enabled}
              onChange={(e) => setProject({ ...project, sync_enabled: e.target.checked })}
              type="switch"
              label="Синрхонизировать автоматически"
              id="input_sync"
            />
            <Badge bg="primary">премиум</Badge>
          </div>

          <div className="mt-5 d-flex justify-content-around">
            <Button variant="success" type="button" onClick={handleSyncButtonClick}>
              Синхронизировать
            </Button>
            <Button variant="danger" type="button" onClick={handleCancelButtonClick}>
              Отмена
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};
