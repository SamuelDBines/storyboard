// StoryBoardCard.tsx
import React, { useState } from 'react';
import './storyboard.css'; // Make sure the CSS file path is correct
import { post } from '../../utils/fetch';
import Loading from '../../components/loading/Loading';
import TextArea from '../../components/TextArea/TextArea';
import { GenerateImageResponse } from './storyboard';

interface IStoryBoardCardProps {
  index: number;
  canEdit: boolean;
  setCanEdit: (index: number) => void;
  width?: number;
}

const StoryBoardCard: React.FC<IStoryBoardCardProps> = ({ index, setCanEdit, canEdit, width }: IStoryBoardCardProps) => {
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState('');
  const [angle, setAngle] = useState('');
  const [cameraMovement, setCameraMovement] = useState('');
  const [peopleProps, setPeopleProps] = useState('');
  const [response, setResponse] = useState<GenerateImageResponse>();
  const [isFlipped, setIsFlipped] = useState(false);

  const edit = () => {
    setCanEdit(index);
  };

  const generateImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLoading(true);
    const prompt = `description ${description} angle ${angle} cameraMovement ${cameraMovement} peopleProps ${peopleProps}`;
    post('/generate_image', { prompt }).then((response: GenerateImageResponse) => {
      setResponse(response);
      console.log(response);
      setIsFlipped(true);
    }).finally(() => {
      setLoading(false);
    });
  };

  // Function to handle flip action
  const handleFlip = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFlipped(!isFlipped); // Toggle the flip state
  };

  return (
    <div className={`flip-card ${isFlipped ? 'flipped' : ''}`} key={index} onClick={handleFlip} style={{ width, height: width }}>
      <div className="flip-card-inner" >
        {/* Front Face of the Card */}
        <div className="flip-card-front">
          <h4>Story Board {index + 1}</h4>
          <hr />
          <TextArea label="Description" value={description} setValue={setDescription} disabled={canEdit} rows={4} />

          <label>Angle</label>
          <input type="text" onClick={(e) => e.stopPropagation()} onChange={(e) => setAngle(e.target.value)} value={angle} disabled={canEdit} />
          <label>Camera Movement</label>
          <input type="text" onClick={(e) => e.stopPropagation()} onChange={(e) => setCameraMovement(e.target.value)} value={cameraMovement} disabled={canEdit} />
          <label>People Props</label>
          <input type="text" onClick={(e) => e.stopPropagation()} onChange={(e) => setPeopleProps(e.target.value)} value={peopleProps} disabled={canEdit} />
          <div className='button-action-bar'>
            <button onClick={(e) => {
              e.stopPropagation();
              edit();
            }} style={{ width: width && (width / 3) }}>Edit</button>
            <button onClick={generateImage} disabled={loading} style={{ width: width && (width / 3) }}>
              {loading ? <Loading color='white' /> : 'Generate'}
            </button>
          </div>
          {/* Button to flip the card */}
        </div>

        {/* Back Face of the Card */}
        <div className="flip-card-back">
          {/* Display images if available */}
          {response &&
            response.data.map((data, idx) => (
              <div key={idx}>
                <img src={data.url} alt='storyboard' style={{ width, borderRadius: '4px' }} />
                {/* <p>{data.revised_prompt}</p> */}
              </div>
            ))}
          {/* Button to flip back to the front */}
        </div>
      </div>
    </div>
  );
};

export default StoryBoardCard;
