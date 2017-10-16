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

```
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

Both of these actions have been automated so once you've set up Circleci, you should be able to forget about both of these things.

- Generate an imageset.json as a post merge step
- Set up auto uploading to the Image Service as a post-release step

#### Create a circle.yml

It should be something like this one in [o-icons](https://github.com/Financial-Times/fticons/blob/master/circle.yml)

To get the image set manifest step to work you'll need to give circleci some permissions.

- Logged in as you, In Github, set up Origamiserviceuser as a collaborator with write access to the image set. Origamiserviceuser doesn't have 2FA enabled so it should only be given write access explicitly and only where absolutely necessary.
- Log out of Github.
- Log in to Github as origamiserviceuser (details in Lastpass)
- Now log in to Circleci using Github (as origamiservivceuser)
- Go to "Add Projects" and find the new Image Set (It should be under the Financial Times organisation)
- In the Project window, click the cog in the top left and then go to Checkout SSH keys (or go to /edit#checkout)
- Click "add origamiserviceuser user key". This will give Circleci write access so that it can write imageList.json as a post-merge step.

#### Add to the Image Service
