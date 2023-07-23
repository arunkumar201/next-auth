'use client'
import React,{ useEffect,useState } from 'react'
import { useAnimation, motion } from 'framer-motion'
import { RiCheckFill } from 'react-icons/ri'
import { ImCross } from 'react-icons/im'
import axios from 'axios'

export default function VerifyEmailPage() {
  const [token, setToken] = useState('')
  const [verified, setVerified] = useState(false)
  const [error, setError] = useState(false)
  
  const controls = useAnimation()
  
  useEffect(() => {
    const urlToken = window.location.search.split('=')[1]
	  setToken(urlToken || '')
	  console.log(urlToken,'123')
  }, [])

  useEffect(() => {    
	  async function checkEmail() {
		  if (token.length > 0) {
			  controls.start('visible')
			  await axios.post('/api/users/verifyEmail',{ token })
			  setTimeout(() => {
				  setVerified(true)
     
			  },1000)
		  }
	  }
	  checkEmail();
  }, [token,controls])

  return (  
    <motion.div
      initial={{ opacity: 0 }}      
      animate={controls}      
      transition={{ duration: 0.5 }}      
      className="flex flex-col items-center justify-center min-h-screen py-2"
    >  
      <motion.div className="flex items-center" animate={{ opacity: [1, 0] }} transition={{ duration: 2 }}> 
        <span className="w-6 h-6 border-4 border-t-transparent rounded-full border-orange-500 animate-spin"></span>
      </motion.div>

      {verified && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}          
        >
          <RiCheckFill className="text-6xl text-green-500 mb-4" />          
          <h2 className="text-2xl">Email Verified!</h2>
        </motion.div>  
      )}

      {error && (         
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >        
          <ImCross className="text-6xl text-red-500 mb-4" />
          <h2 className="text-2xl">Error</h2>                  
        </motion.div>      
      )}
    </motion.div>  
  )
}
