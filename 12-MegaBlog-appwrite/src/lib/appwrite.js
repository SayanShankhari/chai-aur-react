import { Client, Account } from 'appwrite';
import conf from "../conf/conf";

export const client = new Client();

client
	.setEndpoint (conf.endpoint_id)
	.setProject (conf.project_id);

export const account = new Account (client);
export { ID } from 'appwrite';