// import landingimage1 from './koreaguide1.jpg';
// import landing3 from './landing-gif.gif'
import './Landing.css';





function Landing() {

const Item = ({ text }) => {
 return text;
};

    return (
      <div className='landing-container'>
          <div className='landing1'>
            <div className="landing-image-container1"></div>
              <div className="trudy-header1">
                Trudy
              </div>
              <div className="trudy-detail1">
                Travel deeper see more with local expertise
                
              </div>
          </div>

          <div className='landing2'>
            <div className="landing-image-container2"></div>
            <div>

            </div>
          </div>

          <div className='landing3'>
            <div className='landing-image-container3'>
            </div>  
            <div className='landing-title3'>
            We provide 
            </div>
            <div className='landing-detail3'>
              <Item text={['Interactive Map', <br />, 'Messenger', <br />, 'Planner', <br />, <br />, 'Both Web & Mobile']}/>
            </div>
          </div>
      </div>
    )
}

export default Landing;