import { useState, useEffect } from 'react';

const useDropClose = (ref, initialState) => {
    const [isOpen, setIsOpen] = useState(initialState);

    useEffect(() => {
        // 메뉴 영역 외의 영역을 클릭 시 메뉴 닫기
        const pageClickEvent = e => {
          if (ref.current && !ref.current.contains(e.target)) {
            setIsOpen(false);
          }
        };

        // 드롭다운이 열려 있을 때만 이벤트 리스너 작동
        if (isOpen) {
          window.addEventListener('click', pageClickEvent);
        }
    
        return () => {
          window.removeEventListener('click', pageClickEvent);
        };
      }, [isOpen, ref]);
    return [isOpen, setIsOpen];
}

export default useDropClose;