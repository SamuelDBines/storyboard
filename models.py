from sqlalchemy import Column, Integer, String, DateTime, func, ForeignKey, JSON
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, relationship
from passlib.context import CryptContext
from werkzeug.security import generate_password_hash, check_password_hash


DATABASE_URL = 'sqlite:///users.db'  # Example for SQLite; use a different URL for other DBs

# Define the Base for models
Base = declarative_base()

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class User(Base):
    __tablename__ = 'users'  # Table name in the database

    id = Column(Integer, primary_key=True, autoincrement=True)
    username = Column(String(50), unique=True, nullable=False)
    email = Column(String(100), unique=True, nullable=False)
    password = Column(String(128), nullable=False)  # Store hashed passwords
    created_at = Column(DateTime, server_default=func.now())

    projects = relationship("Project", back_populates="user", cascade="all, delete-orphan")

    def set_password(self, password):
        """Hash and set the password."""
        self.password = generate_password_hash(password)

    def check_password(self, password):
        """Verify a password against the stored hash."""

        print(password, self.password)
        return check_password_hash( self.password, password)
    
    def __repr__(self):
        return f"<User(id={self.id}, username='{self.username}', email='{self.email}', password='{self.password}')>"

# Project model 
class Project(Base):
    __tablename__ = 'projects'  # Table name in the database

    id = Column(Integer, primary_key=True, autoincrement=True)
    title = Column(String(100), nullable=False)
    description = Column(String(255))
    user_id = Column(Integer, ForeignKey('users.id'))  # Foreign key to link with User

    # Relationship back to the User class
    user = relationship("User", back_populates="projects")

    storyboards = relationship("Storyboard", back_populates="project", cascade="all, delete-orphan")


    created_at = Column(DateTime, server_default=func.now())

    def __repr__(self):
        return f"<Project(id={self.id}, title='{self.title}', user_id={self.user_id})>"

# Storyboard model
class Storyboard(Base):
    __tablename__ = 'storyboards'  # Table name in the database

    id = Column(Integer, primary_key=True, autoincrement=True)
    title = Column(String(100), nullable=False)
    description = Column(String(255), nullable=False)  # Description of the storyboard
    angle = Column(String(100), nullable=False)         # Angle of the scene
    camera_movement = Column(String(100), nullable=False) # Camera movement type
    people_props = Column(String(255), nullable=False)  # Description of people or props in the scene
    responses = Column(JSON, nullable=True)

    # Foreign key to link with Project
    project_id = Column(Integer, ForeignKey('projects.id'))

    # Relationship back to the Project class
    project = relationship("Project", back_populates="storyboards")

    created_at = Column(DateTime, server_default=func.now())

    def __repr__(self):
        return f"<Storyboard(id={self.id}, description='{self.description}', project_id={self.project_id})>"

# Create an engine
engine = create_engine(DATABASE_URL, echo=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create tables in the database
Base.metadata.create_all(engine)