package models;

public class RequestResult {
	public int id;
	public String message;
	public String origValue;

	public RequestResult(int id) {
		this.id = id;
		this.message = "";
		this.origValue = "";
	}

	public RequestResult(int id, String message, String origValue) {
		this.id = id;
		this.message = message;
		this.origValue = origValue;
	}
}
