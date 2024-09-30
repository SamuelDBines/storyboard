import React from 'react';
import './storyboard.css';
import { post } from '../../utils/fetch';
import StoryBoardCard from './storyboard-card';

interface GenerateImageResponse {
  created: number;
  data: {
    b64: null,
    revised_prompt: string,
    url: string;
  }[];
}


interface StoryBoard {
  description: string;
  angle: string;
  cameraMovement: string;
  peopleProps: string;
  response?: GenerateImageResponse;
}


const InitialStoryBoard = {
  description: "",
  angle: "",
  cameraMovement: "",
  peopleProps: "",
  response: undefined
};

function CreateStoryBoard() {
  const [numberOfStoryBoards, setNumberOfStoryBoards] = React.useState<Array<StoryBoard>>([InitialStoryBoard]);
  const [cardWidth, setCardWidth] = React.useState<number>(300);
  const [editStoryBoard, setEditStoryBoard] = React.useState<number>(0);

  const addStoryBoard = () => {
    setNumberOfStoryBoards([...numberOfStoryBoards, InitialStoryBoard]);
  };

  return (
    <>
      <div className='storyboard-full-container'>
        <div className='storyboard-header-container '>
          <h3 className='storyboard-header'> Story Board </h3>
          <button onClick={addStoryBoard}>Add Story board</button>
        </div>
        <div className='storyboard-header-container '>
          <h3 className='storyboard-header'> Settings </h3>
          <select onChange={(e) => setCardWidth(parseInt(e.target.value))}>
            <option value={300}>Small</option>
            <option value={400}>Medium</option>
            <option value={500}>Large</option>
            <option value={600}>Extra Large</option>
          </select>
        </div>
      </div>
      <hr />
      <div className='storyboard-container'>
        {numberOfStoryBoards.map((storyBoard, index) => (
          <StoryBoardCard key={index} canEdit={index !== editStoryBoard} setCanEdit={setEditStoryBoard} index={index} width={cardWidth} />

        ))}
      </div >
    </>
  );
}

export default CreateStoryBoard;
