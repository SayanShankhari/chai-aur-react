import conf from "../../config";
import { ID, Account, Storage, Query, Role, Permission } from "appwrite";
import appwriteClient from "./client";

class StorageService {
	account;
	storage;

	constructor (client) {
		this.account = new Account (client);
		this.storage = new Storage (client);
	}

	async uploadFile (file) {
		try {
			return await this.storage.createFile (
				{
					bucketId: conf.bucket_id
					, fileId: ID.unique()
					, file: file
					//, file: document.getElementById('uploader').files[0]
				}
			);
		} catch (error) {
			throw error;
		}
	}

	async deleteFile (file_id) {
		try {
			await this.storage.deleteFile (
				{
					bucketId: conf.storage_id
					, fileId: file_id
				}
			);

			return true;
		} catch (error) {
			return false;
		}
	}

	getFilePreview (file_id) {
		return this.storage.getFilePreview (
			{
				bucketId: conf.bucket_id
				, fileId: file_id
			}
		);
	}
}

export default new StorageService (appwriteClient);