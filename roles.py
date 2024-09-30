from enum import Enum

class Role(str, Enum):
    ADMIN = "admin"
    USER = "user"
    MODERATOR = "moderator"

# Alternatively, you can use a dictionary to define permissions
roles_permissions = {
    "admin": ["read", "write", "delete"],
    "user": ["read"],
    "moderator": ["read", "write"],
}