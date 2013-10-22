package models;


public class Search extends ObjectResultBase implements ISearch {
	public int searchId;

	@Override
	public CODE code() {
		return CODE.OK;
	}

	@Override
	public String message() {
		return "";
	}

	public int getSearchId() {
		return this.searchId;
	}
}
