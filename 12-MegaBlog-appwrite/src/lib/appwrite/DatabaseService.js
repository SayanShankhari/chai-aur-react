import conf from "../../conf/conf";
import { Client, ID, Databases, Storage, Query, TablesDB, Role, Permission } from "appwrite";

class DatabaseService {
	client;
	databases;
	storage;
	tables;
	row_id;

	constructor () {
		this.client = new Client();

		this.client
			.setEndpoint (conf.endpoint_id)
			.setProject (conf.project_id);

		//this.databases = new Databases (this.client);
		this.tables = new TablesDB (this.client);

		// this.bucket = new Bucket (this.client);
		this.storage = new Storage (this.client);

		this.row_id = ID.unique();
	}

	async createPost ({ title, content, image_id, status, user_id }) {
		try {
			// POST /tablesdb/{databaseId}/tables/{tableId}/rows
			return await this.tables.createRow (
				{
					databaseId: conf.database_id
					, tableId: conf.table_id
					, rowId: ID.unique()
					, data: {
						title: title
						, content: content
						, image: image_id
						, status: status
						, author: user_id
					}
					, permissions: [
						Permission.read (Role.any())
						//, Permission.update (Role.user (conf.user_id), "unverified")
						//, Permission.write (Role.user (conf.user_id), "unverified")
						//, Permission.delete (Role.user (conf.user_id), "unverified")
					] // optional
					//, transactionId: '<TRANSACTION_ID>' // optional
				}
			);
		} catch (error) {
			throw error;
		}
	}

	async insertDummyPosts (posts) {
		posts.map ((post) => {
			//console.log (post);
			const response = this.createPost (
				{
					title: post.title
					, content: post.content
					, image_id: "img_984735643"
					, status: "active"
					, user_id: "389456235"
				}
			);
		});
	}

	async getPost ({ title, user_id }) {
		try {
			// GET /tablesdb/{databaseId}/tables/{tableId}/rows/{rowId}
			return await this.tables.getRow (
				{
					databaseId: conf.database_id,
					tableId: conf.table_id,
					queries: [
						Query.equal ("status", "active")
						, Query.equal ("title", title)
						, Query.equal ("author", user_id)
					], // optional
					transactionId: '<TRANSACTION_ID>' // optional
				}
			);
		} catch (error) {
			throw error;
		}
	}

	async listPosts ({ title, user_id }) {
		try {
			// GET /tablesdb/{databaseId}/tables/{tableId}/rows
			return await this.tables.listRows (
				{
					databaseId: conf.database_id
					, tableId: conf.table_id
					, queries: [
						Query.equal ('title', title)
						, Query.equal ('author', user_id)
						, Query.orderDesc ('$sequence')
						, Query.limit (10)
					] // optional
					//transactionId: '<TRANSACTION_ID>', // optional
					, total: false // optional
				}
			)
		} catch (error) {
			throw error;
		}
	}

	async listAllPosts () {
		try {
			// GET /tablesdb/{databaseId}/tables/{tableId}/rows
			return await this.tables.listRows (
				{
					databaseId: conf.database_id
					, tableId: conf.table_id
					, queries: [] // optional
					//transactionId: '<TRANSACTION_ID>', // optional
					, total: false // optional
				}
			)
		} catch (error) {
			throw error;
		}
	}

	async updatePost (slug, { title, content, image_id, status, user_id }) {
		try {
			// PATCH /tablesdb/{databaseId}/tables/{tableId}/rows/{rowId}
			return await this.tables.updateRow (
				{
					databaseId: conf.database_id
					, tableId: conf.table_id
					, rowId: this.row_id
					, queries: [
						Query.equal ('title', title)
						, Query.equal ('author', user_id)
						, Query.orderAsc ('$sequence') // built-in field for insertion order
						, Query.limit (10)
					] // optional
					//, transactionId: '<TRANSACTION_ID>' // optional
					, total: false // optional
					, data: {
						content: content
						, image: image_id
						, status: status
					}
				}
			);
		} catch (error) {
			throw error;
		}
	}

	async deletePost ({ title, user_id }) {
		try {
			// DELETE /tablesdb/{databaseId}/tables/{tableId}/rows/{rowId}
			await this.tables.deleteRow (
				{
					databaseId: conf.database_id
					, tableId: conf.table_id
					, rowId: row_id
					, queries: [
						Query.equal ('title', title)
						, Query.equal ('author', user_id)
					] // optional
					//transactionId: '<TRANSACTION_ID>', // optional
					, total: false // optional
				}
			);

			return true;
		} catch (error) {
			return false;
		}
	}

	async deletePostByRowId (row_id) {
		try {
			// DELETE /tablesdb/{databaseId}/tables/{tableId}/rows/{rowId}
			await this.tables.deleteRow (
				{
					databaseId: conf.database_id
					, tableId: conf.table_id
					, rowId: row_id
				}
			);

			return true;
		} catch (error) {
			return false;
		}
	}

	async deleteAllPosts () {
		const response = this.listAllPosts();

		response
			.then ((data) => {
				data.rows.map ((row) => {
					this.tables.deleteRow (
						{
							databaseId: conf.database_id
							, tableId: conf.table_id
							, rowId: row.$id
						}
					);
				})
				
			})
			.catch ((error) => {console.log ("ERROR-1:", error)});

/*
		// Same as above with traditional syntax
		try {
			const data = await response.rows;
			console.log ("SUCCESS-2:", data);
		} catch (error) {
			console.error ('ERROR-2:', error);
		}
*/
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
			return false;
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

/*
PUT /tablesdb/{databaseId}/tables/{tableId}/rows/{rowId}
const result = await tablesDB.upsertRow({ // update or insert if not exist
    databaseId: '<DATABASE_ID>',
    tableId: '<TABLE_ID>',
    rowId: '<ROW_ID>',
    data: {}, // optional
    permissions: [Permission.read(Role.any())], // optional
    transactionId: '<TRANSACTION_ID>' // optional
});
*/
}

export default new DatabaseService();