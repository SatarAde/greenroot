from fastapi import APIRouter, HTTPException
from typing import List
from models.schemas import HabitCreate, HabitResponse

router = APIRouter()

MOCK_HABITS = [
    {"id": 1, "title": "Take public transport", "category": "transport", "description": "Use train or bus instead of driving", "target_days": 30, "co2_saving_per_day": 2.1, "current_streak": 12, "completed": False},
    {"id": 2, "title": "Meat-free Mondays", "category": "diet", "description": "Skip meat every Monday", "target_days": 12, "co2_saving_per_day": 1.8, "current_streak": 5, "completed": False},
    {"id": 3, "title": "Cold water washing", "category": "energy", "description": "Wash clothes on cold cycle", "target_days": 30, "co2_saving_per_day": 0.6, "current_streak": 30, "completed": True},
    {"id": 4, "title": "Buy secondhand first", "category": "shopping", "description": "Check secondhand before buying new", "target_days": 60, "co2_saving_per_day": 0.9, "current_streak": 8, "completed": False},
]


@router.get("/", response_model=List[HabitResponse])
def get_habits():
    """Get all habits for the current user."""
    return MOCK_HABITS


@router.post("/", response_model=HabitResponse)
def create_habit(habit: HabitCreate):
    """Create a new sustainability habit."""
    new_habit = {
        "id": len(MOCK_HABITS) + 1,
        "title": habit.title,
        "category": habit.category,
        "description": habit.description,
        "target_days": habit.target_days,
        "co2_saving_per_day": habit.co2_saving_per_day,
        "current_streak": 0,
        "completed": False,
    }
    MOCK_HABITS.append(new_habit)
    return new_habit


@router.patch("/{habit_id}/checkin", response_model=HabitResponse)
def checkin_habit(habit_id: int):
    """Check in to a habit, incrementing the streak."""
    habit = next((h for h in MOCK_HABITS if h["id"] == habit_id), None)
    if not habit:
        raise HTTPException(status_code=404, detail="Habit not found")
    habit["current_streak"] += 1
    if habit["current_streak"] >= habit["target_days"]:
        habit["completed"] = True
    return habit


@router.delete("/{habit_id}")
def delete_habit(habit_id: int):
    """Delete a habit."""
    global MOCK_HABITS
    habit = next((h for h in MOCK_HABITS if h["id"] == habit_id), None)
    if not habit:
        raise HTTPException(status_code=404, detail="Habit not found")
    MOCK_HABITS = [h for h in MOCK_HABITS if h["id"] != habit_id]
    return {"message": f"Habit {habit_id} deleted"}
