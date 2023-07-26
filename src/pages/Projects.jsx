export const Projects = () => {
  return (
    <>
      <div className="projects">
        <div className="vh-100 d-flex justify-content-center align-items-center flex-column">
          <h1 className="projects__title title">Projects</h1>
          <select name="projects" id="projects" className="form-select project-select">
            <option value="selected" className="project-select__option">
              Select project
            </option>
          </select>
        </div>
      </div>
    </>
  );
};
