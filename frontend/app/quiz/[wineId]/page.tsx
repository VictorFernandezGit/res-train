import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function QuizPage() {
  const router = useRouter();
  const { wineId } = router.query;
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (wineId) {
      fetch(`/api/quiz/${wineId}`)
        .then(res => res.json())
        .then(data => setQuiz(data.quiz));
    }
  }, [wineId]);

  const handleChange = (qIdx, value) => {
    setAnswers(prev => {
      const copy = [...prev];
      copy[qIdx] = value;
      return copy;
    });
  };

  const handleSubmit = async (e) => {
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
    setResult(data);
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
            {q.options.map((opt, oIdx) => (
              <label key={oIdx} style={{ display: 'block' }}>
                <input
                  type="radio"
                  name={`q${idx}`}
                  value={opt}
                  checked={answers[idx] === opt}
                  onChange={() => handleChange(idx, opt)}
                  disabled={submitted}
                />
                {opt}
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