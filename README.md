# mongodb-atlas-search-demo
This is a simple demo using Vue 3/PrimeVue 3, Node/Express and MongoDB Atlas Search

## Backend setup
```
cd /backend
npm install
mv .env-example .env
```
Set the MongoDB Atlas environment variables
```
ATLAS_URI=mongodb+srv://mongodb:<password>@<clustername>.<host>.mongodb.net
ATLAS_DEFAULT_DB=sample_mflix
ATLAS_DEFAULT_COLLECTION=movies
```