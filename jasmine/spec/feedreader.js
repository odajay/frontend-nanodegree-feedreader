
$(function() {

    describe('RSS Feeds', function() {

         //Created a test on existence of allFeeds and tested if the lenght was above 0
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        //Looped through all item of the allFeeds arrays and tested the existence of their url and if the url was empty or not
        it('can loop through each feed', function() {
            for (var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url).not.toBe("");
            }
        });

         //Looped through all item of the allFeeds arrays and tested the existence of their name and if their name was empty or not

        it('have their name defined', function() {
            for (var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name).not.toBe("");
            }
        });
    });



    describe('The menu', function() {

         //Parsed the body tag to check if the menu-hidden class is present as it is the one ensuring that the menu is hidden by default
        it('element is hidden by default', function() {
            expect($('body')).toHaveClass("menu-hidden");
        });

         //Clicked a first time on the button and checked if the hidden-class was then absent. clicked again to check if the class is then present.
        it('shows when clicked, hide when clicked again', function() {
            $('.menu-icon-link').click();
            expect($('body')).not.toHaveClass("menu-hidden");
            $('.menu-icon-link').click();
            expect($('body')).toHaveClass("menu-hidden");
        });


    });

    describe('Initial Entries', function() {

         //Load feed and wait until the load is done to check if the entry class exists
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        it('load at least one entry', function() {
            expect($('.feed > .entry-link > article')).toHaveClass("entry");
        });

    });


    describe('New Feed Selection', function() {

         //Load a first time the feed and retrive content from the first title available, then load another feed, retrieve the same data and compare the two
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