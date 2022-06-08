
import  '../styles/construction.css'
import Video from '../images/video-construction.mp4'
import { useNavigate } from 'react-router';

export default function Construction() {
  let navigate = useNavigate();
  function click(){
    navigate('/')
  }

  return (
    <>
    <div className="construction-container" >
        <video className='video-construction' autoPlay loop muted playsInline src={Video} />
        <div className="texto-construction">
          <h1 className="font-bold ">Site under construction</h1>
          <p className="mb-5 text-start ">Soon we will have more news!</p>
          <button onClick={click} className="learn-more button-construction">
            <span className="circle" aria-hidden="true">
            <span className="icon arrow"></span>
            </span>
            <span className="button-text">Back to home</span>
          </button>
      
        </div>
      </div>


</>
  )
}