# cloud-function-latency-spikes
Using child_process to run code inside a Cloud Function seems to produce significant latency spikes around require statements.

## Details

Check out this blog post for [details and stats](https://asserted.io/posts/spikes-in-cloud-function-require-latency). 

## To Reproduce

- Clone the repo
- Run `npm install`
- Make sure you have the [gcloud SDK installed](https://cloud.google.com/sdk/docs/downloads-interactive)
- Run `npm run build` to build the auto-generated libraries this will use during testing
- Run `npm run deploy:function` to push the code as a Cloud Function to your default project
- Create a `.env` file in the repo with `CLOUD_FUNCTION_URL=` whatever the url of the function is that you just created
- Run `npm run run:function` to run the test against the function and gather results
