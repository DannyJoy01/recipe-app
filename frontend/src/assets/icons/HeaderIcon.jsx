import React from 'react'
import FbIcon from '../../assets/icons/FbIcon.svg'
import IgIcon from '../../assets/icons/InstagramIcon.svg'
import TwitterIcon from '../../assets/icons/TwitterIcon.svg'

const HeaderIcon = () => {
  return (
    <div className='flex gap-5 items-center'>
      <img src={FbIcon} alt="Facebook Icon" className='w-[8px]' />
      <img src={TwitterIcon} alt="Twitter Icon" className='w-[18px]' />
     <img src={IgIcon} alt="Instagram Icon" className='w-[18px]' />
    </div>
  )
}

export default HeaderIcon;
