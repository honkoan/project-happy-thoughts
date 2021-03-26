import React, { useState, useEffect } from 'react'

import Form from './components/Form'
import ThoughtList from './components/ThoughtList'

import './index.css'

import { URL } from './reusable/url'

export const App = () => {
  const [messageList, setMessageList] = useState([])
  const [messageNew, setMessageNew] = useState('')

  useEffect(() => {
    fetchMessageList()
  }, [])

  const fetchMessageList = () => {
    fetch(URL)
      .then((res) => res.json())
      .then((messages) => setMessageList(messages))
      .catch((err) => console.error(err))
  }

  const handleMessageNewChange = (event) => {
    setMessageNew(event.target.value)
  }

  const handleFormSubmit = (event) => {
    event.preventDefault()

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message: messageNew })
    }

    fetch(URL, options)
    .then(res => res.json())
    .then(() => fetchMessageList())
    .catch(err => console.error(err))
  }

  return (
    <>
      <Form
        messageNew={messageNew}
        onMessageNewChange={handleMessageNewChange}
        onFormSubmit={handleFormSubmit}
      />
      <ThoughtList messageList={messageList} />
    </>
  )
}
