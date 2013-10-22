import static org.fest.assertions.Assertions.assertThat;
import static play.test.Helpers.contentAsString;
import static play.test.Helpers.contentType;
import models.Product;
import models.Search;

import org.junit.Test;

import play.data.Form;
import play.mvc.Content;

/**
 * 
 * Simple (JUnit) tests that can call all parts of a play app. If you are
 * interested in mocking a whole application, see the wiki for more details.
 * 
 */
public class ApplicationTest {
	@Test
	public void simpleCheck() {
		int a = 1 + 1;
		assertThat(a).isEqualTo(2);
	}

	@Test
	public void renderTemplate() {
		Form<Product> form = Form.form(Product.class);
		Form<Search> searchForm = Form.form(Search.class);
		Content html = views.html.index.render(Product.all(), form, searchForm);
		assertThat(contentType(html)).isEqualTo("text/html");
		assertThat(contentAsString(html)).contains(
				"Your new application is ready.");
	}
}
