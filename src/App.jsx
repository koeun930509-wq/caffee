import { useEffect, useRef, useState } from 'react'
import './App.css'

const AMOUNT = 3000

function formatSentAt(date) {
  return date.toLocaleString('ko-KR', {
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

function App() {
  const [status, setStatus] = useState('idle') // idle | sending | done
  const [sentAt, setSentAt] = useState(null)
  const timerRef = useRef(null)

  useEffect(() => () => clearTimeout(timerRef.current), [])

  function handleSend() {
    setStatus('sending')
    // TODO(2단계): 실제 결제·Supabase 저장 로직으로 교체
    timerRef.current = setTimeout(() => {
      setSentAt(new Date())
      setStatus('done')
    }, 900)
  }

  function handleReset() {
    setStatus('idle')
    setSentAt(null)
  }

  return (
    <main className="page">
      <div className="steam" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>

      <section className="card">
        <svg className="cup" viewBox="0 0 64 56" aria-hidden="true">
          <path
            className="cup-steam"
            d="M24 4c0 3-3 4-3 7s3 4 3 7"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            className="cup-steam cup-steam-2"
            d="M34 4c0 3-3 4-3 7s3 4 3 7"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M10 22h38v10a17 17 0 0 1-17 17h-4a17 17 0 0 1-17-17z"
            fill="var(--caramel)"
          />
          <path
            d="M48 25h4.5a6 6 0 0 1 0 12H48"
            fill="none"
            stroke="var(--caramel)"
            strokeWidth="3"
          />
          <ellipse cx="29" cy="49" rx="19" ry="3" fill="var(--espresso-3)" />
        </svg>

        <h1>커피 한 잔 후원하기</h1>
        <p className="lede">
          제 작업이 마음에 드셨다면,
          <br />
          커피 한 잔으로 응원해 주세요.
        </p>

        {status !== 'done' && (
          <button
            type="button"
            className="send-btn"
            onClick={handleSend}
            disabled={status === 'sending'}
          >
            {status === 'sending' ? (
              <>
                <span className="spinner" aria-hidden="true" />
                따뜻하게 준비하는 중…
              </>
            ) : (
              <>
                <span>☕ 커피 한 잔 보내기</span>
                <span className="amount">₩{AMOUNT.toLocaleString('ko-KR')}</span>
              </>
            )}
          </button>
        )}

        <div className={`receipt-wrap ${status === 'done' ? 'open' : ''}`}>
          <div className="receipt-clip">
            <div className="receipt" role="status">
              <p className="receipt-seal">☕</p>
              <p className="receipt-title">오후의 커피</p>
              <p className="receipt-time">{sentAt ? formatSentAt(sentAt) : ''}</p>
              <div className="receipt-rule" />
              <div className="receipt-line">
                <span>아메리카노 Tall × 1</span>
                <span>₩{AMOUNT.toLocaleString('ko-KR')}</span>
              </div>
              <div className="receipt-rule" />
              <p className="receipt-thanks">따뜻한 응원 감사합니다!</p>
            </div>
            <div className="receipt-edge" />
          </div>
        </div>

        {status === 'done' && (
          <button type="button" className="reset-btn" onClick={handleReset}>
            커피 한 잔 더 보내기
          </button>
        )}
      </section>
    </main>
  )
}

export default App
