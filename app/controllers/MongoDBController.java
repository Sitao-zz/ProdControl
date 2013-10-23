package controllers;

import java.net.UnknownHostException;

import models.Config;
import net.vz.mongodb.jackson.JacksonDBCollection;

import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.Mongo;

public class MongoDBController<T, E> {
	private Mongo mongo = null;
	private DB db = null;
	private DBCollection dbCollection = null;
	private Class<T> dataType;
	private Class<E> keyType;
	public JacksonDBCollection<T, E> coll;

	public MongoDBController(Class<T> t, Class<E> e) {
		this.dataType = t;
		this.keyType = e;
	}

	public void DBConnect() {
		try {
			// mongo = new Mongo("localhost", 27017);
			// DB db = mongo.getDB("db");
			// dbCollection = db.getCollection("test");
			String host = Config.getValue("mongodb.host");
			int port = Integer.parseInt(Config.getValue("mongodb.port"));
			String database = Config.getValue("mongodb.database");
			String collection = Config.getValue("mongodb.collection");
			System.out.println("DBConnect::database=" + database
					+ " collection=" + collection);
			if (this.mongo == null) {
				this.mongo = new Mongo(host, port);
			}
			if (this.db == null) {
				this.db = mongo.getDB(database);
			}
			if (this.dbCollection == null) {
				this.dbCollection = db.getCollection(collection);
			}
		} catch (UnknownHostException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	public void getDBCollection(Class<T> t, Class<E> e) {
		this.coll = JacksonDBCollection.wrap(dbCollection, t, e);
	}

	public void open() {
		System.out.println("DBConnect::open.");
		this.DBConnect();
		this.getDBCollection(this.dataType, this.keyType);
		System.out.println("DBConnect::successful.");
	}

	public void close() {
		System.out.println("DBConnect::close.");
		if (this.mongo != null) {
			this.mongo.close();
		}
		this.dbCollection = null;
		this.db = null;
		this.mongo = null;
	}
}
