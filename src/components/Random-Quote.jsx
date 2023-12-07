import {useState, useEffect} from 'react'

const RandomQuote = () => {
  const [quote, setQuote] = useState("")
  const [author, setAuthor] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  const [count, setCount] = useState(0)

  useEffect(() => {
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
  },[count])

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
      <h2 key={count}>{quote}</h2>
      <h3><em>-{author}</em></h3>
      <button className='update-btn' onClick={() => setCount(count + 1)}>Generate Quote</button>
    </div>
  )
}

export default RandomQuote