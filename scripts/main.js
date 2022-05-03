/*

What is it? Music events Agency

Event:

const event = {
	_id: '',
	performer: '',
	genre: '',
	eventName: '',
	location: '',
	city: '',
	date: '',
	time: '',
	price: ,
}

*/

/* 
1. create a CLASS for each event
2. create new events
3. create eventList CLASS
	3a. add CRUD + other methods (find if band or singer / get dates / get average prices / organize them by date or name of band)
*/

import { nanoid } from "https://cdn.skypack.dev/nanoid";

class Event {
	constructor(performerName, typeOfPerformer, genre, eventName,location, city, date, time, price, id){
		if (typeof performerName !== 'string'){
			throw new Error (`Expected a string for the name of the performer, but received ${performer} (${typeof performer})`);
		}
	
		if (performerName.length === 0) {
			throw new Error (`Name of performer required`);
		}

		this.performerName = performerName;
		this.typeOfPerformer = typeOfPerformer;
		this.genre = genre;
		this.eventName = eventName;
		this.location = location;
		this.city = city;
		this.date = date; 
		this.time = time; 
		this.price = price; 
		// this._id = nanoid();

		// id cannot be modified - it's only readable
		Object.defineProperty(this, '_id', {
			value: nanoid()
		});
	}
	eventDetails() {
		console.log(this);
	}
}

const event1 = new Event (
	'Blink 182',
	'band',
	['punk', 'rock'],
	'Punk is back!',
	'O2',
	'London',
	'30 October 2022',
	'21.30',
	15000
);

console.table(event1);

const event2 = new Event (
	'Frah Quintale',
	'singer',
	['indie', 'italian'],
	'Summer 2022 Tour',
	'Arena di Verona',
	'Verona',
	'20 July 2022',
	'20.30',
	5000
);

console.table(event2);

class EventManager {
	events = [];
	constructor(name) {
		this.name = name;
	}
	// CREATE
	addEvent(data) {
		let event = data;
		if(!(data instanceof Event)) {
			event = new Event(data.performerName, data.typeOfPerformer, data.genre, data.eventName,data.location, data.city, data.date, data.time, data.price)
		}

		this.events.push(event);
		return event._id;
	}

	// READ
	getEventDetails() {
		this.events.forEach(function(event) {
			event.eventDetails();
		})
	}

	// UPDATE
	updateEvent(id, updates) {
		const idx = this.events.findIndex(function(event) {
			return event._id === id;
		});
		const event = this.events[idx];
		Object.assign(event, updates);
	}

	// DELETE
	deleteEvent(id) {
		const idx = this.events.findIndex(function(event) {
			return event._id === id;
		});
		this.events.splice(idx, 1);
	}

	// find the bands / singers
	findByTypeOfPerformer(typeOfPerformer) {
		return this.events.filter(function(event){
			return event.typeOfPerformer === typeOfPerformer;
		});
	}

	// get dates 
	getDates() {
		return this.events.map(function(event) {
			return event.performerName + ' on the ' + event.date;
		});
	}

	// get average prices of the agency's events
	getAveragePrice() {
		let total = 0;
		this.events.forEach(function(event) {
			total += event.price;
		});
		return total / this.events.length;
	}

	// organize them by name of band
	sortByPerformerName() {
		return this.events.sort(function(eventA, eventB) {
			if (eventA.performerName > eventB.performerName) return 1;
			if (eventA.performerName < eventB.performerName) return -1;
		});
	}

	// organize events by date
	sortByDate() {
		return this.events.sort(function(eventA, eventB) {
			return new Date(eventA.date) - new Date(eventB.date)
		})
	}

	// find by city - location
	findByCity(city) {	
		return this.events.filter(function(event){
			return event.city === city.charAt(0).toUpperCase() + city.slice(1);
			// doesn't work with 'new york city' though......
			/*
			1. I would have to check if city is just one word - if it is then return the statement above
			2. If city typed by client has more than one word, then need to capitalize each word 
			Not sure how to do this
			*/
		});
	}

}

const event3 = new Event (
	'Panic! at the Disco',
	'band',
	['rock', 'emo'],
	'Death of the Bachelor Tour',
	'Madison Square Garden',
	'New York City',
	'25 January 2023',
	'19.30',
	10000
);

const myMusicAgency = new EventManager(`Mari's Music Events Agency`);

const event1Id = myMusicAgency.addEvent(event1);
// console.log("🚀 ~ file: main.js ~ line 133 ~ event1Id", event1Id)
const event2Id = myMusicAgency.addEvent(event2);
console.log("🚀 ~ file: main.js ~ line 122 ~ myMusicAgency", myMusicAgency)

const event3Id = myMusicAgency.addEvent(event3);

myMusicAgency.getEventDetails();

console.log(myMusicAgency.findByTypeOfPerformer('band'));

console.log(myMusicAgency.getDates());

console.log(myMusicAgency.getAveragePrice());

console.log(myMusicAgency.sortByPerformerName());

console.log(myMusicAgency.findByCity('london'));

console.log(myMusicAgency.sortByDate());


const updates = {
	genre: 'pop',
	time: '21.30'
};

myMusicAgency.updateEvent(event2Id, updates);
console.log("🚀 ~ file: main.js ~ line 146 ~ event2", event2);


myMusicAgency.deleteEvent(event1Id)
console.log("🚀 ~ file: main.js ~ line 153 ~ myMusicAgency", myMusicAgency)

/*
May be useful when capitalizing each word - not sure how to implement it in the code
function titleCase(str) {
   let splitStr = str.toLowerCase().split(' ');
   for (var i = 0; i < splitStr.length; i++) {
       // Assign it back to the array
       splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
   }
   // Directly return the joined string
   return splitStr.join(' '); 
}

console.log(titleCase("I'm a little tea pot"));
*/

