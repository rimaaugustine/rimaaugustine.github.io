import React from 'react'
import '../../styles/flag.scss';

export default function IndonesiaFlag() {
  return (
    <div>
       <div className='center'>
            <div className='flag-container'>
              <span className='pole' />
              <span className='knob' />
              <span className='flag front'>
                <span className='rect' />
              </span>
              <span className='flag back'>
                <span className='rect2' />
                <span className='shadow' />
              </span>
            </div>
          </div>
          <br/>
          <br/>
         <br/>
    </div>
  )
}
