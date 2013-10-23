package controllers;

import java.io.IOException;

import models.IProduct;
import models.Pricing;
import models.Product;

import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.map.ObjectWriter;

public class Util {
	public static void format(IProduct prod) {
		prod.setTitle(prod.getTitle().trim());
		Pricing pricing = prod.getPricing();
		pricing.cost = roundUpMoney(pricing.cost);
		pricing.price = roundUpMoney(pricing.price);
		pricing.promo_price = roundUpMoney(pricing.promo_price);
		pricing.savings = roundUpMoney(pricing.savings);
	}

	public static double roundUpMoney(double input) {
		double output = ((double) Math.round(input * 100)) / 100;
		return output;
	}

	public static String SerializeToJson(Object obj, String defaultMsg) {
		ObjectWriter ow = new ObjectMapper().writer()
				.withDefaultPrettyPrinter();
		String json = "";
		try {
			json = ow.writeValueAsString(obj);
		} catch (JsonGenerationException e) {
			e.printStackTrace();
			json = Product.getEmptyJson();
		} catch (JsonMappingException e) {
			e.printStackTrace();
			json = Product.getEmptyJson();
		} catch (IOException e) {
			e.printStackTrace();
			json = Product.getEmptyJson();
		}
		return json;
	}
}
