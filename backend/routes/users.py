from fastapi import APIRouter, HTTPException
from models.schemas import UserCreate, UserResponse

router = APIRouter()

MOCK_USERS = [
    {"id": 1, "name": "Satar", "email": "satar@example.com", "location": "Tokyo, Japan", "green_score": 78, "trees_equivalent": 14.2},
]


@router.get("/{user_id}", response_model=UserResponse)
def get_user(user_id: int):
    """Get a user profile by ID."""
    user = next((u for u in MOCK_USERS if u["id"] == user_id), None)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user


@router.post("/", response_model=UserResponse)
def create_user(user: UserCreate):
    """Register a new user."""
    new_user = {
        "id": len(MOCK_USERS) + 1,
        "name": user.name,
        "email": user.email,
        "location": user.location,
        "green_score": 0,
        "trees_equivalent": 0.0,
    }
    MOCK_USERS.append(new_user)
    return new_user
