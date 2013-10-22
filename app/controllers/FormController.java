package controllers;

import models.ObjectResult;
import models.ObjectResultBase;
import play.data.Form;

public class FormController<T extends ObjectResultBase> {
	protected Form<T> form;

	public FormController(Class<T> t) {
		this.form = new Form<T>(t);
	}

	public void getBindedForm(Form<T> pageForm) {
		this.form = pageForm.bindFromRequest();
	}

	public Form<T> getForm() {
		return this.form;
	}

	public ObjectResultBase retrieveObject() {
		System.out.println("retrieveObject::start");
		if (this.form.hasErrors()) {
			System.out.println("retrieveObject::hasError."
					+ this.form.errors().toString());
			return ObjectResult.ERROR;
		}
		System.out.println("retrieveObject::retrieve filled form.");
		T obj = this.form.get();
		if (obj == null) {
			System.out.println("retrieveObject::object is null");
			return new ObjectResult(ObjectResult.CODE.WARN, "object is null.",
					"");
		}
		return obj;
	}

	public ObjectResultBase retrieveObject(Form<T> pageForm) {
		this.getBindedForm(pageForm);
		return this.retrieveObject();
	}
}
