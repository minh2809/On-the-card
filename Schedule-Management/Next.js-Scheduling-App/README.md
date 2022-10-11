# 1. How to run this app:

$ npm install --force
$ npm run dev

# 2. How to use localization:

- Run app and go to this route: localhost:3000/demo/i18n
- See this file: pages/demo/i18n.tsx

  +, See all the files imported in this file

- To add new text:

  +, Step 1: Go to this folder i18n/en

  +, Step 2: Go to a json file or create a new json file.
  In case you need to create a new json file, go to this file: i18n/index.js and add the file name in the `fileNames` array

  +, Step 3: Add text in the json file. Make sure the content of the json file in the i18n/vi and i18n/en matches

  +, Step 4: Use the text. See this folder: containers/Demo/i18n.tsx (route: localhost:3000/demo/i18n)

# 3. How to use loading component:

- See in this file: containers/Demo/DataFetching.tsx

# 4. Using styles:

- Import color from this file: styles/colors.scss
- Import font-weight and font-size from this file: styles/typography.scss
- See how to import in this file: containers/Demo/Demo.module.scss

# 5. How to use Redux:

- See this file: /hooks/useLoading.ts
- See setup in this folder:
  +, /store/reducers/loadingReducer.ts
  +, /store/reducers/index.ts

# 6. How to fetch data:

- See these files:
  +, /containers/Demo/DataFetching.tsx
  +, /api/demo.tsx
