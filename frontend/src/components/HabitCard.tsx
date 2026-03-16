import React from "react";

interface Habit {
  id: number;
  title: string;
  category: string;
  description?: string;
  target_days: number;
  co2_saving_per_day: number;
  current_streak: number;
  completed: boolean;
}

interface HabitCardProps {
  habit: Habit;
  onCheckin: (id: number) => void;
  onDelete: (id: number) => void;
}

const categoryIcons: Record<string, string> = {
  transport: "🚌",
  diet: "🥗",
  energy: "⚡",
  shopping: "🛒",
  water: "💧",
};

const categoryColors: Record<string, string> = {
  transport: "#7A9B5E",
  diet: "#C5A028",
  energy: "#2E7BB8",
  shopping: "#C4622D",
  water: "#4A8B9B",
};

const HabitCard: React.FC<HabitCardProps> = ({ habit, onCheckin, onDelete }) => {
  const progress = Math.min((habit.current_streak / habit.target_days) * 100, 100);
  const totalSaving = (habit.co2_saving_per_day * habit.current_streak).toFixed(1);

  return (
    <div className={`habit-card ${habit.completed ? "completed" : ""}`}>
      <div className="habit-card-header">
        <div
          className="habit-icon"
          style={{ background: `${categoryColors[habit.category]}18` }}
        >
          {categoryIcons[habit.category]}
        </div>
        <div className="habit-meta">
          <span
            className="habit-category"
            style={{ color: categoryColors[habit.category] }}
          >
            {habit.category}
          </span>
          {habit.completed && <span className="completed-badge">✓ Complete</span>}
        </div>
      </div>

      <h3 className="habit-title">{habit.title}</h3>
      {habit.description && (
        <p className="habit-desc">{habit.description}</p>
      )}

      <div className="habit-progress-wrap">
        <div className="habit-progress-meta">
          <span>{habit.current_streak} / {habit.target_days} days</span>
          <span className="habit-saving">−{totalSaving}kg CO₂</span>
        </div>
        <div className="habit-progress-bg">
          <div
            className="habit-progress-fill"
            style={{
              width: `${progress}%`,
              background: categoryColors[habit.category],
            }}
          />
        </div>
      </div>

      <div className="habit-actions">
        {!habit.completed && (
          <button
            className="habit-checkin-btn"
            onClick={() => onCheckin(habit.id)}
          >
            ✓ Check In
          </button>
        )}
        <button
          className="habit-delete-btn"
          onClick={() => onDelete(habit.id)}
          aria-label="Delete habit"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default HabitCard;
