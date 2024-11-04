const slugify = require('slugify');
const marked = require('marked');
const nunjucks = require('nunjucks');
const request = require('request-json');
/**
 * Generic Industrial Plugin for doing stuff with the site build
 *  - manipulates files object before rendering
 *  - exposes some filters/templating functions passed to the template engine
 *  - houses a siteConfig object with values used in the buid
 */

module.exports ={
    plugin:plugin
};
/**
 * A Metalsmith plugin to modify files as needed
 *
 * @return {Function}
 */

function plugin() {
    return function (files, metalsmith) {
        // Ensure 'seo' object exists for 'insights/podcast/index.html' before setting properties
        if (files['insights/podcast/index.html']) {
            if (!files['insights/podcast/index.html'].seo) {
                files['insights/podcast/index.html'].seo = {};  // Initialize seo object if it doesn't exist
            }
            
            files['insights/podcast/index.html'].seo.page_title = "Industrial Strength Marketing Podcast for Manufacturing and Distributors";
            files['insights/podcast/index.html'].title = "Podcast";
            files['insights/podcast/index.html'].seo.description = "Welcome to the Industrial Strength Marketing Podcast. Featuring inspiring conversations between industrial leaders and host James Soto, Founder and CEO of one of North America’s top industrial marketing agencies.";
        }

        for (var file in files) {
            // Do not build private files, they are for metadata usage only
            if (files[file].private) {
                delete files[file];
            }

            if (files['redirects.html']) {
                files['_redirects'] = files['redirects.html'];
                delete files['redirects.html'];
            }

            if (files['feed/index.html']) {
                files['rss-feed.xml'] = files['feed/index.html'];
                delete files['feed/index.html'];
            }
        }
    };
}
