export const fetchByBusiness = async () => {
  const response = await fetch(`${process.env.REACT_APP_API_URL_CORS}businesses/search?term=food&location=toronto`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${process.env.REACT_APP_API_KEY}`
    }
  })
  .then(res => res.json())

  return response;
}
