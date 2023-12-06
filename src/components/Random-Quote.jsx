import {useState, useEffect} from 'react'

const RandomQuote = () => {
  const [quote, setQuote] = useState("")
  const [author, setAuthor] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  const updateQuote = () => {
    const url = 'https://api.quotable.io/random'
    fetch(url)
    .then((response) => {
      if(response.status >= 200 && response.status <= 299){
        return response.json()
      }else{
        setIsLoading(false)
        setIsError(true)
        throw new Error(response.statusText)
      }
    }).then((output) => {
      setAuthor(output.author)
      setQuote(output.content)
      setIsLoading(false)
    }).catch((error) => {console.log(error)});
  }

  useEffect(() => {
    updateQuote()
  },[])

  if(isError){
    return(
      <div className='quote-box'>
        <h1>Error!</h1>
      </div>
    )
  }

  if(isLoading){
    return(
      <div className='quote-box'>
        <h1>Loading...</h1>
      </div>
    )
  }

  return (
    <div className='quote-box'>
      <h1>Random Quote</h1>
      <h2>{quote}</h2>
      <h3>{author}</h3>
      <button className='update-btn' onClick={() => updateQuote()}>Generate Quote</button>
    </div>
  )
}

export default RandomQuote