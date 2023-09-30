export const ProjectStateFromAPI = (state) => {
  switch (state) {
    case 'sync_not_started':
      return '';
    case 'sync_in_progress':
      return 'Синхронизируется';
    case 'synced_ok':
      return 'Синхронизировано';
    case 'sync_error':
      return 'Ошибка';
    default:
      return '';
  }
};
