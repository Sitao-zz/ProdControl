package models;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.Properties;

public class Config {
	public static Properties properties = new Properties();
	static {
		try {
			properties.load(new FileInputStream("conf/application.conf"));
			System.out.println("property configurations are loaded");
		} catch (IOException e) {
			System.out.println(e.toString());
		}
	}

	public static String getValue(String key) {
		return properties.getProperty(key);
	}
}
