# SonGlue [![Netlify Status](https://api.netlify.com/api/v1/badges/05b738ef-f461-4db8-81e6-54135f2c1883/deploy-status)](https://app.netlify.com/sites/songlue/deploys)

[View the SonGlue app Here](https://songlue.netlify.app/)

## Topics
- [Overview](#overview)
- [MVP Features](#mvp-features)
- [Video Walkthrough of MVP](#video-walkthrough-of-mvp)
- [Relevant Links](#relevant-links)
- [Code Snippet](#code-snippet)
- [Project Screenshots](#project-screenshots)
- [Get Started](#get-started)
- [Tech and Frameworks Used](#tech-and-frameworks-used)
- [API Reference](#api-reference)
- [Contributors](#contributors)
___
## Overview
- The ideal user for SonGlue is a musician/songwriter/composer trying to organize their songs/composition ideas
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

## Video Walkthrough of MVP
- https://www.loom.com/share/29511fce06db4be2bfbde6a31b344a0

## Relevant Links
- [Check out the deployed site](https://songlue.netlify.app/)
- [Figma Wireframes for MVP](https://www.figma.com/file/qlpuv1O0nBa1gsaRUMydaS/Songlue?node-id=0%3A1&t=dKNU5YLDvctIhoVa-1)
- [Project Board](https://github.com/users/AngieMGonzalez/projects/1)

- [MVP ERD](https://dbdiagram.io/d/63ead9d4296d97641d80a8bd)
<img width="500" alt="SonGlue ERD made using dbDiagram" src="https://user-images.githubusercontent.com/114124374/222018077-3e8f43cb-0196-4a95-a518-1320d6a4d26c.png">

- Assumption: A song can have many snippets, but each snippet is associated with one song. 

- [Flowchart](https://docs.google.com/presentation/d/1PAdFeMxQmASaOPz7SHPIN45Hd68XpYkwQtB-qsT0OXQ/edit?usp=sharing)

## Code Snippet
To access the Firestore Cloud Storage:
```
const storage = firebase.storage();
```
To delete all of a Song's Snippets associated with the Song, while deleting the song too:
```
const deleteSongSnippets = (songId) => new Promise((resolve, reject) => {
  getSnippetsBySong(songId).then((snippetsArray) => {
    const deleteSnippetPromises = snippetsArray.map((snippet) => deleteSingleSnippet(snippet.firebaseKey));

    Promise.all(deleteSnippetPromises).then(() => {
      deleteSingleSong(songId).then(resolve);
    });
  }).catch((error) => reject(error));
});
```


## Project Screenshots
[Home Page with Musician's Snippets](https://user-images.githubusercontent.com/114124374/224611726-4e394561-3238-4633-8abb-fa448f68968c.png)

<img width="600" alt="SonGlue Home Page" src="https://user-images.githubusercontent.com/114124374/224611726-4e394561-3238-4633-8abb-fa448f68968c.png">

[Profile Page with Musician's Songs](https://user-images.githubusercontent.com/114124374/224612483-c5680cff-3381-4d23-a602-b927bcae31c2.png)

<img width="600" alt="SonGlue Home Page" src="https://user-images.githubusercontent.com/114124374/224612483-c5680cff-3381-4d23-a602-b927bcae31c2.png">

[View Details of Snippet](https://user-images.githubusercontent.com/114124374/224612956-f99fb011-0d77-43e3-8a07-ffed04957ccd.png)

<img width="600" alt="SonGlue Home Page" src="https://user-images.githubusercontent.com/114124374/224612956-f99fb011-0d77-43e3-8a07-ffed04957ccd.png">


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
1. To start SonGlue, run `npm run dev`
1. Open [http://localhost:3000](http://localhost:3000) with your browser

### Tech and Frameworks Used
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![Netlify](https://img.shields.io/badge/netlify-%23000000.svg?style=for-the-badge&logo=netlify&logoColor=#00C7B7)
![Figma](https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white)
![Linter](https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white)
![Javascript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)

### API Reference
![Firebase Realtime Database and Firestore Cloud Storage](https://img.shields.io/badge/firebase-%23039BE5.svg?style=for-the-badge&logo=firebase)

## Contributors
- [Angie Gonzalez](https://github.com/AngieMGonzalez)
- Badges from [Alexandre Sanlim](https://github.com/alexandresanlim/Badges4-README.md-Profile#see-more-repositories)

Thank you E21
