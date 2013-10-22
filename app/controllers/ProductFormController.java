package controllers;

import models.ObjectResult;
import models.ObjectResultBase;
import models.Product;
import play.data.Form;

public class ProductFormController extends FormController<Product> {
	public ProductFormController(Class<Product> t) {
		super(t);
		// TODO Auto-generated constructor stub
	}

	public ObjectResultBase retrieveObject() {
		ObjectResultBase result = super.retrieveObject();
		if (result.code() != ObjectResult.CODE.OK) {
			return result;
		}
		Product product = (Product) result;
		System.out.println("retrieveObject::key=" + product.getKey() + " id="
				+ product.getId() + " title=" + product.getTitle());
		if (product.getPricing() == null) {
			System.out.println("retrieveObject::product pricing is null");
			return new ObjectResult(ObjectResult.CODE.WARN,
					"product pricing is null.", "");
		}
		System.out.println("retrieveObject::cost=" + product.getPricing().cost
				+ " price=" + product.getPricing().price);
		return product;
	}

	public ObjectResultBase retrieveObject(Form<Product> pageForm) {
		super.getBindedForm(pageForm);
		return this.retrieveObject();
	}
}
