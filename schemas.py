from pydantic import BaseModel
from typing import List, Optional

class GenerateImageData(BaseModel):
    b64: Optional[str] = None
    revised_prompt: str
    url: str

class GenerateImageResponse(BaseModel):
    created: int
    data: List[GenerateImageData]

class UserCreate(BaseModel):
    username: str
    email: str
    password: str

class UserResponse(BaseModel):
    id: int
    username: str
    email: str
    class Config:
        orm_mode = True 

class ProjectCreate(BaseModel):
    title: str
    description: str
    user_id: int

class ProjectResponse(BaseModel):
    id: int
    title: str
    description: str
    user_id: int
    class Config:
        orm_mode = True

class StoryboardCreate(BaseModel):
    description: str
    angle: str
    camera_movement: str
    people_props: str
    project_id: int

class StoryboardUpdate(BaseModel):
    description: Optional[str] = None
    angle: Optional[str] = None
    camera_movement: Optional[str] = None
    people_props: Optional[str] = None
    responses: Optional[List[GenerateImageResponse]] = None
  
class StoryboardResponse(BaseModel):
    id: int
    description: str
    angle: str
    camera_movement: str
    people_props: str
    project_id: int
    responses: Optional[List[GenerateImageResponse]] = None
    class Config:
        orm_mode = True
        