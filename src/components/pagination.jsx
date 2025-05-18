import PaginationArrow from '../assets/images/paginationArrow.svg';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
    const handleClick = (pageNum) => {
        if (pageNum >= 1 && pageNum <= totalPages) {
            onPageChange(pageNum);
        }
    };

    return (
        <div className="flex justify-center items-center mt-8">
            <button
                className="pr-3 disabled:cursor-not-allowed"
                onClick={() => handleClick(currentPage - 1)}
                disabled={currentPage === 1}
            >
                <img src={PaginationArrow} alt="LeftArrow" className="scale-[-1]" />
            </button>
            {Array.from({ length: totalPages }, (_, idx) => (
                <button
                    key={idx + 1}
                    className={`p-2 mx-1 font-semibold ${
                        currentPage === idx + 1 ? 'underline text-white' : 'text-white/50'
                    }`}
                    onClick={() => handleClick(idx + 1)}
                >
                    {idx + 1}
                </button>
            ))}
            <button
                className="pl-3 disabled:cursor-not-allowed"
                onClick={() => handleClick(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                <img src={PaginationArrow} alt="RightArrow" />
            </button>
        </div>
    );
}
