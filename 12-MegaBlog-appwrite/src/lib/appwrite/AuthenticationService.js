import { Client, Account, ID } from 'appwrite';
import conf from "../../conf/conf";

class AuthenticationService {
	client = new Client();
	account;

	constructor () {
		this.client
			.setProject (conf.project_id)
			.setEndpoint (conf.endpoint_id);
			// .setKey (conf.api_key);

		this.account = new Account (this.client);
	}

	async createUser ({ name, email, password }) {
		try {
			const user_account = await this.account.create (
				{
					userId: ID.unique()
					, email // equivalent to "email: email"
					, password // equivalent to "password: password"
					, name // equivalent to "name: name"
				}
			);

			return user_account;
		} catch (error) {
			throw error;
		}
	}

	async login ({ email, password }) {
		try {
			await this.clearAllSessions();
		} catch (error) {
			throw error;
		}

		try {
			const session = await this.account.createEmailPasswordSession (
				{ email, password }
			);
			console.log ("session:", session);
			return session;
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

	async clearAllSessions() {
		try {
			// 1. Get the current session ID
			const currentSession = await this.account.get();
			const currentSessionId = currentSession.$id;

			// 2. List all sessions
			const sessions = await this.account.listSessions();

			// 3. Iterate and delete previous sessions
			for (const session of sessions.sessions) {
				if (session.$id !== currentSessionId) {
					await this.account.deleteSession({ sessionId: session.$id });
					//console.log(`Deleted session: ${session.$id}`);
				}
			}
			//console.log('All previous sessions cleared successfully.');

		} catch (error) {
			console.error('Error clearing sessions:', error);
		}
	}
}

export default new AuthenticationService();