package models;

public abstract class ObjectResultBase {
	public enum CODE {
		OK, WARN, ERROR
	}

	public abstract CODE code();

	public abstract String message();

	public String origValue() {
		return "";
	}
}
