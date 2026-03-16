from fastapi import APIRouter, HTTPException
from typing import List
from models.schemas import CarbonEntry, CarbonResponse, CarbonSummary
from datetime import date

router = APIRouter()

# Mock database — in production this would use SQLAlchemy + PostgreSQL
MOCK_ENTRIES = [
    {"id": 1, "category": "transport", "description": "Daily commute by car", "kg_co2": 2.4, "date": "2024-03-01", "user_id": 1},
    {"id": 2, "category": "diet", "description": "Beef-based dinner", "kg_co2": 3.1, "date": "2024-03-01", "user_id": 1},
    {"id": 3, "category": "energy", "description": "Home heating", "kg_co2": 1.8, "date": "2024-03-02", "user_id": 1},
    {"id": 4, "category": "transport", "description": "Took the train instead", "kg_co2": 0.3, "date": "2024-03-03", "user_id": 1},
    {"id": 5, "category": "shopping", "description": "New clothing item", "kg_co2": 5.2, "date": "2024-03-05", "user_id": 1},
]


@router.get("/entries", response_model=List[CarbonResponse])
def get_carbon_entries(user_id: int = 1, limit: int = 20):
    """Get carbon footprint entries for a user."""
    entries = [e for e in MOCK_ENTRIES if e["user_id"] == user_id]
    return entries[:limit]


@router.post("/entries", response_model=CarbonResponse)
def add_carbon_entry(entry: CarbonEntry, user_id: int = 1):
    """Log a new carbon footprint entry."""
    new_entry = {
        "id": len(MOCK_ENTRIES) + 1,
        "category": entry.category,
        "description": entry.description,
        "kg_co2": entry.kg_co2,
        "date": str(entry.date),
        "user_id": user_id,
    }
    MOCK_ENTRIES.append(new_entry)
    return new_entry


@router.get("/summary", response_model=CarbonSummary)
def get_carbon_summary(user_id: int = 1):
    """Get a summarised carbon footprint breakdown."""
    entries = [e for e in MOCK_ENTRIES if e["user_id"] == user_id]

    total = round(sum(e["kg_co2"] for e in entries), 2)

    by_category: dict[str, float] = {}
    for e in entries:
        cat = e["category"]
        by_category[cat] = round(by_category.get(cat, 0) + e["kg_co2"], 2)

    # 1 tree absorbs ~21kg CO2/year
    trees_equivalent = round(total / 21, 2)

    monthly_trend = [
        {"month": "Jan", "kg_co2": 48.2},
        {"month": "Feb", "kg_co2": 42.1},
        {"month": "Mar", "kg_co2": total},
    ]

    return CarbonSummary(
        total_kg_co2=total,
        by_category=by_category,
        trees_equivalent=trees_equivalent,
        monthly_trend=monthly_trend,
    )


@router.delete("/entries/{entry_id}")
def delete_carbon_entry(entry_id: int):
    """Delete a carbon entry by ID."""
    global MOCK_ENTRIES
    entry = next((e for e in MOCK_ENTRIES if e["id"] == entry_id), None)
    if not entry:
        raise HTTPException(status_code=404, detail="Entry not found")
    MOCK_ENTRIES = [e for e in MOCK_ENTRIES if e["id"] != entry_id]
    return {"message": f"Entry {entry_id} deleted"}
