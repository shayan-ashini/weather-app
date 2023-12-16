import React, { useContext, useState } from 'react';
import axios from 'axios';

import './app.css'
const Result = React.createContext()

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let time = new Date()
let day = days[time.getDay()];
let date = time.getDate()
let month = months[time.getMonth()];

function App() {

  const [loc, setloc] = useState('')
  const [data, setdata] = useState({})
  const [ico, setico] = useState({})
  const [dis, setdis] = useState()


  const search = (ev) => {

    if (ev.key === 'Enter') {

      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${loc}&appid=02a6df3d148e3ad5292fada0f2d7d3d6&units=metric`)
        .then(res => {
          setdata(res.data)
          // setico(res.data.weather[0].main)
          const sh = res.data.weather[0].main
          const disp = res.data.weather[0].description
          // console.log(res.data)
          setico(sh)
          setdis(disp)
          // console.log(sh)

        })

      setloc('')

    }

  }


  return (



    <Result.Provider value={{ data, setdata, ico, setico, dis, setdis }}>



      <section className='col-12'>

        <div className='inp col-12' >
          <input className='col-8 col-md-3' placeholder='Enter your city' onKeyPress={search} value={loc} id='inpt' onChange={(e) => setloc(e.target.value)} type="text" />
        </div>
        <Name />
        <div className="temp col-12">
          <Left />
          <Right />

        </div>

      </section>



    </Result.Provider>


  )
}


function Name() {
  // const city = useContext(Result)
  const { data, setdata, ico, setico } = useContext(Result)


  return (
    <div className="name-date col-12">
      <h1>{data.name ? <h1>{data.name},  {data.sys.country}</h1> : null}</h1>
      {
        data.name &&
        <h2>{day} {date} {month}</h2>

      }


    </div>
  )
}



function Left() {
  // const icon = useContext(Result)
  const { data, setdata, ico, setico, dis, setdis } = useContext(Result)


  return (
    <div className="left-box col-11 col-md-5">



      {ico == 'Clear' ? <div className="col-9 col-md-6  "><i className=' icon bi bi-brightness-high'></i></div> : null}
      {ico == 'Haze' ? <div className="col-9 col-md-6  "><i className=' icon bi bi-cloud-haze-fill'></i></div> : null}
      {ico == 'Clouds' ? <div className="col-9 col-md-6   "><i className='icon bi bi-cloud'></i></div> : null}
      {ico == 'Rain' ? <div className="col-9 col-md-6  "><i className=' icon bi bi-cloud-rain-heavy'></i></div> : null}
      {ico == 'Snow' ? <div className="col-9 col-md-6   "><i className='icon bi bi-snow2'></i></div> : null}
      {ico == 'Mist' ? <div className="col-9 col-md-6   "><i className='icon bi bi-water'></i></div> : null}
      {ico == 'Thunderstorm' ? <div className="col-9 col-md-6"><i className='icon bi bi-tornado'></i></div> : null}
      {ico == 'Drizzle' ? <div className="col-9 col-md-6"><i className='icon bi bi-cloud-drizzle'></i></div> : null}

      {data.name ? <div className="dama col-6 mt-4 mt-md-0 align-items-md-start"> <span>{(data.main.temp).toFixed(0)}°</span><p>{dis}</p></div> : null}


    </div>
  )
}
function Right() {
  const { data, setdata, ico, setico, dis, setdis } = useContext(Result)

  return (

    
    <div className="right-box col-11 col-md-5">
      {data.main ?

       <div className='right1'>
       <div className="mini col-6 col-md-4">{(data.main.temp_max).toFixed(0)}° <span>Hight</span></div>
        <div className="mini col-6 col-md-4">{(data.main.temp_min).toFixed(0)}°<span>Low</span> </div>
        <div className="mini col-6 col-md-4">{(data.main.feels_like).toFixed(0)}° <span>Feels like</span> </div>
        <div className="mini col-6 col-md-4">{data.main.pressure} hPa <span>Pressure</span> </div>
        <div className="mini col-6 col-md-4">{data.main.humidity} % <span>Humidity</span> </div>
        <div className="mini col-6 col-md-4">{ico}</div>



       </div>

        : null}
     
    </div>
  )
}







export default App;




