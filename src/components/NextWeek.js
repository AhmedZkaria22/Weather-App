import React  from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import 'slick-carousel/slick/slick.css';
import "slick-carousel/slick/slick-theme.css";
import '../style/NxtWeek.css';
import Slider from 'react-slick';
import { RiArrowLeftFill } from 'react-icons/ri';
import { WiCloud, WiDayCloudy, WiDayLightning, WiDayRainWind, WiDaySunny, WiDaySunnyOvercast, WiNightAltLightning, WiNightAltPartlyCloudy, WiNightAltRainWind, WiNightClear } from 'react-icons/wi';
import { Link } from 'react-router-dom';

function NextWeek({readData}) {

    const msgs = [
        'The wind is very strong today! This is not the time for a yacht trip',
        'Dangerous sun! Take care of yourself and take advantage of UV protection',
        "If you don't want to get wet today, don't forget your umbrella!"
    ];
    const week = [ 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday' ];

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    const NextWeekProcess = (readData) => {
        
        if(readData.location && readData.current && readData.forecast){
        const dayItems = readData['forecast']['forecastday'];

        // handel Weather Icons
        let dyLight = '',   wCloud = '',    hrIc = [],  wIc = [], wCloudArr = [];
        for( let i=0; i<dayItems.length; i++ ){
            ( dayItems[i]['day']['condition']['icon'].search('night') !== -1 ) ? dyLight = 'night' : dyLight = 'day';
            wCloud = dayItems[i]['day']['condition']['text'];
            hrIc = [ ...hrIc, ` ${dyLight} - ${wCloud} ` ];
        }

        for( let i=0; i<dayItems.length; i++ ){
            if( hrIc[i] === " night - Partly cloudy " ){
                wIc[i] = < WiNightAltPartlyCloudy /> ;  wCloudArr[i] = 'dry';
            }else if( hrIc[i] === " day - Partly cloudy " ){
                wIc[i] = < WiDayCloudy /> ;             wCloudArr[i] = 'dry'; 
            }else if( hrIc[i] === " day - Sunny " ){
                wIc[i] = < WiDaySunny /> ;              wCloudArr[i] = 'hot'; 
            }else if( hrIc[i] === " night - Clear " ){
                wIc[i] = < WiNightClear /> ;            wCloudArr[i] = 'dry'; 
            }else if( hrIc[i] === " night - Overcast " ){
                wIc[i] = < WiDaySunnyOvercast /> ;      wCloudArr[i] = 'rain'; 
            }else if( hrIc[i] === " day - Patchy rain possible " ){
                wIc[i] = < WiDayRainWind /> ;           wCloudArr[i] = 'rain'; 
            }else if( hrIc[i] === " night - Patchy rain possible " ){
                wIc[i] = < WiNightAltRainWind /> ;      wCloudArr[i] = 'rain'; 
            }else if( hrIc[i] === " day - Thundery outbreaks possible " ){
                wIc[i] = < WiDayLightning /> ;          wCloudArr[i] = 'rain'; 
            }else if( hrIc[i] === " night - Thundery outbreaks possible " ){
                wIc[i] = < WiNightAltLightning /> ;     wCloudArr[i] = 'rain'; 
            }else{ wIc[i] = < WiCloud />;               wCloudArr[i] = 'dry';}
        }
        // handel Weather Icons

        const handelDay = (String) => {
            let dat = String;
            let dt = new Date( dat );
            let fnlDt = dt.toGMTString().substr(0, dt.toGMTString().indexOf(","));

            for( let i=0; i<7; i++ ){
                // if( week[i].substr(0,3) === fnlDt  ){ fnlDt = week[i]; break;}
                if( week[i].substr(0,3) === fnlDt  ){ return week[i]; }
            }

            return fnlDt;
        };

            return(
                <>
                <section className={'nxtweekNav'}>
                    <Link className="nav-link" to="/ReactWeatherHome">
                        <RiArrowLeftFill />
                    </Link>                     
                    {/* <Link className="nav-link" to="/">
                        <RiArrowLeftFill />
                    </Link> */}
                    <p> {readData['location']['name']} </p>
                </section>

                <Container>
                    <Slider {...settings} className={'nxtweek__msgs'}>{
                        msgs.map( (msg, index) => ( index < msgs.length ) ?
                            <div key={index} className={'nxtweek__msgs__item'}>
                                <img src={readData['current']['condition']['icon']} alt="weIc" />
                                <p> 10 minutes ago </p>                        
                                <p> {msg} </p>
                            </div>
                            : null    
                        )
                    }</Slider>
                </Container>

                <h3> Next 2 Days </h3>

                <Container className={'nxtweekDays'}>
                    <Row>{
                dayItems.map( (day, index) => ( index > 0 && index < dayItems.length ) ?
                    <Col xl='6' xs='6' key={index}>
                        <p><span className={`${wCloudArr[index]}`}>{wIc[index]}</span> { handelDay(day['date']) } </p>
                        <p><span>maxtemp</span>{ day['day']['maxtemp_c'] }<sup>o</sup></p>
                        <p><span>mintemp</span>{ day['day']['mintemp_c'] }<sup>o</sup></p>
                        {/* <p> {wIc[index]} </p> */}
                    </Col>
                    : null    
                )
                }
                </Row>
                </Container>
                </>
            );
        }
    }

    return(
        <main id="nxtweek">
            {NextWeekProcess(readData)}
        </main>
    );

}

export default NextWeek