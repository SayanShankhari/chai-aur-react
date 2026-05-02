import { Account, ID } from 'appwrite';
import appwriteClient from './client';

class AuthenticationService {
	instanceId = Math.random();

	//client = new Client();
	account;

	constructor (client) {
		// this.client
		// 	.setProject (conf.project_id)
		// 	.setEndpoint (conf.endpoint_id);
		// 	// .setKey (conf.api_key);

		this.account = new Account (client);
	}

	async createUser ( { name, email, password } ) {
		try {
			const user = await this.account.create (
				{
					userId: ID.unique()
					, email // equivalent to "email: email"
					, password // equivalent to "password: password"
					, name // equivalent to "name: name"
				}
			);

			if (!user) {
				throw new Error ("Unable to create account!");
			}

			return user;
		} catch (error) {
			throw error;
		}
	}

	async login ( { email, password } ) {
		// await this.clearAllSessions();
		// console.log (this.account);
		try {
			const session = await this.account.createEmailPasswordSession (
				{ email, password }
			);

			// console.log ("session:", session);
			return session;
		} catch (error) {
			// If error is "creation of a session is prohibited when a session is active"
			if (error.code === 401) { 
				// Handle appropriately or logout first
			}

			throw error;
		}
	}

	async getCurrentUser () {
		try {
			const user = await this.account.get();
			return user;
		} catch (error) {
			// Appwrite returns a 401 error code when no session exists
			if (error.code === 401) {
				return null;	// Silent failure: user is simply not logged in
			}

			// Log other unexpected errors
			console.error("[ERROR]: Auth-getCurrentUser - Unexpected error:", error);
		}
	}

	async logout (session_id = "") {
		try {
			const user = await this.getCurrentUser();

			// await this.account.deleteSessions();

			if (user) {
				if (session_id) {
					await this.account.deleteSession ({ sessionId: session_id });
				} else {
					await this.account.deleteSession ({ sessionId: 'current' });
				}
			} else {
				throw new Error ("User not found to delete!");
			}
		} catch (error) {
			console.error ("[ERROR]: Auth-logout -", error?.message);
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
			// Appwrite returns a 401 error code when no session exists
			if (error.code === 401) {
				return null;	// Silent failure: user is simply not logged in
			}

			// Log other unexpected errors
			console.error("[ERROR]: Auth-getCurrentUser - Unexpected error:", error);
		}
	}
}

// export object as Singleton pattern, create once, use everywhere
export default new AuthenticationService (appwriteClient);