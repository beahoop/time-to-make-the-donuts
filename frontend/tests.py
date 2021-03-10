from django.test import SimpleTestCase
#SimpleTestCase is used for webpages that don't have a model included
from django.urls import reverse, resolve
#we'll use reverse to test our urls
#we'll use resolve to test our view "resolves" a given URL path
from .views import IndexView


class HomepageTests(SimpleTestCase):
    '''unit tests are executed top-to-bottom'''

    #setUp method runs before every test
    def setUp(self):
        url= reverse('frontend:index')
        #frontend is your namespace, and in frontend urls index is the namespace
        self.response = self.client.get(url)
        #this is like a frontend app is making a get request
        #aka fetching data, whatever that response is is what willl be set
        #to self.response


    def test_homepage_status_code(self):
        # response = self.client.get("/")
        #self.assertEqual(response.status_code, 200)
        #we needed this each time so we set up the setUp method
        self.assertEqual(self.response.status_code, 200)
        #status code 200 means OK

    def test_homepage_url_name(self):
        # response = self.client.get(reverse('frontend:home'))
        #reverse takes the name and gives us back the url
        self.assertEqual(self.response.status_code, 200)
        #making

    def test_homepage_url_resolves_homepageview(self):
        #testing that the right view is showing on the homepage
        view = resolve('/')
        self.assertEqual(
            view.func.__name__,
            IndexView.as_view().__name__
        )
