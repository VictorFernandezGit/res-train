"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

type Quiz = {
  id: string;
  title: string;
  questions: QuizQuestion[];
};

type QuizQuestion = {
  id: string;
  question: string;
  options: QuizOption[];
  explanation?: string;
};

type QuizOption = {
  id: string;
  optionText: string;
  isCorrect: boolean;
};

type QuizResult = {
  score: number;
  total: number;
};

export default function QuizPage() {
  const router = useRouter();
  const { quizId } = router.query;
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [answers, setAnswers] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState<QuizResult | null>(null);

  useEffect(() => {
    if (quizId) {
      fetch(`/api/quiz/${quizId}`)
        .then(res => res.json())
        .then(data => setQuiz(data.quiz));
    }
  }, [quizId]);

  const handleChange = (qIdx: number, optionId: string) => {
    setAnswers(prev => {
      const copy = [...prev];
      copy[qIdx] = optionId;
      return copy;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!quiz) return;
    // TODO: Replace with actual userId from auth
    const userId = 'mock-user-id';
    const res = await fetch(`/api/quiz/${quiz.id}/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, answers }),
    });
    const data = await res.json();
    setResult({ score: data.score, total: data.total });
    setSubmitted(true);
  };

  if (!quiz) return <div>Loading quiz...</div>;

  return (
    <div>
      <h1>{quiz.title}</h1>
      <form onSubmit={handleSubmit}>
        {quiz.questions.map((q, idx) => (
          <div key={q.id} style={{ marginBottom: 24 }}>
            <div>{q.question}</div>
            {q.options.map((option) => (
              <label key={option.id} style={{ display: 'block' }}>
                <input
                  type="radio"
                  name={`q${idx}`}
                  value={option.id}
                  checked={answers[idx] === option.id}
                  onChange={() => handleChange(idx, option.id)}
                  disabled={submitted}
                />
                {option.optionText}
              </label>
            ))}
          </div>
        ))}
        {!submitted && <button type="submit">Submit</button>}
      </form>
      {submitted && result && (
        <div>
          <h2>Result</h2>
          <div>Score: {result.score} / {result.total}</div>
        </div>
      )}
    </div>
  );
} 