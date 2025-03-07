export const APP_ROUTES = {
  home: "/",
  routerTaskDetail: "/task/:id",
  taskDetail: (taskId: string) => `/task/${taskId}`,
};

export const API_ROUTES = {
  get_all_tasks:
    "https://api.mockfly.dev/mocks/eb2da7a6-ff40-4962-a408-13ab027ba6be/load",
  post_one_task:
    "https://api.mockfly.dev/mocks/eb2da7a6-ff40-4962-a408-13ab027ba6be/add",
  edit_one_task:
    "https://www.google.com/",
  delete_one_task:
    "https://api.mockfly.dev/mocks/eb2da7a6-ff40-4962-a408-13ab027ba6be/remove",
};
