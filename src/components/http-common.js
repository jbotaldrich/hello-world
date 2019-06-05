import axios from 'axios'

export const HTTP = axios.create({
	baseURL: `http://appsheettest1.azurewebsites.net/sample/`
});