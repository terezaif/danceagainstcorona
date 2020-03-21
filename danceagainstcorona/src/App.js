import React, { Component } from 'react';
import Header from './Header.js';
import DayCard from './DayCard.js';

import './typography.css';
import './App.css';

class App extends Component {
  componentDidMount() {
    document.title = 'danceagainstcorona';
  }
  render() {
    const classDataByDay = {
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
        }
      ]
    };
    const events = classDataByDay.events;

    return (
      <div>
        <div><Header /></div>
        {events.map(dayData => <DayCard {...dayData} /> )}
      </div>
    );
  }
}

export default App;

