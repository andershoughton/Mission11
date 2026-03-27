import { useState } from 'react';
import BookList from './components/BookList';
import Cart from './components/Cart';

function App() {
    const [page, setPage] = useState<'books' | 'cart'>('books');
    const [savedPageNum, setSavedPageNum] = useState(1);

    return (
        <div>
            {page === 'books' ? (
                <BookList
                    initialPage={savedPageNum}
                    onGoToCart={(currentPage) => {
                        setSavedPageNum(currentPage);
                        setPage('cart');
                    }}
                />
            ) : (
                <Cart onContinueShopping={() => setPage('books')} />
            )}
        </div>
    );
}

export default App;