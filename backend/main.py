from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import carbon, habits, users

app = FastAPI(
    title="GreenRoot API",
    description="Backend API for GreenRoot — sustainable living tracker",
    version="1.0.0"
)

# CORS for local React dev server
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(users.router, prefix="/api/users", tags=["Users"])
app.include_router(carbon.router, prefix="/api/carbon", tags=["Carbon"])
app.include_router(habits.router, prefix="/api/habits", tags=["Habits"])


@app.get("/")
def root():
    return {"message": "GreenRoot API is running 🌱", "version": "1.0.0"}


@app.get("/health")
def health_check():
    return {"status": "ok"}
