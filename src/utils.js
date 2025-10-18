export const getNavTitle = (location, params) => {
  switch (location.pathname) {
    case "/dashboard":
      return "Dashboard";
    case "/dashboard/projects":
      return "All projects";
    case `/dashboard/projectDetail/${params.id}`:
      return "Project details";
    default:
      break;
  }
};
