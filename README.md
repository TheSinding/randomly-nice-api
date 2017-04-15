![alt tag](https://ptpb.pw/zASr.png)

An API that say's randomly nice things to you!

The world of the internet, can sometimes be a grim place, and very negative.

This project aims to combat that "trend".


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them

```
npm
node
```

### Installing

It's easy to install!

Clone the repo

```sh
git clone https://github.com/TheSinding/Randomly-nice 
cd randomly-nice
```

Run npm install / yarn install

```sh
npm install
```

Start the server
---------------

```sh
# Start development live-reload server
npm run dev

# Start production server:
npm start
```

## Methods Quick

URIs relative to http://localhost:9000/api (Or where ever yours is), unless otherwise noted.

Method  | Description | Arguments
------- | ----------- | -------------
GET Requests |        |
GET /sentences | Returns all sentences in database as json | 
GET /sentences/:amount | Returns (amount) of random sentences as json | amount
GET /sentences/random  | Returns a random sentence as json
POST Request |        |
POST /sentences | Adds a new sentence if it's approved | JSON obj with array
#### Sentences
```http
GET /sentences           # Returns all sentences in database as json
```
example response
```json
 [
  {
    "_id": "58f22a8de62e1349dbc7b00b",
    "sentence": "You have kind eyes",
    "__v": 0,
    "topic": [
      null
    ]
  },
  { 
   ...
  }
]
```


```http
GET /sentences/:amount  # Returns (amount) of random sentences as json
```
example response
```json
[
  "You're more fun than bubble wrap.",
  "I appreciate all of your opinions."
]
```


```http
POST /sentences  # Returns a random sentence as json
```
example response
```json
[
  {
    "_id": "58f22b6a1e348d4a74ae30bc",
    "sentence": "You're spontaneous, and I love it!",
    "__v": 0,
    "topic": [
      null
    ]
  }
]
```
#### POST
The POST request, is checked against the AFINN 165 list. 
If it's approved it adds its to the database.

```http
GET /sentences  # Adds a new sentence if it's approved
```

example request
```json
{
  "sentences": [
    "You eyes are as beautiful as the sea itself",
    "You are an idiot"
    ]
}
```

example response
```json
{
  "1": {
    "Sentence": "You eyes are as beautiful as the sea itself",
    "Score": {
      "score": 3,
      "comparative": 0.3333333333333333,
      "tokens": [
        "you",
        "eyes",
        "are",
        "as",
        "beautiful",
        "as",
        "the",
        "sea",
        "itself"
      ],
      "words": [
        "beautiful"
      ],
      "positive": [
        "beautiful"
      ],
      "negative": []
    },
    "accepted": true
  },
  "2": {
    "Sentence": "You are an idiot",
    "Score": {
      "score": -3,
      "comparative": -0.75,
      "tokens": [
        "you",
        "are",
        "an",
        "idiot"
      ],
      "words": [
        "idiot"
      ],
      "positive": [],
      "negative": [
        "idiot"
      ]
    },
    "accepted": false
  }
}
```

## Built With

* [Express Boiler Plate](https://github.com/developit/express-es6-rest-api/) - ES6 Express boiler plate 

## Authors

* **Simon Sinding** - *Initial work* 
* **Peter Brink** - *Cosmetic work on the sample page*

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
