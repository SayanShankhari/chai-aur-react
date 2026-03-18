import { Client, Account, ID } from 'appwrite';
import conf from "../../conf/conf";

class AuthenticationService {
	client = new Client();
	account;

	constructor () {
		this.client
			.setEndpoint (conf.endpoint_id)
			.setProject (conf.project_id);
			// .setKey (conf.api_key);

		this.account = new Account (this.client);
	}

	async createAccount ({ name, email, password }) {
		try {
			user_account = await this.account.create (
				{
					userId: ID.unique()
					, email // equivalent to "email: email"
					, password // equivalent to "password: password"
					, name // equivalent to "name: name"
				}
			);

			if (user_account) {
				return this.login (
					{ email, password }
				);
			} else {
				throw new Error ("Account cannot be processed.");
			}
		} catch (error) {
			throw error;
		}
	}

	async login ({ email, password }) {
		try {
			return await this.account.createEmailPasswordSession (
				{ email, password }
			);
		} catch (error) {
			throw error;
		}
	}

	async getCurrentUser () {
		try {
			return await this.account.get();
		} catch (error) {
			console.log ("[ERROR]: AuthenticationService : getCurrentUser -", error);
		}

		return null;	// avoid unhandled (if-else) error
	}

	async logout () {
		try {
			//await this.account.deleteSession({ sessionId: 'current' });
			await this.account.deleteSessions();
		} catch (error) {
			console.log ("[ERROR]: AuthenticationService : logout -", error);
			throw error;
		}
	}
}

export default new AuthenticationService();