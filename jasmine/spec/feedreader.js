/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */

         //jon: created a test on existence of allFeeds and tested if the lenght was above 0
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */

        //jon: looped through all item of the allFeeds arrays and tested the existence of their url and if the url was empty or not
        it('can loop through each feed', function() {
            for (var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url).not.toBe("");
            }
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

         //jon: looped through all item of the allFeeds arrays and tested the existence of their name and if their name was empty or not

        it('have their name defined', function() {
            for (var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name).not.toBe("");
            }
        });
    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function() {
        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */

         //jon: parsed the body tag to check if the menu-hidden class is present as it is the one ensuring that the menu is hidden by default
        it('element is hidden by default', function() {
            expect($('body')).toHaveClass("menu-hidden");
        });

        /* TODO: Write a test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */

         //jon: clicked a first time on the button and checked if the hidden-class was then absent. clicked again to check if the class is then present.
        it('shows when clicked, hide when clicked again', function() {
            $('.menu-icon-link').click();
            expect($('body')).not.toHaveClass("menu-hidden");
            $('.menu-icon-link').click();
            expect($('body')).toHaveClass("menu-hidden");
        });


    });
    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {

        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

         //jon: load feed and wait until the load is done to check if the entry class exists
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        it('load at least one entry', function() {
            expect($('.feed > .entry-link > article')).toHaveClass("entry");
        });

    });
    /* TODO: Write a new test suite named "New Feed Selection" */

    describe('New Feed Selection', function() {

        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */

         //load a first time the feed and retrive content from the first title available, then load another feed, retrieve the same data and compare the two
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        it('has the data changed', function(done) {
            var data0 = $('article > h2').text();
            loadFeed(1, function() {
                var data1 = $('article > h2').text();
                expect(data0).not.toContain(data1);
                done();
            });
        });
    });
});