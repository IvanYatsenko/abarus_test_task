import axios from 'axios'
import { useEffect } from 'react'

function App() {
  useEffect(() => {
    fetchPosts()
  }, [])
  async function fetchPosts() {
    try {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/posts`)
      console.log(response.data)
    } catch (error) {
      alert(error)
    }
  }
  return (
    <div>
      work!
    </div>
  )
}

export default App