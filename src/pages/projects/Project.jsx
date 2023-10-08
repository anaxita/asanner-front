import { useEffect, useState } from 'react';
import { Alert, Button, Card, Form, OverlayTrigger, Spinner, Tooltip } from 'react-bootstrap';
import { QuestionCircle } from 'react-bootstrap-icons';
import { useNavigate, useParams } from 'react-router-dom';

import { makeHttpRequest } from '../../api/makeHttpRequest';
import { ProjectStateFromAPI } from '../../utils/mappers';


export const Project = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // const profile = JSON.parse(localStorage.getItem('profile'));

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
      const { data, error } = r;
      if (error) {
        setErr(error);
      } else {
        setProject(data);
      }
    });
  }, [id]);

  const handleSyncButtonClick = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErr('');

    const { error } = await makeHttpRequest('PUT', `/projects/${id}а`, {
      task_prefix: project.task_prefix,
      sync_enabled: project.sync_enabled,
    });

    if (error) {
      setErr(error);
    } else {
      navigate('/projects');
    }
    setIsLoading(false);
  };

  const handleCancelButtonClick = () => {
    navigate('/projects');
  };

  return (
    <>
      {err && <Alert variant="danger">{err}</Alert>}

      <div className="d-flex justify-content-center">
        <Card className="col-xs-12" bg="secondary" text="light">
          <Card.Header as="h5">
            {project.name} {ProjectStateFromAPI(project.state) ? `(${ProjectStateFromAPI(project.state)})` : ''}
          </Card.Header>
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
            <Form.Text id="input_task_prefix_help" className="text-light">
              Пример задачи с текущим префиксом:{' '}
              {project.task_prefix ? `"${project.task_prefix}21 Отправить отчёт"` : '"Отправить отчёт"'}
            </Form.Text>

            <div className="mt-3 d-flex gap-2 align-items-center flex-wrap">
              <Form.Check
                checked={project.sync_enabled}
                onChange={(e) => setProject({ ...project, sync_enabled: e.target.checked })}
                type="switch"
                label="Синрхонизировать автоматически"
                id="input_sync"
                // disabled={profile.subscription.price === 0}
              />
              {/* {profile.subscription.price === 0 && <Badge bg="primary">премиум</Badge>} */}
              <OverlayTrigger placement="top" overlay={<Tooltip>Подсказка автоматической синхронизации</Tooltip>}>
                <QuestionCircle size={20} />
              </OverlayTrigger>
            </div>

            <div className="mt-5 gap-3 d-flex justify-content-between flex-wrap">
              <Button
                variant="success"
                type="button"
                onClick={handleSyncButtonClick}
                className="d-flex align-items-center"
              >
                {isLoading && (
                  <Spinner className="me-2" animation="border" size="sm">
                    <span className="visually-hidden">Обновление...</span>
                  </Spinner>
                )}
                Синхронизировать
              </Button>
              <Button variant="danger" type="button" onClick={handleCancelButtonClick}>
                Отмена
              </Button>
            </div>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};