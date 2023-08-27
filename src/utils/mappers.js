function ProjectStateFromAPI(state) {
  switch (state) {
    case 'sync_not_started':
      return 'Синхронизация не началась';
    case 'sync_in_progress':
      return 'Идет синхронизация';
    case 'synced_ok':
      return 'Синхронизировано успешно';
    case 'sync_error':
      return 'Ошибка синхронизации';
    default:
      return 'Неизвестное состояние';
  }
}
