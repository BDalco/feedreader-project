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
         * page?  We get an error that the feed is not supposed to be empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* This test loops through allFeeds object and tests 
         * that a URL is defined & is not empty.
         */
        it('allFeeds object has URL defined and not empty', function() {
            for (var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url.length).not.toBe(0);
            }
        });


        /* This test loops through allFeeds object and tests
         * if it has a name defined and that the name is not empty.
         */
        it('allFeeds has a name defined and not empty', function() {
            for (var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name.length).not.toBe(0);
            }
        });

    });

    /* The Menu test suite checks the side navigation menu */
    describe('The Menu', function() {
        /* This test ensures that the menu element is
         * hidden by default when the page loads.
         */
        it('menu is hidden when page loads', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        /* This test ensures that the menu element changes
         * visibility when the menu icon is clicked. 
         * It toggles to appear and disappear when clicked.
         */
        it('when menu is clicked it opens, when clicked again it closes', function(done) {
            // tests when the menu link is clicked .menu-hidden class should not be visible
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(false);

            // tests when the menu link is clicked .menu-hidden class should be visible
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(true);

            done();
        });

    });

    /* Initial Entries test suite checks the loadFeed() object and 
     * checks to be sure that there are entries in the .feed container 
     */
    describe('Initial Entries', function() {
        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

        // using beforeEach to access loadFeed() because it is asynchronous
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

        // checks inside the .entry container to be sure there are entries
        it('have entries inside the loadFeed', function(done) {
            expect($('.feed .entry').length).toBeGreaterThan(0);
            done();
        });

    });

    /* New Feed Selection test suite checks the loadFeed() object and 
     * checks to be sure that the content actually changes when a new
     * feed is loaded.
     */
    describe('New Feed Selection', function() {
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
         var firstEntry;

         beforeEach(function(done) {
            loadFeed(0, function() {
                firstEntry = $('.feed').html();
                loadFeed(1, function() {
                    done();
                })
            })
         });

         it('when a new feed is loaded by loadFeed, the content changes', function(done) {
            expect($('.feed').html()).not.toEqual(firstEntry);
            done();
         })
    });
        
}());
