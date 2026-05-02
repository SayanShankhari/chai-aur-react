import conf from "../../config";
import { ID, Databases, Storage, Query, TablesDB, Role, Permission } from "appwrite";
import appwriteClient from "./client";

class DatabaseService {
	//client;
	databases;
	storage;
	tables;
	row_id;

	constructor (client) {
		// use the globally created client
		//this.client = appwriteClient;

		//this.databases = new Databases (this.client);
		this.tables = new TablesDB (client);	// calling it directly

		// this.bucket = new Bucket (this.client);
	}

	async create ({ title, content, image_id, status, user_id }) {
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

	async select ({ title, user_id }) {
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

	async update (slug, { title, content, image_id, status, user_id }) {
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

	async delete ({ title, user_id }) {
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

	async deleteByRowId (row_id) {
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

	async deleteAll () {
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