## FullStack App For OnTheCard

## Checklist for moving between CA and VN App:

    - redux store (Language)
    - Change render_list: ./utilities/render_list
    - Terms of use (./containers/Account/SignUp)
    - api, api2
    - index.js (redux)
    - firebase config, serialAPI
        (./containers/firebase/firebase.js)
    - Public index.html
    - Footer Redirect to Correct Page (./containers/Footer.js && FullFooter.js)
    - ./container/AppBar/AppBar.js:
      +, premiumUser should has for VN version, shouldn't be set for co version
    - ViewPage & FetchPage Loader
    - Remove old firebase config

    - server cors policy
    - server mongoose config
    - server sending email (utils/sendEmail.js)
    - server firebase config (utils/helper.js)

    Some Changes

## Task To Do:

PROBLEM IN THE SYSTEM:

When link serial number (in otckythuat) to another serial number
the linked serial number will be deleted in serialnumber collections

Will need to check the linked_serialnumbers for the function
that add the gift card numbers in to the system (in /admin/serialnumbers)

This issue is currently happen for .me only since we did not link
any serial number in .co

- Store Page View:
  +, Image still didn't have onError
  +, New line for landing page's description

- Image Modal:
  +, Edit > Make Link Name editable

- Rewrite:
  +, Modal.js and DropDownList.js to functional

- Improvements:
  +, App Display in Large Screen Mode

- Bugs:
  +, App htkt: email co "\_"
  +, htkt: chua them analytic sau khi sua

- Disabled Support Route in Server

Notes for B2B:

- Only need to worry for B2B registration in Backend
  (Need few verifications)
  +, How to get multiple serial Number for B2B
  +, How to register multiple card numbers to 1 email
  +, See B2B Routes and Controllers for these operations

## Resources:

- Sending Email Using Google Auth:
  https://www.youtube.com/watch?v=-rcRf7yswfM

- Deploying Nodejs in AWS:
  https://www.youtube.com/watch?v=dMVy3BQB314

- Embedding Media:
  https://www.11ty.dev/docs/config/
  https://gfscott.com/embed-everything/

- Getting PID of running Port:

$ sudo lsof -t -i:8080
$ sudo kill -9 pid

See code example in emailController.js:
testGmail()

- Fontawesome: using version 5.15.4
  cannot upgrade
