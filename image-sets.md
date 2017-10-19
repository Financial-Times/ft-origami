
# Image set behaviour

- Image sets appear in the Registry
- Image sets are available from the Image Service, and have their own scheme.

## How to create an Image Set

(A quick way to do these creation steps is to copy http://github.com/financial-times/logo-images)

### Create a README

At a minimum, this should include guidelines for naming conventions of images.
See http://github.com/financial-times/logo-images for an example of a good README.

### Create an origami.json

The origami.json file contains metadata used by the registry.

```json
{
    "description": "Description for image set. Appears in registry",
    "origamiType": "imageset",
    "origamiVersion": 1,
    "support": "https://github.com/Financial-Times/brand-images/issues",
    "supportStatus": "active"
}
```

### Create your images

All images should be the same format (eg all PNG, all SVG). This is due to a limitation in the image service.
These images should all go in a folder in the root of your project called `src`.

### Getting your images into the Image Service and Registry

All image sets should be available via the Image Service and Registry.

Both of these actions have been automated so once you've set up CircleCI, you should be able to forget about both of these things.

- Generate an imageset.json as a post merge step
- Set up auto uploading to the Image Service as a post-release step

#### Create a circle.yml

It should be something like this one in [social-images](https://github.com/Financial-Times/social-images/blob/master/circle.yml).

You'll need to update the `--scheme` flag to point to the custom scheme you wish to register with the Image Service. These normally begin with "ft", and it should appear in three places.

#### Set up repo permissions

To get the `build-manifest` step in your `circle.yml` to work, you'll need to set up some permissions in GitHub and CircleCI:

  - Logged in as you, In Github, set up origamiserviceuser as a collaborator with write access to the image set. origamiserviceuser doesn't have 2FA enabled so it should only be given write access explicitly and only where absolutely necessary

  - Log in to CircleCI and add your new image set as a project

  - Log out of Github

  - Now log in to CircleCI using Github as origamiservivceuser (Details in LastPass)

  - Go to "Add Projects" and find the new Image Set (It should be under the Financial-Times organisation)

  - In the Project window, click the cog in the top left and then go to Checkout SSH keys (in the sidebar or change address to `/edit#checkout`)

  - Click "add origamiserviceuser user key". This will give CircleCI write access so that it can write `imageset.json` as a post-merge step

  - Now go to "Environment Variables" (in the sidebar or change address to `/edit#env-vars`)

  - Add two environment variables: `AWS_ACCESS_KEY` and `AWS_SECRET_KEY`. These can be found in Lastpass in a secure note named "Imageset S3 Bucket credentials", you'll need the production credentials

#### Test the Circle config

Now we need to test that the Circle config is all set up correctly. We'll publish a version of the image set which should publish the images to S3. At this point the images will not be available in the Image Service, but we'll be able to verify that they're uploading correctly.

  - PR some new changes to your image set repo and merge them, we need to trigger a build on the `master` branch (to test that the `imageset.json` is created)

  - Wait until origamiserviceuser creates a new commit on the repo (you can watch the progress on the CircleCI project page). This commit will be named "Update image manifest [ci skip]"

  - Once the manifest has been committed, create a GitHub release on your image set repo. This release should have a semver tag with a leading "v", e.g. `v1.0.0`

  - Now you can watch the deploy step on the CircleCI project page. Nothing should error, and you should see images pushed to S3

  - Verify that the images have been published by copying the URL below, updating to match your new image set details, and opening in-browser. The image should display. `https://origami-images.ft.com/<SCHEME>/v1/<IMAGEPATH>`
    - `<SCHEME>` should match the scheme you specify in your `circle.yml`
    - `<IMAGEPATH>` should be the name of one of the images in your `src` directory. Exclude `src/` but include the file extension

#### Expose through the Image Service

If the above is all working, we're ready to add the image set to the Image Service. You'll need to clone the [Image Service repo](https://github.com/Financial-Times/origami-image-service) and start work on a new branch.

  - In `lib/image-transform.js`, update the `validUriSchemes` method to include your new scheme in the returned array

  - In `lib/image-transform.js`, update the `schemeVersionMap` method to include your new scheme. It should have a key matching your scheme and a value of `'v1'`

  - In `lib/image-transform.js`, update the `switch` in the  `resolveCustomSchemeUri` method to include a case for your scheme. Either add it to "SVG-based" or "Non-SVG-based", depending on what type of image is in your image set. Don't forget to update the JSDoc

  - In `lib/routes/v2/images.js`, find the `app.get` call which includes `fthead` and `ftsocial`. Add your custom scheme to the regular expression for this route

  - In `lib/image-service.js`, update the `switch` in the  `proxyResponseHandler` function to include a case for your scheme. Add it to the existing cases

  - In `views/api.html`, update the URI part of the table to include the new custom scheme. In the documentation, you'll need to suffix the custom scheme you specify with `-v1`

  - Add tests for the above where appropriate. A good indicator of whether you need to include a test is when there's already a test which mentions an existing image set. Grepping the `test` directory for `ftsocial` is a quick way to determine this


  - Run the Image Service locally to test all of this, and open a PR. When merged the new image set will be available on the Image Service QA instance, test here before promoting to production
