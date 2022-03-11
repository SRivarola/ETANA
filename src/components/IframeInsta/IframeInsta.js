import './IframeInsta.scss'
import React, { useEffect, useState } from 'react'
import ReactPlayer from 'react-player';
import { AiFillInstagram } from "react-icons/ai";

export default function IframeInsta() {

  const [data, setData] = useState()

  const token = 'IGQVJVSnZABZAUhFY2dGWXYzUTBZATmxxT3hNcEl0REhyRHdnYjNkV2dVYjdXd1JWb1JYLUZApejlXX0k4X0FKc2VVTVh1dmw2cjFseFdDU0JSYWoxWUhreERlVVg3aGtCWndDVmt3SVVqRHFCa21ETEVFUwZDZD';
  const url = 'http://graph.instagram.com/me/media?access_token=' + token + '&fields=media_url,media_type,caption,permalink,thumbnail_url';
    
  useEffect(() => {
    obtenerDatos()
  }, [])

  const obtenerDatos = async () => {
    const data = await fetch(url);
    const jsondata = await data.json();
    setData(jsondata.data)
  }

  const managingData0 = (data) => {
    if(data[0]){
      if (data[0].media_type === 'IMAGE' || data[0].media_type === 'CARROUSEL') {
        return  <div className='feedInfo'>
                  <img className='feedImg' src={data[0].media_url} alt='foto del feed'/>
                </div> 
        } else if (data[0].media_type === 'VIDEO') {
            return  <div className='feedInfo'>
                      <ReactPlayer 
                          url={ data[0].media_url } 
                          className='feedVideo' 
                          playing
                          loop
                          width='100%'
                          height='100%'
                      />
                    </div> 
        } 
    }
  }
  const managingData1 = (data) => {
    if(data[1]){
      if (data[1].media_type === 'IMAGE' || data[1].media_type === 'CARROUSEL') {
        return  <div className='feedInfo'>
                  <img className='feedImg' src={data[1].media_url} alt='foto del feed'/>
                </div> 
        } else if (data[1].media_type === 'VIDEO') {
            return  <div className='feedInfo'>
                      <ReactPlayer 
                          url={ data[1].media_url } 
                          className='feedVideo' 
                          playing
                          loop
                          width='100%'
                          height='100%'
                      />
                    </div> 
        } 
    }
  }
  const managingData2 = (data) => {
    if(data[2]){
      if (data[2].media_type === 'IMAGE' || data[2].media_type === 'CARROUSEL') {
        return  <div className='feedInfo'>
                  <img className='feedImg' src={data[2].media_url} alt='foto del feed'/>
                </div> 
        } else if (data[2].media_type === 'VIDEO') {
            return  <div className='feedInfo'>
                      <ReactPlayer 
                          url={ data[2].media_url } 
                          className='feedVideo' 
                          playing
                          loop
                          width='100%'
                          height='100%'
                      />
                    </div> 
        } 
    }
  }
  const managingData3 = (data) => {
    if(data[3]) {
      if (data[3].media_type === 'IMAGE' || data[3].media_type === 'CARROUSEL') {
        return  <div className='feedInfo'>
                  <img className='feedImg' src={data[3].media_url} alt='foto del feed'/>
                </div> 
        } else if (data[3].media_type === 'VIDEO') {
            return  <div className='feedInfo'>
                      <ReactPlayer 
                          url={ data[3].media_url } 
                          className='feedVideo' 
                          playing
                          loop
                          width='100%'
                          height='100%'
                      />
                    </div> 
        } 
    }
  }
  const managingData4 = (data) => {
    if(data[4]){
      if (data[4].media_type === 'IMAGE' || data[4].media_type === 'CARROUSEL') {
        return  <div className='feedInfo'>
                  <img className='feedImg' src={data[4].media_url} alt='foto del feed'/>
                </div> 
        } else if (data[4].media_type === 'VIDEO') {
            return  <div className='feedInfo'>
                      <ReactPlayer 
                          url={ data[4].media_url } 
                          className='feedVideo' 
                          playing
                          loop
                          width='100%'
                          height='100%'
                      />
                    </div> 
        } 
    }
  }
  const managingData5 = (data) => {
    if(data[5]) {
      if (data[5].media_type === 'IMAGE' || data[5].media_type === 'CARROUSEL') {
        return  <div className='feedInfo'>
                  <img className='feedImg' src={data[5].media_url} alt='foto del feed'/>
                </div> 
        } else if (data[5].media_type === 'VIDEO') {
            return  <div className='feedInfo'>
                      <ReactPlayer 
                          url={ data[5].media_url } 
                          className='feedVideo' 
                          playing
                          loop
                          width='100%'
                          height='100%'
                      />
                    </div> 
        } 
    }
  }

  return (
    <div className='feed container'>
 
      <div className='feed_greed'>
        {
          data && managingData0(data)
        }
        {
          data && managingData1(data)
        }
        {
          data && managingData2(data)
        }
        {
          data && managingData3(data)
        }
        {
          data && managingData4(data)
        }
        {
          data && managingData5(data)
        }
      </div>
      {/* <div className='btn-ig'>
        <button>SEGUINOS EN INSTAGRAM <AiFillInstagram /></button>
      </div> */}
    </div>
  )
}

// etana token
// IGQVJVSnZABZAUhFY2dGWXYzUTBZATmxxT3hNcEl0REhyRHdnYjNkV2dVYjdXd1JWb1JYLUZApejlXX0k4X0FKc2VVTVh1dmw2cjFseFdDU0JSYWoxWUhreERlVVg3aGtCWndDVmt3SVVqRHFCa21ETEVFUwZDZD

// testeoapi token
// IGQVJYWFNtdFY4WXhQc2p3SWFGNlVPSHlBTW1wVnFzckpna1BnZAlFMZA3QxYVo4WmN4VFhHZAG53Nll2YlMxS1BQczBOUVhnQlZAGdGdhdS1QaGZAnZAmtZATjdQNk1fOUg0VmhqZA0QwYV9zbXNzdUM3MVFHZAgZDZD