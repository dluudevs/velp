import React, { useEffect } from 'react';
import { fetchByBusiness } from './utils'

function App() {
  useEffect(() => {
    fetchByBusiness().then(results => console.log(results))
  }, [])
  
  return (
   <div>
     <h1>This is the Velp App</h1>
   </div>
  );
}

export default App;
