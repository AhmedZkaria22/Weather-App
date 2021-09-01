import React, { useRef, useState } from 'react';
import 'slick-carousel/slick/slick.css';
import "slick-carousel/slick/slick-theme.css";
import '../style/Current.css';
import { HiLocationMarker, HiSearch } from 'react-icons/hi';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { RiWindyLine } from 'react-icons/ri';
import { CgDrop } from 'react-icons/cg';
import { WiCloud, WiDayCloudy, WiDayLightning, WiDayRainWind, WiDaySunny, WiDaySunnyOvercast, WiNightAltLightning, WiNightAltPartlyCloudy, WiNightAltRainWind, WiNightClear } from 'react-icons/wi';
import Slider from 'react-slick';
import { Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';


function Current({readData, setUnSub1Fetch}) {
    const wlIn = useRef(null);
    const wlSp = useRef(null);
    
    const [wlInVal, setWlInVal] = useState('');
    const wlInChange = () => {
        setWlInVal(wlIn.current.value);
    }


    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1
    };

        
    const handelSubmit = (e) => {
        e.preventDefault();

        wlSp.current.style.display = 'none';
        wlIn.current.readOnly = true;            
        wlIn.current.classList.remove("inputActive");
        wlIn.current.classList.add("inputRead");

        const cityVl = wlInVal;
        // console.log( wlInVal, cityVl ); 
        setUnSub1Fetch('https://api.weatherapi.com/v1/forecast.json?key=244694e7630a4db5bc3150225210908&q='+cityVl+'&aqi=yes&days=10');        
    }

    const CurrentProcess = (readData) => {
        
        if(readData.location && readData.current && readData.forecast){

            const hourItems = [readData['forecast']['forecastday'][0]['hour']][0];

            // handel Weather Icons
            let dyLight = '',   wCloud = '',    hrIc = [],  wIc = [];
            for( let i=0; i<hourItems.length; i++ ){
                ( hourItems[i]['condition']['icon'].search('night') !== -1 ) ? dyLight = 'night' : dyLight = 'day';
                wCloud = hourItems[i]['condition']['text'];
                hrIc = [ ...hrIc, ` ${dyLight} - ${wCloud} ` ];
            }

            for( let i=0; i<hourItems.length; i++ ){
                ( hrIc[i] === " night - Partly cloudy " )
                ? wIc[i] = < WiNightAltPartlyCloudy />
                : ( hrIc[i] === " day - Partly cloudy " )
                ? wIc[i] = < WiDayCloudy />
                : ( hrIc[i] === " day - Sunny " )
                ? wIc[i] = < WiDaySunny />
                : ( hrIc[i] === " night - Clear " )
                ? wIc[i] = < WiNightClear />
                : ( hrIc[i] === " night - Overcast " )
                ? wIc[i] = < WiDaySunnyOvercast />
                : ( hrIc[i] === " day - Patchy rain possible " )
                ? wIc[i] = < WiDayRainWind />
                : ( hrIc[i] === " night - Patchy rain possible " )
                ? wIc[i] = < WiNightAltRainWind />
                : ( hrIc[i] === " day - Thundery outbreaks possible " )
                ? wIc[i] = < WiDayLightning />
                : ( hrIc[i] === " night - Thundery outbreaks possible " )
                ? wIc[i] = < WiNightAltLightning />
                : wIc[i] = < WiCloud />;
            }
            // handel Weather Icons

            const handelDay = (String) => {
                let dat = String;
                let dt = new Date( dat );
                let fnlDt = dt.toGMTString().substr(0, 11);
                return fnlDt;
            }

            return(                
                <>
                    <section className={'weatherToday'}>
                        <img src={readData['current']['condition']['icon']} alt="icon"/>
                        <p> {readData['current']['condition']['text']} </p>
                        <p> {readData['current']['temp_c']} <sup>o</sup> </p>
                        <p>
                            <span> <RiWindyLine /> {readData['current']['wind_kph']} km/h </span>
                            <span> <CgDrop /> {readData['current']['humidity']} % </span>
                        </p>
                    </section>

                    <section className={'weatherHourly'}>
                        <div className={'weatherHourly__days container'}>
                            <Row>
                                <p className={'col-4'}> { handelDay(readData['forecast']['forecastday'][0]['date']) } </p>
                                <p className={'col-4'}> { handelDay(readData['forecast']['forecastday'][1]['date']) } </p>
                                <p className={'col-4'}> { handelDay(readData['forecast']['forecastday'][2]['date']) } </p>
                            </Row>
                        </div>
                        
                        <Container>
                            <Slider {...settings} className={'weatherHourly__hours'}>{        
                                hourItems.map( (hourItem, index) => (index < hourItems.length) ? 
                                <div key={index} className={'weatherHourly__hours__item'}>                                 
                                    {/* <p>{
                                        ( index > 11 ) ? 
                                        hourItem['time'].substr( hourItem['time'].indexOf(" ")+1 )+' PM' : 
                                        hourItem['time'].substr( hourItem['time'].indexOf(" ")+1 )+' AM'
                                    }</p> */}
                                    <p>{
                                        ( index+1 > 12 ) 
                                        ? ((index+1) - 12 <= 9) 
                                            ? `0${(index+1) -12}:00 PM`
                                            : `${(index+1) -12 }:00 PM`                                                                                
                                        : (index+1 <= 9) 
                                            ? `0${index+1}:00 AM`
                                            : `${index+1}:00 AM`
                                    }</p>
                                    { wIc[index] }
                                    <p> {hourItem['temp_c']} <sup>o</sup> </p>
                                </div>
                                :null
                                )
                            }</Slider>
                        </Container>
                    </section>
                </>
            )
        }  
    }
    return (
        <main id="current">
            <section className={'weatherNav'}>
                <HiLocationMarker />
                <div className={'weatherNav__location'}>
                    <form onSubmit={handelSubmit}>
                        <input placeholder='location..' ref={wlIn} onChange={wlInChange} onClick={() => {
                            wlSp.current.style.display = 'block';
                            wlIn.current.removeAttribute("readOnly");
                            wlIn.current.classList.remove("inputRead");
                            wlIn.current.classList.add("inputActive"); 
                        }}/>
                        <span ref={wlSp}></span>
                        <button type='submit'> <HiSearch/> </button>
                    </form>                    
                </div>
                <Link className="nav-link" to="/ReactWeatherNextWeek">
                    <FaRegCalendarAlt />
                </Link>                     
                
            </section>
            { CurrentProcess(readData) }
        </main>
    )
}

export default Current
