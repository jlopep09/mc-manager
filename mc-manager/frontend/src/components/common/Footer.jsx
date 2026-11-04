import React from 'react'

const Footer = () => {
  return (
    <footer className="footer sm:footer-horizontal footer-center bg-base-300/10 text-base-content p-4">
  <aside>
    <p>Oct 2026 - {new Date().getFullYear()} - Proyecto realizado en directos de youtube </p>
    <p className='flex'>
        <a className='text-accent' href="https://www.youtube.com/channel/UCGJGaakyDW8POp07m23smcA">@ChispyDev</a>
        <span className='mx-2'>-</span>
        <a className='text-secondary' href="https://github.com/jlopep09/PracticandoJava">Github</a>
        
    </p>
  </aside>
</footer>
  )
}

export default Footer