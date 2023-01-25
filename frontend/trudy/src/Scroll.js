import './Scroll.css';
import { useState, useEffect, useRef } from 'react';



function Scroll() {
  const outerDivRef = useRef();
  const [scrollIndex, setScrollIndex] = useState(1);
  useEffect(() => {
    const wheelHandler = (e) => {
      e.preventDefault();
      const { deltaY } = e;
      const { scrollTop } = outerDivRef.current; // 스크롤 위쪽 끝부분 위치
      const pageHeight = window.innerHeight; // 화면 세로길이, 100vh와 같음

      if (deltaY > 0) {

        if (scrollTop >= 0 && scrollTop < pageHeight) {
          // 현재 1페이지
          console.log('1 page, down');
          outerDivRef.current.scrollTo({
            top: pageHeight,
            left: 0,
            behavior: "smooth",
          });
          setScrollIndex(2);
        } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
            // 현재 2페이지
            console.log('2 page, down');
            outerDivRef.current.scrollTo({
              top: pageHeight * 2,
              left: 0,
              behavior: 'smooth',
          });
          setScrollIndex(3);
        } else {
            // 현재 3페이지
            console.log('3 page, down');
            outerDivRef.current.scrollTo({
              top: pageHeight * 2,
              left: 0,
              behavior: 'smooth',
          });
          setScrollIndex(3);  
        }
      } else {
        if (scrollTop >=0 && scrollTop < pageHeight) {
          console.log('1 page, up');
          outerDivRef.current.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
          });
          setScrollIndex(1);
        } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
          console.log('2 page, up');
          outerDivRef.current.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
          });
          setScrollIndex(1);
        } else {
          console.log('3 page, up');
          outerDivRef.current.scrollTo({
            top: pageHeight,
            left: 0,
            behavior: 'smooth'
          });
          setScrollIndex(2);
        }
      }   
    };
    const outerDivRefCurrent = outerDivRef.current;
    outerDivRefCurrent.addEventListener('wheel', wheelHandler);
    return () => {
      outerDivRefCurrent.removeEventListener('wheel', wheelHandler);
    };
  }, []);
    return (
      <div ref={outerDivRef} className="outer">
        <div className="inner bg-yellow">1</div>
        <div className="inner bg-blue">2</div>
        <div className="inner bg-pink">3</div>
      </div>
  );
}

export default Scroll;