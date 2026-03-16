from pydantic import BaseModel, EmailStr
from typing import Optional, List
from enum import Enum
from datetime import date


class HabitCategory(str, Enum):
    transport = "transport"
    diet = "diet"
    energy = "energy"
    shopping = "shopping"
    water = "water"


class CarbonCategory(str, Enum):
    transport = "transport"
    diet = "diet"
    energy = "energy"
    shopping = "shopping"


# --- User Models ---

class UserCreate(BaseModel):
    name: str
    email: EmailStr
    location: Optional[str] = None


class UserResponse(BaseModel):
    id: int
    name: str
    email: str
    location: Optional[str]
    green_score: int
    trees_equivalent: float

    class Config:
        from_attributes = True


# --- Carbon Models ---

class CarbonEntry(BaseModel):
    category: CarbonCategory
    description: str
    kg_co2: float
    date: date


class CarbonResponse(BaseModel):
    id: int
    category: CarbonCategory
    description: str
    kg_co2: float
    date: date
    user_id: int

    class Config:
        from_attributes = True


class CarbonSummary(BaseModel):
    total_kg_co2: float
    by_category: dict[str, float]
    trees_equivalent: float
    monthly_trend: List[dict]


# --- Habit Models ---

class HabitCreate(BaseModel):
    title: str
    category: HabitCategory
    description: Optional[str] = None
    target_days: int = 30
    co2_saving_per_day: float


class HabitResponse(BaseModel):
    id: int
    title: str
    category: HabitCategory
    description: Optional[str]
    target_days: int
    co2_saving_per_day: float
    current_streak: int
    completed: bool

    class Config:
        from_attributes = True
