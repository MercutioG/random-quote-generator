import {useState, useEffect} from 'react'

const RandomQuote = () => {
  const url = 'https://api.quotable.io/random'

  const [quote, setQuote] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  const generateQuote = () => fetch(url)
  .then((response) => {
    if(response.status >= 200 && response.status <= 299){
      return response.json
    }else{
      setIsLoading(false)
      setIsError(true)
      throw new Error(response.statusText)
    }
  }).then((output) => {
    setQuote(output)
    setIsLoading(false)
  }).catch((error) => {console.log(error)});

  useEffect(() => {
    generateQuote();
  },[])

  if(isError){
    return(
      <div className='quote-box'>
        <h1>Error</h1>
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
      <h2>{quote && `"Quote" -Some cool guy`}</h2>
      <button onClick={generateQuote()}></button>
    </div>
  )
}

export default RandomQuote