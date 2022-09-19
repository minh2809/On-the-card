## Run and testing:

- run '$ npm install' then '$ npm start' to start the app
- now you can go to 'localhost:3000' to see the app
- app is also available in 'http://onthecard.me/'

## Pages explanation:

- '/': routes will lead you to sign up page
- '/login': routes will lead you to sign in page
- '/profile': after login you will be bring to '/profile' page
- '/profile/edit': edit page where you manage all your info
- '/fetch/:serialNo': fetch page to look for username and redirect to view page
- '/:username': view page
- '/admin/serialNumber': admin page to find serial numbers

## NOTES:

3. React Lazy Loading:

   - See these videos:
     +, https://www.youtube.com/watch?v=Ef3nvKLS4no
     +, https://www.youtube.com/watch?v=0mQbxF-_S-M

4. Errors that need to be fix:

   - Validation doesn't show english for sign up page
   - Clear fields after add social media account
   - Custom boxes doesn't have validation for no input

5. New Updates:

Format and export .vcf file correctly
example:
https://tapsocial.co/dashboard/?user=2
https://mysnapy.com/austin

add more info to .vcf file to be done

DEPENDENCIES INSTALLATION:

npm install --save @material-ui/core @material-ui/icons aos axios classnames file-saver firebase node-sass qrcode.react react-player react-redux react-router react-router-dom react-scripts redux redux-thunk vcards-js
