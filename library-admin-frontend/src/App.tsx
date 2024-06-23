import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { BorrowAndReturnBook } from './pages/borrowAndReturnBook/BorrowAndReturnBook';
import './App.css';
import { BookManager } from './pages/bookManager/BookManager';
import SignIn from './pages/signin/SignIn';
import { HomePage } from './pages/Home/HomePage';
import { AccountManager } from './pages/AccountManager/AccountManager';
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to={'/auth/signin'} />} />
                <Route path="/borrowreturn" element={<BorrowAndReturnBook />} />
                <Route path="/book" element={<BookManager />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/auth/signin" element={<SignIn />} />
                <Route path="/account" element={<AccountManager />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
