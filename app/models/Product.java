package models;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Id;

import net.vz.mongodb.jackson.DBCursor;
import net.vz.mongodb.jackson.ObjectId;
import play.data.validation.Constraints.Required;

import com.mongodb.BasicDBObject;

import controllers.MongoDBController;
import controllers.Util;

public class Product extends ObjectResultBase implements IProduct {
	@Id
	@ObjectId
	public String key; // should not initialize the ObjectId, otherwise cause
						// "Error mapping BSON to POJOs"
	public int id;
	@Required
	public String title = "";
	public Pricing pricing = new Pricing();
	private static String emptyJson = "{\"key\" : \"\", \"id\" : 0, \"title\" : \"\", \"pricing\" : {\"cost\" : 0.0, \"price\" : 0.0, \"promo_price\" : 0.0, \"savings\" : 0.0, \"on_sale\" : 0}}";

	public Product() {
	}

	public static MongoDBController<Product, String> newMongo() {
		return new MongoDBController<Product, String>(Product.class,
				String.class);
	}

	public static List<Product> all() {
		BasicDBObject orderBy = new BasicDBObject("id", 1);
		List<Product> list = new ArrayList<Product>();
		MongoDBController<Product, String> mongo = newMongo();
		try {
			mongo.open();
			list = mongo.coll.find().sort(orderBy).toArray();
		} finally {
			mongo.close();
		}
		return list;
	}

	public static List<Product> all(int count) {
		BasicDBObject orderBy = new BasicDBObject("id", 1);
		List<Product> list = new ArrayList<Product>();
		MongoDBController<Product, String> mongo = newMongo();
		try {
			mongo.open();
			list = mongo.coll.find().sort(orderBy).toArray(count);
		} finally {
			mongo.close();
		}
		return list;
	}

	public static List<Product> find(int id) {
		// query for String type
		// BasicDBObject query = new BasicDBObject("id", new BasicDBObject(
		// "$regex", "^9.*"));
		BasicDBObject query = new BasicDBObject("$where",
				"function(){return (this.id).toString().indexOf(\"" + id
						+ "\") == 0;}");
		BasicDBObject orderBy = new BasicDBObject("id", 1);
		List<Product> list = new ArrayList<Product>();
		MongoDBController<Product, String> mongo = newMongo();
		try {
			mongo.open();
			list = mongo.coll.find(query).sort(orderBy).toArray();
		} finally {
			mongo.close();
		}
		return list;
	}

	public static List<Product> find(int id, int count) {
		BasicDBObject query = new BasicDBObject("$where",
				"function(){return (this.id).toString().indexOf(\"" + id
						+ "\") == 0;}");
		BasicDBObject orderBy = new BasicDBObject("id", 1);
		List<Product> list = new ArrayList<Product>();
		MongoDBController<Product, String> mongo = newMongo();
		try {
			mongo.open();
			list = mongo.coll.find(query).sort(orderBy).toArray(count);
		} finally {
			mongo.close();
		}
		return list;
	}

	public static List<Product> findId(int id) {
		BasicDBObject query = new BasicDBObject("id", id);
		BasicDBObject orderBy = new BasicDBObject("title", 1);
		List<Product> list = new ArrayList<Product>();
		MongoDBController<Product, String> mongo = newMongo();
		try {
			mongo.open();
			list = mongo.coll.find(query).sort(orderBy).toArray();
		} finally {
			mongo.close();
		}
		return list;
	}

	public static List<Product> findId(int id, int count) {
		BasicDBObject query = new BasicDBObject("id", id);
		BasicDBObject orderBy = new BasicDBObject("title", 1);
		List<Product> list = new ArrayList<Product>();
		MongoDBController<Product, String> mongo = newMongo();
		try {
			mongo.open();
			list = mongo.coll.find(query).sort(orderBy).toArray(count);
		} finally {
			mongo.close();
		}
		return list;
	}

	public static void create(Product product) {
		Util.format(product);
		MongoDBController<Product, String> mongo = newMongo();
		try {
			mongo.open();
			mongo.coll.save(product);
		} finally {
			mongo.close();
		}
	}

	public static void update(Product product) {
		System.out.println("update::" + product.key);
		MongoDBController<Product, String> mongo = newMongo();
		try {
			mongo.open();
			Product item = mongo.coll.findOneById(product.key);
			if (product != null) {
				item.title = product.title;
				item.pricing.price = product.pricing.price;
				mongo.coll.save(item);
			}
		} finally {
			mongo.close();
		}
	}

	public static ObjectResultBase updateTitle(int id, String title) {
		System.out.println("updateTitle::id=" + id + " title=" + title);
		BasicDBObject query = new BasicDBObject("id", id);
		MongoDBController<Product, String> mongo = newMongo();
		try {
			mongo.open();
			DBCursor<Product> cursor = mongo.coll.find(query);
			while (cursor.hasNext()) {
				Product product = cursor.next();
				System.out.println("update product:id=" + product.id
						+ " title_orig=" + product.title);
				if (title.matches("^[a-zA-Z][a-zA-Z0-9-'. &]*$")) {
					product.title = title.trim();
					mongo.coll.save(product);
				} else {
					return new ObjectResult(ObjectResultBase.CODE.WARN,
							"Title invalid", product.title);
				}
			}
		} finally {
			mongo.close();
		}
		return ObjectResult.OK;
	}

	public static ObjectResultBase updatePrice(int id, double price) {
		System.out.println("updateTitle::id=" + id + " price=" + price);
		price = Util.roundUpMoney(price);
		BasicDBObject query = new BasicDBObject("id", id);
		MongoDBController<Product, String> mongo = newMongo();
		try {
			mongo.open();
			DBCursor<Product> cursor = mongo.coll.find(query);
			while (cursor.hasNext()) {
				Product product = cursor.next();
				System.out.println("update product:id=" + product.id
						+ " title=" + product.title + " price_orig="
						+ product.pricing.price);
				if (price > product.pricing.cost) {
					product.pricing.price = price;
					mongo.coll.save(product);
				} else {
					return new ObjectResult(ObjectResultBase.CODE.WARN,
							"Price invalid", product.pricing.price + "");
				}
			}
		} finally {
			mongo.close();
		}
		return ObjectResult.OK;
	}

	public static void delete(String key) {
		MongoDBController<Product, String> mongo = newMongo();
		try {
			mongo.open();
			Product product = mongo.coll.findOneById(key);
			if (product != null) {
				System.out.println("delete product:id=" + product.id
						+ " title=" + product.title);
				mongo.coll.remove(product);
			}
		} finally {
			mongo.close();
		}
	}

	public static void delete(int id) {
		BasicDBObject query = new BasicDBObject("id", id);
		MongoDBController<Product, String> mongo = newMongo();
		try {
			mongo.open();
			DBCursor<Product> cursor = mongo.coll.find(query);
			while (cursor.hasNext()) {
				Product product = cursor.next();
				System.out.println("delete product:id=" + product.id
						+ " title=" + product.title);
				delete(product.key);
			}
		} finally {
			mongo.close();
		}
	}

	public static String getEmptyJson() {
		Product obj = new Product();
		String json = Util.SerializeToJson(obj, emptyJson);
		return json;
	}

	public String getKey() {
		return this.key;
	}

	public int getId() {
		return this.id;
	}

	public String getTitle() {
		return this.title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public Pricing getPricing() {
		return this.pricing;
	}

	public String validate() {
		if (this.pricing.price <= this.pricing.cost || this.pricing.price <= 0) {
			return "Invalid price";
		}
		return null;
	}

	@Override
	public CODE code() {
		return CODE.OK;
	}

	@Override
	public String message() {
		return "";
	}
}
