from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    app_name: str = "Awesome API"
    admin_email: str
    items_per_user: int = 50
    openai_org: str
    openai_project: str
    openai_api_key: str
    model_config = SettingsConfigDict(env_file=".env")

env = Settings()