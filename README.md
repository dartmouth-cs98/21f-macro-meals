# Macro

[Team Photo](https://imgur.com/a/qCq94Gy)

Macro aims to make meals easy through an easy-to-use macro tracking iOS app. Simply snap a picture of your meal and let Macro determine the calorie, protein, carbohydrate, and fat content of your dish. Macro will remember the foods you eat to help you track and achieve your dietary goals.

Macro uses a custom computer vision machine learning algorithm to classify foods and quantify volumes, which combine to provide the nutritional breakdown of a variety of foods.

- [Main Repo](https://github.com/dartmouth-cs98/21f-macro-meals)

- [API Repo](https://github.com/dartmouth-cs98/21f-macro-meals-api) 

- [Classifier Repo](https://github.com/dartmouth-cs98/21f-macro-meals-classifier) 

- [Images Repo](https://github.com/dartmouth-cs98/21f-macro-meals-images)

- [Figma Board](https://www.figma.com/file/x0tpjcBSMKuImg4e0EvhlY/Initial-Sketches?node-id=0%3A1)

[Initial sketches](https://imgur.com/a/AAC5E6G)

## Architecture

* Front End: React Native, Node.js
* Back End: Express, MongoDB, Mongoose
* Machine Learning: Flask, TensorFlow
* Storage: Amazon S3

## Setup

### Front End

* Clone the [main repo](https://github.com/dartmouth-cs98/21f-macro-meals) to your local machine
* Navigate to the `macro-frontend` directory
* Run `yarn install` to install any necessary dependencies
* Run `yarn start` to start up the app. You can then use Xcode to simulate an iOS device, or connect your own iOS device via LAN or tunneling via the QR code

### Back End

* The [server](https://macro-cs98.herokuapp.com/api) is automatically deployed via Heroku
* The [database](https://cloud.mongodb.com/v2/5f301a43938f013d0af499bc#clusters/detail/Macro) is hosted by MangoDB

## Deployment

**NOT YET READY FOR DEPLOYMENT**

### Front End

* Clone the [main repo](https://github.com/dartmouth-cs98/21f-macro-meals) to your local machine
* Navigate to the `macro-frontend` directory
* Run `yarn deploy`

### Back End

* The [server](https://macro-cs98.herokuapp.com/api) is automatically deployed via Heroku
* The [database](https://cloud.mongodb.com/v2/5f301a43938f013d0af499bc#clusters/detail/Macro) is hosted by MangoDB

## Authors

* Quinn Spraut 
* Anand Mittal 
* Alex Wong 
* Brandon Feng

## Acknowledgments
