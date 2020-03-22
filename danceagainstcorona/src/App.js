import React, { Component } from 'react';
import Header from './Header.js';
import DayCard from './DayCard.js';
import Footer from './Footer.js';
import Loader from './Loader.js';

import './typography.css';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      events: []
    };
  }
  componentDidMount() {
    document.title = 'danceagainstcorona';
    fetch('https://dancebackend.herokuapp.com/v1/all_classes')
      .then(res => res.json())
      .then(res => res.events.sort((a,b) => new Date(a.date) - new Date(b.date)))
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            events: result
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }
  render() {
    /*     const classDataByDay = {
          events: [
            {
              date: "2020-03-21",
              classes: [
                {
                  id: "rec9jwOhOPm0SVBtq",
                  danceStyle: "DanceHall",
                  duration: "1 hour",
                  artists: [
                    {
                      name: "LadyLis",
                      instagram: "@ladylis_dhclasshh",
                    },
                  ],
                  dateTime: "2020-03-21T17:00:00.000Z",
                  language: "DE / EN",
                },
                {
                  id: "abc",
                  danceStyle: "SOCA",
                  duration: "1 hour",
                  artists: [
                    {
                      name: "Miss TK",
                      instagram: "@miss_tk",
                    },
                    {
                      name: "LadyLis",
                      instagram: "@ladylis_dhclasshh",
                    },
                  ],
                  dateTime: "2020-03-21T18:00:00.000Z",
                  language: "DE / EN",
                },
                {
                  id: "bc",
                  danceStyle: "K-Pop",
                  duration: "1 hour",
                  artists: [
                    {
                      name: "Zoe",
                      instagram: "@satan_channn",
                    },
                  ],
                  dateTime: "2020-03-21T13:00:00.000Z",
                  language: "DE",
                },
              ]
            },
            {
              date: "2020-03-22",
              classes: [
                {
                  id: "rec9jwOhOPm0SVBtq",
                  danceStyle: "DanceHall",
                  duration: "1 hour",
                  artists: [
                    {
                      name: "LadyLis",
                      instagram: "@ladylis_dhclasshh",
                    },
                  ],
                  dateTime: "2020-03-21T17:00:00.000Z",
                  language: "DE / EN",
                },
                {
                  id: "abc",
                  danceStyle: "SOCA",
                  duration: "1 hour",
                  artists: [
                    {
                      name: "Miss TK",
                      instagram: "@miss_tk",
                    },
                    {
                      name: "LadyLis",
                      instagram: "@ladylis_dhclasshh",
                    },
                  ],
                  dateTime: "2020-03-21T18:00:00.000Z",
                  language: "DE / EN",
                },
                {
                  id: "bc",
                  danceStyle: "K-Pop",
                  duration: "1 hour",
                  artists: [
                    {
                      name: "Zoe",
                      instagram: "@satan_channn",
                    },
                  ],
                  dateTime: "2020-03-21T13:00:00.000Z",
                  language: "DE",
                },
              ]
            },
            {
              date: "2020-03-23",
              classes: [
                {
                  id: "rec9jwOhOPm0SVBtq",
                  danceStyle: "DanceHall",
                  duration: "1 hour",
                  artists: [
                    {
                      name: "LadyLis",
                      instagram: "@ladylis_dhclasshh",
                    },
                  ],
                  dateTime: "2020-03-21T17:00:00.000Z",
                  language: "DE / EN",
                },
                {
                  id: "bc",
                  danceStyle: "K-Pop",
                  duration: "1 hour",
                  artists: [
                    {
                      name: "Zoe",
                      instagram: "@satan_channn",
                    },
                  ],
                  dateTime: "2020-03-21T13:00:00.000Z",
                  language: "DE",
                },
              ]
            }
          ]
        };
        */

    // const events = classDataByDay.events;
    const { error, isLoaded, events } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return (
        <div>
          <Header />
          <Loader />
          <Footer />
        </div>
      );
    } else {
      return (
        <div>
          <Header />
          {events.map(dayData => dayData.classes.length ? <DayCard key={dayData.date} {...dayData} /> : <div></div> )}
          <Footer />
        </div>
      );
    }
  }
}

export default App;

