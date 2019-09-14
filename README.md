# MyPlaces

![demo](https://github.com/tmns/myplaces/raw/master/demo/demo.gif)

## Table of Contents
* [Intro](#intro)
* [Install](#install)
* [Run](#run)
* [Test](#test)

## Intro
MyPlaces is a mobile application (Android & iOS) that allows you to view points of interest around you. The app retrieves points of interest from an API endpoint and sorts them into a list. Additionally, the app features an integrated [Google map](https://github.com/venits/react-native-map-clustering) that allows you to better visualize exactly where your places are located. It is built with the help of React Native and Expo. 

More specifically, the app allows you to:

* View points of interest in a list
* View points of interest in a map
* Sort points of interest based on proximity (if location permissions are granted)
* Sort points of interest alphabetically (if location permissions are not granted)
* **Bonus:** Tap on a point of interest in your list and be taken to its location on the map.
* **Bonus:** Dark mode!

## Install
To install, `cd` to project root and run:
```
$ npm install
```
This will install the required dependencies. From there, you can build and run the app.

## Run
To build and run the app for both iOS and Android, `cd` to project root and run:
```
$ expo start
```
This will run expo's development server with live reloading, allowing you to run and bundle the app, continue to develop, and see your changes take effect live.

## Test
This application relies on Jest and the React Native Testing Library for testing. To run all tests, `cd` to project root and run:
```
$ npm test
```
This will also generate a coverage report and output the results in `./coverage`