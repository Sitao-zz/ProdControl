package controllers;

import models.ObjectResult;
import models.ObjectResultBase;
import models.Search;
import play.data.Form;

public class SearchFormController extends FormController<Search> {
	public SearchFormController(Class<Search> t) {
		super(t);
		// TODO Auto-generated constructor stub
	}

	public ObjectResultBase retrieveObject() {
		ObjectResultBase result = super.retrieveObject();
		if (result.code() != ObjectResult.CODE.OK) {
			return result;
		}
		Search search = (Search) result;
		System.out.println("retrieveObject::id=" + search.getSearchId());
		return search;
	}

	public ObjectResultBase retrieveObject(Form<Search> pageForm) {
		super.getBindedForm(pageForm);
		return this.retrieveObject();
	}
}
