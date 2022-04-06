# MongoDB Atlas Search + VueJS 3 + PrimeVue 3
This is a simple MongoDB Atlas search demo using Vue 3/PrimeVue 3, Node/Express and the sample_mflix sample data provided by MongoDB (sample data importer is included in the Atlas UI!).

## Prerequisites
You should have at least the free tier of MongoDB Atlas, the sample data (link below) loaded to your cluster and a simple search index created. It's very quick to setup and the Atlas UI is very intuitive and easy to use!

### MongoDB Atlas Setup
1. Sign up for a free tier MongoDB Atlas account https://www.mongodb.com/cloud/atlas/register2
2. Import sample data https://www.mongodb.com/docs/atlas/sample-data/
3. Create a search index on the sample data https://www.mongodb.com/docs/atlas/atlas-search/tutorial/create-index-ui/

## Project setup

### Backend setup
```
cd /backend
npm install
mv .env-example .env
npm run dev
```
Set the MongoDB Atlas environment variables inside your newly created .env file
```
ATLAS_URI=mongodb+srv://mongodb:<password>@<clustername>.<host>.mongodb.net
ATLAS_DEFAULT_DB=sample_mflix
ATLAS_DEFAULT_COLLECTION=movies
```

### Frontend setup
```
cd /frontend
npm install
npm run serve
```
