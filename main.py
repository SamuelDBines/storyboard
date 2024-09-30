from datetime import timedelta
from pydantic import BaseModel
from typing import Annotated
from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
import openApi
import models
import schemas
import crud
import database
import utils
import  settings

app = FastAPI()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

origins = [
    "http://localhost:3000",
    "localhost:3000"
]

prefix = "/api/v1"

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


def authenticate_user(db: Session, username: str, password: str):
    print(username, password)
    user = crud.get_user_by_username(db, username)
    print(user)
    if not user:
        return False
    if not user.check_password(password):
        return False
    return user

# openApi.greet()
def addPrefix(route):
    return prefix + route

@app.get("/info")
async def info():
    return {
        "app_name": settings.env.app_name,
        "admin_email": settings.env.admin_email,
        "items_per_user": settings.env.items_per_user,
    }

@app.post(addPrefix("/projects/"), response_model=schemas.ProjectResponse)
def create_project(project: schemas.ProjectCreate, db: Session = Depends(database.get_db)):
    return crud.create_project(db=db, project=project)

@app.get(addPrefix("/projects/{project_id}"), response_model=schemas.ProjectResponse)
def read_project(project_id: int, db: Session = Depends(database.get_db)):
    db_project = crud.get_project(db, project_id=project_id)
    if db_project is None:
        raise HTTPException(status_code=404, detail="Project not found")
    return db_project

@app.get(addPrefix("/projects/user/{user_id}"))
def read_projects_by_user(user_id: int, db: Session = Depends(database.get_db)):
    return crud.get_projects_by_user(db, user_id=user_id)

@app.post(addPrefix("/storyboards/"), response_model=schemas.StoryboardResponse)
def create_storyboard(storyboard: schemas.StoryboardCreate, db: Session = Depends(database.get_db)):
    return crud.create_storyboard(db=db, storyboard=storyboard)

@app.get(addPrefix("/storyboards/{storyboard_id}"), response_model=schemas.StoryboardResponse)
def read_storyboard(storyboard_id: int, db: Session = Depends(database.get_db)):
    db_storyboard = crud.get_storyboard(db, storyboard_id=storyboard_id)
    if db_storyboard is None:
        raise HTTPException(status_code=404, detail="Storyboard not found")
    return db_storyboard

@app.get(addPrefix("/storyboards/project/{project_id}"))
def read_storyboards_by_project(project_id: int, db: Session = Depends(database.get_db)):
    return crud.get_storyboards_by_project(db, project_id=project_id)

# Define routes
@app.post(addPrefix("/users/"), response_model=schemas.UserResponse)
def create_user(user: schemas.UserCreate, db: Session = Depends(database.get_db)):
    # Check if user already exists
    db_user = crud.get_user_by_username(db, username=user.username)
    if db_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    
    # Create a new user
    return crud.create_user(db=db, user=user)

@app.get(addPrefix("/users/{user_id}"), response_model=schemas.UserResponse)
def read_user(user_id: int, db: Session = Depends(database.get_db)):
    # Fetch the user by ID
    db_user = crud.get_user(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user

@app.get(addPrefix("/"))
def read_root(token: Annotated[str, Depends(oauth2_scheme)]):
    print(token)
    return {"message": "Welcome to the Storyboard Generator API!"}

@app.get("/users/me/", response_model=schemas.UserResponse)
async def read_users_me(
    current_user: Annotated[models.User, Depends(utils.get_current_active_user)],
    db: Session = Depends(database.get_db)
):
    return current_user

@app.post("/token")
async def login_for_access_token(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
    db: Session = Depends(database.get_db)
) -> utils.Token:
    print(form_data)
    try:
        user = authenticate_user(db,form_data.username, form_data.password)
        if not user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect username or password",
                headers={"WWW-Authenticate": "Bearer"},
            )
        access_token_expires = timedelta(minutes=utils.ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = utils.create_access_token(
            data={"sub": user.username}, expires_delta=access_token_expires
        )
        return utils.Token(access_token=access_token, token_type="bearer")
    except Exception as e:
        print(e)
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )


# Define a request model for the storyboard prompt
class StoryboardRequest(BaseModel):
    prompt: str

# POST endpoint to generate storyboard context based on a prompt
@app.post(addPrefix("/generate_storyboard"))
def generate_storyboard(request: StoryboardRequest):
    try:
        # Generate storyboard based on the prompt
        storyboard_context = openApi.generate_storyboard_context(request.prompt)
        return {"storyboard": storyboard_context}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@app.post(addPrefix("/generate_image"))
def generate_storyboard(request: StoryboardRequest):
    try:
        return openApi.generate_image_caption(request.prompt)
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=str(e))