import React, { Component } from 'react';
import DanceClassCard from './DanceClassCard.js';
import './App.css';

class App extends Component {
  render() {
    const danceClassData = [
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
    ];

    return (
      <div>
        {danceClassData.map(danceClass => <DanceClassCard {...danceClass} /> )}
      </div>
    );
  }
}

export default App;

