import { useState, useEffect, useRef } from 'react';
import Dots from '../Common/Dots';
import '../Landing/Landing.css';

const DIVIDER_HEIGHT = 5;

// 스크롤 컴포넌트 추후 컴포넌트 폴더로 따로 export 예정

function Landing() {
  // 밑엔 스크롤 (추후 컴포넌트로 뺴서 props 받아 사용 할 예정)
  const outerDivRef : any = useRef();
  const [scrollIndex, setScrollIndex] = useState(1);
  useEffect(() => {
    const wheelHandler = (e: any) => {
      e.preventDefault();
      const { deltaY } = e;
      // 스크롤 위쪽 끝부분 위치
      const { scrollTop }: any = outerDivRef.current;
      // 화면 세로길이, 100vh와 같음
      const pageHeight = window.innerHeight; 

      if (deltaY > 0) {

        if (scrollTop >= 0 && scrollTop < pageHeight) {
          // 현재 1페이지
          outerDivRef.current.scrollTo({
            top: pageHeight + DIVIDER_HEIGHT,
            left: 0,
            behavior: "smooth",
          });
          setScrollIndex(2);
        } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
            // 현재 2페이지
            outerDivRef.current.scrollTo({
              top: pageHeight * 2 + DIVIDER_HEIGHT * 2,
              left: 0,
              behavior: "smooth",
          });
          setScrollIndex(3);
        } else {
            // 현재 3페이지
            outerDivRef.current.scrollTo({
              top: pageHeight * 2 + DIVIDER_HEIGHT * 2,
              left: 0,
              behavior: "smooth",
          });
          setScrollIndex(3);  
        }
      } else {
        // 스크롤 올릴 때때
        if (scrollTop >=0 && scrollTop < pageHeight) {
          // 현재 1페이지
          outerDivRef.current.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
          });
          setScrollIndex(1);
        } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
          // 현재 2페이지
          outerDivRef.current.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
          });
          setScrollIndex(1);
        } else {
          outerDivRef.current.scrollTo({
            top: pageHeight + DIVIDER_HEIGHT,
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
  const Item = ({ text }: any) => {
    return text;
  };


// 이하 html

  return (
  <div className='landing-body'>
    <div ref={outerDivRef} className="outer">
      <Dots scrollIndex={scrollIndex} />
        <div className='landing-container'>
          {/* 랜딩 1번째 화면 */}
          <div className='landing1'>
            <div className=" landing-image-container1"></div>
              <div className="trudy-header1">
                Trudy
              </div>
              <div className="trudy-detail1">
                Travel deeper see more with local expertise
              </div>
          </div>
      <div className='divider'></div>
      {/* 랜딩 2번째 화면 */}
        <div className='landing2'>
          <div className="landing-image-container2"></div>
            <div className='trudy-header2'>
              Traveling to Korea?
            </div>
            <div className="trudy-detail2">
              Search hidden gems only locals can provide!
            </div>
        </div>
      <div className='divider'></div>
      {/* 랜딩 3번째 화면 */}
        <div className='landing3'>
          <div className='landing-image-container3'></div>  
            <div className='landing-title3'>
              We provide 
            </div>
            <div className='landing-detail3'>
              <Item text={['Interactive Map', <br />, 'Messenger', <br />, 'Planner', <br />, <br />, 'Both Web & Mobile']}/>
            </div>
          </div>
        </div>
    </div>
  </div>
  );
}

export default Landing;