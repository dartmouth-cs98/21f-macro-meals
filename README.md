# Macro

[Team Photo](https://imgur.com/a/qCq94Gy)

Macro aims to make meals easy through an easy-to-use macro tracking iOS app. Simply snap a picture of your meal and let Macro determine the calorie, protein, carbohydrate, and fat content of your dish. Macro will remember the foods you eat to help you track and achieve your dietary goals.

Macro uses a custom computer vision machine learning algorithm to classify foods and quantify volumes, which combine to provide the nutritional breakdown of a variety of foods.

- [Main Repo](https://github.com/dartmouth-cs98/21f-macro-meals)

- [API Repo](https://github.com/dartmouth-cs98/21f-macro-meals-api) 

- [Classifier Repo](https://github.com/dartmouth-cs98/21f-macro-meals-classifier) 

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
* Run `expo start` to start up the app. You can then use Xcode to simulate an iOS device, or connect your own iOS device via LAN or tunneling via the QR code

### Back End

**NOTE:** the flask server takes a bit of time to boot up for the first call! If you would like to ensure that the server is up and running before you start the app, just visit [this URL](https://macroclassifier.herokuapp.com/)!

* The [server](https://macro-cs98.herokuapp.com/api) is automatically deployed via Heroku
* The [database](https://cloud.mongodb.com/v2/5f301a43938f013d0af499bc#clusters/detail/Macro) is hosted by MangoDB
* The [flask server](https://github.com/dartmouth-cs98/21f-macro-meals-classifier) is automatically deployed via Heroku
* The [images database](https://s3.console.aws.amazon.com/s3/buckets/macro-meals-images?region=us-east-1&tab=objects) is stored on Amazon S3 

## Deployment

### Front End

* Clone the [main repo](https://github.com/dartmouth-cs98/21f-macro-meals) to your local machine
* Navigate to the `macro-frontend` directory
* Run `yarn install` to install any necessary dependencies
* Run `expo build:ios` to build the app
* Download the build file from expo and upload to App Store Connect via the Transporter app

### Back End

* Heroku automatically deploys the API repo whenever `main` receives an update
