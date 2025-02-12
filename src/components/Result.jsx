import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Result = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [score, setScore] = useState(null);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const response = await axios.get(`https://holly-elite-condor.glitch.me/api/result/${userId}`);
        if (response.data.success) {
          setScore(response.data.score);
          setTotalQuestions(response.data.totalQuestions);
          setLoading(false);
        } else {
          setError("Failed to fetch quiz result.");
        }
      } catch {
        setError("Error fetching result.");
      }
    };

    fetchResult();
  }, [userId]);

  if (loading) return <p className="loading">Loading result...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="result-container">
      <h2>Yay! Quiz Completed!</h2>
      <p className="score">
        You answered <span className="highlight red">{score}</span> out of <span className="highlight red">{totalQuestions}</span> questions correctly!
      </p>
      <button className="home-btn" onClick={() => navigate("/")}>Back to Home</button>
    </div>
  );
};

export default Result;