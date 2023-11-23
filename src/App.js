import './App.scss';
import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import axios from "axios";


function App() {



    const [dateArray, setDateArray] = useState([]);
    const [months, setMonths] = useState([]);

    const getData = async () => {
        try {
            const {data} = await axios.get('https://dpg.gg/test/calendar.json');
            return data;
        } catch (e) {
            console.error(e);
            toast.error('Что-то пошло не так!');
        }
    }

    const getDates = () => {
        const today = new Date();
        const dates = [];

        const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());

        const months = [];
        for (let i = 0; i < 12; i++) {
            const currentDate = new Date(nextMonth.getFullYear(), nextMonth.getMonth() + i, today.getDate());
            const monthName = new Intl.DateTimeFormat('en-RU', { month: 'long' }).format(currentDate);
            months.push(monthName);
        }
        setMonths(months)

        let dayOfWeek = today.getDay();
        dayOfWeek = dayOfWeek === 0 ? 7 : dayOfWeek;

        for (let i = 0; i < 357 - 7 + dayOfWeek; i++) {
            const newDate = new Date(today);
            newDate.setDate(today.getDate() - i);
            dates.push(newDate.toISOString().split('T')[0]);
        }

        return dates;
    };

    const createCalendarData = async () => {
        const newDates = await getData();

        const calendarData = getDates().reverse().map((date) => {
            const contributions = newDates[date] || 0;
            return { date, contributions };
        });

        setDateArray(calendarData);
    };

    useEffect(() => {
        createCalendarData();
    }, []);

    console.log(dateArray);

    const exam = (contributions) => {
        if (contributions === 0) {
            return ''
        } else  if (contributions > 0 && contributions < 10) {
            return '9'
        } else  if (contributions > 10 && contributions < 19) {
            return '19'
        } else  if (contributions > 20 && contributions < 29) {
            return '29'
        } else  if (contributions > 30) {
            return '99'
        }
    }


    return (
        <div className="container">
            <div className='weeks'>
                <p className="weeks__item">
                    Пн
                </p>
                <p className="weeks__item">
                    Ср
                </p>
                <p className="weeks__item">
                    Пт
                </p>
            </div>
            <div className="content">
                <div className="month">
                    {
                        months.map((item, index) => (
                            <p key={index} className="month__item">
                                {item}
                            </p>
                        ))
                    }
                </div>
                <div className="calendar">
                    {
                        dateArray.map(({date, contributions}, index) => (
                        <div key={index} className={`calendar__item count-${exam(contributions)}`}>
                        <span className='tooltip'>
                            <h5>{contributions} contributions </h5>
                            <p>{date}</p>
                        </span>
                            <svg className='svg' xmlns="http://www.w3.org/2000/svg" width="9" height="6" viewBox="0 0 9 6" fill="none">
                                <path d="M4.5 6L0.169873 1.38009e-07L8.83013 8.95112e-07L4.5 6Z" fill="black"/>
                            </svg>
                        </div>
                    ))}
                </div>
                <div className='category'>
                    <p>Меньше</p>
                    <div style={{display: 'flex', columnGap: '2px'}}>
                        <div  className={`calendar__item count-`}>
                        <span className='tooltip'>
                            <h5> 0 contributions  </h5>
                        </span>
                            <svg className='svg' xmlns="http://www.w3.org/2000/svg" width="9" height="6" viewBox="0 0 9 6" fill="none">
                                <path d="M4.5 6L0.169873 1.38009e-07L8.83013 8.95112e-07L4.5 6Z" fill="black"/>
                            </svg>
                        </div>
                        <div  className={`calendar__item count-9`}>
                        <span className='tooltip'>
                            <h5> 1-9 contributions  </h5>
                        </span>
                            <svg className='svg' xmlns="http://www.w3.org/2000/svg" width="9" height="6" viewBox="0 0 9 6" fill="none">
                                <path d="M4.5 6L0.169873 1.38009e-07L8.83013 8.95112e-07L4.5 6Z" fill="black"/>
                            </svg>
                        </div>
                        <div  className={`calendar__item count-19`}>
                        <span className='tooltip'>
                            <h5> 10-19 contributions  </h5>
                        </span>
                            <svg className='svg' xmlns="http://www.w3.org/2000/svg" width="9" height="6" viewBox="0 0 9 6" fill="none">
                                <path d="M4.5 6L0.169873 1.38009e-07L8.83013 8.95112e-07L4.5 6Z" fill="black"/>
                            </svg>
                        </div>
                        <div  className={`calendar__item count-29`}>
                        <span className='tooltip'>
                            <h5> 20-29 contributions  </h5>
                        </span>
                            <svg className='svg' xmlns="http://www.w3.org/2000/svg" width="9" height="6" viewBox="0 0 9 6" fill="none">
                                <path d="M4.5 6L0.169873 1.38009e-07L8.83013 8.95112e-07L4.5 6Z" fill="black"/>
                            </svg>
                        </div>
                        <div  className={`calendar__item count-99`}>
                        <span className='tooltip'>
                            <h5> 30+ contributions  </h5>
                        </span>
                            <svg className='svg' xmlns="http://www.w3.org/2000/svg" width="9" height="6" viewBox="0 0 9 6" fill="none">
                                <path d="M4.5 6L0.169873 1.38009e-07L8.83013 8.95112e-07L4.5 6Z" fill="black"/>
                            </svg>
                        </div>
                    </div>
                    <p>Больше</p>
                </div>
            </div>
        </div>
    )
}

export default App;
