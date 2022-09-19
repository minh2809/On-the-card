## Feature Planning Gallery Page:

1. Introduction:

Gallery Page:

- Help people to share more about themself via image gallery
- Help Salesman, photographer, freelancer to showcase their work better

2. Gallery Page Feature:

- Custom Header:
  +, Avatar
  +, Bio
  +, Link

- Share Image Posts:
  +, Choose Image
  +, Caption
  +, Date of posting
  +, Edit Posts & Re-arrange

- Analytic:
  +, Page View Analytic
  +, Post Like Analytic

3.  Execution Steps:

    a. Phase 1: Basic Features

          - Page Design / Components

          - Open Gallery Page Function:
            +, Front end: open option with confirmation in App Bar
            +, Front end: send request to create gallery in back end
            +, Front end: Navigation Bar configuration (for both individuals & business user)
            +, Back end: Create gallery page & post model
            +, Back end: Route to create gallery page, update user & send response
            +, Front end: Show error on failure. Show demo page when success with edit and analytic button

          - Edit Header Function:
            +, Front end: functionality to update image, change bio, change link
            +, Front end: functionality to send changes to back end
            +, Back end: save new changes

          - Post Managment Function:
            +, Front end: Functionality to update image with caption and link
            +, Front end: Functionality to edit, rearrange and delete image post
            +, Front end: Functionality to send changes to backend
            +, Back end: save new changes

          - Gallery Page showing:
            +, Front end: Gallery View Page completed
            +, Front end: View Page Navigation configuration

    b. Phase 2: Full Features

          - Post View Function:
            +, Front end: unique post link
            +, Front end: Post view with caption and date
            +, Front end: Carosel Button to next post
            +, Front end: same post from the same user (in the bottom)
            +, Front + Back: post link can be visit both from the gallery page or directly visited

          - Post Interaction Function:
            +, Front + Back: store username in local storage
            +, Front + Back: Like feature
            +, Front end: Liked posts are saved in local storage and render correctly
            +, Front end: Share post functionality
            +, Front end: Share page functionality

          - Analytic Function:
            +, Front + Back: posts count, likes count, display on header in Gallery View Page
            +, Front + Back: page view analytic (store in database)
            +, Front + Back: post view analytic (store in database)
            +, Front end: implement analytic page
              (likes count, post view count, page view count, total post count, view count ranking for each post)

4.  Next features to develope:

- Comment on Post

- Background image template for Gallery Page

- Video tab within the gallery page. NOTES:
  +, Analytic will have to be in a different page
  +, Video manage tab will be in the same page in front end
  +, Size limit for video

- Image carousel for Store Page:
  +, login to see how Waveconnect handle it:
  https://wavecnct.com/profile/trung.trinh

- Image carousel for Gallery page:
  +, login to see how Waveconnect handle it:
  https://wavecnct.com/profile/trung.trinh
