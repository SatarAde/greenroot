import React from "react";

interface ScoreRingProps {
  score: number;
  maxScore?: number;
  size?: number;
}

const ScoreRing: React.FC<ScoreRingProps> = ({ score, maxScore = 100, size = 80 }) => {
  const percentage = (score / maxScore) * 100;
  const radius = (size - 10) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const getColor = (pct: number): string => {
    if (pct >= 75) return "#7A9B5E";
    if (pct >= 50) return "#C5A028";
    return "#C4622D";
  };

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* Background ring */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="rgba(122,155,94,0.12)"
        strokeWidth={8}
      />
      {/* Progress ring */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={getColor(percentage)}
        strokeWidth={8}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        style={{ transition: "stroke-dashoffset 1s ease" }}
      />
      {/* Score text */}
      <text
        x={size / 2}
        y={size / 2 - 4}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="16"
        fontWeight="900"
        fill="#2C3B1E"
        fontFamily="Fraunces, serif"
      >
        {score}
      </text>
      <text
        x={size / 2}
        y={size / 2 + 12}
        textAnchor="middle"
        fontSize="9"
        fill="#7A9B5E"
        fontFamily="Cabinet Grotesk, sans-serif"
      >
        / {maxScore}
      </text>
    </svg>
  );
};

export default ScoreRing;
