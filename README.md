# SonGlue [![Netlify Status](https://api.netlify.com/api/v1/badges/05b738ef-f461-4db8-81e6-54135f2c1883/deploy-status)](https://app.netlify.com/sites/songlue/deploys)

[View the SonGlue app Here](https://songlue.netlify.app/)

## Topics
- [Get Started](#get-started)
- [Overview](#overview)
- [Features](#features)
___
## Overview
- The ideal user for Songlue is a musician/songwriter/composer trying to organize their songs/composition ideas
- Songwriters can upload their unfinished musical ideas as "snippets" and assign them to a song idea
- Musicians can view others' shared sounds if they mark them as public to get inspiration

## MVP Features
- Musicians sign in with Google authentication
- Songwriters can browse the Shared Sounds section to view other people's public songs and public snippets only
- Musicians can create, read, update and delete their own song ideas
- Musicians can create read update and delte their own snippet ideas
- Both Snippets and Songs have information regarding BPM, Key of, Title, Description, whether it's public, and whether it's a favorite
- Users can searches their Snippets
- Users can filter out and quickly view their favortie of their own Snippets

## Video Walkthrough of Songlue

## Relevant Links
- [Check out the deployed site](https://songlue.netlify.app/)
- [Figma Wireframes](https://www.figma.com/file/qlpuv1O0nBa1gsaRUMydaS/Songlue?node-id=0%3A1&t=dKNU5YLDvctIhoVa-1)
- [Project Board](https://github.com/users/AngieMGonzalez/projects/1)

- [MVP ERD](https://dbdiagram.io/d/63ead9d4296d97641d80a8bd)
<img width="400" alt="Songlue ERD made using dbDiagram" src="https://user-images.githubusercontent.com/114124374/222018077-3e8f43cb-0196-4a95-a518-1320d6a4d26c.png">

- Assumption: A song can have many snippets, but each snippet is associated with one song. 

- [Flowchart](https://docs.google.com/presentation/d/1PAdFeMxQmASaOPz7SHPIN45Hd68XpYkwQtB-qsT0OXQ/edit?usp=sharing)

## Code Snippet
```
const storage = firebase.storage();
```

## Project Screenshots

## Get Started
1. Create a [Firebase](https://firebase.google.com/) project and set up authentication. 
1. Clone Songrab to your local server
```
git@github.com:AngieMGonzalez/grabaudio.git
```
1. Create a `.env` file at the root of the project
1. Copy the environmental variables from Firebase and paste them as the properties of the keys found in your newly created `.env` file
1. Import sample data found in `data` folder in to the Realtime Database 
1. From your command line, be in the root directory and `run npm install` OR `npm i` for short
1. Then, run `npm run prepare`
1. To start Songlue, run `npm run dev`
1. Open [http://localhost:3000](http://localhost:3000) with your browser

### Tech/framework used
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![Netlify](https://img.shields.io/badge/netlify-%23000000.svg?style=for-the-badge&logo=netlify&logoColor=#00C7B7)
![Figma](https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white)

### API Reference
![Firebase Realtime Database and Firestore Cloud Storage](https://img.shields.io/badge/firebase-%23039BE5.svg?style=for-the-badge&logo=firebase)

## Contributors
- [Angie Gonzalez](https://github.com/AngieMGonzalez)

Thank you E21
