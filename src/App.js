import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect, useState } from 'react';
import Current from './components/Current';
import NextWeek from './components/NextWeek';
// import { BrowserRouter as Router, HashRouter, Route, Switch } from 'react-router-dom';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
function App() {

  // Fetch date from weather api
  const [readData, setReadData] = useState({});
  let [unSub1Fetch, setUnSub1Fetch] = useState('');
  
  useEffect(() => {
      if(unSub1Fetch === ''){
      setUnSub1Fetch(`https://api.weatherapi.com/v1/forecast.json?key=244694e7630a4db5bc3150225210908&q=Alexandria&aqi=yes&days=10`);}

      let unSub1 = fetch(unSub1Fetch)
      .then( response => response.json() )
      .then( data => {
      setReadData( data );
      }).catch( error => console.log( error ) );
      // console.log( readData );
      return unSub1;
  }, [unSub1Fetch]);
  // Fetch date from weather api
      

  return (
    <Router basename="/ReactWeatherHome">
    {/* <Router> */}
      <div className="App">
        <Switch>
          <Route path="/" exact>
            <Current readData={readData} setUnSub1Fetch={setUnSub1Fetch} />
          </Route>
          {/* <Route path="/" exact>
            <Current readData={readData} setUnSub1Fetch={setUnSub1Fetch} />
          </Route> */}
          <Route path="/ReactWeatherNextWeek">
            <NextWeek readData={readData} /> 
          </Route>
        </Switch>
      </div>
    {/* </Router> */}
    </Router>
  );
}

export default App;
