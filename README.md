# Visual feed

## description
Simple feed app which has next features: 
- sign up, sign in, autorization uses jwt tokens through secure http-only cookies without sending authorization header 
- secure routes with rate limits for each route 
- profile page with the list of active sessions and forms to modify your personal data and password 
- all users page and certain user page with its own posts 
- home page which shows all posts (with fetching more on scroll) and it also has the button to submit a new post 
- like / dislike a post, with information of users who liked certain post
- forms cover validation for all possible cases and fire notifications
- uploading images and storing them on cloudinary
- detailed post page with comments

## tech stack
jwt auth, express, mongoose (mongodb), nextjs (react), styled-components, redux, cloudinary
