package controllers;

import java.net.UnknownHostException;

import models.Config;
import net.vz.mongodb.jackson.JacksonDBCollection;

import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.Mongo;

public class MongoDBController<T, E> {
	private static DBCollection dbCollection;
	public JacksonDBCollection<T, E> coll;
	static {
		DBConnect();
	}

	public MongoDBController(Class<T> t, Class<E> e) {
		this.getDBCollection(t, e);
	}

	public static void DBConnect() {
		System.out.println("DBConnect::start.");
		Mongo mongo;
		try {
			// mongo = new Mongo("localhost", 27017);
			// DB db = mongo.getDB("db");
			// dbCollection = db.getCollection("test");
			String host = Config.getValue("mongodb.host");
			int port = Integer.parseInt(Config.getValue("mongodb.port"));
			String database = Config.getValue("mongodb.database");
			String collection = Config.getValue("mongodb.collection");
			System.out.println(collection);
			mongo = new Mongo(host, port);
			DB db = mongo.getDB(database);
			dbCollection = db.getCollection(collection);
			System.out.println("DBConnect::successful.");
		} catch (UnknownHostException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	public void getDBCollection(Class<T> t, Class<E> e) {
		coll = JacksonDBCollection.wrap(dbCollection, t, e);
	}
}
