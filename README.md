# media_manager_v2

Full stack web app project for learning Node js and Vue js

This project can be used to manage your photos

`.env` file will be needed for each `/frontend` and `/backend`

For `/frontend/.env`, you need to define
1. `VUE_APP_WEBSITE_TITLE` - The title of the web app
2. `VUE_APP_COUNTER_NAME` - The name of the score field
3. `VUE_APP_API_URL` - The url of the backend api

For `/backend/.env`, you need to define
1. `MONGO_URI` - The address of your MongoDB
2. `PAGINATESIZE` - Default number of items shown per page (Recommended: 6)
3. `PAGINATEOFFSET` - Default number of offset when showing items (Recommended: 0)
4. `BACK_UP_LOCATION` - Relative path for storing back up
5. `BACK_UP_INTERVAL_DAY` - The number of days between back ups

After defining environmental variables, run `npm run build` from `/frontend` to build vue app

Then run `node .` to start the server
