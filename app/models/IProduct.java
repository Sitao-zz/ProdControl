package models;

public interface IProduct {
	int getId();

	String getTitle();

	void setTitle(String title);

	Pricing getPricing();
}
