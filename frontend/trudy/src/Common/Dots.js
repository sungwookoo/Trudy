import './Dots.css'


const Dot = ({ num, scrollIndex }) => {
    return (
        <div className='dot-style'
            style={{
                width: 10,
                height: 10,
                border: '1px solid black',
                borderRadius: 999,
                backgroundColor: scrollIndex === num ? 'white' : 'transparent',
                transitionDuration: 1000,
                transition: "background-color 0.5s",
            }}
        ></div>
    );
};

const Dots = ({ scrollIndex }) => {
    return (
        <div className='dots-layout' style={{ position: 'fixed', top: '50%', right: 10 }}>
          <div className='dots-spacing'
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: 20,
              height: 100,
            }}
          >
            <Dot num={1} scrollIndex={scrollIndex}></Dot>
            <Dot num={2} scrollIndex={scrollIndex}></Dot>
            <Dot num={3} scrollIndex={scrollIndex}></Dot>

          </div>
        </div>
    );
};

export default Dots;