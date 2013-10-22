package models;

public class ObjectResult extends ObjectResultBase {
	private CODE code;
	private String message;
	private String origValue;
	public final static ObjectResult OK = new ObjectResult(CODE.OK, "", "");
	public final static ObjectResult ERROR = new ObjectResult(CODE.ERROR, "",
			"");

	public ObjectResult(CODE code, String msg, String origValue) {
		this.code = code;
		this.message = msg;
		this.origValue = origValue;
	}

	@Override
	public CODE code() {
		return this.code;
	}

	public void setCode(CODE code) {
		this.code = code;
	}

	@Override
	public String message() {
		return this.message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	@Override
	public String origValue() {
		return this.origValue;
	}

	public void setOrigValue(String origValue) {
		this.origValue = origValue;
	}
}
