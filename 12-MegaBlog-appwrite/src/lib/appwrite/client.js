import { Client } from "appwrite";
import conf from "../../config";

// This single instance is the "Singleton"
const appwriteClient = new Client()
	.setEndpoint (conf.endpoint_id)
	.setProject (conf.project_id);
	// .setKey (conf.api_key);

export default appwriteClient;