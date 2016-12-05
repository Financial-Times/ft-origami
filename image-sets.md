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

### Create an imageList.json in the root

This file should contain an array of objects, one object for each image. The name is the filename of your image, with the file extension removed.

```
{
	"images": [
		{
			"name": "ned-logo"
		},
		{
			"name": "other-logo"
		}
	]
}
```

#### Automating imageList.json

Currently, all origami image sets are set up to auto generate this list as a post deploy step in Circleci.

Copy the circle.yml and buildImageList.js from http://github.com/financial-times/logo-images.

- **buildImageList.js** reads the contents of your src folder and generates your JSON which it then writes to imageList.json.
- **circle.yml** runs the JSON building JavaScript and, if that results in a file change, commits it.

To get this to work, you have to do some set up in circle and github too:

- In Github, set up Origamiserviceuser as a collaborator with write access to the image set. Origamiserviceuser doesn't have 2FA enabled so it should only be given write access explicitly and only where absolutely necessary.
- Log out of Github.
- Log in to Github as origamiserviceuser (details in Lastpass)
- Now log in to Circleci using Github (as origamiservivceuser)
- Go to "Add Projects" and find the new Image Set (It should be under the Financial Times organisation)
- In the Project window, click the cog in the top left and then go to Checkout SSH keys (or go to /edit#checkout)
- Click "add origamiserviceuser user key". This will give Circleci write access so that it can write imageList.json as a post-test step.

## Adding the image set to the Image Service

1. Update the [imageset map](https://github.com/Financial-Times/origami-imageset-uploader/blob/master/imageset-map.json) in Origami Image Set uploader, to include the new image set. The keys relate to the name of the repository under Financial-Times on GitHub, the values reference the scheme that the Image Service will implement and the name of the folder in the repo where images live.

1. Once your PR is merged, deploy the Image Set uploader.

1. Go to `https://github.com/Financial-Times/<your-repo>/settings/hooks` and add a new webhook. Set the Payload URL to `http://origami-imageset-uploader.herokuapp.com/release`, check "Let me select individual events", then check only "Release" (you'll need to uncheck "Push").

1. You'll now need to create a release on the image set repo. This should trigger the webhook and upload a copy of the image set to our S3 bucket. You can check that this has worked by going to: `http://origami-imageset-uploader-s3.s3.amazonaws.com/<scheme>/v1/<image>.<ext>`.
