package controllers;

import java.util.List;

import javax.swing.JOptionPane;

import models.Config;
import models.ObjectResult;
import models.ObjectResultBase;
import models.Product;
import models.RequestResult;
import models.Search;

import org.joda.time.DateTime;
import org.joda.time.DateTimeZone;

import play.data.Form;
import play.mvc.Controller;
import play.mvc.Result;

public class Application extends Controller {
	static Form<Product> createForm = Form.form(Product.class);
	static Form<Product> updateForm = Form.form(Product.class);
	static Form<Search> searchForm = Form.form(Search.class);

	public static Result getDate() {
		String result = DateTime.now(DateTimeZone.UTC).toString();
		return ok(result);
	}

	public static Result index() {
		return redirect(routes.Application.products());
	}

	public static Result products() {
		System.out.println("products::start");
		return ok(views.html.index
				.render(Product.all(), createForm, searchForm));
	}

	public static Result findAllProduct() {
		System.out.println("findProduct::start.");
		int count = Integer.parseInt(Config.getValue("resultLength"));
		List<Product> list = Product.all(count);
		if (list.size() > 0) {
			String json = Util.SerializeToJson(list, Product.getEmptyJson());
			System.out.println(json);
			return ok(json);
		} else {
			return ok("");
		}
	}

	public static Result findProduct(String idStr) {
		System.out.println("findProduct(String)::start.");
		int id = Integer.parseInt(idStr);
		int count = Integer.parseInt(Config.getValue("resultLength"));
		List<Product> list = Product.find(id, count);
		if (list.size() > 0) {
			String json = Util.SerializeToJson(list, Product.getEmptyJson());
			System.out.println(json);
			return ok(json);
		} else {
			return ok(idStr);
		}
	}

	public static Result newProduct() {
		System.out.println("newProduct::start");
		ProductFormController objForm = new ProductFormController(Product.class);
		ObjectResultBase result = objForm.retrieveObject(createForm);
		if (result.equals(ObjectResult.ERROR)) {
			return badRequest(views.html.index.render(Product.all(),
					objForm.getForm(), searchForm));
		}
		if (result.code().equals(ObjectResult.CODE.WARN)) {
			JOptionPane.showMessageDialog(null, result.message(), "Warning",
					JOptionPane.INFORMATION_MESSAGE);
			return badRequest(result.message());
		}
		if (!(result instanceof Product)) {
			return badRequest("Invalid product instance");
		}
		Product product = (Product) result;
		Product.create(product);
		return redirect(routes.Application.products());
	}

	public static Result updateProduct() {
		System.out.println("updateProduct::start");
		ProductFormController objForm = new ProductFormController(Product.class);
		ObjectResultBase result = objForm.retrieveObject(updateForm);
		if (result.equals(ObjectResult.ERROR)) {
			return badRequest(views.html.index.render(Product.all(),
					objForm.getForm(), searchForm));
		}
		if (result.code().equals(ObjectResult.CODE.WARN)) {
			JOptionPane.showMessageDialog(null, result.message(), "Warning",
					JOptionPane.INFORMATION_MESSAGE);
			return badRequest(result.message());
		}
		if (!(result instanceof Product)) {
			return badRequest("Invalid product instance");
		}
		Product product = (Product) result;
		Product.update(product);
		return redirect(routes.Application.products());
	}

	public static Result deleteProduct(String idStr) {
		System.out.println("deleteProduct::id=" + idStr);
		int id = Integer.parseInt(idStr);
		Product.delete(id);
		return redirect(routes.Application.products());
	}

	public static Result updateProductTitle(String idStr, String title) {
		System.out.println("updateProductTitle::id=" + idStr + " title="
				+ title);
		int id = Integer.parseInt(idStr);
		ObjectResultBase result = Product.updateTitle(id, title);
		RequestResult res = new RequestResult(id);
		if (!result.equals(ObjectResult.OK)) {
			res.message = result.message();
			res.origValue = result.origValue();
		}
		String json = Util.SerializeToJson(res, "");
		return ok(json);
	}

	public static Result updateProductPrice(String idStr, String priceStr) {
		System.out.println("updateProductPrice::id=" + idStr + " price="
				+ priceStr);
		int id = Integer.parseInt(idStr);
		double price = Double.parseDouble(priceStr);
		ObjectResultBase result = Product.updatePrice(id, price);
		RequestResult res = new RequestResult(id);
		if (!result.equals(ObjectResult.OK)) {
			res.message = result.message();
			res.origValue = result.origValue();
		}
		String json = Util.SerializeToJson(res, "");
		return ok(json);
	}
}
