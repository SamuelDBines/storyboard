from sqlalchemy.orm import Session
from models import User, Project, Storyboard
from schemas import UserCreate, ProjectCreate, StoryboardCreate, StoryboardUpdate

# Function to get a user by username
def get_user_by_username(db: Session, username: str):
    return db.query(User).filter(User.username == username).first()

# Function to get a user by ID
def get_user(db: Session, user_id: int):
    return db.query(User).filter(User.id == user_id).first()

# Function to create a new user
def create_user(db: Session, user: UserCreate):
    # fake_hashed_password = user.password + "notreallyhashed"  # Placeholder for hashed password
    db_user = User(username=user.username, email=user.email, password=user.password)
    db_user.set_password(user.password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def create_project(db: Session, project: ProjectCreate):
    db_project = Project(title=project.title, description=project.description, user_id=project.user_id)
    db.add(db_project)
    db.commit()
    db.refresh(db_project)
    return db_project

def get_project(db: Session, project_id: int):
    return db.query(Project).filter(Project.id == project_id).first()

def create_storyboard(db: Session, storyboard: StoryboardCreate):
    db_storyboard = Storyboard(description=storyboard.description, angle=storyboard.angle, camera_movement=storyboard.camera_movement, people_props=storyboard.people_props, project_id=storyboard.project_id)
    db.add(db_storyboard)
    db.commit()
    db.refresh(db_storyboard)
    return db_storyboard

def get_storyboard(db: Session, storyboard_id: int):
    return db.query(Storyboard).filter(Storyboard.id == storyboard_id).first()

def get_projects_by_user(db: Session, user_id: int):
    return db.query(Project).filter(Project.user_id == user_id).all()

def get_storyboards_by_project(db: Session, project_id: int):
    return db.query(Storyboard).filter(Storyboard.project_id == project_id).all()

def update_storyboard(db: Session, storyboard_id: int, storyboard: StoryboardUpdate):
    db_storyboard = db.query(Storyboard).filter(Storyboard.id == storyboard_id).first()
    db_storyboard.description = storyboard.description
    db_storyboard.angle = storyboard.angle
    db_storyboard.camera_movement = storyboard.camera_movement
    db_storyboard.people_props = storyboard.people_props
    db.commit()
    db.refresh(db_storyboard)
    return db_storyboard