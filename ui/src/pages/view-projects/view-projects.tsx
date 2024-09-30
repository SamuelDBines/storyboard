import React from 'react';
import './view-projects.css';
import { get, post } from '../../utils/fetch';
import TextField from '../../components/TextField/TextField';
import FlipCard from '../../components/flip-card/flip-card';

interface IProject {
  title: string;
  description: string;
  id: number;
  user_id: number;
  created_at: string;
}

const Project = () => {
  const [projects, setProjects] = React.useState([]);
  const [projectName, setProjectName] = React.useState<string>('');
  const [error, setError] = React.useState([]);

  React.useEffect(() => {
    get('/projects/user/1').then((response) => {
      console.log(response);
      setProjects(response);
    });
  }, []);

  const createProject = () => {
    post('/projects', { title: projectName, description: projectName, user_id: 1 }).then((response) => {
      console.log(response);
    }).catch((error) => {
      setError(error);
    });
  };

  return (<>
    <div className='project-title-container'>
      <h1>Projects</h1>
      <div className='project-create-container'>
        <TextField label="Project Name" value={projectName} setValue={setProjectName} disabled={false} />
        <TextField label="Project Description" value={projectName} setValue={setProjectName} disabled={false} />
        <button> Create Project </button>
      </div>
    </div>
    <div className='project-container'>
      {projects.map((project: IProject, index) => (
        <FlipCard index={index}>
          <>
            <h3>{project.title} - {project.id}</h3>
            <p>{project.description}</p>
          </>
        </FlipCard>
      ))}
    </div>
  </>);
};

export default Project;