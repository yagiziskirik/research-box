# ResearchBox

![Version v1.2.1](https://img.shields.io/badge/version-v1.2.1-blue) ![License](https://img.shields.io/badge/Licence-MIT-green) ![Maintenance](https://img.shields.io/maintenance/yes/2023)

Unlock the power of knowledge organization with ResearchBox, your comprehensive research repository.

![Intro](https://i.ibb.co/ZMsZ8sH/Render.gif)

## Features

- 📓 Easy-to-use markdown note taking
- 👔 Professional blog-like appearence
- 💡 Simple, yet effective
- 💬 ChatGPT prompt generator from YouTube video transcriptions
- 🏷️ Efficient tag system
- 👤 No need to create an account for shared researches

## Usage

## Getting started

This project is not a replacement for big companies like Medium. It is not a blog, but just a simple note-taking app which is primarily developed to summarise YouTube videos, taking notes on some topics and sharing them later on.

Since the project is based on Next.js arcitecture, even though it has dynamic data fetching from database, it is still blazingly fast. I developed it as semi progressive web app, which means you can use it on your phone like an actual program if you have internet connection.

> For the curious ones, the website itself has almost a perfect score on every category in Lighthouse tests. ![Lighthouse performance](https://i.ibb.co/YfpwsGv/performance.jpg)

## Creating an account

You can go to the website following [this link](https://research-box.vercel.app). If you have a Github account (which I believe you do), you already have a ResearchBox account. Simply press `Login` button anywhere on screen to start using ResearchBox.
![Login Page](https://i.ibb.co/KWd1Czk/1.jpg)

## Basics

All we need to do is to add a new draft to get started. To do that, first we head to the `All Work` page.

![All work button](https://i.ibb.co/dkcRx24/2.jpg)

### All Work Page

![Add button](https://i.ibb.co/cQPPpNG/3.jpg)

Since we don't have any work here yet, we can create a new one with the `Add New` button. After pressing the button, we will be presented with research editing screen.

![Research Editing](https://i.ibb.co/mF41Ffd/4.jpg)

Let's explain every element.

1. Header of the research.
2. Short explanation will be shown in all the researches and `All Work` pages.
3. Tag container (press enter to add new **unique** tag).
4. Is published switch. If not turned on, only you can see the research even if you share it.
5. Markdown edit window.
   ![markdown](https://i.ibb.co/VD00Hvm/4-5.gif)
6. ChatGPT Prompt Generator.
   > It uses your clipboard to _transcribe_ a video and give you copy-ready ChatGPT prompt to get the summary of any YouTube video. Please make sure the last item in your clipboard is the YouTube video link.
7. Save button, which saves the changes.
   > Warning: There are no autosave features implemented yet, so please make sure to **save the page manually**.

Once you finish adding a research, your research will be added to the `All Work` page. As you can see, new buttons will come up:

![New all work page](https://i.ibb.co/qm10dzy/5.jpg)

The (1) is the delete button to remove any researches you want. And the (2) is the indicator that you can track whether the research is published. Remember that you cannot go to the published researches from this page. All other pages will show the released version of the research.

### Tags Page

It is very straight forward. You can see the tags you created, and checkout the articles have that tag.

![tags page](https://i.ibb.co/sgjG4Zx/6.jpg)

### Researches Page

You can see your published researches and `preview` them here.

![researches page](https://i.ibb.co/MsFqVjs/7.jpg)

### Index Page

Once you logged in, you can see your last 5 published researches here.

![index page](https://i.ibb.co/fNYfyZw/8.jpg)

### Article

Everything under the URL of `https://research-box.vercel.app/posts/POST_ID` directory counts as an article. If you share that URL and your research is published, everyone who follows this URL can see the research without a need to login.

![Article](https://i.ibb.co/HgbSTkY/9.jpg)

## Accessibility

All pages are entirely supports light and dark mode settings of your device. Also, pages are responsive in order to be opened in all devices.

![accessibility](https://i.ibb.co/4jb0DM4/Dark-Light.jpg)

### Mobile Device Support

By clicking the `share` button on your device, you can add ResearchBox to your home screen on your mobile device. It looks and works like a mobile app.

![Mobile app](https://i.ibb.co/D92h18L/mobile-1.jpg)

After adding the ResearchBox to the home screen, as you can see, it works like a different app (not a Safari tab anymore).

![mobile diffrences](https://i.ibb.co/YWVc603/mobile-2.jpg)
