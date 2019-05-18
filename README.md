# Crewsaders Front End API Module

### Installation
`yarn add https://github.com/crewsaders/frontend-api`
### Usage
#### Gerneral
```js
import { default as Api } from '@crewsaders/api'

const ApiInstance = Api.createInstance('https://api.crewsaders.com', localStorage.getItem('token'));
```
#### Vue Plugin
```js
import Vue from 'vue';
import { ApiPlugin } from '@crewsaders/api';

Vue.use(ApiPlugin, {
  baseURL: 'https://api.crewsaders.com',
  token: localStorage.getItem('token'),
});
```
