import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import QuizItem from "../components/QuizItem";

const Quiz = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [showQuestions, setShowQuestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleStartQuiz = async () => {
    if (!user || !user.token) {
      setError("User not authenticated.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get("https://holly-elite-condor.glitch.me/api/questions", {
        headers: { Authorization: `Bearer ${user.token}` },
      });

      if (response.data.success) {
        setQuestions(response.data.questions);
        setShowQuestions(true);
      } else {
        setError("Failed to load questions.");
      }
    } catch {
      setError("Error fetching questions.");
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSelect = (questionId, selectedAnswer) => {
    setAnswers({ ...answers, [questionId]: selectedAnswer });
  };

  const handleSubmitQuiz = async () => {
    try {
      const response = await axios.post("https://holly-elite-condor.glitch.me/api/submit", {
        userId: user.userId,
        answers,
      });

      if (response.data.success) {
        navigate(`/result/${user.userId}`);
      } else {
        setError("Error submitting quiz.");
      }
    } catch {
      setError("Submission failed.");
    }
  };

  if (loading) return <p>Loading questions...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="quiz-container">
      <h2>Take the Quiz!</h2>
      {!showQuestions ? (
        <button onClick={handleStartQuiz} className="startQuiz">Start Quiz</button>
      ) : (
        <>
          {questions.map((q) => (
            <QuizItem key={q.id} question={q} onSelectAnswer={handleAnswerSelect} />
          ))}
          <button
            onClick={handleSubmitQuiz}
            disabled={Object.keys(answers).length !== questions.length}
          >
            Submit Quiz
          </button>
        </>
      )}
    </div>
  );
};

export default Quiz;