import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './routes/Home/HomePage'
import LoginPage from './routes/LoginPage'
import RegisterPage from './routes/RegisterPage'
import QuestionsPage from './routes/Questions/QuestionsPage'
import CalendarPage from './routes/Calendar/CalendarPage'
import { observer } from 'mobx-react-lite'
import ArticlesPage from './routes/Articles/ArticlesPage'

function App() {
  return (
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/questions" element={<QuestionsPage />} />
      <Route path="/calendar" element={<CalendarPage />} />
      <Route path="/articles" element={<ArticlesPage />} />
        </Routes>
      </BrowserRouter>
  )
}

export default observer(App)