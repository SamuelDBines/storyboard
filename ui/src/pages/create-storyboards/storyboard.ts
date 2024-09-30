export interface GenerateImageResponse {
  created: number;
  data: {
    b64: null,
    revised_prompt: string,
    url: string;
  }[];
}


export interface StoryBoard {
  description: string;
  angle: string;
  cameraMovement: string;
  peopleProps: string;
  response?: GenerateImageResponse;
}


export const InitialStoryBoard = {
  description: "",
  angle: "",
  cameraMovement: "",
  peopleProps: "",
  response: undefined
};