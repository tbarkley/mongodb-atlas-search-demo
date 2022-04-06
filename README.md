# mongodb-atlas-search-demo
This is a simple demo using Vue 3/PrimeVue 3, Node/Express and MongoDB Atlas Search

## MongoDB Atlas Setup
1. Sign up for a free tier MongoDB Atlas account https://www.mongodb.com/cloud/atlas/register2
2. Import sample data https://www.mongodb.com/docs/atlas/sample-data/
3. Create a search index on the sample data https://www.mongodb.com/docs/atlas/atlas-search/tutorial/create-index-ui/

### Backend setup
```
cd /backend
npm install
mv .env-example .env
npm run dev
```
Set the MongoDB Atlas environment variables
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
